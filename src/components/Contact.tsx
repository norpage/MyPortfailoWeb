"use client";
import React from "react";
import axios from "axios";
import {FaCheckCircle, FaTimesCircle} from "react-icons/fa";
import {useTranslations} from "next-intl";

interface FormData {
    name: string;
    email: string;
    message: string;
}


interface ModalProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

const MessageModal: React.FC<ModalProps> = ({ message, type, onClose }) => {
    React.useEffect(() => {
        function handleEsc(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        window.addEventListener("keydown", handleEsc);

        // Ավելացնում ենք ավտոմատ փակելու timeout
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // 3 վարկյան անց կփակի modal-ը

        return () => {
            window.removeEventListener("keydown", handleEsc);
            clearTimeout(timer);
        };
    }, [onClose]);

    // ...modal JSX նույնն է

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 z-40 bg-[#121a2a] bg-opacity-80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className="fixed z-50 top-1/2 left-1/2 max-w-sm w-full p-6 rounded-lg shadow-lg
          -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 text-white"
            >
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
    const t = useTranslations('Contacts');

    const [loading, setLoading] = React.useState(false);
    const [modalMessage, setModalMessage] = React.useState("");
    const [modalType, setModalType] = React.useState<"success" | "error" | "">("");

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
            console.error(err);
            setModalMessage("Something went wrong. Please try again.");
            setModalType("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex flex-col md:flex-row justify-between items-center p-6 md:p-10 text-white">
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

            <div className="mb-6 md:mb-0 md:w-1/2">
                <h2 className="text-3xl md:text-4xl text-nowrap font-bold mb-4">
                    {t('haveProject')}
                </h2>

                <h3 className="relative ml-8 text-2xl mb-6">
                    {t('letsTalk')}
                    <hr className="absolute border-[var(--gradient-via-line)] top-3/4 left-[-360px] w-[350px]" />
                </h3>
                <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-[var(--gradient-via-line)] text-white px-6 py-2 rounded hover:opacity-90 transition disabled:opacity-50"
                >
                    {loading ? "Sending..." : "Submit"}
                </button>
            </div>

            <div className="md:w-1/2">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                            {t("name")}
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full bg-[var(--nav-bg)] border border-[var(--scills)] duration-500 rounded-md p-2 text-white"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-300"
                        >
                            {t("email")}

                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full bg-[var(--nav-bg)] border border-[var(--scills)]  duration-500 rounded-md p-2 text-white"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="message"
                            className="block text-sm font-medium text-gray-300"
                        >
                            {t("message")}

                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            className="mt-1 block w-full bg-[var(--nav-bg)] border border-[var(--scills)] duration-500 rounded-md p-2 text-white"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;
