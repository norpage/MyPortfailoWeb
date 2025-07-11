'use client';

import React, {useEffect, useState} from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from './LocaleSwitcher';
import NavigationLink from './NavigationLink';
import ThemeToggle from './ThemeToggle';
import Link from "next/link";
import Image from "next/image";
import {FaChevronCircleUp} from "react-icons/fa";

export default function Navigation({ locale }: { locale: string }) {

  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);


  useEffect(() => {
    if (pathname !== `/${locale}`) {
      window.scrollTo({ top: 660, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, locale]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0); // եթե scroll կա, դարձնում ենք true
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
      <header
          className={`inset-0 fixed h-[60px] top-0 z-50 transition-colors  @apply rounded-[0_0_50px_50px] duration-300 ${
              isScrolled ? 'bg-[var(--header-bg)]' : 'bg-transparent'
          }`}
      >
        <nav className="w-full h-full flex justify-evenly gap-6 items-center p-2 ">
          <Link href="/" className={`font-sans text-[16px] font-bold  ${
            isScrolled ? 'text-white' : 'text-[var(--text-primary)]'
          }`}>
            {t('myName')}
          </Link>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-4 text-[15px] font-[100] mr-6 text-[var(--text-primary)]">
              <NavigationLink href="/" className="hover:text-[var(--button-bg)]">
                {t('home')}
              </NavigationLink>
              <NavigationLink href="/about" className="hover:text-[var(--button-bg)]">
                {t('about')}
              </NavigationLink>
              <NavigationLink href="/projects" className="hover:text-[var(--button-bg)]">
                {t('projects')}
              </NavigationLink>
              <NavigationLink href="/contacts" className="hover:text-[var(--button-bg)]">
                {t('contacts')}
              </NavigationLink>
            </div>
            <Link
                href={'https://www.syntaxacade.my/'}
                target={'_blank'}
                className="pr-3 items-center flex rounded-md bg-[var(--nav-bg)] text-[var(--header-text)] hover:bg-opacity-80 transition"
            >
              {/* Ցուցադրում ենք միայն dark mode-ում */}
              <Image
                  src={'/SyntaxLogoLight.png'}
                  alt={'Syntax Logo Light'}
                  width={500}
                  height={500}
                  className="object-contain w-10 h-auto rounded hidden dark:block"
              />

              {/* Ցուցադրում ենք միայն light mode-ում */}
              <Image
                  src={'/SyntaxLogo.png'}
                  alt={'Syntax Logo'}
                  width={500}
                  height={500}
                  className="object-contain w-10 h-auto rounded block text-nowrap dark:hidden"
              />

              Syntax Academy
            </Link>

            <LocaleSwitcher/>
            <ThemeToggle/>

          </div>
        </nav>
        <div
            className={`fixed bottom-8 right-8 text-[40px] cursor-pointer transition-all  duration-500 transform ${
                isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
            }`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <FaChevronCircleUp />
        </div>
      </header>
  );
}
