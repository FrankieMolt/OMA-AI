import Link from 'next/link';
import { SolanaLogo } from '@/components/ui/solana-logo';
import strings from '@/constants/text.json';

export function Footer() {
  return (
    <footer className="bg-background border-t border-border/60 pt-16 pb-10">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="size-8 relative flex items-center justify-center">
                <SolanaLogo className="h-6 w-8 opacity-80" />
              </div>
              <span className="font-bold text-xl tracking-tight text-foreground">{strings.common.app_name}</span>
            </Link>
            <p className="text-foreground/60 text-sm leading-relaxed">
              {strings.footer.tagline}
            </p>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4 text-sm tracking-wide">{strings.footer.product.title}</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  className="text-foreground/60 hover:text-primary text-sm transition-colors"
                  href="/marketplace"
                >
                  {strings.footer.product.marketplace}
                </Link>
              </li>
              <li>
                <Link
                  className="text-foreground/60 hover:text-primary text-sm transition-colors"
                  href="/framework"
                >
                  {strings.footer.product.framework}
                </Link>
              </li>
              <li>
                <Link
                  className="text-foreground/60 hover:text-primary text-sm transition-colors"
                  href="/agent"
                >
                  {strings.footer.product.console}
                </Link>
              </li>
              <li>
                <Link
                  className="text-foreground/60 hover:text-primary text-sm transition-colors"
                  href="/pricing"
                >
                  {strings.footer.product.pricing}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4 text-sm tracking-wide">{strings.footer.resources.title}</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  className="text-foreground/60 hover:text-primary text-sm transition-colors"
                  href="/docs"
                >
                  {strings.footer.resources.docs}
                </Link>
              </li>
              <li>
                <Link
                  className="text-foreground/60 hover:text-primary text-sm transition-colors"
                  href="/docs/api-reference"
                >
                  {strings.footer.resources.api}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-foreground font-semibold mb-4 text-sm tracking-wide">{strings.footer.company.title}</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  className="text-foreground/60 hover:text-primary text-sm transition-colors"
                  href="/about"
                >
                  {strings.footer.company.about}
                </Link>
              </li>
              <li>
                <Link
                  className="text-foreground/60 hover:text-primary text-sm transition-colors"
                  href="/blog"
                >
                  {strings.footer.company.blog}
                </Link>
              </li>
              <li>
                <Link
                  className="text-foreground/60 hover:text-primary text-sm transition-colors"
                  href="/help"
                >
                  {strings.footer.company.contact}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-foreground/50 text-xs">
            {strings.footer.copyright.replace('{year}', new Date().getFullYear().toString())}
          </p>
          <div className="flex gap-6">
            <Link
              className="text-foreground/50 hover:text-foreground/70 text-xs transition-colors"
              href="/privacy"
            >
              {strings.footer.legal.privacy}
            </Link>
            <Link
              className="text-foreground/50 hover:text-foreground/70 text-xs transition-colors"
              href="/terms"
            >
              {strings.footer.legal.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
