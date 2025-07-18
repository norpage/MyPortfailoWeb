import { Locale, useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';
import PageLayout from '@/components/PageLayout';

type Props = {
    params: Promise<{ locale: Locale }>;
};

export default function PathnamesPage({ params }: Props) {
    const { locale } = use(params);

    setRequestLocale(locale);

    const t = useTranslations('PathnamesPage');

    return (
        <PageLayout title={t('title')}>
            <div className="max-w-[490px]">
                {t.rich('description', {
                    p: (chunks) => <p className="mt-4 text-[var(--text-primary)]">{chunks}</p>,
                    code: (chunks) => <code className="font-mono">{chunks}</code>,
                })}
            </div>
        </PageLayout>
    );
}