import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { FinancialConvoLogo } from './FinancialConvoLogo';

const NAV_LINKS = [
  { href: '#overview', label: 'Overview' },
  { href: '#phase-1', label: 'Sensitization' },
  { href: '#phase-2', label: 'Hub Week' },
  { href: '#timeline', label: 'Timeline' },
  { href: '#register', label: 'Register' },
];

export const NavHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full border-b border-[#E4DAC4] bg-[#FBF8F2]/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
        <a href="#overview" className="flex items-center gap-3">
          <FinancialConvoLogo size="sm" variant="horizontal" showTagline={false} />
        </a>

        <nav className="hidden lg:flex items-center gap-9 text-sm text-[#6B6558]">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-[#221F1A] transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#register"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-full bg-[#221F1A] hover:bg-[#3a352c] text-[#FBF8F2] text-sm font-medium transition-colors"
          >
            Join the list
          </a>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-lg border border-[#E4DAC4] text-[#221F1A]"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="lg:hidden border-t border-[#E4DAC4] bg-[#FBF8F2] px-5 py-4 flex flex-col gap-4 text-sm text-[#6B6558]">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="hover:text-[#221F1A] transition-colors">
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};
