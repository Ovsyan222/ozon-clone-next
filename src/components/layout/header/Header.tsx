'use client'

import { LayoutGrid, Search, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { headerMenu } from "../header/header-menu.data";
import {useTranslations} from 'next-intl';
import cn from "clsx";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { Auth } from "./Auth";

export function Header() {

    const t = useTranslations('header');

    const { isOpen, setIsOpen, ref } = useOutsideClick<HTMLDivElement>(false)
      


  return (
    <>
    <header className="grid grid-cols-[2fr_7fr_2.3fr] gap-7 items-center mt-3 mx-5">
        <div className="flex items-center gap-7">
            <Link href="/">
                <Image
                    src="/logo.svg"
                    alt="Ozon"
                    width={140}
                    height={80}
                    unoptimized
                />
            </Link>
            
            <button className="bg-primary p-2 rounded-md text-white 
            flex items-center gap-2 font-medium">
                <LayoutGrid fill="#fff" />

                <span>{t('catalogTitle')}</span>
            </button>
        </div>

        <div className="rounded-xl p-1 flex items-center bg-primary">
            <input 
                type="text" 
                placeholder="Искать на Ozon"
                value=""
                onChange={() => {}}
                className="bg-white rounded-lg px-4 py-1.5 w-full"
            />
            <button className="px-6">
                <Search color="#fff"/>
            </button>
        </div>

        <div className="flex gap-5 items-center ml-2 justify-end">
                <button className={cn("flex items-center flex-col")}
                    onClick={() => setIsOpen(true)}>
                    <User size={20} />
                    <span className="text-sm font-medium">Войти</span>
                </button>
            {headerMenu.map((item) => (
                <Link 
                    key={item.title} 
                    href={item.href}
                    className={cn(
                    "flex items-center flex-col transition-opacity hover:opacity-100 opacity-50"
                    )}
                >
                    <item.icon size={20} />

                    <span className="text-sm font-medium">{item.title}</span>
                </Link>
            ))}
        </div>
    </header>
    {isOpen && <Auth setIsOpen={setIsOpen} ref={ref} />}
    </>
  );
}