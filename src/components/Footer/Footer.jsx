import React from 'react';

export default function Footer() {

    const footerSections = [
        {
            title: "Oyunlar",
            items: [
                "Fortnite", "Fall Guys", "Rocket League", "Unreal Tournament",
                "Infinity Blade", "Shadow Complex", "Robo Recall"
            ]
        },
        {
            title: "Mağazalar",
            items: [
                "Epic Games Store", "Fab", "Sketchfab", "ArtStation",
                "Mağaza İade İlkesi", "Mağaza SKLA"
            ]
        },
        {
            title: "Araçlar",
            items: [
                "Unreal Engine", "UEFN", "MetaHuman", "Twinmotion",
                "Megascans", "RealityScan", "RAD Game Tools"
            ]
        },
        {
            title: "Çevrimiçi Hizmetler",
            items: [
                "Epic Online Services", "Kids Web Services", "Hizmet Anlaşması",
                "Kabul Edilebilir Kullanım Politikası", "Dürüstlük Beyanı", "Alt Veri İşleyicisi Listesi"
            ]
        },
        {
            title: "Şirket",
            items: [
                "Hakkında", "Newsroom", "Kariyer Olanakları", "Öğrenciler",
                "Kullanıcı Deneyimi Araştırması"
            ]
        },
        {
            title: "Kaynaklar",
            items: [
                "Geliştirici Topluluğu", "MegaGrants", "İçerik Üreticilerini Destekleme",
                "İçerik Üreticisi Anlaşması", "Epic Games'te Dağıtım Yap",
                "Unreal Engine Marka Rehberleri", "Hayran İçerik Politikası",
                "Topluluk Kuralları", "AB Dijital Hizmetler Yasası Soruları",
                "Epic Profesyonel Destek"
            ]
        }
    ];

    const bottomLinks = [
        "Hizmet şartları", "Gizlilik İlkesi", "Koruma ve Güvenlik",
        "Mağaza İade İlkesi", "Yayıncı Dizini"
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-[#0e0e11] text-[#e7e7e7] font-sans pt-16 pb-8">
            <div className="max-w-[1720px] mx-auto px-8">

                {/* Header Section: Logo & Socials */}
                <div className="flex justify-between items-center mb-16">
                    <div className="font-black text-xl tracking-widest opacity-95 hover:opacity-100 cursor-pointer">
                        STORE
                    </div>
                    <div className="flex space-x-6">
                        {/* Social Icons */}
                        <a href="#" aria-label="Facebook" className="opacity-60 hover:opacity-100 transition-opacity duration-200">
                            <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                        </a>
                        <a href="#" aria-label="X (Twitter)" className="opacity-60 hover:opacity-100 transition-opacity duration-200">
                            <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                        </a>
                        <a href="#" aria-label="YouTube" className="opacity-60 hover:opacity-100 transition-opacity duration-200">
                            <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                        </a>
                    </div>
                </div>

                {/* Main Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-12 mb-16">
                    {footerSections.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-bold text-white text-[15px] mb-6 tracking-normal">{section.title}</h3>
                            <ul className="space-y-4">
                                {section.items.map((item, itemIndex) => (
                                    <li key={itemIndex}>
                                        <a href="#" className="text-[#ababab] text-[13px] hover:text-white transition-colors duration-200 hover:underline">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <hr className="border-[#2a2a2a] my-10" />

                {/* Legal & Scroll Top */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
                    <div className="w-full lg:w-3/4 text-[11px] text-[#88888a] leading-relaxed">
                        <p>
                            © 2025, Epic Games, Inc. Tüm hakları saklıdır. Epic, Epic Games, Epic Games logosu, Fortnite, Fortnite logosu,
                            Unreal, Unreal Engine, Unreal Engine logosu, Unreal Tournament ve Unreal Tournament logosu,
                            Amerika Birleşik Devletleri'nde ve başka yerlerde Epic Games, Inc.in ticari markaları veya tescilli ticari markalarıdır.
                            Diğer markalar veya ürün adları, ilgili sahiplerinin ticari markalarıdır. Web sitelerimiz, diğer sitelere ve üçüncü taraflar tarafından sağlanan kaynaklara yönlendiren bağlantılar içerebilir. Bu bağlantılar yalnızca kolaylık sağlamak için sunulmuştur.
                            Epic Games'in sitelerde ve kaynaklarda yer alan içerikler üzerinde bir kontrolü bulunmamaktadır ve bu içerikler ya da bu içeriklerin kullanımı sonucu oluşabilecek kayıp ve zararlar konusunda Epic Games sorumluluk kabul etmemektedir.
                        </p>
                    </div>

                    <div className="w-full lg:w-auto flex justify-start lg:justify-end">
                        <button
                            onClick={scrollToTop}
                            className="group border border-[#4a4a4a] hover:border-white/80 bg-transparent text-white px-5 py-2.5 transition-all duration-200 flex items-center gap-2 text-xs font-semibold tracking-wider"
                        >
                            <span className="uppercase tracking-widest">Yukarıya dön</span>
                            <span className="group-hover:-translate-y-0.5 transition-transform duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
                            </span>
                        </button>
                    </div>
                </div>

                {/* Bottom Navigation Links */}
                <div className="flex flex-wrap gap-6 pt-6 border-t border-[#2a2a2a] text-[11px] text-[#88888a]">
                    {bottomLinks.map((link, index) => (
                        <a key={index} href="#" className="hover:text-white transition-colors duration-200">
                            {link}
                        </a>
                    ))}
                </div>

            </div>
        </footer>
    );
};