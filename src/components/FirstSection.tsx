'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, Variants } from 'framer-motion'; // Import Variants type
import NavigationLink from '@/components/NavigationLink';
import { TechnologiesLine } from '@/components/TechnologiesLine';
import Link from "next/link";

const FirstSection = () => {
    const t = useTranslations('FirstSection');
    const imageRef = useRef<HTMLImageElement | null>(null);
    const backgroundRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 10;
            const y = (e.clientY / window.innerHeight - 0.5) * 10;

            if (imageRef.current) {
                imageRef.current.style.transform = `translate(${x}px, ${y}px)`;
            }

            if (backgroundRef.current) {
                backgroundRef.current.style.transform = `translate(${-x / 2}px, ${-y / 2}px)`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Define variants with proper typing
    const leftVariants: Variants = {
        hidden: { x: -100, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 1.0, ease: 'easeOut' } }, // Use string literal 'easeOut'
    };

    const rightVariants: Variants = {
        hidden: { x: 100, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 1.0, ease: 'easeOut' } },
    };

    return (
        <section
            className="relative text-[var(--text-primary)] !pt-[100px] top-0 bg-gradient-to-r from-[var(--gradient-from)] via-[var(--gradient-via)] transition-colors duration-300 overflow-hidden"
        >
            <div className="mx-auto relative">
                <div className="flex flex-col min-[900px]:flex-row items-center justify-around">
                    {/* LEFT SIDE */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={leftVariants}
                        className="text-left min-[900px]:pl-10 mb-8 relative z-[11]"
                    >
                        <h1 className="font-bold text-xl mb-2">
                            {t('hello')} <span className="text-[var(--gradient-via-line)] text-[38px]">.</span>
                        </h1>
                        <h2 className="relative ml-8 text-2xl mb-2">
                            {t('im')}
                            <hr className="absolute border-[var(--gradient-via-line)] top-3/4 left-[-310px] w-[300px]" />
                        </h2>
                        <h3 className="text-4xl font-bold mb-6">{t('softDev')}</h3>
                        <div className="flex justify-center md:justify-start space-x-4">
                            <NavigationLink
                                href="/contacts"
                                className="bg-[var(--gradient-via-line)] text-white px-6 py-2 rounded hover:opacity-90 transition"
                            >
                                {t('gotProject')}
                            </NavigationLink>
                            <Link href="/MyCV.pdf" download="David Meloyan CV"
                                  className="bg-[var(--nav-bg)] text-[var(--nav-text)] text-nowrap px-6 py-2 flex justify-center items-center rounded hover:opacity-90 transition"
                            >
                                {t('myResume')}
                            </Link>


                        </div>
                    </motion.div>

                    {/* RIGHT SIDE */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={rightVariants}
                        className="relative w-[500px] h-[500px]"
                    >
                        {/* Background Circle */}
                        <div
                            ref={backgroundRef}
                            className="absolute w-[500px] h-[500px] top-[65px] min-[900px]:left-[-50px] z-10 rounded-full flex justify-center items-center transition-transform duration-300 ease-out"
                            style={{
                                backgroundImage:
                                    'linear-gradient(67.2deg, rgba(250,143,78,1) -0.5%, rgba(247,171,94,1) 38.3%, rgba(240,228,99,1) 98.5%)',
                                boxShadow:
                                    'rgba(255, 30, 0, 0.25) 0px 54px 55px, rgb(149 149 149 / 12%) 116px -29px 100px, rgb(255 113 90) -5px -60px 148px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgb(214 214 214) 3px -18px 47px',
                            }}
                        >
                            <div className="w-[450px] h-[450px] rounded-full bg-[var(--gradient-via-o)] duration-500" />
                        </div>

                        {/* Image */}
                        <Image
                            ref={imageRef}
                            src="/me.png"
                            width={1000}
                            height={800}
                            alt="David"
                            className="relative z-20 w-4/5 h-auto object-cover max-[900px]:left-[50px] transition-transform duration-300 ease-out"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Technologies Line */}
            <TechnologiesLine />
        </section>
    );
};

export default FirstSection;