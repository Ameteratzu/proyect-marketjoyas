import React, { useState } from 'react';
import bannerImage from '../../assets/quotes/baner_cuotas.png';
import instagramIcon from '../../assets/quotes/instagramIcon.png';
import facebookIcon from '../../assets/quotes/facebookIcon.png';
import twitterIcon from '../../assets/quotes/twitterIcon.png';
import logoMarketJoyas from '../../assets/quotes/logoMarketJoyas.png';
import { useTranslation } from "react-i18next";

const Quote = () => {
    const { t } = useTranslation('quote');

    type FormData = {
        nombre: string;
        telefono: string;
        correo: string;
        observaciones: string;
        imagen: File | null;
    };

    const [formData, setFormData] = useState<FormData>({
        nombre: '',
        telefono: '',
        correo: '',
        observaciones: '',
        imagen: null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setFormData(prevState => ({
                ...prevState,
                imagen: file,
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Formulario enviado:', formData);
    };

    return (
        <>
            <div className="w-full">
                <img src={bannerImage} alt="Banner de cotización de joyas" className="w-full h-auto object-cover" />
            </div>

            <div className="container-p py-12">
                <h1 className="text-[30px] font-sans text-center mb-6 text-primary font-medium">{t('title')}</h1>

                <div className="flex justify-center">
                    {/* Contenedor principal del formulario y texto */}
                    <div className="flex flex-col md:flex-row bg-white p-8 w-full md:max-w-[1437px] md:h-[660px] rounded-md shadow-lg gap-12">
                        
                        {/* Contenedor del formulario - Columna izquierda */}
                        <div className="w-full md:w-[918px] md:h-[600px] rounded-lg border border-graphite p-8">
                            <h2 className="text-[30px] mb-4 text-left font-sans text-primary font-medium">{t('special_orders')}</h2>
                            <form onSubmit={handleSubmit}>
                                {/* Cambio clave: de 'grid grid-cols-2' a 'grid grid-cols-1 md:grid-cols-2' */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-dark">
                                    <div>
                                        <label className="block text-graphite/75 font-sans text-[20px] font-medium mt-6">{t('full_name')}</label>
                                        <input
                                            type="text"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleChange}
                                            placeholder={t('full_name_placeholder')}
                                            className="w-full p-2 border border-dark/50 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-graphite/75 font-sans text-[20px] font-medium mt-6">{t('phone')}</label>
                                        <input
                                            type="tel"
                                            name="telefono"
                                            value={formData.telefono}
                                            onChange={handleChange}
                                            placeholder={t('phone_placeholder')}
                                            className="w-full p-2 border border-dark/50 rounded-md"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label className="block text-graphite/75 font-sans text-[20px] font-medium">{t('email')}</label>
                                    <input
                                        type="email"
                                        name="correo"
                                        value={formData.correo}
                                        onChange={handleChange}
                                        placeholder={t('email_placeholder')}
                                        className="w-full p-2 border border-dark/50 rounded-md"
                                        required
                                    />
                                </div>
                                <div className="mt-4">
                                    <label className="block text-graphite/75 font-sans text-[20px] font-medium">{t('image_reference')}</label>
                                    {/* Cambio clave: de 'flex items-center space-x-2' a 'flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2' */}
                                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                                        <input
                                            type="text"
                                            readOnly
                                            value={formData.imagen ? formData.imagen.name : t('image_placeholder')}
                                            className="w-full p-2 border text-graphite/50 border-dark/50 rounded-md"
                                        />
                                        <label htmlFor="image-upload" className="btn-white py-2 px-10 rounded-md cursor-pointer border text-primary border-primary">
                                            {t('browse')}
                                        </label>
                                        <input
                                            id="image-upload"
                                            type="file"
                                            name="imagen"
                                            onChange={handleImageChange}
                                            accept=".jpg, .jpeg, .png"
                                            className="hidden"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label className="block text-graphite/75 font-sans text-[20px] font-medium">{t('observations')}</label>
                                    <textarea
                                        name="observaciones"
                                        value={formData.observaciones}
                                        onChange={handleChange}
                                        placeholder={t('observations_placeholder')}
                                        className="w-full p-2 border border-dark/50 rounded-md h-24 resize-none "
                                    ></textarea>
                                </div>
                                <div className="mt-6 text-center">
                                    <button type="submit" className="btn-primary px-8 py-2 font-display rounded-md">
                                        {t('send')}
                                    </button>
                                </div>
                            </form>
                        </div>
                        
                        {/* Contenedor del texto de la derecha - Columna derecha */}
                        <div className="w-full md:w-1/2 mt-8 md:mt-0">
                            <div>
                                <h3 className="h3 font-bold mb-2 mt-10 font-sans text-primary text-[20px]">{t('quotes_info_title')}</h3>
                                <p className="text-sm leading-relaxed mb-6 text-dark/70 text-[18px]">
                                    {t('quotes_info_text_1')}
                                    <br/>
                                    {t('quotes_info_text_2')}
                                    <br/>
                                    {t('quotes_info_text_3')}
                                </p>
                            </div>
                            <div>
                                <h3 className="h3 font-bold mb-2 mt-20 font-sans text-primary text-[20px]">{t('product_unavailable_title')}</h3>
                                <p className="text-sm leading-relaxed text-dark/70 text-[18px]">
                                    {t('product_unavailable_text_1')}
                                    <br/>
                                    {t('product_unavailable_text_2')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-12">
                    <div className="bg-white p-8 w-full max-w-[1437px] rounded-md shadow-lg border border-gray-300 flex flex-col md:flex-row items-center justify-between">
                        
                        {/* Logo y nombre de Market Joyas */}
                        <div className="flex flex-col items-center sm:flex-row mb-6 md:mb-0">
                            <img src={logoMarketJoyas} alt="Market Joyas Logo" className="h-20 mr-4" />
                            <div className="text-center sm:text-left">
                                <p className="text-xl font-bold text-graphite">MARKET JOYAS</p>
                                <p className="text-md text-graphite/70">Market Joyas</p>
                                <div className="flex justify-center sm:justify-start space-x-4 mt-2">
                                    <a href="#" className="text-graphite hover:text-primary">
                                        <img src={facebookIcon} alt="Facebook" className="h-6 w-6" />
                                    </a>
                                    <a href="#" className="text-graphite hover:text-primary">
                                        <img src={twitterIcon} alt="Twitter" className="h-6 w-6" />
                                    </a>
                                    <a href="#" className="text-graphite hover:text-primary">
                                        <img src={instagramIcon} alt="Instagram" className="h-6 w-6" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Texto descriptivo de Market Joyas */}
                        <div className="w-full md:w-1/2 text-graphite/80 text-lg leading-relaxed text-center md:text-left mt-6 md:mt-0">
                            <p>{t('market_joyas_info')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Quote;