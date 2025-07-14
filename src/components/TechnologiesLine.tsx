'use client';
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import Marquee from 'react-fast-marquee';

export const TechnologiesLine = () => {
    const technologies = [
        { name: 'HTML5', url: 'https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5', image: '/scillsLogos/HTML5.png' },
        { name: 'CSS', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS', image: '/scillsLogos/CSS3.png' },
        { name: 'JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', image: '/scillsLogos/JavaScript.png' },
        { name: 'TypeScript', url: 'https://www.typescriptlang.org/', image: '/scillsLogos/TypeScript.webp' },
        { name: 'Node.js', url: 'https://nodejs.org/', image: '/scillsLogos/nodeJs.png' },
        { name: 'React', url: 'https://reactjs.org/', image: '/scillsLogos/React.webp' },
        { name: 'Next.js', url: 'https://nextjs.org/', image: '/scillsLogos/nextjs.png' },
        { name: 'Git', url: 'https://git-scm.com/', image: '/scillsLogos/git.webp' },
        { name: 'GitLab', url: 'https://gitlab.com/', image: '/scillsLogos/gitLab.webp' },
        { name: 'GitHub', url: 'https://github.com/', image: '/scillsLogos/gitHub.png' },
    ];

    return (
        <div className="relative z-30 mt-[50px] w-full h-[80px] bg-[var(--nav-bg)] text-[var(--scills)]">
            <Marquee pauseOnHover gradient={false} speed={50} className="w-full h-full flex items-center">
                {technologies.map((tech, idx) => (
                    <div key={idx} className="relative group flex flex-col items-center justify-center w-[130px] mx-4">

                        <Link
                            href={tech.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#e5e7eb00] text-center text-sm"
                        >
                            {tech.name}
                            <div
                                className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 w-[80px] h-[80px] rounded-lg px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50"
                            >
                                <Image
                                    src={tech.image}
                                    alt={tech.name}
                                    width={100}
                                    height={100}
                                    className="object-contain w-full h-full rounded"
                                />
                            </div>
                        </Link>

                    </div>
                ))}
            </Marquee>
        </div>
    );
};
