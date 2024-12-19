'use client';

import Link from 'next/link';

const footerLinks = [
  {
    title: 'Resources',
    items: [
      { title: 'Documentation', href: '/docs' },
      { title: 'Support', href: '/support' },
    ],
  },
  {
    title: 'Company',
    items: [
      { title: 'About', href: '/about' },
      { title: 'Contact', href: '/contact' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-white">{section.title}</h3>
              <ul className="mt-4 space-y-2">
                {section.items.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 border-t border-slate-800 pt-4">
          <p className="text-center text-sm text-slate-400">
            © {new Date().getFullYear()} OpsMastery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
