// Auth.tsx - исправленная версия
'use client'

import { useSession, signUp, signIn } from "@/lib/auth-client"
import { Dispatch, RefObject, SetStateAction, useState } from "react"
import { SkeletonLoader } from "@/components/ui/SkeletonLoader";
import { Field } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { CircleAlert } from "lucide-react";
import { useRouter } from "next/navigation"; // Добавьте

interface Props {
    setIsOpen: Dispatch<SetStateAction<boolean>>
    ref: RefObject<HTMLDivElement | null>
}

export function Auth({ setIsOpen, ref }: Props) {
    const { isPending } = useSession();
    const router = useRouter(); // Добавьте

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [isSignUp, setIsSignUp] = useState(false) // Добавьте для переключения

    const handleSignUp = async () => {
        try {
            const { error } = await signUp.email({ 
                email, 
                password, 
                name,
                callbackURL: "/" 
            })

            if (error?.message) {
                setError(error.message)
            } else {
                setIsOpen(false)
                router.refresh() // Обновить страницу
            }
        } catch (err: any) {
            setError(err.message || "Ошибка регистрации")
        }
    }

    const handleSignIn = async () => {
        try {
            const { error } = await signIn.email({ 
                email, 
                password,
                callbackURL: "/" 
            })

            if (error?.message) {
                setError(error.message)
            } else {
                setIsOpen(false)
                router.refresh() // Обновить страницу
            }
        } catch (err: any) {
            setError(err.message || "Ошибка входа")
        }
    }

    return (
        <Modal onClose={() => setIsOpen(false)} ref={ref}>
            <h1 className="text-3xl font-bold mb-5">Вход/Регистрация</h1>
            {error && (
                <div className="text-red-500 flex items-center mb-4 gap-1.5">
                    <CircleAlert className="inline mb-1 mr-1 text-red-500"/>
                    <p className="italic">{error}</p>
                </div>
            )}

            {isPending ? (
                <SkeletonLoader count={3} className="mb-3 w-full h-13.25"/>
            ) : (
                <>
                    <Field 
                        type="email" 
                        placeholder="Введите email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        className="w-full border px-4 py-2 mb-2 rounded"
                    />
                    <Field 
                        type="password" 
                        placeholder="Введите пароль" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        className="w-full border px-4 py-2 mb-2 rounded"
                    />
                    
                    {/* Показывать поле имени только при регистрации */}
                    {isSignUp && (
                        <Field 
                            type="text" 
                            placeholder="Введите имя" 
                            value={name} 
                            onChange={e => setName(e.target.value)} 
                            className="w-full border px-4 py-2 mb-2 rounded"
                        />
                    )}
                </>
            )}

            <div className="flex gap-2 mt-4">
                {!isSignUp ? (
                    <>
                        <Button 
                            onClick={handleSignIn} 
                            disabled={isPending}
                            className="flex-1"
                        >
                            {isPending ? 'Загрузка...' : 'Войти'}
                        </Button>
                        <Button 
                            variant="secondary"
                            onClick={() => setIsSignUp(true)}
                            disabled={isPending}
                            className="flex-1"
                        >
                            Регистрация
                        </Button>
                    </>
                ) : (
                    <>
                        <Button 
                            onClick={handleSignUp} 
                            disabled={isPending}
                            className="flex-1"
                        >
                            {isPending ? 'Регистрация...' : 'Зарегистрироваться'}
                        </Button>
                        <Button 
                            variant="secondary"
                            onClick={() => setIsSignUp(false)}
                            disabled={isPending}
                            className="flex-1"
                        >
                            Назад
                        </Button>
                    </>
                )}
            </div>
        </Modal>
    )
}