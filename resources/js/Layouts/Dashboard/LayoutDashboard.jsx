import Sidebar from '@/Components/Layouts/Sidebar';
import React from 'react'
import Navbar from '@/Components/Layouts/Navbar'
import PrelineLoader from '@/Components/config/PrelineLoader';
import { useState, useEffect } from 'react';

const LayoutDashboard = ({ children }) => {

    const [isOpenSide, setIsOpenSide] = useState(false); // Define isOpen state and setIsOpen function

    const ToggleSide = (bol) => {
        setIsOpenSide(bol);
    }
    
    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar side={isOpenSide} ToggleSide={ToggleSide} />
            <div className="flex flex-col flex-1 w-full">
                <Navbar side={ToggleSide} />
                <main className="h-full overflow-y-auto">
                    {children}
                </main>
            </div>

            <PrelineLoader />
        </div>
    )
}

export default LayoutDashboard;