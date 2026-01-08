'use client'

import { useMemo } from "react";
import { LANGUAGES } from "./languages.data";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export function LanguageSwitcher() {

    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale()

    const toogleHandler = () => {
        const newLanguage = locale === 'ru' ? 'en' : 'ru';
        router.replace(pathname, {locale: newLanguage});
        router.refresh();
    }

    const language = useMemo(() => {
        return LANGUAGES.find(lang => lang.code === locale)
    }, [locale]);

    return (
        <button className="flex items-center gap-1.5 group w-12" onClick={toogleHandler}>
            <span className=" text-lg group-hover:rotate-6 transition-transform">
                {language?.flag}
            </span>

            <span className="uppercase font-medium opacity-50">
                {language?.code}
            </span>
        </button>
    );
}