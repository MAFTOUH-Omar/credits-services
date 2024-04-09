import React, { useState, useRef, useEffect } from 'react'
import { siteSettings } from '@/settings/setting';
import { Link } from '@inertiajs/react';
import { FiLayers } from 'react-icons/fi';
import { FaRegCreditCard, FaRegCircleDot, FaNoteSticky } from "react-icons/fa6";
// import { FaHouseChimney, FaLink, FaCode, FaUser, FaList, FaCreditCard, FaPersonCircleExclamation, FaScrewdriverWrench, FaRegCreditCard} from "react-icons/fa6";
// import { FaStickyNote, FaBusinessTime } from "react-icons/fa";
// import { BsTvFill} from "react-icons/bs";
// import DropdownSidebar from '@/Components/sidebar-util/DropdownSidebar';
// import { BsTvFill, FaCircle, FaAngleDown } from "react-icons/bs";
// import Accordion from 'react-bootstrap/Accordion';

export default function Client() {
    const clientLink = siteSettings.sidebarLinks.client;
    // const clientLink = siteSettings.sidebarLinks.admin;
    const path = window.location.pathname;
    const [isPagesMenuOpen, setIsPagesMenuOpen] = useState(false);
    let payment_list = [

        {
            href: clientLink.payment_list.index_add.href,
            label: clientLink.payment_list.index_add.label
        },
        {
            href: clientLink.payment_list.index.href,
            label: clientLink.payment_list.index.label
        }
    ]
    const togglePagesMenu = () => {
        setIsPagesMenuOpen(!isPagesMenuOpen);
    };
    return (
        <ul className="mt-6">
            <li className="relative px-6 py-3">
                <span className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg" aria-hidden="true" ></span>
                <Link
                    className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"
                    href={route(clientLink.home.href)}
                >
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        ></path>
                    </svg>
                    <span className="ml-4">{clientLink.home.label}</span>
                </Link>
            </li>
            <li className="relative px-6 py-3">
                <Link
                    className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"
                    href={route(clientLink.ticket_list.href)}
                >
                    <FaNoteSticky />
                    <span className="ml-4">{clientLink.ticket_list.label}</span>
                </Link>
            </li>
            <li className="relative px-6 py-3">

                <Link
                    className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"
                    href={route(clientLink.create_panel.href)}
                >
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                        ></path>
                    </svg>
                    <span className="ml-4">{clientLink.create_panel.label}</span>
                </Link>
            </li>
            <li className="relative px-6 py-3">

                <Link
                    className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"
                    href={route(clientLink.credits_request.href)}
                >
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        ></path>
                    </svg>
                    <span className="ml-4">{clientLink.credits_request.label}</span>
                </Link>
            </li>
            {/* <li className="relative px-6 py-3">

                <Link
                    className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"
                    href={route(clientLink.payment_list.href)}
                >
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                        ></path>
                    </svg>
                    <span className="ml-4">{clientLink.payment_list.label}</span>
                </Link>
            </li> */}
            <li className="relative px-6 py-3">
                <button
                    className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                    onClick={togglePagesMenu}
                    aria-haspopup="true"
                >
                    <span className="inline-flex items-center">
                        <FaRegCreditCard className="w-5 h-5" />
                        {/* <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                            ></path>
                        </svg> */}

                        <span className="ml-4">Manage Payment</span>
                    </span>
                    <svg
                        className={`w-4 h-4 ${isPagesMenuOpen ? 'transform rotate-180' : ''}`}
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </button>
                {isPagesMenuOpen && (
                    <ul
                        className="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
                        aria-label="submenu"
                    >
                        {payment_list.map((link, index) => (
                            <li key={index} className="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                                <Link
                                    href={route(link.href)}
                                    className="w-full"
                                >
                                    <span className="menu-bullet inline-block align-middle mr-1">
                                        <span className="bullet bullet-dot"> <FaRegCircleDot size={10} /></span>
                                    </span>

                                    <span className="menu-title inline-block align-middle">{link.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                )}
            </li>
            <li className="relative px-6 py-3">

                <Link
                    className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"
                    href={route(clientLink.service_list.href)}
                >
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
                    </svg>
                    <span className="ml-4">{clientLink.service_list.label}</span>
                </Link>
            </li>
            <li className="relative px-6 py-3">

                <Link
                    className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"
                    href={route(clientLink.other_service.href)}
                >
                    <FiLayers  />
                    <span className="ml-4">{clientLink.other_service.label}</span>
                </Link>
            </li>
        </ul>


    )
}
