import { useTranslations } from 'next-intl';
import { IoIosMail } from "react-icons/io";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
    const t = useTranslations('Footer');

    return (
        <footer className="w-full bg-[var(--nav-bg)] text-white py-4 px-4 flex justify-center">
            <div className="max-w-4xl w-full flex flex-col items-center gap-6 text-center">

                {/*<p className="text-sm text-gray-400 max-w-md leading-relaxed">*/}
                {/*    {t("description")}*/}
                {/*</p>*/}

                <div className="flex gap-5">
                    <SocialIcon href="mailto:davidmeloyan99@gmail.com" icon={<IoIosMail />} label="Email" />
                    <SocialIcon href="https://github.com/norpage" icon={<FaGithub />} label="GitHub" />
                    <SocialIcon href="https://www.linkedin.com/in/david-meloyan-611ab52a3/" icon={<FaLinkedinIn />} label="LinkedIn" />
                </div>

                <span className="text-xs text-gray-500 ">
                    © {new Date().getFullYear()} {t("myName")}. {t("rightReserved")}
                </span>
            </div>
        </footer>
    );
}

interface SocialIconProps {
    href: string;
    icon: React.ReactNode;
    label: string;
}

function SocialIcon({ href, icon, label }: SocialIconProps) {
    return (
        <Link
            href={href}
            aria-label={label}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-10 h-10 rounded-full bg-white text-black flex justify-center items-center text-[25px] shadow-md hover:scale-110 hover:bg-gradient-to-br hover:from-pink-500 hover:to-yellow-500 hover:text-white transition-all duration-300"
        >
            {icon}
        </Link>
    );
}
