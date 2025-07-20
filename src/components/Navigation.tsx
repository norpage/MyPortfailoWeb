'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from './LocaleSwitcher';
import NavigationLink from './NavigationLink';
import ThemeToggle from './ThemeToggle';
import Link from "next/link";
import Image from "next/image";
import { FaChevronCircleUp } from "react-icons/fa";
import { BiMenuAltRight } from "react-icons/bi";
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation({ locale }: { locale: string }) {
    const t = useTranslations('Navigation');
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (pathname !== `/${locale}`) {
            window.scrollTo({ top: 660, behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [pathname, locale]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`inset-0 fixed h-[60px] top-0 z-50 transition-colors @apply rounded-[0_0_50px_50px] duration-300 ${
                isScrolled ? 'bg-[var(--header-bg)]' : 'bg-transparent'
            }`}
        >
            <nav
                className="w-full h-full flex text-nowrap justify-between sm:justify-evenly gap-6 items-center p-2 px-6"
            >
                <Link
                    href="/"
                    className={`font-sans text-[16px] font-bold ${
                        isScrolled ? 'text-white' : 'text-[var(--text-primary)]'
                    }`}
                >
                    {t('myName')}
                </Link>
                <div className="flex items-center space-x-2">
                    <div className="hidden lg:flex space-x-4 text-[15px] font-[100] mr-6 text-[var(--text-primary)]">
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

                    <div className="hidden sm:flex gap-1">
                        <Link
                            href={'https://www.syntaxacade.my/'}
                            target={'_blank'}
                            className="pr-3 items-center flex rounded-md bg-[var(--nav-bg)] text-[var(--header-text)] hover:bg-opacity-80 transition"
                        >
                            <Image
                                src={'/SyntaxLogoLight.png'}
                                alt={'Syntax Logo Light'}
                                width={500}
                                height={500}
                                className="object-contain w-10 h-auto rounded hidden dark:block"
                            />
                            <Image
                                src={'/SyntaxLogo.png'}
                                alt={'Syntax Logo'}
                                width={500}
                                height={500}
                                className="object-contain w-10 h-auto rounded block text-nowrap dark:hidden"
                            />
                            Syntax Academy
                        </Link>
                        <LocaleSwitcher />
                        <ThemeToggle />
                    </div>

                    {!isMenuOpen && <BiMenuAltRight
                        onClick={() => setIsMenuOpen(true)}
                        className="lg:hidden text-[28px] cursor-pointer text-[var(--text-primary)]"
                    />}
                </div>
            </nav>
            <div
                className={`fixed bottom-8 right-8 text-[40px] cursor-pointer transition-all duration-500 transform ${
                    isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                }`}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <FaChevronCircleUp />
            </div>
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <motion.div
                            className="absolute top-0 right-0 w-64 h-full bg-[var(--header-bg)]  shadow-lg p-6 space-y-4 text-[var(--text-primary)]"
                            initial={{ x: '100%', opacity: 0, scale: 0.95 }}
                            animate={{ x: 0, opacity: 1, scale: 1 }}
                            exit={{ x: '100%', opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="text-right w-full text-xl text-[var(--button-bg)] font-bold"
                            >
                                ✕
                            </button>

                            {/* Navigation Links */}
                            <div className="flex flex-col space-y-2">
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

                            {/* Extra section */}
                            <div className="flex flex-col sm:hidden gap-3 pt-6 border-t border-gray-300 dark:border-zinc-700">
                                <Link
                                    href={'https://www.syntaxacade.my/'}
                                    target={'_blank'}
                                    className="items-center flex rounded-md bg-[var(--nav-bg)] text-[var(--header-text)] hover:bg-opacity-80 transition px-3 py-2"
                                >
                                    <Image
                                        src={'/SyntaxLogoLight.png'}
                                        alt={'Syntax Logo Light'}
                                        width={500}
                                        height={500}
                                        className="object-contain w-8 h-auto rounded hidden dark:block"
                                    />
                                    <Image
                                        src={'/SyntaxLogo.png'}
                                        alt={'Syntax Logo'}
                                        width={500}
                                        height={500}
                                        className="object-contain w-8 h-auto rounded block dark:hidden"
                                    />
                                    <span className="ml-2">Syntax Academy</span>
                                </Link>

                                <div className="flex gap-2">
                                    <LocaleSwitcher />
                                    <ThemeToggle />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}