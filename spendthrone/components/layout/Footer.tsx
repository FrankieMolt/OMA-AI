/**
 * Footer Component - Site footer
 */

import Link from 'next/link';
import { ShoppingBag, Twitter, Mail, Github, Heart, LucideIcon } from 'lucide-react';

interface FooterLink {
  href: string;
  label: string;
  icon?: LucideIcon;
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks: Record<string, FooterLink[]> = {
    Shop: [
      { href: '/', label: 'All Products' },
      { href: '/?sort=featured', label: 'Featured' },
      { href: '/?sort=newest', label: 'New Arrivals' },
      { href: '/?sort=price-low', label: 'Best Sellers' },
    ],
    Support: [
      { href: '/contact', label: 'Contact Us' },
      { href: '/about', label: 'About Us' },
      { href: '/faq', label: 'FAQ' },
      { href: '/shipping', label: 'Shipping' },
    ],
    Legal: [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
      { href: '/returns', label: 'Returns' },
      { href: '/accessibility', label: 'Accessibility' },
    ],
    Connect: [
      { href: 'https://twitter.com/spendthrone', label: 'Twitter', icon: Twitter },
      { href: 'mailto:hello@spendthrone.com', label: 'Email', icon: Mail },
      { href: 'https://github.com/frankiemolt/spendthrone', label: 'GitHub', icon: Github },
    ],
  };

  return (
    <footer className="border-t border-zinc-900 bg-zinc-950">
      {/* Newsletter */}
      <div className="border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Stay Weird, Stay Updated
              </h3>
              <p className="text-zinc-500">
                Get notified about the most bizarre new products before anyone else.
              </p>
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-zinc-900 border border-zinc-800 text-white rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <ShoppingBag className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-amber-400">
                SPENDTHRONE
              </span>
            </Link>
            <p className="text-zinc-500 text-sm mb-4 max-w-xs">
              The curated kingdom of the weirdest, most viral products on Earth. WTF-level technology for the modern age.
            </p>
            <p className="text-zinc-600 text-sm">
              Made with <Heart className="inline w-4 h-4 text-red-500 fill-current" aria-label="Love" /> by Nosyt LLC
            </p>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-white mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-zinc-500 hover:text-white transition-colors text-sm flex items-center gap-2"
                    >
                      {link.icon && <link.icon size={14} />}
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-sm">
            © {currentYear} SpendThrone. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-zinc-600">
            <span>Designed with 🧟‍♂️ by Frankie</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
