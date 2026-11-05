#!/usr/bin/env python3
"""Push Star FM repo to GitHub using dulwich porcelain + paramiko SSH vendor."""
import os, sys, io, select, time
import paramiko
from dulwich.repo import Repo
from dulwich.client import SSHVendor, SubprocessWrapper
from dulwich import porcelain


class ParamikoSSHVendor(SSHVendor):
    """SSH vendor that uses paramiko instead of the ssh binary."""

    def run_command(self, host, command, username=None, port=None,
                    password=None, key_filename=None, ssh_command=None,
                    protocol_version=None):
        client = paramiko.SSHClient()
        client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

        if key_filename is None:
            key_filename = os.path.expanduser("~/.ssh/id_ed25519")

        key = paramiko.Ed25519Key.from_private_key_file(key_filename)

        kwargs = {
            "hostname": host,
            "username": username or "git",
            "pkey": key,
            "timeout": 30,
        }
        if port:
            kwargs["port"] = port

        client.connect(**kwargs)
        transport = client.get_transport()
        channel = transport.open_session()

        # Build the command string
        if isinstance(command, list):
            parts = []
            for c in command:
                s = c.decode() if isinstance(c, bytes) else c
                if s.startswith("'") and s.endswith("'"):
                    s = s[1:-1]
                if s.startswith("/"):
                    s = s[1:]
                parts.append(s)
            cmd_str = " ".join(parts)
        else:
            cmd_str = command.decode() if isinstance(command, bytes) else command

        # Strip any remaining quotes and leading slashes
        cmd_str = cmd_str.replace("' /", " ").replace("'/", "").replace("'", "")
        if "JacobSeatlholo/starfm" in cmd_str and "/JacobSeatlholo" in cmd_str:
            cmd_str = cmd_str.replace("/JacobSeatlholo", "JacobSeatlholo")

        if protocol_version == 2:
            channel.setenv("GIT_PROTOCOL", "version=2")

        # IMPORTANT: no trailing newline
        channel.exec_command(cmd_str)

        return ParamikoWrapper(channel, client)


class ParamikoChannelStream:
    """File-like object wrapping a paramiko Channel for BufferedReader."""

    def __init__(self, channel):
        self.channel = channel
        self._buf = b""

    def read(self, size=-1):
        if size == -1:
            data = b""
            while True:
                chunk = self.channel.recv(65536)
                if not chunk:
                    break
                data += chunk
            return data
        while len(self._buf) < size:
            chunk = self.channel.recv(size - len(self._buf))
            if not chunk:
                break
            self._buf += chunk
        result, self._buf = self._buf[:size], self._buf[size:]
        return result

    def readable(self):
        return True

    def fileno(self):
        return self.channel.fileno()

    def close(self):
        self.channel.close()

    def flush(self):
        pass


class ParamikoWrapper(SubprocessWrapper):
    """File-like wrapper for paramiko SSH channel."""

    def __init__(self, channel, client):
        self.channel = channel
        self.client = client
        self._stream = ParamikoChannelStream(channel)
        self._closed = False
        self.read = self._stream.read

    def write(self, data):
        if isinstance(data, str):
            data = data.encode()
        self.channel.sendall(data)

    @property
    def stderr(self):
        return None

    def can_read(self):
        return self.channel.recv_ready()

    def close(self, timeout=None):
        if not self._closed:
            self._closed = True
            try:
                self.channel.close()
            except Exception:
                pass
            try:
                self.client.close()
            except Exception:
                pass


def main():
    # Override the default SSH vendor with our paramiko one
    import dulwich.client
    original_vendor = dulwich.client.get_ssh_vendor
    dulwich.client.get_ssh_vendor = ParamikoSSHVendor

    repo_path = "/home/z/my-project"
    remote = "git@github.com:JacobSeatlholo/starfm.git"
    refspec = "refs/heads/main"

    print(f"Pushing {refspec} to {remote}...")
    try:
        result = porcelain.push(
            repo=repo_path,
            remote_location=remote,
            refspecs=refspec,
            force=True,
            outstream=sys.stdout.buffer,
            errstream=sys.stderr.buffer,
        )
        print("\n✓ PUSH SUCCESSFUL!")
        print(f"Result: {result}")
        return 0
    except Exception as e:
        print(f"\n✗ Push failed: {e}")
        import traceback
        traceback.print_exc()
        return 1
    finally:
        dulwich.client.get_ssh_vendor = original_vendor


if __name__ == "__main__":
    sys.exit(main())
