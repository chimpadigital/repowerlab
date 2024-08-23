"use client"
import React, { useState } from 'react'
import { ThemeSwitch } from './theme-switch'
import { subtitle } from './primitives'
import { AppLogo } from './icons'
import { siteConfig } from '@/config/site'
import Link from 'next/link'
import { deleteTokenCookie } from '@/utils/cookieHandler'

export default function Sidebar() {
    const [open, setOpen] = useState(true)
    return (
        <div className='w-[300px] hidden md:flex border-r border-[#ddd] h-full p-4 relative flex-col justify-between'>
            <div>
                <div className="pt-6 flex gap-4">
                    <AppLogo />
                    <h5 className={subtitle()}>Repowerlab</h5>
                </div>
                <ul className='pt-6'>
                    {
                        siteConfig.navItems.map((el, i) => (
                            <li key={"nav" + i}>
                                <Link className={subtitle()} href={el.href}>{el.label}</Link>
                            </li>
                        ))
                    }
                </ul>


            </div>
            <div>
                <div>
                    <Link onClick={() => { deleteTokenCookie() }} className={subtitle()} href="/auth/login">Log out</Link>
                </div>
                <div className="w-full flex justify-end">
                    <ThemeSwitch />
                </div>
            </div>
        </div>
    )
}
