import React from 'react'
import LayoutDashboard from '@/Layouts/Dashboard/LayoutDashboard'
import Select from 'react-select';
import { useState, useEffect } from 'react';
import { siteSettings } from '@/settings/setting';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react'
import { HSOverlay } from 'preline';
const isBrowser = typeof window !== 'undefined';
import Swal from 'sweetalert2';
import { InertiaLink } from '@inertiajs/inertia-react';
import { FaCircleInfo, FaRegCircleUser, FaLock, FaTv, FaCheck, FaRegCircleXmark, FaPenClip, FaRegCreditCard } from "react-icons/fa6";

export default function TicketList({ ...props }) {
    const asset = siteSettings.base_url_asset;
    const { flash } = usePage().props
    const { auth } = usePage().props
    const [tickets, setTickets] = useState([]);
    const [search, setSearch] = useState('');
    const [ascending, setAscending] = useState(true);
    const [searchBy, setSearchBy] = useState('');
    const [showRejectForm, setShowRejectForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalInfos, setModalInfos] = useState({});
    const { data, setData, post, processing, errors } = useForm({});

    useEffect(() => {
        setTickets(props.tickets.data);
    }, [props.tickets]);
console.log(tickets);
    useEffect(() => {
        if (isBrowser) {
            import("preline/preline").then((module) => {
                // Once loaded, call autoInit after a short delay
                setTimeout(() => {
                    window.HSStaticMethods.autoInit();
                }, 100);
            });
        }
    }, []);
    useEffect(() => {
        if (flash.sweet_success) {
            Swal.fire({
                title: 'Success!',
                text: flash.sweet_success,
                icon: 'success'
            });
        } else if (flash.sweet_error) {
            Swal.fire({
                title: 'Oops..!',
                text: flash.sweet_error,
                icon: 'error'
            });
        }
    }, [flash.sweet_success, flash.sweet_error]);
    const optionsStatus = [
        { value: 1, label: 'All' },
        { value: 2, label: 'In progress' },
        { value: 3, label: 'Approved' },
        { value: 4, label: 'Rejected' }
    ];
    const getStatus = (data) => {
        if (data.status === 'in progress') {
            return (
                <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-500/10 dark:text-blue-500">
                    <svg className="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="6" /><line x1="12" x2="12" y1="18" y2="22" /><line x1="4.93" x2="7.76" y1="4.93" y2="7.76" /><line x1="16.24" x2="19.07" y1="16.24" y2="19.07" /><line x1="2" x2="6" y1="12" y2="12" /><line x1="18" x2="22" y1="12" y2="12" /><line x1="4.93" x2="7.76" y1="19.07" y2="16.24" /><line x1="16.24" x2="19.07" y1="7.76" y2="4.93" /></svg>
                    In progress
                </span>
            );
        } else if (data.status === 'Approved') {
            return (
                <span className="py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                    <svg className="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="m9 12 2 2 4-4" /></svg>
                    Approved
                </span>
            );
        } else if (data.status === 'Rejected') {
            return (
                <span className="py-1 px-2 inline-flex items-center text-xs font-medium  text-red-500 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Rejected
                </span>
            );
        }
    };
    const handleSort = () => {
        setAscending(!ascending);
    };

    const sortedServices = [...tickets].sort((a, b) => {
        const balanceA = parseFloat(a.quantity);
        const balanceB = parseFloat(b.quantity);
        return ascending ? balanceA - balanceB : balanceB - balanceA;
    });
    const updatedCredits = {
        ...props.tickets,
        links: props.tickets.links.map(link => {
            if (link.label === '&laquo; Previous') {
                return { ...link, label: 'Previous' };
            } else if (link.label === 'Next &raquo;') {
                return { ...link, label: 'Next' };
            } else {
                return link; // Leave other links unchanged
            }
        })
    };
    const handleShow = () => {
        // Show the reject form
        setShowRejectForm(true);
        setShowForm(false);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };
    const modalAction = (value) => {

        if (isBrowser) {
            setData({ ...data, ...value });
            setModalInfos(value);
            HSOverlay.open('#hs-slide-down-animation-modal');
        }
    };
    const handleSearch = (e) => {
        e.preventDefault();
        setLoading(true)
        let payload = {
            search: search,
            searchBy: searchBy,
        }

        router.post(route('client.getTicket'),
            payload,
            {
                preserveScroll: true,
                preserveState: true,
                onFinish: () => setLoading(false),
            });
    };
    return (
        <LayoutDashboard>
            <Head title="Service tList" />
            <div className="container px-6 mx-auto grid">
                <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                    Tickets List
                </h2>
                <form onSubmit={handleSearch}>
                    <div
                        className="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-purple-100 bg-white rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple transform hover:scale-105 transition duration-500"
                    >
                        <div className="flex justify-center flex-1 lg:mr-32">



                            <div
                                className="relative w-full max-w-xl mr-6 focus-within:text-purple-500"
                            >
                                <div className="absolute inset-y-0 flex items-center pl-2">
                                    <svg
                                        className="w-4 h-4"
                                        aria-hidden="true"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                                <input
                                    className="w-full pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:placeholder-gray-500 focus:bg-white focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input"
                                    type="text"
                                    name="search"
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search...."
                                    aria-label="Search"
                                />
                            </div>
                        </div>
                        <div className="flex py-3 px-4 rounded-lg text-gray-500 font-semibold cursor-pointer">
                            <Select className="react-select-styled"
                                classNamePrefix='react-select'
                                options={optionsStatus}
                                placeholder='Filter by'
                                name='searchBy'
                                onChange={setSearchBy}
                            />
                        </div>
                        <button type='submit' className="bg-red-600 py-3 px-5 text-white font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer text-end">
                            <span>Search</span>
                        </button>

                    </div>
                </form>
                <div className="w-full overflow-hidden rounded-lg shadow-xs">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full whitespace-no-wrap">
                            <thead>
                                <tr
                                    className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                                >
                                    <th className="px-4 py-3">Service</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th scope="col" className="py-3.5 px-4  text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center gap-x-3" onClick={handleSort}>
                                            <button className="flex items-center gap-x-2">
                                                <span>Quantity</span>

                                                <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                                                    <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                                                    <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" strokeWidth="0.3" />
                                                </svg>
                                            </button>
                                        </div>
                                    </th>
                                    <th className="px-4 py-3">Message</th>
                                    <th className="px-4 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody
                                className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
                            >
                                {loading === true ?
                                    <tr>
                                        <td className='text-center' colSpan={14}>Loading...</td>
                                    </tr>
                                    :
                                    tickets.length !== 0 ?

                                        sortedServices.map((value, index) => {
                                            return (
                                                <tr className="text-gray-700 dark:text-gray-400" key={index}>
                                                    <td className="px-4 py-3 font-semibold">
                                                        {value.service_name}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm"> {getStatus(value)} </td>
                                                    <td className="px-4 py-3 text-xs">
                                                        <span
                                                            className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
                                                        >
                                                            {value.quantity}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm"> {value.message} </td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center space-x-4 text-sm">
                                                            <div>
                                                                <span className="group relative">
                                                                    <div className="absolute bottom-[calc(100%+0.5rem)] left-[50%] -translate-x-[50%] hidden group-hover:block w-auto">
                                                                        <div className="bottom-full right-0 rounded bg-black px-4 py-1 text-xs text-white whitespace-nowrap">
                                                                            ticket infos
                                                                            <svg className="absolute left-0 top-full h-2 w-full text-black" x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve"><polygon className="fill-current" points="0,0 127.5,127.5 255,0" /></svg>
                                                                        </div>
                                                                    </div>
                                                                    <button
                                                                        className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                                                        aria-label="info" onClick={() => modalAction(value)}
                                                                    >
                                                                        <FaCircleInfo />
                                                                    </button>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr>
                                            <td className='text-center' colSpan={14}>No data</td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination links */}
                    <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                        <span className="flex items-center col-span-3">
                            Showing {props.tickets.from}-{props.tickets.to} of {props.tickets.total}
                        </span>
                        <span className="col-span-2"></span>
                        <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                            <nav aria-label="Table navigation">
                                <ul className="inline-flex items-center">
                                    {updatedCredits.links.map((link, index) => (
                                        <li key={link.url || index}>
                                            <InertiaLink
                                                className={`px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple ${link.active ? 'text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md' : ''
                                                    }`}
                                                href={link.url}
                                            >
                                                {link.label}
                                            </InertiaLink>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </span>
                    </div>
                </div>
            </div>
            <div id="hs-slide-down-animation-modal" className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none">
                <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                    <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                        <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                            <h3 className="font-bold text-gray-800 dark:text-white">
                                Ticket Details
                            </h3>
                            <button type="button" className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-slide-down-animation-modal">
                                <span className="sr-only">Close</span>
                                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                        </div>
                        <div className="p-3 overflow-y-auto">
                            <div aria-label="card" className="p-8 rounded-3xl bg-white w-full">
                                <div aria-label="content" className="grid gap-3">
                                    <div className="flex items-center space-x-4 p-3.5 rounded-full bg-gray-100">
                                        <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-white text-gray-900">
                                            <FaRegCreditCard />
                                        </span>
                                        <div className="flex flex-col flex-1">
                                            <h3 className="text-sm font-medium">Quantity</h3>
                                            <div className="divide-x divide-gray-200 mt-auto">
                                                <span className="inline-block px-3 text-sm leading-none text-gray-500 font-medium first:pl-0">{modalInfos?.quantity}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4 p-3.5 rounded-full bg-gray-100">
                                        <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-white text-gray-900">
                                            <FaTv />
                                        </span>
                                        <div className="flex flex-col flex-1">
                                            <h3 className="text-sm font-medium">Service</h3>
                                            <div className="divide-x divide-gray-200 mt-auto">
                                                <span className="inline-block px-3 text-sm leading-none text-gray-500 font-medium first:pl-0">{modalInfos?.service_name}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4 p-3.5 rounded-full bg-gray-100">
                                        <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-white text-gray-900">
                                            <FaPenClip />
                                        </span>
                                        <div className="flex flex-col flex-1">
                                            <h3 className="text-sm font-medium">Response</h3>
                                            <div className="divide-x divide-gray-200 mt-auto">
                                                <span className="inline-block px-3 text-sm leading-none text-gray-500 font-medium first:pl-0">{modalInfos?.ticket_response?.message_response}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutDashboard>
    )
}
