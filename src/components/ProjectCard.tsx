'use client';

import React, {useState, useEffect, useRef} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {GoLink} from "react-icons/go";
import {useTranslations} from "next-intl";
import {ImQrcode} from "react-icons/im";

interface ProjectCardProps {
    i: number;
    title: string;
    description: string;
    tags: string[];
    qrCode?: string;
    image: string;
    github: string;
    demo: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
                                                     i,
                                                     title,
                                                     description,
                                                     tags,
                                                     qrCode,
                                                     image,
                                                     github,
                                                     demo,
                                                 }) => {
    const t = useTranslations('Projects');
    const [showQR, setShowQR] = useState(false);

    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`flex ${+i % 2 ? 'flex-row-reverse' : ''} w-full p-5 justify-center items-center rounded-lg gap-10 overflow-hidden
            transform transition-all max-[900px]:flex-col duration-500 ease-out
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} `}
        >
            <Link
                href={demo}
                target="_blank" className="relative w-full max-w-[500px] h-full">
                <Image
                    src={image}
                    alt={title}
                    width={1000}
                    height={800}
                    className="object-contain hover:scale-110 duration-500 w-full h-auto"
                />
            </Link>

            <div className='max-w-[750px]'>
                <h3 className="text-xl font-semibold text-white   flex max-[900px]:justify-center gap-6 mb-2 relative group">
                    {title}
                    <div
                        onMouseEnter={() => setShowQR(true)}
                        onMouseLeave={() => setShowQR(false)}
                        className="relative cursor-pointer"
                    >
                        <ImQrcode className="mt-1 hover:scale-125 duration-500"/>

                        {showQR && qrCode && (
                            <div className={`absolute top-8 ${+i % 2 ? 'left-0' : 'right-0'}  z-50 w-40 h-40 p-1 bg-white rounded shadow-lg`}>
                                <Image
                                    src={qrCode}
                                    alt="qrCode"
                                    width={160}
                                    height={160}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        )}
                    </div>
                </h3>
                <p className="text-[var(--about-text)] max-[900px]:text-center max-[470px]:text-[12px] mb-4">{description}</p>
                <div className="flex flex-wrap max-[900px]:justify-center gap-2 mb-4">
                    {tags.map((tag, idx) => (
                        <span key={idx} className="bg-gray-700 text-white text-xs max-[470px]:text-[9px] px-2 py-1 rounded-full">
                          {tag}
                        </span>
                    ))}
                </div>
                <div className="flex max-[900px]:justify-center max-[470px]:text-[10px] gap-4">
                    <Link
                        href={github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[var(--gradient-via-line)] hover:opacity-90 text-white text-nowrap px-4 py-2 rounded transition"
                    >
                        {t('viewGithub')}
                    </Link>
                    <Link
                        href={demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=" text-white px-4 flex gap-2 py-2 rounded text-nowrap transition border-b border-[var(--gradient-via-line)]"
                    >
                        {t('viewProject')} <GoLink className={'mt-1'}/>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
