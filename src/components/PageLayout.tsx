import { ReactNode } from 'react';
import FirstSection from "@/components/FirstSection";

type Props = {
    children?: ReactNode;
    title: ReactNode;
};

export default function PageLayout({ children, title }: Props) {

    return (
        <div className="relative w-full flex flex-col inset-0 bg-[var(--bg)]">
            <FirstSection/>
            <div className="w-full relative flex flex-col items-center pt-14  px-4">
                <h1 className="text-2xl font-semibold leading-tight tracking-tight md:text-5xl text-[var(--text-primary)]">
                    {title}
                </h1>
                <div className="mt-6  flex flex-col items-center w-[1000px] text-[var(--text-primary)] md:text-lg opacity-80">
                    {children}
                </div>
            </div>
        </div>
    );
}