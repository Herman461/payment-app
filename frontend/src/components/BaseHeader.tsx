'use client'

import Image from "next/image"
import Link from "next/link"


export default function BaseHeader() {
    return (
        <header className="header">
            <div className="header__container container">
                <Link href="" className="header__logo">
                    <Image 
                        width={78} 
                        height={41} 
                        priority={true}
                        src="/logo.svg" 
                        alt="logo" 
                    />
                </Link>
            </div>

        </header>
    )
}