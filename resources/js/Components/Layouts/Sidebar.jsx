import React from 'react'
import Admin from './Sidebar/Admin'
import { Link, usePage } from '@inertiajs/react';
import Client from './Sidebar/Client';
import { siteSettings } from '@/settings/setting';
import { useState, useEffect } from 'react';
import {  AiOutlineClose } from "react-icons/ai";
import { Fragment } from 'react';

const Sidebar = ({ side, ToggleSide }) => {
    const { auth } = usePage().props;
    const asset = siteSettings.base_url_asset;

    const [nav, setNav] = useState(false);

    useEffect(() => {
        setNav(side);
    }, [side])

    const changeSide = () => {
        setNav(!nav);
        ToggleSide(false);
    }

    return (
        <Fragment>
            {nav ? (
                <div onClick={() => changeSide()} className="bg-black/50 fixed w-full h-screen z-10 top-0 left-0"></div>
            ) : (
                ""
            )}

        
            <div
                className={`lg:relative lg:z-30 lg:shadow-md lg:left-auto w-64 h-screen bg-white z-10 duration-300
                    ${
                        nav
                        ? "fixed top-0 left-0  "
                        : "fixed top-0 left-[-100%] "
                    }
                `}
            >
                <AiOutlineClose
                    onClick={() => changeSide()}
                    size={30}
                    className="absolute right-4 top-4 cursor-pointer lg:hidden"
                />

                <div className="py-4 text-gray-500 dark:text-gray-400">
                    <a className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
                        href="#" >
                        IP-TV Services
                    </a>
                    {auth.user.role === 1 ? (
                        <Admin />
                    ) : (
                        <Client />
                    )}

                    <div className="px-6 my-6">
                        <Link
                            href={route('profile.edit')} className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                        >
                            Account Setting
                            <span className="ml-2" aria-hidden="true">+</span>
                        </Link>
                    </div>

                </div>
            </div>
        </Fragment>
   
    )
}

export default Sidebar