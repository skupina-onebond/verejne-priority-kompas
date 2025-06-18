import { PublicContract } from "@/types/contract";

export const mockContracts: PublicContract[] = [
  {
    id: '1',
    title: 'Modernizace IT infrastruktury nemocnice',
    description: 'Cílem zakázky je kompletní modernizace serverových systémů, datových úložišť a síťové infrastruktury krajské nemocnice. Součástí je i školení personálu a implementace zálohovacích řešení.',
    value: 2500000,
    valueCategory: 'medium',
    deadline: '2024-07-15',
    contracting_authority: 'Krajská nemocnice Praha',
    sector: 'ICT',
    region: 'Hlavní město Praha',
    riskScore: 82,
    status: 'active',
    additional_info: 'Projekt je součástí širší strategie digitalizace zdravotnictví v rámci regionálního operačního programu.',
    created_at: '2024-06-01',
    analysis: `Zadavatel má dlouhodobé zkušenosti s projekty z fondů EU. V minulosti úspěšně realizoval 5 projektů v oblasti zdravotnictví, včetně výstavby nových oddělení a IT modernizací. Nebyla zaznamenána žádná závažná pochybení. Riziko plynoucí z kapacity IT oddělení bylo v předchozích kontrolách označeno jako střední, zejména kvůli přetížení personálu a absenci některých interních směrnic.`,
    findings: [
  {
    severity: 'vysoká',
    category: 'Zvýhodňovanie konkrétneho dodávateľa',
    description: 'Technické specifikace v zadávací dokumentaci odkazovaly na konkrétní značku síťového vybavení bez možnosti ekvivalentu.'
  },
  {
    severity: 'střední',
    category: 'Nevhodné kvalifikační podmínky',
    description: 'Požadavek na zkušenost s projekty z EU fondů o minimální hodnotě 10 mil. Kč, což může omezit konkurenci.'
  },
  {
    severity: 'nízká',
    category: 'Nevhodné určení harmonogramu',
    description: 'Pevně stanovený termín dokončení bez ohledu na datum podpisu smlouvy.'
  }
]
  },
  {
    id: '2',
    title: 'Rekonstrukce základní školy',
    description: 'Předmětem zakázky je kompletní rekonstrukce budovy základní školy včetně zateplení, výměny oken a modernizace učeben s důrazem na energetickou úspornost a bezpečnost.',
    value: 750000,
    valueCategory: 'medium',
    deadline: '2024-08-20',
    contracting_authority: 'Město Brno',
    sector: 'Stavebnictví',
    region: 'Jihomoravský kraj',
    riskScore: 61,
    status: 'active',
    created_at: '2024-06-02',
    analysis: `Zadavatel je aktivní v oblasti investic do školských zařízení. Má zpracované interní metodiky pro zadávání veřejných zakázek. U předchozí zakázky v roce 2022 došlo k opožděnému ukončení výběrového řízení, což způsobilo prodlení ve financování. Riziko je nízké, doporučuje se však důsledné sledování harmonogramu a průběžná kontrola kvalifikace dodavatelů.`,
    findings: [
  {
    severity: 'střední',
    category: 'Nevhodné ekonomické podmínky (pojištění)',
    description: 'Požadavek na pojištění odpovědnosti za škodu ve výši 5 mil. Kč v nabídce bez alternativy.'
  },
  {
    severity: 'nízká',
    category: 'Formální chyby v zadávací dokumentaci',
    description: 'Nejasné formulace v zadání a chybějící definice hodnoticích kritérií.'
  }
]
  },
  {
    id: '3',
    title: 'Dodávka školních autobusů',
    description: 'Zakázka zahrnuje nákup pěti nových školních autobusů s ekologickým pohonem pro potřeby krajských škol včetně dodání, registrace a zaškolení obsluhy.',
    value: 450000,
    valueCategory: 'low',
    deadline: '2024-07-30',
    contracting_authority: 'Moravskoslezský kraj',
    sector: 'Doprava',
    region: 'Moravskoslezský kraj',
    riskScore: 18,
    status: 'active',
    created_at: '2024-06-03',
    analysis: `Zadavatel pravidelně realizuje dopravní zakázky financované z národních i evropských zdrojů. Poslední kontrola ze strany Centra pro regionální rozvoj v roce 2023 neodhalila žádné závažné pochybení v dokumentaci ani výběrovém řízení. Riziko je považováno za minimální.`,
    findings: [
  {
    severity: 'nízká',
    category: 'Nesprávné nakládání s technickou dokumentací',
    description: 'Chybějící elektronické podpisy u referencí a nedostatečné ověření technické kvalifikace.'
  }
]
  },
  {
    id: '4',
    title: 'Výstavba fotovoltaické elektrárny',
    description: 'Zakázka se týká návrhu, dodávky a výstavby fotovoltaické elektrárny v průmyslové zóně včetně připojení na síť, zajištění měření a implementace monitorovacího systému.',
    value: 8500000,
    valueCategory: 'high',
    deadline: '2024-09-15',
    contracting_authority: 'Město Ostrava',
    sector: 'Energetika',
    region: 'Moravskoslezský kraj',
    riskScore: 97,
    status: 'bookmarked',
    additional_info: 'Projekt je klíčovým prvkem energetické transformace regionu s podporou z Modernizačního fondu.',
    created_at: '2024-06-04',
    analysis: `Zadavatel byl v minulosti kontrolován v souvislosti s projektem Zelená energie 2021. Byla zjištěna pochybení v oblasti výběrového řízení a dokumentace nebyla vždy v souladu s požadavky dotačních programů. Doporučuje se zvýšená kontrola kvalifikace dodavatelů, transparentnosti hodnoticích kritérií a pravidelná auditní kontrola. Riziko označeno jako střední až vysoké.`,
    findings: [
  {
    severity: 'vysoká',
    category: 'Zvýhodňovanie konkrétneho dodávateľa',
    description: 'Specifikace solárních panelů směřovaly k jedinému výrobci bez zmínky o rovnocenné alternativě.'
  },
  {
    severity: 'vysoká',
    category: 'Nevhodné ekonomické podmínky (pojištění)',
    description: 'Požadavek na vysoké pojistné plnění bez možnosti doložení alternativním způsobem.'
  },
  {
    severity: 'střední',
    category: 'Nevhodné kvalifikační podmínky',
    description: 'Příliš specifické požadavky na reference pouze z oblasti energetiky.'
  }
]
  },
  {
    id: '5',
    title: 'Dodávka zdravotnických přístrojů',
    description: 'Nákup moderních diagnostických a laboratorních přístrojů pro interní oddělení polikliniky včetně instalace, kalibrace a školení personálu.',
    value: 1200000,
    valueCategory: 'medium',
    deadline: '2024-08-10',
    contracting_authority: 'Poliklinika Ústí nad Labem',
    sector: 'Zdravotnictví',
    region: 'Ústecký kraj',
    riskScore: 39,
    status: 'active',
    created_at: '2024-06-05',
    analysis: `Zadavatel realizoval menší zakázky převážně z vlastního rozpočtu. V oblasti dotačních titulů nemá prozatím rozsáhlejší zkušenosti. Doporučuje se prověřit kvalifikační předpoklady a schopnost správného vedení projektové dokumentace. Výběrová komise by měla být doplněna o odborného garanta.`,
    findings: [
  {
    severity: 'střední',
    category: 'Nevhodné určení harmonogramu',
    description: 'Stanovení termínu realizace bez ohledu na možné zdržení podpisu smlouvy.'
  },
  {
    severity: 'nízká',
    category: 'Náhrada nákladů účastníkům',
    description: 'Nejednoznačně uvedeno, že uchazeči nemají nárok na náhradu nákladů bez výhrady dle ZZVZ.'
  }
]
  },
  {
    id: '6',
    title: 'Čištění veřejných prostranství',
    description: 'Zakázka zahrnuje komplexní služby v oblasti úklidu, zametání, odvozu odpadu a údržby zelených ploch v centru města a přilehlých obytných zónách.',
    value: 320000,
    valueCategory: 'low',
    deadline: '2024-07-25',
    contracting_authority: 'Město České Budějovice',
    sector: 'Životní prostředí',
    region: 'Jihočeský kraj',
    riskScore: 46,
    status: 'hidden',
    created_at: '2024-06-06',
    analysis: `Zadavatel má dlouhodobé zkušenosti s údržbou veřejného prostoru. Jedná se o opakující se typ zakázky bez známých pochybení. Pravidelně dochází k vyhodnocování efektivity služeb. Riziko je minimální, ale doporučuje se průběžná kontrola dodržování frekvence a kvality úklidu.`,
    findings: [
  {
    severity: 'nízká',
    category: 'Použití značek v popise plnění',
    description: 'Použití konkrétní značky čistícího zařízení bez uvedení možnosti ekvivalentu.'
  },
  {
    severity: 'nízká',
    category: 'Nevhodné určení harmonogramu',
    description: 'Příliš krátká doba na realizaci úklidu vzhledem k rozsahu území.'
  }
]
  },
  {
    id: '7',
    title: 'Modernizace infrastruktury ZŠ Ruská a ZŠ PKH',
    description: 'Zakázka se týká dodávky vybavení a modernizace infrastruktury dvou základních škol v Litvínově – ZŠ Ruská a ZŠ PKH. Součástí jsou i multimediální pomůcky a další výuková technika.',
    value: 5300000,
    valueCategory: 'high',
    deadline: '2024-09-01',
    contracting_authority: 'Město Litvínov',
    sector: 'Vzdělávání',
    region: 'Ústecký kraj',
    riskScore: 89,
    status: 'active',
    created_at: '2024-06-08',
    analysis: `Zadavatel Město Litvínov opakovaně realizuje projekty financované z evropských fondů v oblasti školství a infrastruktury. V minulosti byl však opakovaně upozorněn na nedostatečné zajištění principu nediskriminace v zadávacích dokumentacích. Konkrétně se jednalo o případy, kdy technické specifikace byly příliš úzce zaměřené na jednoho dodavatele. Záznamy z kontrolních mechanismů (CRR) poukazují na nedostatečnou reakci na doporučení v průběhu projektu. Doporučuje se zvýšený dohled nad výběrovými řízeními a metodickým vedením pracovníků odboru investic.`,
    findings: [
        {
          severity: 'Vysoká',
          category: 'Nevhodné kvalifikační podmínky',
          description: "Požiadavka na živnosť 'projektová činnost ve výstavbě', ktorá nesúvisí s predmetom zákazky."
        },
        {
          severity: 'Vysoká',
          category: 'Nevhodné ekonomické podmínky (poistenie)',
          description: "Požiadavka na poistenie vo výške 10 mil. Kč už v ponuke, čo môže obmedziť menších dodávateľov."
        },
        {
          severity: 'Vysoká',
          category: 'Zvýhodňovanie konkrétneho dodávateľa',
          description: "Technické špecifikácie odkazovali na konkrétnu značku alebo výrobcu (HELAGO), čím došlo k obmedzeniu trhu."
        }
      ]
    },
  {
    id: '8',
    title: 'Rekonstrukce obecního domu – Želechovice nad Dřevnicí',
    description: 'Kompletní rekonstrukce obecního domu včetně střechy, oken, zateplení, přístupových cest a vybavení interiéru pro kulturní a komunitní účely.',
    value: 4900000,
    valueCategory: 'medium',
    deadline: '2024-10-10',
    contracting_authority: 'Obec Želechovice nad Dřevnicí',
    sector: 'Stavebnictví',
    region: 'Zlínský kraj',
    riskScore: 31,
    status: 'active',
    created_at: '2024-06-09',
    analysis: `Zadavatel Obec Želechovice nad Dřevnicí má zkušenosti s realizací menších infrastrukturních projektů s podporou z fondů IROP. V posledních letech nečelil žádným sankcím ani nálezům při kontrolách ze strany CRR. Dokumentace bývá zpracována ve spolupráci s externím poradcem, což přispívá k formální bezchybnosti. Obec je považována za spolehlivého příjemce dotací s důrazem na transparentní postupy. Riziko pochybení je nízké.`,
    findings: [
      {
        severity: 'Nízká',
        category: 'Chybný procesní postup zadavatele',
        description: "Nesprávny spôsob overenia skutočného majiteľa, podmienky viazané na registr, zverejňovanie termínov mimo poradia."
      },
      {
        severity: 'Nízká',
        category: 'Formálne chyby v zadávacej dokumentácii',
        description: "Nejednoznačné alebo chybné formulácie v zadávacej dokumentácii, požiadavka na úradný preklad, netransparentné kritériá."
      }
    ]
  } 
];
