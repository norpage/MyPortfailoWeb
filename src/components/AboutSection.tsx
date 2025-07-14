'use client';
import { FaLaptopCode, FaRobot, FaServer } from 'react-icons/fa';
import { GoDot } from 'react-icons/go';
import CountUp from 'react-countup';
import { useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';
import { JSX, ReactNode, useState } from 'react';

export default function AboutSection() {
    const t = useTranslations('About');
    const [activeService, setActiveService] = useState<number | null>(null);

    const services = [
        { icon: <FaLaptopCode size={34} />, label: t('webDev') },
        { icon: <FaRobot size={34} />, label: t('botDev') },
        { icon: <FaServer size={34} />, label: t('hosting') },
    ];

    return (
        <section className="w-full text-white py-10">
            <div className="flex max-[1000px]:flex-col max-[1000px]:items-center justify-evenly items-start gap-16">
                {/* Desktop View */}
                <div className="font-sans mt-[-70px] max-[1000px]:hidden justify-center">
                    {services.map((service, index) => (
                        <div key={index}>
                            <div className="border-l-[3px] h-[70px] flex items-center border-[var(--gradient-via-line)] pl-4">
                                <ServiceItem
                                    icon={service.icon}
                                    label={service.label}
                                    isActive={activeService === index}
                                    onToggle={() => setActiveService(activeService === index ? null : index)}
                                />
                            </div>
                            {index < services.length - 1 && (
                                <GoDot className="ml-[-7px] text-[var(--gradient-via-line)]" />
                            )}
                        </div>
                    ))}
                </div>

                {/* Mobile View */}
                <div className="flex items-center justify-center min-[1000px]:hidden gap-4 font-sans">
                    {services.map((service, index) => (
                        <div key={index} className={'flex justify-center items-center'}>
                            <div
                                 className="flex items-center gap-3 border-b-[3px] px-3 pb-4 duration-1000 border-[var(--gradient-via-line)]">
                                <ServiceItem
                                    icon={service.icon}
                                    label={service.label}
                                    isActive={activeService === index}
                                    onToggle={() => setActiveService(activeService === index ? null : index)}
                                />

                            </div>
                            {index < services.length - 1 && (
                                <GoDot className="text-[var(--gradient-via-line)] ml-4"/>
                            )}
                        </div>

                    ))}
                </div>

                {/* Right: About */}
                <div className="w-full max-w-[700px]">
                    <p className="text-base min-[500px]:font-sans min-[500px]:text-xl max-[1000px]:text-center text-[var(--about-text)]">
                        {t('description')}
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-center mt-6">
                        <Stat number={25} suffix="+" label={t('projects')}/>
                        <Stat number={97} suffix="%" label={t('satisfaction')}/>
                        <Stat number={2} suffix="+" label={t('experience')} />
                    </div>
                </div>
            </div>
        </section>
    );
}

type ServiceItemProps = {
    icon: JSX.Element;
    label: ReactNode;
    isActive: boolean;
    onToggle: () => void;
};

function ServiceItem({ icon, label, isActive, onToggle }: ServiceItemProps) {
    return (
        <div className="relative flex items-center text-nowrap">
            <div
                className="text-[30px] max-[520px]:text-[15px] max-[420px]:text-[35px] text-[var(--about-text)] cursor-pointer flex-shrink-0"
                onClick={onToggle}
            >
                {icon}
            </div>

            {/* Լեյբլ desktop-ի համար (միշտ ցուցադրվում է 560px-ից բարձր) */}
            <span
                className="text-[23px] max-[780px]:text-[15px] max-[620px]:text-[11px] max-[520px]:text-[9px] text-[var(--about-text)] max-[560px]:hidden font-sans ml-4"
            >
                {label}
            </span>

            {/* Լեյբլ mobile-ի համար (հայտնվում է սեղմելիս, 560px-ից ցածր) */}
            <div
                className={`min-[560px]:hidden flex items-center transition-[width,max-width,opacity] duration-1000 ease-in-out overflow-hidden ${
                    isActive
                        ? 'opacity-100 w-auto max-w-[300px] ml-4'
                        : 'opacity-0 w-0 max-w-0 ml-0'
                }`}
            >
                <span
                    className="text-[23px] max-[780px]:text-[15px] max-[620px]:text-[11px] max-[520px]:text-[9px] text-[var(--about-text)] font-sans whitespace-nowrap"
                >
                    {label}
                </span>
            </div>
        </div>
    );
}
type StatProps = {
    number: number;
    suffix?: string;
    label: string;
};

function Stat({number, suffix, label}: StatProps) {
    const {ref, inView} = useInView({triggerOnce: true});

    return (
        <div ref={ref as unknown as React.Ref<HTMLDivElement>}>
            <p className="text-3xl font-bold text-[var(--gradient-via-line)]">
                {inView ? <CountUp start={0} end={number} duration={4} /> : '0'}
                {suffix}
            </p>
            <p className="text-base max-[500px]:text-[12px] text-white mt-1">{label}</p>
        </div>
    );
}