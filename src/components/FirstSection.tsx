'use client';
import React, { useEffect, useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import {useTranslations} from "next-intl";

const FirstSection = () => {
    const t = useTranslations('FirstSection');
    const imageRef = useRef<HTMLImageElement | null>(null);
    const backgroundRef = useRef<HTMLDivElement | null>(null);


    const technologies = [
        { name: 'HTML5', url: 'https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5',image:'/scillsLogos/HTML5.png' },
        { name: 'CSS', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',image:'/scillsLogos/CSS3.png' },
        { name: 'JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',image:'/scillsLogos/JavaScript.png' },
        { name: 'TypeScript', url: 'https://www.typescriptlang.org/',image:'/scillsLogos/TypeScript.webp' },
        { name: 'Node.js', url: 'https://nodejs.org/',image:'/scillsLogos/nodeJs.png' },
        { name: 'React', url: 'https://reactjs.org/',image:'/scillsLogos/React.webp' },
        { name: 'Next.js', url: 'https://nextjs.org/',image:'/scillsLogos/nextjs.png' },
        { name: 'Git', url: 'https://git-scm.com/',image:'/scillsLogos/git.webp' },
        { name: 'GitLab', url: 'https://github.com/',image:'/scillsLogos/gitLab.webp' },
        { name: 'GitHub', url: 'https://github.com/',image:'/scillsLogos/gitHub.png' },
    ];


    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 10; // նուրբ շարժում
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

    return (
        <section
            className="relative text-[var(--text-primary)] !pt-[100px] top-0 bg-gradient-to-r from-[var(--gradient-from)] via-[var(--gradient-via)] transition-colors duration-300 overflow-hidden">
            <div className="mx-auto relative">
                <div className="flex flex-col md:flex-row items-center justify-around">
                    {/* LEFT SIDE */}
                    <div className="text-center md:text-left pl-10 mb-8">
                        <h1 className="font-bold text-xl mb-2">
                            {t("hello")} <span className='text-[var(--gradient-via-line)] text-[38px]'>.</span>
                        </h1>
                        <h2 className="relative ml-8 text-2xl mb-2">
                            {t("im")}
                            <hr className="absolute border-[var(--gradient-via-line)] top-3/4 left-[-260px] w-[250px]"/>
                        </h2>
                        <h3 className="text-4xl font-bold mb-6">{t("softDev")}</h3>
                        <div className="flex justify-center md:justify-start space-x-4">
                            <button
                                className="bg-[var(--gradient-via-line)] text-white px-6 py-2 rounded hover:opacity-90 transition">
                                {t("gotProject")}
                            </button>
                            <button
                                className="bg-[var(--nav-bg)] text-[var(--nav-text)] px-6 py-2 rounded hover:opacity-90 transition">
                                {t("myResume")}
                            </button>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="relative w-[500px] h-[500px]">
                        {/* Background Circle */}
                        <div
                            ref={backgroundRef}
                            className="absolute w-[500px] h-[500px] top-[65px] left-[-50px] z-10 rounded-full flex justify-center items-center transition-transform duration-300 ease-out"
                            style={{
                                backgroundImage:
                                    'linear-gradient(67.2deg, rgba(250,143,78,1) -0.5%, rgba(247,171,94,1) 38.3%, rgba(240,228,99,1) 98.5%)',
                                boxShadow:
                                    'rgba(255, 30, 0, 0.25) 0px 54px 55px, rgb(149 149 149 / 12%) 116px -29px 100px, rgb(255 113 90) -5px -60px 148px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgb(214 214 214) 3px -18px 47px'
                            }}
                        >
                            <div className="w-[450px] h-[450px] rounded-full bg-[var(--gradient-via-o)] duration-500"/>
                        </div>

                        {/* Image */}
                        <Image
                            ref={imageRef}
                            src="/me.png"
                            width={1000}
                            height={800}
                            alt="David"
                            className="relative z-20 w-4/5 h-auto object-cover transition-transform duration-300 ease-out"
                        />
                    </div>
                </div>
            </div>

            {/* BOTTOM TECH BAR */}
            <div
                className="relative z-30 mt-[50px] w-full h-[70px] bg-[var(--nav-bg)] text-[var(--scills)] flex items-center justify-evenly transition-colors duration-300">
                {technologies.map((tech, idx) => (
                    <div key={idx} className="relative group flex flex-col items-center">
                        <Link
                            href={tech.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            {tech.name}
                        </Link>

                        {/* Tooltip with image */}
                        <div
                            className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-[120px] h-[120px]  rounded-lg shadow-lg p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                            <Image
                                src={tech.image}
                                alt={tech.name}
                                width={120}
                                height={120}
                                className="object-contain w-full h-full rounded"
                            />
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default FirstSection;
