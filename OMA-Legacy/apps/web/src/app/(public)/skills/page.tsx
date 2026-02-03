import { ListingDirectoryPage } from '@/components/marketplace/ListingDirectoryPage';
import strings from '@/constants/text.json';

export default function SkillsPage() {
  return (
    <ListingDirectoryPage
      title={strings.nav.skills}
      description={strings.nav.skills_desc}
      categories={[
        { id: 'skill', label: 'All Skills', description: 'Browse all available skills.' },
        { id: 'coding', label: 'Coding', description: 'Programming and development skills.' },
        { id: 'data', label: 'Data', description: 'Data processing and analysis skills.' },
        { id: 'productivity', label: 'Productivity', description: 'Skills to boost efficiency.' },
      ]}
      defaultCategory="skill"
    />
  );
}
