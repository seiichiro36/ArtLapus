import Header from '@/components/Header'
import React from 'react'

function MainLayout({
    children
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div>
            <div className='h-screen bg-[#FFF1D5]'>
                <Header />
                {children}
            </div>
        </div>
    )
}

export default MainLayout