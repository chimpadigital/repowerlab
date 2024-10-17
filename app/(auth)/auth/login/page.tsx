"use client"

import React, { useState } from 'react'
import { Card } from "@nextui-org/react";
import { AppLogo, LoginIcon } from '@/components/icons';
import { subtitle } from '@/components/primitives';
import { Input } from "@nextui-org/input";
import { Button } from '@nextui-org/button';
import { login } from '@/services/auth';
import { deleteTokenCookie, setTokenCookie } from '@/utils/cookieHandler';
import { useRouter } from "next/navigation";
import { EyeFilledIcon, EyeSlashFilledIcon } from '@/components/loginIcons';

export default function Login() {
    const [email, setEmail] = useState<string>('admin@example.com');
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    const [loading, setLoading] = useState<boolean>(false)
    const [password, setPassword] = useState<string>('password');
    const [error, setError] = useState<string>('');
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        setError('');
        deleteTokenCookie()
        try {
            const userData = await login(email, password);
            setLoading(false)
            if (userData && userData.data && userData.data.access_token) {
                setTokenCookie(userData.data.access_token);
                router.push("/");
            }
        } catch (error) {
            setError((error as Error).message);
            setLoading(false)
            console.log(error)
        }
    };
    return (
        <div className='w-full h-full flex justify-center items-center px-6'>
            <Card className="max-w-[400px] w-full flex justify-center py-2 px-6">
                <div className="w-full flex justify-center items-center gap-4 flex-col pt-8">
                    <AppLogo />
                    <h1 className={subtitle() + " !w-fit"}>Login Repowerlab{"'"}s Admin</h1>
                </div>
                <div className="py-8">
                    <form onSubmit={handleSubmit}>
                        <Input onChange={(e) => setEmail(e.target.value)} value={email} type="email" variant={'bordered'} label="Email" />
                        <Input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className='pt-4'
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                    {isVisible ? (
                                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                    ) : (
                                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                    )}
                                </button>
                            }
                            type={isVisible ? "text" : "password"}
                            variant={'bordered'}
                            label="Password" />
                        {
                            error != '' &&
                            <div className="text-danger text-[12px] pt-2">Incorrect password or email. Please try again.</div>
                        }
                        <div className="mt-4 flex justify-center w-full">
                            <Button color="primary" type='submit' className='p-4' isLoading={loading} disabled={loading} endContent={<LoginIcon />}>
                                Login
                            </Button>
                        </div>
                    </form>
                </div>
            </Card>
        </div>
    )
}
