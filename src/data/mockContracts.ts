import { PublicContract } from '@/types/contract';
import autocont from '@/data/autocont.md?raw';
import fakultniNemocnicePraha from '@/data/Fakultna nemocnice Praha.md?raw'



export const mockContracts: PublicContract[] = [
  {
  id: '00001079',
  title: 'Školní družina a školní klub ZŠ Hello, učebna informatiky, sanace spodní stavby',
  description: 'Výstavba a modernizace prostor pro školní družinu, učebnu informatiky a sanaci spodní stavby na ZŠ Hello Ostrava.',
  value: 49193496,
  valueCategory: 'high',
  deadline: '2025-12-31',
  contracting_authority: 'Gymnázium, základní škola a mateřská škola Hello s.r.o.',
  supplier: 'Stavos Stavba a.s.',
  supplierAnalysis: 'Stavos Stavba a.s. byla jediným účastníkem řízení. Nebyly podány žádosti o vysvětlení zadávací dokumentace.',
  sector: 'Stavebnictví',
  region: 'Moravskoslezský kraj',
  status: 'active',
  created_at: '2024-04-05',
  additional_info: 'Projekt financován z více zdrojů: IROP, Spravedlivá transformace a vlastní prostředky.',
  analysis: 'Zakázka byla shledána akceptovatelnou ve všech fázích kontroly. Kontroly CRR neodhalily závažná pochybení kromě problému s §83 ZZVZ.',
  findings: [
    {
      severity: 'vysoká',
      category: 'Diskriminace v kvalifikačních podmínkách',
      description: 'Zadavatel omezil možnost prokázání kvalifikace pouze na přímého účastníka, čímž porušil §83 ZZVZ.'
    }
  ],
  recommendations: [
    'V budoucích zakázkách umožnit prokazování kvalifikace i prostřednictvím jiných osob (§83 ZZVZ).',
    'Zvážit změnu systému fakturace na základě postupně provedených prací, aby se eliminovalo riziko diskriminace dodavatelů.'
  ]
}
];
