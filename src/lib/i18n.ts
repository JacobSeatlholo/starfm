// Star FM i18n — English (EN), Setswana (TN), Sesotho (ST)
// North West Province is Setswana-dominant with significant Sesotho speakers.

export type Lang = "en" | "tn" | "st";

export const LANGS: { code: Lang; label: string; name: string }[] = [
  { code: "en", label: "EN", name: "English" },
  { code: "tn", label: "TN", name: "Setswana" },
  { code: "st", label: "ST", name: "Sesotho" },
];

export type Dict = Record<string, string>;

export const I18N: Record<Lang, Dict> = {
  en: {
    nav_home: "Home",
    nav_shows: "Shows",
    nav_schedule: "Schedule",
    nav_presenters: "Presenters",
    nav_news: "News",
    nav_digital: "Digital Literacy",
    nav_community: "Community",
    nav_partners: "Partners",
    nav_contact: "Contact",
    btn_tune_in: "Tune In Live",
    btn_mission: "Our Mission",
    btn_listen_app: "Get the App",
    hero_badge: "24/7 Live — Klerksdorp & North West Province",
    hero_h1a: "Brighter.",
    hero_h1b: "Smarter.",
    hero_h1c: "Community Radio.",
    hero_sub:
      'Star FM 102.9 — "For The Brighter Side Of You." Broadcasting empowerment, digital literacy, and African excellence across Klerksdorp, the City of Matlosana, and the Southern District of North West Province.',
    player_label: "Live Stream",
    on_air: "On Air",
    now_playing: "Now Playing",
    impact_label: "Why Star FM Matters",
    impact_title: "Reach. Impact. Change.",
    impact_body:
      "Community radio is one of the most powerful tools for social change in South Africa. Every broadcast is a bridge between people and possibility.",
    schedule_label: "Weekly Line-Up",
    schedule_title: "Seven Days of Community Radio.",
    schedule_body:
      "From morning drive to weekend wind-down — your full weekly schedule on Star FM 102.9. Tap any day to see what's on air.",
    presenters_label: "Meet the Team",
    presenters_title: "Voices of the Community.",
    presenters_body:
      "The people behind the microphone — presenters, producers, and community voices who make Star FM 102.9 the heartbeat of Klerksdorp.",
    shows_label: "Programming",
    shows_title: "Shows That Move People.",
    shows_body:
      "Six daily shows designed to inform, empower, and entertain — from morning news to late-night AfroBeats.",
    digital_label: "Digital Literacy Initiative",
    digital_title: "We Teach the Tools of Tomorrow.",
    digital_body:
      "Star FM doesn't just broadcast — we educate. Dedicated programming, workshops, and on-air demonstrations bring AI awareness and digital skills to every listener in Klerksdorp and the Southern District.",
    news_label: "Latest News",
    news_title: "Stories From the Southern District.",
    news_body:
      "Local news, community announcements, and stories that matter to Klerksdorp, Matlosana, and North West Province.",
    podcasts_label: "Catch Up",
    podcasts_title: "Missed a Show? Press Play.",
    podcasts_body:
      "Full episodes of your favourite Star FM shows — available on demand, anytime, anywhere.",
    community_label: "The Mission",
    community_title: "Built For The Community.",
    community_body:
      "Star FM 102.9 is not a corporate station. We are owned by, built for, and powered by the community of Klerksdorp and the Southern District. Every broadcast is an act of empowerment.",
    competitions_label: "Win With Star FM",
    competitions_title: "Competitions & Community Giveaways.",
    competitions_body:
      "Bursaries, business boosts, and chances to get on air. Enter our open competitions and win with Star FM 102.9.",
    funder_eye: "// For Funders & Partners",
    funder_title: "Invest in the Voice of the Community.",
    funder_body:
      "Community radio reaches the people mainstream media ignores. Star FM 102.9 is building new digital infrastructure for Klerksdorp and North West Province — and we're looking for forward-thinking funders ready to make a measurable social impact.",
    funder_btn1: "Request Investment Brief",
    funder_btn2: "Become a Sponsor",
    contact_label: "Get Involved",
    contact_title: "Let's Build Together.",
    contact_body:
      "Whether you're a listener, local business, community organisation, or funder — there's a place for you in the Star FM 102.9 ecosystem.",
    ci_loc: "Location",
    ci_stream: "Live Stream",
    ci_email: "Email",
    ci_freq: "Frequency",
    wa_title: "Chat on WhatsApp",
    wa_sub: "Send us a message directly",
    f_name: "Full Name",
    f_name_ph: "Your name",
    f_email: "Email Address",
    f_email_ph: "you@example.com",
    f_type: "I am reaching out as a",
    f_msg: "Message",
    f_msg_ph: "Tell us how you'd like to connect with Star FM...",
    f_send: "Send Message",
    coverage_label: "Coverage Area",
    coverage_title: "Where to Tune In.",
    coverage_body:
      "Star FM 102.9 MHz broadcasts across Klerksdorp and the surrounding towns of the City of Matlosana and Dr Kenneth Kaunda District.",
  },
  tn: {
    nav_home: "Tlhaga",
    nav_shows: "Mananeo",
    nav_schedule: "Palo ya Beke",
    nav_presenters: "Baithaopi",
    nav_news: "Dikgang",
    nav_digital: "Botlhale jwa Di-electronic",
    nav_community: "Setšhaba",
    nav_partners: "Bašireletsi",
    nav_contact: "Ikgolaganye",
    btn_tune_in: "Reetsa E Tshela",
    btn_mission: "Maikaelelo a Rena",
    btn_listen_app: "Ngwaga ya App",
    hero_badge: "24/7 E Tshela — Klerksdorp & North West Province",
    hero_h1a: "Yo o Phatsimang.",
    hero_h1b: "Yo o Botlhale.",
    hero_h1c: "Sefapa sa Setšhaba.",
    hero_sub:
      'Star FM 102.9 — "Karolo e Phatsimang ya Wena." Go tlhagisa kgakololo, botlhale jwa di-electronic, le botho jwa Aforika go ralala le Klerksdorp, Toropo ya Matlosana, le Kgaolo ya Borwa jwa North West Province.',
    player_label: "E Tshela Jaanong",
    on_air: "E Tshela",
    now_playing: "E Bapala Jaanong",
    impact_label: "Ke Eng e Star FM e Botlhokwa",
    impact_title: "Atlega. Ama. Fetola.",
    impact_body:
      "Sefapa sa setšhaba ke sedirisiwa se se maatla thata sa phetogo ya loago kwa Aforika Borwa. Poro e nngwe le e nngwe ke khwelo fa gare ga batho le tsholofelo.",
    schedule_label: "Palo ya Beke",
    schedule_title: "Malatsi a Supa a Sefapa sa Setšhaba.",
    schedule_body:
      "Go tloga ka poro ya motshegare go ya kwa wa phakela la bofelo — palelo ya gago e feletseng ya beke kwa Star FM 102.9.",
    presenters_label: "Kopana le Setlhopha",
    presenters_title: "Dipuo tsa Setšhaba.",
    presenters_body:
      "Batho ba ba leng kwa morago ga sefapa — baithaopi, babopi, le dipuo tsa setšhaba tse di dirang Star FM 102.9 e nne pelo ya Klerksdorp.",
    shows_label: "Mananeo",
    shows_title: "Mananeo a a Sutang Batho.",
    shows_body:
      "Mananeo a mataro a letsatsi a a dirilweng go tlamela ka tshedimosetso, kgakololo le boitumelo — go tloga ka dikgang tsa phakela go ya kwa mminong wa bofelo.",
    digital_label: "Tiro ya Botlhale jwa Di-electronic",
    digital_title: "Re Rutisa Didirisiwa tsa Mašelaelwana.",
    digital_body:
      "Star FM ga se fela go tlhagisa — re ruta. Mananeo a a tlhagisitsweng, dithuto tsa go dira, le dipontsho di dira gore botlhale jwa AI le bokgoni jwa di-electronic di fitlhe kwa go yo o mongwe le yo o mongwe kwa Klerksdorp.",
    news_label: "Dikgang tsa Bosheng",
    news_title: "Dikgang go Tswa kwa Kgaolong ya Borwa.",
    news_body:
      "Dikgang tsa selegae, ditsebi tsa setšhaba, le dikgang tse di amang Klerksdorp, Matlosana, le North West Province.",
    podcasts_label: "Tshwara",
    podcasts_title: "O Lebilwe Mananeo? Tlhoma Tlhasedi.",
    podcasts_body:
      "Dielkanyo tse di feletseng tsa mananeo a a ratwang thata — di teng fa o batla nako efe kapa efe.",
    community_label: "Maikaelelo",
    community_title: "E Agilweng ka Setšhaba.",
    community_body:
      "Star FM 102.9 ga se seteishene sa khewepe. E ruelo, e agilwe ka, e e dirwang ka setšhaba sa Klerksdorp le Kgaolo ya Borwa.",
    competitions_label: "Phatha le Star FM",
    competitions_title: "Dipelotharo le Dithuso tsa Setšhaba.",
    competitions_body:
      "Dithuso tsa madi, ditlhošo tsa kgwebo, le tshono ya go tshameka kwa sefapeng. Tsena ka dipelotharo tsa rona tse di bulegileng.",
    funder_eye: "// Go Bašireletsi le Bašireletsi",
    funder_title: "Tsenyetsa Puo ya Setšhaba.",
    funder_body:
      "Sefapa sa setšhaba si fitlha kwa go batho ba metswedi ya dikgang e kgolo di ba saeng. Star FM 102.9 e aga sešwa se se tseneletseng sa di-electronic sa Klerksdorp.",
    funder_btn1: "Kopa Tshedimosetso ya Tshebediso",
    funder_btn2: "Nna Mošireletsi",
    contact_label: "Nna Karolo",
    contact_title: "A re Ageng Smmoo.",
    contact_body:
      "Go se na phoso fa o le setho sa setšhaba, kgwebo ya selegae, mokgatho wa setšhaba, kapa mošireletsi — go na le lefelo la gago kwa Star FM 102.9.",
    ci_loc: "Lefelo",
    ci_stream: "E Tshela Jaanong",
    ci_email: "Email",
    ci_freq: "Phaposi",
    wa_title: "Bua ka WhatsApp",
    wa_sub: "Romela molaetsa ka tlhamalalo",
    f_name: "Leina ka Bophara",
    f_name_ph: "Leina la gago",
    f_email: "Aterese ya Email",
    f_email_ph: "wena@mohlala.com",
    f_type: "Ke ikgolaganya jaaka",
    f_msg: "Molaetsa",
    f_msg_ph: "Bolelela re ka fa o batlang go ikgolaganya ka teng le Star FM...",
    f_send: "Romela Molaetsa",
    coverage_label: "Lefelo la Go Reetsa",
    coverage_title: "Kae go Reetsa.",
    coverage_body:
      "Star FM 102.9 MHz e tlhagisa go ralala le Klerksdorp le metse e e mabapi ya Toropo ya Matlosana le Kgaolo ya Dr Kenneth Kaunda.",
  },
  st: {
    nav_home: "Hae",
    nav_shows: "Mananeo",
    nav_schedule: "Palo ya Beke",
    nav_presenters: "Baithuti",
    nav_news: "Ditaba",
    nav_digital: "Botjhaba ba Di-electronic",
    nav_community: "Setjhaba",
    nav_partners: "Basekisetši",
    nav_contact: "Ikgolaganye",
    btn_tune_in: "Mamela E Phelang",
    btn_mission: "Maikemisetso wa Rena",
    btn_listen_app: "Ngwathola ya App",
    hero_badge: "24/7 E Phelang — Klerksdorp & North West Province",
    hero_h1a: "Ya hlakanang.",
    hero_h1b: "Ya botjhaba.",
    hero_h1c: "Seea-moya sa Setjhaba.",
    hero_sub:
      'Star FM 102.9 — "Karolo e Hlakanang ya Wena." E phatlalatsa kgakololo, botjhaba ba di-electronic, le botho ba Aforika ho phaella Klerksdorp, Toropo ya Matlosana, le Kgaolo ya Borwa ya North West Province.',
    player_label: "E Phelang",
    on_air: "E Phelang",
    now_playing: "E Bapala Joale",
    impact_label: "Hobane Star FM e Bohlokwa",
    impact_title: "Fihla. Ama. Fetola.",
    impact_body:
      "Seea-moya sa setjhaba ke sedirisiwa se matla haholo sa phetoho ya sechaba Afrika Borwa. Pontšo e nngwe le e nngwe ke letšhutu gareng ga batho le tšhepo.",
    schedule_label: "Palo ya Beke",
    schedule_title: "Matsatsi a Supa a Seea-moya sa Setjhaba.",
    schedule_body:
      "Ho tloha ho pontšo ya hoseng ho ya ho wa bofelong wa phedising — palelo ya hao e feletseng ya beke ho Star FM 102.9.",
    presenters_label: "Kopana le Setlhopha",
    presenters_title: "Dipuo tsa Setjhaba.",
    presenters_body:
      "Batho ba dilemong ke ho morago ga seea-moya — baithuti, bahlangisi, le dipuo tsa setjhaba tse etsang hore Star FM 102.9 e be pelo ya Klerksdorp.",
    shows_label: "Mananeo",
    shows_title: "Mananeo a Futhumatsang Batho.",
    shows_body:
      "Mananeo a tsheletseng a letsatsi a a bopilweng ho fana ka tlhahiso, kgakololo le thabo — ho tloha ho ditaba tsa hoseng ho ya ho mmino wa bofelong.",
    digital_label: "Tiro ya Botjhaba ba Di-electronic",
    digital_title: "Re Rutisa Didirisiwa tsa Hosasa.",
    digital_body:
      "Star FM ha se feela ho phatlalatsa — re ruta. Mananeo a a tlhampilweng, dithuto tsa ho etsa, le dipontšo di etsa hore botjhaba ba AI le bokgoni ba di-electronic di fihle ho yo mongwe le yo mongwe Klerksdorp.",
    news_label: "Ditaba tsa Bosheng",
    news_title: "Ditaba ho Tswa Kgaolong ya Borwa.",
    news_body:
      "Ditaba tsa selegae, ditsebo tsa setjhaba, le ditaba tse ding hore Klerksdorp, Matlosana, le North West Province.",
    podcasts_label: "Tshwara",
    podcasts_title: "O Lebile Mananeo? Tlhoma Papadi.",
    podcasts_body:
      "Dikarolo tse feletseng tsa mananeo a a ratwang haholo — di teng ha o batla nako efe kapa efe.",
    community_label: "Maikemisetso",
    community_title: "E Aholweng ka Setjhaba.",
    community_body:
      "Star FM 102.9 ha se seteishene sa khoebo. E ruelo, e aholwe ka, e e dirwang ka setjhaba sa Klerksdorp le Kgaolo ya Borwa.",
    competitions_label: "Hapa le Star FM",
    competitions_title: "Diphapanyetsano le Dithuso tsa Setjhaba.",
    competitions_body:
      "Dithuso tsa chelete, dithuso tsa khoebo, le tšhono ya ho bapala seea-moyeng. Kena ka diphapanyetsano tsa rona tse bulegileng.",
    funder_eye: "// Ho Basekisetši le Basekisetši",
    funder_title: "Tsenya Puo ya Setjhaba.",
    funder_body:
      "Seea-moya sa setjhaba se fihla ho batho ba ditaba tse kgolo di ba saeng. Star FM 102.9 e aha secha se tseneletseng sa di-electronic sa Klerksdorp.",
    funder_btn1: "Kopa Tlhahiso ya Tšhebediso",
    funder_btn2: "E Nne Mošireletsi",
    contact_label: "Kenya Letšatši",
    contact_title: "A re Aheng Smmoo.",
    contact_body:
      "Ha ho na phoso haeba o setho sa setjhaba, khoebo ya selegae, mokgatlo wa setjhaba, kapa mošireletsi — ho na le lefelo la hao Star FM 102.9.",
    ci_loc: "Lefelo",
    ci_stream: "E Phelang",
    ci_email: "Email",
    ci_freq: "Phaposi",
    wa_title: "Bua ka WhatsApp",
    wa_sub: "Romela molaetsa ka tlhamalalo",
    f_name: "Leina ka Bophara",
    f_name_ph: "Leina la hao",
    f_email: "Aterese ya Email",
    f_email_ph: "wena@mohlala.com",
    f_type: "Ke ikgolaganya jaaka",
    f_msg: "Molaetsa",
    f_msg_ph: "Bolelle re kamoo o batlang ho ikgolaganya ka teng le Star FM...",
    f_send: "Romela Molaetsa",
    coverage_label: "Lefelo la ho Mamela",
    coverage_title: "Ho Mamela Kae.",
    coverage_body:
      "Star FM 102.9 MHz e phatlalatsa ho phaella Klerksdorp le metse e mabapi ya Toropo ya Matlosana le Kgaolo ya Dr Kenneth Kaunda.",
  },
};

export function t(lang: Lang, key: string): string {
  return I18N[lang]?.[key] ?? I18N.en[key] ?? key;
}
