"use client";
import React from "react";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

interface FormData {
    name: string;
    email: string;
    message: string;
}

interface ModalProps {
    message: string;
    type: "success" | "error";
    onClose: () => void;
}

const MessageModal: React.FC<ModalProps> = ({ message, type, onClose }) => {
    React.useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => {
            window.removeEventListener("keydown", handleEsc);
            clearTimeout(timer);
        };
    }, [onClose]);

    return (
        <>
            <div
                className="fixed inset-0 z-40 bg-[#121a2a] bg-opacity-80 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="fixed z-50 top-1/2 left-1/2 max-w-sm w-full p-6 rounded-lg shadow-lg -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 text-white">
                <div className="flex items-center justify-center mb-4">
                    {type === "success" ? (
                        <FaCheckCircle className="text-green-400 text-4xl" />
                    ) : (
                        <FaTimesCircle className="text-red-500 text-4xl" />
                    )}
                </div>
                <p className="text-center text-lg font-semibold">{message}</p>
                <button
                    onClick={onClose}
                    className="mt-6 block mx-auto px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition"
                >
                    Close
                </button>
            </div>
        </>
    );
};

const Contact: React.FC = () => {
    const [formData, setFormData] = React.useState<FormData>({
        name: "",
        email: "",
        message: "",
    });

    const t = useTranslations("Contacts");
    const [loading, setLoading] = React.useState(false);
    const [modalMessage, setModalMessage] = React.useState("");
    const [modalType, setModalType] = React.useState<"success" | "error" | "">(
        ""
    );
    const fields = ["name", "email", "message"] as const;
    type Field = typeof fields[number];

    const fieldLabels: Record<Field, string> = {
        name: t('name'),
        email: t('email'),
        message: t('message'),
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post("/api/contact", formData);
            if (res.data.success) {
                setModalMessage("Your message has been sent!");
                setModalType("success");
                setFormData({ name: "", email: "", message: "" });
            }
        } catch (err) {
            console.log(err);
            setModalMessage("Something went wrong. Please try again.");
            setModalType("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{opacity: 0, rotateX: -45, scale: 0.9}}
            animate={{opacity: 1, rotateX: 0, scale: 1}}
            transition={{duration: 1, ease: "easeOut"}}
            className="w-full flex flex-col min-[720px]:flex-row gap-[15%] justify-center items-center p-6 min-[500px]:p-10 text-white"
        >
            {modalType && modalMessage && (
                <MessageModal
                    message={modalMessage}
                    type={modalType}
                    onClose={() => {
                        setModalType("");
                        setModalMessage("");
                    }}
                />
            )}

            {/* LEFT SECTION */}
            <motion.div
                initial={{opacity: 0, x: -150, rotateY: 60}}
                animate={{opacity: 1, x: 0, rotateY: 0}}
                transition={{duration: 1, delay: 0.3}}

            >
                <h2 className="text-3xl min-[500px]:text-4xl text-nowrap font-bold mb-4">
                    {t("haveProject")}
                </h2>

                <motion.h3
                    initial={{opacity: 0, x: -100, rotateY: 90}}
                    animate={{opacity: 1, x: 0, rotateY: 0}}
                    transition={{duration: 1.2, ease: "easeOut", delay: 0.5}}
                    className="relative ml-8 text-2xl mb-6"
                >
                    {t("letsTalk")}
                    <hr className="absolute border-[var(--gradient-via-line)] top-3/4 left-[-560px] w-[550px]"/>
                </motion.h3>
                <motion.button
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.95}}
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-[var(--gradient-via-line)] max-[720px]:hidden text-white px-6 py-2 rounded hover:opacity-90 transition disabled:opacity-50"
                >
                    {loading ? t("sending") :  t("send")}
                </motion.button>

            </motion.div>

            {/* RIGHT SECTION - FORM */}
            <motion.div
                initial={{opacity: 0, x: 150, rotateY: -60}}
                animate={{opacity: 1, x: 0, rotateY: 0}}
                transition={{duration: 1, delay: 0.6}}
            >
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                    {fields.map((field, index) => (
                        <motion.div
                            key={field}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.5, delay: 0.7 + index * 0.2}}
                        >
                            <label
                                htmlFor={field}
                                className="block text-sm font-medium text-gray-300"
                            >
                                {fieldLabels[field]}
                            </label>

                            {field === "message" ? (
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    className="mt-1 block w-full bg-[var(--nav-bg)] border border-[var(--scills)] duration-500 rounded-md p-2 text-white"
                                />
                            ) : (
                                <input
                                    type={field === "email" ? "email" : "text"}
                                    id={field}
                                    name={field}
                                    value={formData[field as keyof FormData]}
                                    onChange={handleChange}
                                    className="mt-1 block w-full bg-[var(--nav-bg)] border border-[var(--scills)] duration-500 rounded-md p-2 text-white"
                                />
                            )}
                        </motion.div>
                    ))}
                </form>
            </motion.div>
            <motion.button
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                onClick={handleSubmit}
                disabled={loading}
                className="bg-[var(--gradient-via-line)] min-[720px]:hidden text-white px-6 mt-6 py-2 rounded hover:opacity-90 transition disabled:opacity-50"
            >
                {loading ? t("sending") : t("send")}

            </motion.button>
        </motion.div>
    );
};

export default Contact;
