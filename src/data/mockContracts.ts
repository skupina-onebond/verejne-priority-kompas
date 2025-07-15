import { PublicContract } from '@/types/contract';
import StavosStavba from '@/data/Stavos-Stavba.md?raw';
import fakultniNemocnicePraha from '@/data/Fakultna nemocnice Praha.md?raw'



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
  supplier: 'Stavos Stavba a.s.',
  supplierAnalysis: StavosStavba,
  sector: 'Stavebnictví',
  region: 'Moravskoslezský kraj',
  status: 'active',
  created_at: '2024-04-05',
  additional_info: 'Zakázka byla podrobena třem kolům kontroly ze strany CRR. Závěrečné stanovisko s analýzou je uvedeno v dokumentu „Stanovisko VZ 1079 1.–3. fáze vč. popisu skutkových zjištění.docx“.',
  analysis: 'Zakázka probíhala mezi dubnem 2023 a březnem 2024 s podporou z fondů IROP a Mechanismu spravedlivé transformace. Podle dokumentu „Stanovisko VZ 1079 1.–3. fáze vč. popisu skutkových zjištění“ prošla třemi etapami kontroly ze strany CRR. Ve všech fázích byla zakázka shledána jako formálně akceptovatelná, avšak bylo identifikováno jedno závažné porušení zákona (§83 odst. 1 ZZVZ), týkající se omezení možnosti prokazování kvalifikace. Dále bylo CRR doporučeno zvážit úpravu systému fakturace, který může být pro některé dodavatele diskriminační.',
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
}
];
