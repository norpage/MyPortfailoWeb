import { Locale, useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';
import PageLayout from '@/components/PageLayout';
import ProjectsSection from "@/components/ProjectsSection";

type Props = {
    params: Promise<{ locale: Locale }>;
};

export default function PathnamesPage({ params }: Props) {
    const { locale } = use(params);

    setRequestLocale(locale);

    const t = useTranslations('Projects');

    return (
        <PageLayout title={t('title')}>
            <ProjectsSection/>
        </PageLayout>
    );
}