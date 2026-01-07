import Link from "next/link";
import { topMenu } from "./top-menu.data";
import cn from "clsx";

export function TopMenu() {
  return (
    <nav className="flex gap-6 items-center mt-6 mx-5">
        {topMenu.map((menuItem, index) => (
            <Link 
                key={menuItem.title}
                href={menuItem.href}
                className={
                    cn('flex items-center transition-opacity hover:opacity-100 opacity-50 font-medium',
                    index === 0 && 'opacity-100 text-teal-600'
                )}
            >
               {menuItem.icon && (
                    <menuItem.icon 
                    size={16} 
                    style={{marginRight: 4}} 
                    />
                )}
                    <span>{menuItem.title}</span>
            </Link>
        ))}
    </nav>
  );
}