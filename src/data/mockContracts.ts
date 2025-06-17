
import { PublicContract } from '@/types/contract';

export const mockContracts: PublicContract[] = [
  {
    id: '1',
    title: 'Modernizace IT infrastruktury nemocnice',
    description: 'Komplexní modernizace IT systémů a síťové infrastruktury v krajské nemocnici. Projekt zahrnuje výměnu serverů, síťových prvků a implementaci nového nemocničního informačního systému.',
    value: 2500000,
    valueCategory: 'medium',
    deadline: '2024-07-15',
    contracting_authority: 'Krajská nemocnice Praha',
    sector: 'ICT',
    region: 'Hlavní město Praha',
    barometer: 'high',
    status: 'active',
    additional_info: 'Projekt je součástí digitalizace zdravotnictví v regionu.',
    created_at: '2024-06-01'
  },
  {
    id: '2',
    title: 'Rekonstrukce základní školy',
    description: 'Kompletní rekonstrukce budovy základní školy včetně výměny oken, zateplení fasády a modernizace učeben. Projekt zahrnuje také vybudování bezbariérových přístupů.',
    value: 750000,
    valueCategory: 'medium',
    deadline: '2024-08-20',
    contracting_authority: 'Město Brno',
    sector: 'Stavebnictví',
    region: 'Jihomoravský kraj',
    barometer: 'medium',
    status: 'active',
    created_at: '2024-06-02'
  },
  {
    id: '3',
    title: 'Dodávka školních autobusů',
    description: 'Nákup 5 nových školních autobusů pro zajištění dopravy žáků ve venkovském regionu. Autobusy musí splňovat nejnovější bezpečnostní a ekologické standardy.',
    value: 450000,
    valueCategory: 'low',
    deadline: '2024-07-30',
    contracting_authority: 'Moravskoslezský kraj',
    sector: 'Doprava',
    region: 'Moravskoslezský kraj',
    barometer: 'low',
    status: 'active',
    created_at: '2024-06-03'
  },
  {
    id: '4',
    title: 'Výstavba fotovoltaické elektrárny',
    description: 'Návrh a výstavba fotovoltaické elektrárny s výkonem 2 MW na území města. Projekt je součástí strategie energetické nezávislosti a snižování uhlíkové stopy.',
    value: 8500000,
    valueCategory: 'high',
    deadline: '2024-09-15',
    contracting_authority: 'Město Ostrava',
    sector: 'Energetika',
    region: 'Moravskoslezský kraj',
    barometer: 'high',
    status: 'bookmarked',
    additional_info: 'Strategický projekt pro energetickou transformaci regionu.',
    created_at: '2024-06-04'
  },
  {
    id: '5',
    title: 'Dodávka zdravotnických přístrojů',
    description: 'Nákup moderních diagnostických přístrojů pro polikliniku včetně RTG zařízení, ultrazvuku a laboratorních analyzátorů.',
    value: 1200000,
    valueCategory: 'medium',
    deadline: '2024-08-10',
    contracting_authority: 'Poliklinika Ústí nad Labem',
    sector: 'Zdravotnictví',
    region: 'Ústecký kraj',
    barometer: 'medium',
    status: 'active',
    created_at: '2024-06-05'
  },
  {
    id: '6',
    title: 'Čištění veřejných prostranství',
    description: 'Komplexní služby čištění a údržby veřejných prostranství, parků a komunikací ve městě na období 3 let.',
    value: 320000,
    valueCategory: 'low',
    deadline: '2024-07-25',
    contracting_authority: 'Město České Budějovice',
    sector: 'Životní prostředí',
    region: 'Jihočeský kraj',
    barometer: 'low',
    status: 'hidden',
    created_at: '2024-06-06'
  }
];
