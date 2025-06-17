
import { PublicContract } from '@/types/contract';

export const mockContracts: PublicContract[] = [
  {
    id: '1',
    title: 'Modernizácia IT infrastruktúry nemocnice',
    description: 'Komplexná modernizácia IT systémov a sieťovej infrastruktúry v krajskej nemocnici. Projekt zahŕňa výmenu serverov, sieťových prvkov a implementáciu nového nemocničného informačného systému.',
    value: 2500000,
    valueCategory: 'medium',
    deadline: '2024-07-15',
    contracting_authority: 'Krajská nemocnica Bratislava',
    sector: 'ICT',
    region: 'Bratislavský kraj',
    barometer: 'high',
    status: 'active',
    additional_info: 'Projekt je súčasťou digitalizácie zdravotníctva v regióne.',
    created_at: '2024-06-01'
  },
  {
    id: '2',
    title: 'Rekonštrukcia základnej školy',
    description: 'Kompletná rekonštrukcia budovy základnej školy vrátane výmeny okien, zateplenia fasády a modernizácie učební. Projekt zahŕňa aj vybudovanie bezbariérových prístupov.',
    value: 750000,
    valueCategory: 'medium',
    deadline: '2024-08-20',
    contracting_authority: 'Mesto Trnava',
    sector: 'Stavebníctvo',
    region: 'Trnavský kraj',
    barometer: 'medium',
    status: 'active',
    created_at: '2024-06-02'
  },
  {
    id: '3',
    title: 'Dodávka školských autobusov',
    description: 'Nákup 5 nových školských autobusov pre zabezpečenie dopravy žiakov vo vidieckom regióne. Autobusy musia spĺňať najnovšie bezpečnostné a ekologické štandardy.',
    value: 450000,
    valueCategory: 'low',
    deadline: '2024-07-30',
    contracting_authority: 'Žilinský samosprávny kraj',
    sector: 'Doprava',
    region: 'Žilinský kraj',
    barometer: 'low',
    status: 'active',
    created_at: '2024-06-03'
  },
  {
    id: '4',
    title: 'Výstavba fotovoltaickej elektrárne',
    description: 'Návrh a výstavba fotovoltaickej elektrárne s výkonom 2 MW na území mesta. Projekt je súčasťou stratégie energetickej nezávislosti a znižovania uhlíkovej stopy.',
    value: 8500000,
    valueCategory: 'high',
    deadline: '2024-09-15',
    contracting_authority: 'Mesto Košice',
    sector: 'Energetika',
    region: 'Košický kraj',
    barometer: 'high',
    status: 'bookmarked',
    additional_info: 'Strategický projekt pre energetickú transformáciu regiónu.',
    created_at: '2024-06-04'
  },
  {
    id: '5',
    title: 'Dodávka zdravotníckych prístrojov',
    description: 'Nákup moderných diagnostických prístrojov pre polikliniku vrátane RTG zariadenia, ultrazvuku a laboratórnych analyzátorov.',
    value: 1200000,
    valueCategory: 'medium',
    deadline: '2024-08-10',
    contracting_authority: 'Poliklinika Prešov',
    sector: 'Zdravotníctvo',
    region: 'Prešovský kraj',
    barometer: 'medium',
    status: 'active',
    created_at: '2024-06-05'
  },
  {
    id: '6',
    title: 'Čistenie verejných priestranstv',
    description: 'Komplexné služby čistenia a údržby verejných priestranstiev, parkov a komunikácií v meste na obdobie 3 rokov.',
    value: 320000,
    valueCategory: 'low',
    deadline: '2024-07-25',
    contracting_authority: 'Mesto Nitra',
    sector: 'Životné prostredie',
    region: 'Nitriansky kraj',
    barometer: 'low',
    status: 'hidden',
    created_at: '2024-06-06'
  }
];
