'use client';

import {useTranslations} from 'next-intl';
import ProjectCard from './ProjectCard';

interface Project {
    title: string;
    description: string;
    tags: string[];
    image: string;
    github: string;
    demo: string;
    qrCode?: string;
}

export default function ProjectsSection() {
    const t = useTranslations('Projects');

    const projects: Project[] = [
        {
            title: t('SyntaxAcademy.title'),
            description: t('SyntaxAcademy.description'),
            tags: ['HTML','React', 'Next.js', 'Tailwind CSS','CSS', 'TypeScript','Node.js', 'PostgreSQL', 'API', 'Version control'],
            qrCode: '/projectsQr/syntaxQr.png',
            image: '/projects/syntaxAcademy.jpg',
            github: 'https://github.com/norpage/SyntaxAcademy',
            demo: 'https://www.syntaxacade.my/',
        },
        {
            title: t('MovieNest.title'),
            description: t('MovieNest.description'),
            tags: ['HTML','Next.js','React', 'Tailwind CSS', 'JavaScript', 'API', 'Version control'],
            qrCode: '/projectsQr/movieNestQr.png',
            image: '/projects/movieNest.png',
            github: 'https://github.com/norpage/MovieNestNext',
            demo: 'https://movienest.live/',
        },
        {
            title: t('jsGames.title'),
            description: t('jsGames.description'),
            tags: ['HTML', 'CSS', 'JavaScript'],
            qrCode: '/projectsQr/gamesQr.png',
            image: '/projects/games.png',
            github: 'https://github.com/norpage/JsGames',
            demo: 'https://games.syntaxacade.my/',
        },
        {
            title: t('weddings.title'),
            description: t('weddings.description'),
            tags: ['HTML', 'CSS', 'JavaScript'],
            qrCode: '/projectsQr/yddQr.png',
            image: '/projects/wedding.png',
            github: 'https://github.com/norpage/Weddings',
            demo: 'https://ydd.syntaxacade.my/wedding_one/index.html',
        },

        {
            title: t('dowBot.title'),
            description: t('dowBot.description'),
            tags: ['JavaScript','Node.js', 'PostgreSQL', 'API', 'Version control','Telegram-API','Ubuntu Server'],
            qrCode: '/projectsQr/dowBotQr.png',
            image: '/projects/dowBot.png',
            github: 'https://github.com/norpage/DowBot',
            demo: 'https://t.me/lav_dow_bot',
        },
    ];

    return (
        <section className="flex pb-16 flex-col gap-6 w-full">
                {projects.map((project, index) => (
                    <ProjectCard key={index} i={index} {...project} />
                ))}
        </section>
    );
}
