"use client"
import React, { useState } from 'react'
import { Card } from "@nextui-org/react";
import { AppLogo, LoginIcon } from '@/components/icons';
import { subtitle } from '@/components/primitives';
import { Input } from "@nextui-org/input";
import { Button } from '@nextui-org/button';
import { login } from '@/services/auth';

export default function Login() {
    const [email, setEmail] = useState<string>('admin@example.com');
    const [password, setPassword] = useState<string>('password');
    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
    
        try {
          const userData = await login(email, password);
          alert('Login successful!');
          // Handle successful login, e.g., redirect or set user context
          console.log('User data:', userData);
        } catch (error) {
          setError((error as Error).message);
        }
      };
    return (
        <div className='w-full h-full flex justify-center items-center px-6'>
            <Card className="max-w-[400px] w-full flex justify-center py-2 px-6">
                <div className="w-full flex justify-center items-center gap-4 flex-col pt-8">
                    <AppLogo />
                    <h1 className={subtitle() + " !w-fit"}>Login</h1>
                </div>
                <div className="py-8">
                    <form onSubmit={handleSubmit}>

                        <Input onChange={(e) => setEmail(e.target.value)} value={email} type="email" variant={'bordered'} label="Email" />
                        <Input  onChange={(e) => setPassword(e.target.value)} value={password} className='pt-4' type="password" variant={'bordered'} label="Password" />
                        <div className="mt-4 flex justify-center w-full">
                            <Button color="primary" type='submit' className='p-4' endContent={<LoginIcon />}>
                                Login
                            </Button>
                        </div>
                    </form>
                </div>
            </Card>
        </div>
    )
}
