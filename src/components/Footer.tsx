import {useTranslations} from 'next-intl';
import {IoIosMail} from "react-icons/io";
import {FaGithub, FaLinkedinIn} from "react-icons/fa";
import Link from "next/link";
export default function Footer() {
    const t = useTranslations('Footer');

    return (
        <section className="w-full flex justify-center bg-[var(--nav-bg)] text-white p-6">
            <div className="max-w-xl w-full flex flex-col items-center gap-4">
                <h1 className="text-center">{t("myName")}</h1>
                <p className="text-center text-sm">{t("description")}</p>
                <div className="flex gap-4">
                    <Link
                        className="w-[35px] h-[35px] rounded-full bg-white text-black flex justify-center items-center text-[20px]"
                        href="mailto:someone@example.com"><IoIosMail/></Link>
                    <Link
                        className="w-[35px] h-[35px] rounded-full bg-white text-black flex justify-center items-center text-[20px]"
                        href="https://github.com/norpage"><FaGithub/></Link>
                    <Link
                        className="w-[35px] h-[35px] rounded-full bg-white text-black flex justify-center items-center text-[20px]"
                        href="https://www.linkedin.com/in/david-meloyan-611ab52a3/"><FaLinkedinIn/></Link>
                </div>
            </div>
        </section>

    );
}


