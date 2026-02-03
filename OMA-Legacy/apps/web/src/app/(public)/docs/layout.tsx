import { DocsSidebar } from '@/components/docs/DocsSidebar';
import { DocsSearch } from '@/components/docs/DocsSearch';
import { OnPageNavigation } from '@/components/docs/OnPageNavigation';
import strings from '@/constants/text.json';

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 pt-32 pb-20 px-4 md:px-8">
      <DocsSidebar />

      <main className="relative flex flex-col gap-6">
        <div className="flex w-full flex-col md:flex-row md:items-center justify-between border-b border-border/60 pb-4 gap-4">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <span className="opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
              {strings.docs.layout.breadcrumb_app}
            </span>
            <span className="opacity-30">/</span>
            <span className="text-primary">{strings.docs.layout.breadcrumb_section}</span>
          </div>
          <div className="w-full md:max-w-[300px]">
            <DocsSearch />
          </div>
        </div>

        <div className="xl:grid xl:grid-cols-[1fr_250px] gap-10">
          <div className="mx-auto w-full min-w-0">{children}</div>
          <OnPageNavigation />
        </div>
      </main>
    </div>
  );
}
