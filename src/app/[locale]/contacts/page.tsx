import { Locale, useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';
import PageLayout from '@/components/PageLayout';
import Contact from "@/components/Contact";

type Props = {
    params: Promise<{ locale: Locale }>;
};

export default function PathnamesPage({ params }: Props) {
    const { locale } = use(params);

    setRequestLocale(locale);

    const t = useTranslations('Contacts');

    return (
        <PageLayout title={t('title')}>
            <Contact/>
        </PageLayout>
    );
}