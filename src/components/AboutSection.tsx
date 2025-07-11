'use client';
import {FaLaptopCode, FaRobot, FaServer} from 'react-icons/fa';
import {GoDot} from "react-icons/go";
import CountUp from 'react-countup';
import {useTranslations} from 'next-intl';
import {useInView} from 'react-intersection-observer';
import {JSX, ReactNode} from "react";

export default function AboutSection() {
    const t = useTranslations('About');

    return (
        <section className="w-full text-white">
            <div className="flex flex-col md:flex-row justify-between items-start gap-16">
                {/* Left: Services */}
                <div className="font-sans">
                    <div className='border-l-[3px]  h-[70px] flex items-center border-[var(--gradient-via-line)] pl-4'>
                        <ServiceItem icon={<FaLaptopCode size={34}/>} label={t('webDev')}/>
                    </div>
                    <GoDot className='ml-[-7px] text-[var(--gradient-via-line)]'/>
                    <div className='border-l-[3px] h-[70px] flex items-center border-[var(--gradient-via-line)] pl-4'>
                        <ServiceItem icon={<FaRobot size={34}/>} label={t('botDev')}/>
                    </div>
                    <GoDot className='ml-[-7px] text-[var(--gradient-via-line)]'/>
                    <div className='border-l-[3px] h-[70px] flex items-center border-[var(--gradient-via-line)] pl-4'>
                        <ServiceItem icon={<FaServer size={34}/>} label={t('hosting')}/>
                    </div>
                </div>

                {/* Right: About */}
                <div className="md:w-2/3 space-y-6">
                    {/*<h2 className="text-[40px] text-[var(--about-text)] font-bold">{t('title')}</h2>*/}
                    <p className="text-base text-[var(--about-text)] leading-relaxed">{t('description')}</p>

                    <div className="grid grid-cols-3 gap-4 text-center mt-6">
                        <Stat number={15} suffix="+" label={t('projects')}/>
                        <Stat number={95} suffix="%" label={t('satisfaction')}/>
                        <Stat number={2} suffix="+" label={t('experience')}/>
                    </div>
                </div>
            </div>


        </section>
    );
}
type ServiceItemProps = {
    icon: JSX.Element;
    label: ReactNode;
};
function ServiceItem({ icon, label }: ServiceItemProps) {
    return (
        <div className="flex items-center text-nowrap gap-4">
            <div className="text-[30px] text-[var(--about-text)]">{icon}</div>
            <span className="text-[23px] text-[var(--about-text)] font-sans ">{label}</span>
        </div>
    );
}

type StatProps = {
    number: number;
    suffix?: string;  // suffix may be optional or string
    label: string;
};

function Stat({ number, suffix, label }: StatProps) {
    const { ref, inView } = useInView({ triggerOnce: true });

    return (
        <div ref={ref as unknown as React.Ref<HTMLDivElement>}>
            <p className="text-3xl font-bold text-[var(--gradient-via-line)]">
                {inView ? <CountUp start={0} end={number} duration={4}/> : '0'}
                {suffix}
            </p>
            <p className="text-base text-white mt-1">{label}</p>
        </div>
    );
}

