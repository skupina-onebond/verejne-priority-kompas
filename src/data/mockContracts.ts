import { PublicContract } from '@/types/contract';
import StavosStavba from '@/data/Stavos-Stavba.md?raw';
import OhlaZS from '@/data/Ohla-ZS.md?raw';
import ZSHello from '@/data/ZS-Hello.md?raw';


export const mockContracts: PublicContract[] = [
  {
  id: '00001079',
  title: 'Školní družina a školní klub ZŠ Hello, učebna informatiky, sanace spodní stavby',
  description: 'Veřejná zakázka zahrnuje výstavbu a modernizaci prostor základní školy Hello v Ostravě. Součástí plnění je novostavba prostor pro školní družinu a dětský klub (část A), dodávka vybavení učebny informatiky (část B) a sanace spodní stavby budovy (část C). Zadávací řízení probíhalo od dubna 2023, smlouva byla uzavřena se společností Stavos Stavba a.s., která byla jediným účastníkem soutěže. Projekt je spolufinancován z IROP, Mechanismu spravedlivé transformace a z vlastních zdrojů.',
  value: 49193496,
  valueCategory: 'high',
  deadline: '2025-12-31',
  contracting_authority: 'Gymnázium, základní škola a mateřská škola Hello s.r.o.',
  administrator: 'RECTE.CZ, s.r.o.',
  administratorAnalysis: 'Administrátorem veřejné zakázky byla společnost **RECTE.CZ, s.r.o.**, zastoupená Janou Kobělušovou. Firma má sídlo na adrese Nádražní 612/36, Ostrava – Moravská Ostrava (IČO 61972690). Společnost zajišťovala kompletní administraci zadávacího řízení pro zadavatele Gymnázium, základní škola a mateřská škola Hello s.r.o. V průběhu soutěže nebyly podány žádosti o vysvětlení zadávací dokumentace, řízení proběhlo s jediným účastníkem. Podle stanovisek CRR nebyla zjištěna formální pochybení v rámci přípravy a průběhu zadávacího řízení, přičemž komunikace s administrátorem nebyla předmětem samostatného zkoumání. Ve fázi kontroly byla zodpovědnost za kvalifikační omezení připsána zadavateli.',
  supplier: 'Stavos Stavba a.s.',
  supplierAnalysis: StavosStavba,
  sector: 'Stavebnictví',
  region: 'Moravskoslezský kraj',
  status: 'active',
  created_at: '2024-04-05',
  additional_info: 'Zakázka byla podrobena třem kolům kontroly ze strany CRR. Závěrečné stanovisko s analýzou je uvedeno v dokumentu „Stanovisko VZ 1079 1.–3. fáze vč. popisu skutkových zjištění.docx“.',
  analysis: ZSHello,
  findings: [
    {
      severity: 'vysoká',
      category: 'A.1. Diskriminace v kvalifikačních podmínkách',
      description: 'Zadavatel omezil možnost prokázání technické kvalifikace prostřednictvím jiných osob, čímž porušil § 83 odst. 1 a § 6 odst. 2 ZZVZ. (Zdroj: Stanovisko CRR, str. 3–4)'
    }
  ],
  recommendations: [
    'V budoucích zakázkách umožnit prokazování kvalifikace i prostřednictvím jiných osob (§83 ZZVZ).',
    'Zvážit změnu systému fakturace na základě postupně provedených prací, aby se eliminovalo riziko diskriminace dodavatelů.'
  ]
},
  {
    id: '00006628',
    title: 'Modernizace a přístavba Základní školy Brno, Antonínská',
    description:
      'Předmětem veřejné zakázky byla modernizace a přístavba budovy základní školy v Brně, Antonínská 3. Zakázka probíhala jako nadlimitní řízení financované z IROP a rozpočtu statutárního města Brna. Součástí plnění byla stavební realizace, vybavení i služby BOZP. Zadávací dokumentace byla zpracována s podporou externího administrátora. Vybraným dodavatelem se stala společnost OHLA ŽS, a.s.',
    value: 101316205,
    valueCategory: 'high',
    deadline: '2023-09-30',
    contracting_authority: 'Statutární město Brno – městská část Brno-střed',
    administrator: 'CENTRAL EUROPE FINANCE s.r.o.',
    administratorAnalysis:
      'Administrátorem veřejné zakázky byla společnost **CENTRAL EUROPE FINANCE s.r.o.** (IČO: 25857186). Firma zajišťovala kompletní administraci zadávacího řízení. Podle stanovisek CRR byla část odpovědnosti za pochybení připsána právě administrátorovi, zejména při nastavení nesprávných kvalifikačních podmínek a při nejasné struktuře smluvních cen. Společnost má zkušenosti s veřejnými zakázkami, ale ve fázi kontroly byly zjištěny chyby, které mohou být částečně způsobeny nedostatečnou supervizí při přípravě zadání.',
    supplier: 'OHLA ŽS, a.s.',
    supplierAnalysis: OhlaZS,
    sector: 'Stavebnictví',
    region: 'Jihomoravský kraj',
    status: 'active',
    created_at: '2023-02-15',
    additional_info:
      'Kontrola probíhala ve více fázích, přičemž v 6. fázi byla uložena finanční oprava ve výši 5 % z části rozpočtu projektu. K pochybení došlo při stanovení kvalifikačních požadavků a ocenění víceprací.',
    analysis:
      'Veřejná zakázka „Modernizace a přístavba ZŠ Brno, Antonínská“ byla kontrolována v rámci 6. fáze kontrol CRR. Podle dokumentu „Stanovisko 6. fáze VZ6628“ došlo k porušení §36 odst. 3 ZZVZ při formulaci technických kvalifikačních podmínek. Byly zjištěny i nesrovnalosti ve finančním ocenění víceprací (navýšení bez řádné kontroly přiměřenosti ceny). Z tohoto důvodu byla zadavateli uložena finanční oprava. Administrátor i zadavatel byli upozorněni na nedostatky v řízení a dokumentaci.',
    findings: [
      {
        severity: 'vysoká',
        category: 'A.1. Nejasně formulované kvalifikační požadavky',
        description:
          'Kvalifikační podmínky nebyly nastaveny transparentně, nebyla uvedena možnost využití subdodavatelů ani forma prokazování odborné způsobilosti dle §36 odst. 3 ZZVZ. (Zdroj: Stanovisko CRR, str. 4–5)',
      },
      {
        severity: 'střední',
        category: 'A.2. Neodůvodněné navýšení ceny víceprací',
        description:
          'Zadavatel přijal vícepráce ve výši 11 642 Kč bez přiměřeného zdůvodnění a bez kontroly jednotkových cen dle rozpočtu. (Zdroj: KL fáze D3, str. 2–3)',
      }
    ],
    recommendations: [
      'Zajistit jasné vymezení kvalifikačních požadavků v souladu s §36 ZZVZ.',
      'V případech víceprací vždy kontrolovat přiměřenost jednotkových cen vůči původnímu rozpočtu.',
      'Zvážit zajištění právní supervize při tvorbě zadávací dokumentace.'
    ]
  },
  {
  id: '0000421',
  title: 'Křižovatka ul. Mostní - ul. Březnická, Zlín',
  description:
    'Předmětem veřejné zakázky bylo provedení stavebních úprav na křížení ulic Mostní a Březnická ve Zlíně. Součástí plnění byla výstavba nové průsečné křižovatky řízené světelnou signalizací, obnova a doplnění chodníků a stezek, zřízení nových zastávkových zálivů a následná péče o výsadbu po dobu 5 let. Projekt byl spolufinancován z IROP a realizován formou společného zadávání města Zlín a Ředitelství silnic Zlínského kraje.',
  value: 79013029,
  valueCategory: 'high',
  deadline: '2023-12-31',
  contracting_authority: 'Statutární město Zlín',
  administrator: 'Magistrát města Zlína – odbor právní, oddělení veřejných zakázek',
  administratorAnalysis:
    'Zadávací řízení administroval přímo odbor právní Magistrátu města Zlína, konkrétně Mgr. Valerie Lukášová. V rámci kontroly projektu byla zadavateli uložena finanční oprava ve výši 5 % kvůli nepřiměřeným požadavkům na technickou kvalifikaci.',
  supplier: 'EUROVIA CS, a.s. + SMO a.s.',
  supplierAnalysis:
    'Zakázku realizovalo sdružení EUROVIA CS, a.s. a SMO a.s. jakožto vítěz konsorcia. Veřejné zdroje neuvádí pochybení na straně dodavatele, předmětem finanční opravy byly výlučně zadávací podmínky.',
  sector: 'Stavebnictví',
  region: 'Zlínský kraj',
  status: 'active',
  created_at: '2023-01-03',
  additional_info:
    'Projekt byl kontrolován Centrem pro regionální rozvoj. V rámci kontroly byla stanovena nevyplacená podpora ve výši 1 275 000 Kč kvůli nepřiměřeným kvalifikačním požadavkům na referenční stavby.',
  analysis:
    'Zakázka byla spolufinancována z IROP a zadávána podle § 3 písm. b) ZZVZ v otevřeném podlimitním řízení. Zadavatel požadoval zkušenost s výstavbou průsečných křižovatek, přičemž nebyla doložena přímá věcná souvislost těchto požadavků s technickou náročností stavby. Tento požadavek byl vyhodnocen jako nepřiměřený a diskriminační. Výsledkem je uplatněná finanční oprava ve výši 5 % poskytnuté podpory.',
  findings: [
    {
      severity: 'vysoká',
      category: 'A.1. Nepřiměřené kvalifikační podmínky',
      description:
        'Zadavatel požadoval tři reference na výstavbu průsečné křižovatky, aniž by prokázal, že takové technické omezení bylo nezbytné. Porušení § 6 odst. 1 a 2, § 36 odst. 1 a § 73 odst. 6 písm. b) ZZVZ (Zdroj: Informace o nevyplacení části dotace, CRR).',
    }
  ],
  recommendations: [
    'Při nastavování kvalifikačních požadavků vždy posoudit jejich přiměřenost vůči předmětu plnění.',
    'Vyvarovat se formulací, které zužují trh bez přímé vazby na technickou nebo organizační náročnost zakázky.',
    'V případě potřeby ověřit relevantnost kvalifikačních kritérií se specializovaným právním poradcem.'
  ]
}

];
