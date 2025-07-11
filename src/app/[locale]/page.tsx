import {Locale, useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {use} from 'react';
import PageLayout from '@/components/PageLayout';
import AboutSection from "@/components/AboutSection";
import {GoDot} from "react-icons/go";
import ProjectsSection from "@/components/ProjectsSection";
import Contact from "@/components/Contact";

type Props = {
    params: Promise<{ locale: Locale }>;
};

export default function IndexPage({params}: Props) {
    const {locale} = use(params);
    const t = useTranslations('About');

    setRequestLocale(locale);


    return (
        <PageLayout title={t('title')}>
            <AboutSection/>
            {/* Projects heading */}
            <div className="mt-20 text-center">
                <h2 className="text-3xl font-bold">{t('projectsTitle')}</h2>
                <div className="relative h-10 flex justify-center">
                    <div className="w-1 h-14 bg-red-500 mt-2"/>
                    <GoDot className='bottom-[-45px] absolute text-[var(--gradient-via-line)]'/>
                </div>
            </div>

            <ProjectsSection/>
            <Contact/>
        </PageLayout>
    );
}