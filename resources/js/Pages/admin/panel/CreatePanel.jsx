import React from 'react'
import LayoutDashboard from '@/Layouts/Dashboard/LayoutDashboard'
import { Head, router, Link } from '@inertiajs/react';
import Select from 'react-select';
import { useState, useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { FaCircleInfo, FaRegCircleUser, FaLock, FaCircleCheck, FaTv, FaCheck, FaRegCircleXmark, FaCreditCard, FaRegCreditCard } from "react-icons/fa6";

import { HSOverlay } from 'preline';
const isBrowser = typeof window !== 'undefined';
import Swal from 'sweetalert2';
import { InertiaLink } from '@inertiajs/inertia-react';

export default function CreatePanel({ ...props }) {

    const { flash } = usePage().props
    const [services, setService] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalInfos, setModalInfos] = useState({});
    const [panels, setPanels] = useState([]);
    const [search, setSearch] = useState('');
    const [searchBy, setSearchBy] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [price, setPrice] = useState('');
    const [showRejectForm, setShowRejectForm] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const { data, setData, post, processing, errors } = useForm({});
    //const { data: data2, setData: setData2, post: post2, processing: processing2, errors: errors2 } = useForm({});
    useEffect(() => {
        setPanels(props.panels.data);
    }, [props.panels]);
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
    const updatedCredits = {
        ...props.panels,
        links: props.panels.links.map(link => {
            if (link.label === '&laquo; Previous') {
                return { ...link, label: 'Previous' };
            } else if (link.label === 'Next &raquo;') {
                return { ...link, label: 'Next' };
            } else {
                return link; // Leave other links unchanged
            }
        })
    };

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
    const getPaymentStatus = (data) => {
        if (data.payment_status === 'paid') {
            return (
                <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    <h2 className="text-sm font-normal">Paid</h2>
                </div>
            );
        } else if (data.payment_status === 'not paid') {
            return (
                <div className="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    <h2 className="text-sm font-normal">Not Paid</h2>
                </div>
            );
        }
    };

    const modalAction = (value) => {

        if (isBrowser) {
            setData({ id: value.id });
            setModalInfos(value);
            HSOverlay.open('#hs-slide-down-animation-modal');
        }
    };
    const closeModal = () => {
        if (isBrowser) {
            HSOverlay.close('#hs-static-backdrop-modal');
        }
    };
    const handleAccept = (value) => {
        const newData = {
            status: 'Approved',
            rejectReason,
            id: value.id,
            service_id: value.service_id,
            client_id: value.user_id,
            amount: value.amount
        };
        //console.log(newData);
        router.post('/admin/response-panel', newData)
    };
    const modalReject = (value) => {

        if (isBrowser) {
            setData({ id: value.id, client_id: value.user_id, service_id: value.service_id, amount: value.amount });
            setModalInfos(value);
            HSOverlay.open('#hs-static-backdrop-modal');
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const newData = { id: data.id, status: 'Rejected' };
        router.post('/admin/response-panel', newData);
        closeModal();
    };
   
    const handleSearch = (e) => {
        e.preventDefault();
        setLoading(true)
        let payload = {
            search: search,
            searchBy: searchBy,
        }

        router.post(route('admin.getPanel'),
            payload,
            {
                preserveScroll: true,
                preserveState: true,
                onFinish: () => setLoading(false),
            });
    };
    const paidPanel = (valueId) => {
        router.post(`/admin/paid-panel/${valueId}`,
            {
                preserveScroll: true,
                preserveState: true,
                onFinish: () => console.log('finish'),
            }
        );
    };
    return (
        <LayoutDashboard>
            <Head title="Create Panel" />
            <div className="container px-6 mx-auto grid">
                <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                    Request Create Panel
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
                                    className="text-xs font-semibold tracking-wide text-center text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                                >

                                    <th className="px-4 py-3">Client</th>
                                    <th className="px-4 py-3">Services</th>
                                    <th className="px-4 py-3">statuts</th>
                                    <th className="px-4 py-3">Price</th>
                                    <th className="px-4 py-3">Payment Status</th>
                                    <th className="px-4 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody
                                className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
                            >
                                {loading === true ? (
                                    <tr>
                                        <td className="text-center" colSpan={4}>Loading...</td>
                                    </tr>
                                ) : panels.length !== 0 ? (
                                    panels.map((value, index) => (
                                        <tr className="text-gray-700 dark:text-gray-400 text-center" key={index}>
                                            <td className="px-4 py-3">
                                                <div>
                                                    <p className="font-semibold">{value.user.username}</p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <div className="flex items-center justify-center text-sm">
                                                    <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                                        <img
                                                            className="object-cover w-full h-full rounded-full"
                                                            src={value.service.logo}
                                                            alt=""
                                                            loading="lazy"
                                                        />
                                                        <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold">{value.service.name}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-xs">
                                                {getStatus(value)}
                                            </td>
                                            <td className="px-4 py-3 font-semibold">
                                                {value.price} {value.user.currency}
                                            </td>
                                            <td className="px-4 py-3 text-xs">
                                                {getPaymentStatus(value)}
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <div className="flex justify-center space-x-4 text-sm">
                                                    <div>
                                                        <span className="group relative">
                                                            <div className="absolute bottom-[calc(100%+0.5rem)] left-[50%] -translate-x-[50%] hidden group-hover:block w-auto">
                                                                <div className="bottom-full right-0 rounded bg-black px-4 py-1 text-xs text-white whitespace-nowrap">
                                                                    Request infos
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
                                                    <div>
                                                        <span className="group relative">
                                                            <div className="absolute bottom-[calc(100%+0.5rem)] left-[50%] -translate-x-[50%] hidden group-hover:block w-auto">
                                                                <div className="bottom-full right-0 rounded bg-black px-4 py-1 text-xs text-white whitespace-nowrap">
                                                                    Accept
                                                                    <svg className="absolute left-0 top-full h-2 w-full text-black" x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve"><polygon className="fill-current" points="0,0 127.5,127.5 255,0" /></svg>
                                                                </div>
                                                            </div>
                                                            <button
                                                                className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                                                aria-label="Paid" title='set as paid' onClick={() => handleAccept(value)}
                                                            >
                                                                <FaCircleCheck />
                                                            </button>
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span className="group relative">
                                                            <div className="absolute bottom-[calc(100%+0.5rem)] left-[50%] -translate-x-[50%] hidden group-hover:block w-auto">
                                                                <div className="bottom-full right-0 rounded bg-black px-4 py-1 text-xs text-white whitespace-nowrap">
                                                                    Reject
                                                                    <svg className="absolute left-0 top-full h-2 w-full text-black" x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve"><polygon className="fill-current" points="0,0 127.5,127.5 255,0" /></svg>
                                                                </div>
                                                            </div>
                                                            <button
                                                                className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                                                aria-label="Paid" title='set as paid' onClick={() => modalReject(value)}
                                                            >
                                                                <FaRegCircleXmark />
                                                            </button>
                                                        </span>
                                                    </div>
                                                    {value.payment_status === 'not paid' && (
                                                        <div>
                                                            <span className="group relative">
                                                                <div className="absolute bottom-[calc(100%+0.5rem)] left-[50%] -translate-x-[50%] hidden group-hover:block w-auto">
                                                                    <div className="bottom-full right-0 rounded bg-black px-4 py-1 text-xs text-white whitespace-nowrap">
                                                                        set as paid
                                                                        <svg className="absolute left-0 top-full h-2 w-full text-black" x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve"><polygon className="fill-current" points="0,0 127.5,127.5 255,0" /></svg>
                                                                    </div>
                                                                </div>
                                                                <button
                                                                    className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                                                    aria-label="Paid" title='set as paid' onClick={() => paidPanel(value.id)}
                                                                >
                                                                    <FaCreditCard />
                                                                </button>
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="text-center" colSpan={4}>NO data </td>
                                    </tr>
                                )}

                            </tbody>
                        </table>

                    </div>
                    {/* Pagination links */}
                    <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                        <span className="flex items-center col-span-3">
                            Showing {props.panels.from}-{props.panels.to} of {props.panels.total}
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
                                Request infos
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
                                            <FaRegCircleUser />
                                        </span>
                                        <div className="flex flex-col flex-1">
                                            <h3 className="text-sm font-medium">Username</h3>
                                            <div className="divide-x divide-gray-200 mt-auto">
                                                <span className="inline-block px-3 text-sm leading-none text-gray-500 font-medium first:pl-0">{modalInfos?.username}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4 p-3.5 rounded-full bg-gray-100">
                                        <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-white text-gray-900">
                                            <FaLock />
                                        </span>
                                        <div className="flex flex-col flex-1">
                                            <h3 className="text-sm font-medium">Password</h3>
                                            <div className="divide-x divide-gray-200 mt-auto">
                                                <span className="inline-block px-3 text-sm leading-none text-gray-500 font-medium first:pl-0">{modalInfos?.password} </span>
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
                                                <span className="inline-block px-3 text-sm leading-none text-gray-500 font-medium first:pl-0">{modalInfos?.service?.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                            <button
                                type="button"
                                className="inline-block px-4 py-2 mt-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-500 focus:outline-none focus:bg-purple-600 float-right"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="hs-static-backdrop-modal" className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto [--overlay-backdrop:static]" data-hs-overlay-keyboard="false">
                <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                    <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                        <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                            <h3 className="font-bold text-gray-800 dark:text-white">
                                Reject Reason
                            </h3>
                            <button type="button" className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-static-backdrop-modal">
                                <span className="sr-only">Close</span>
                                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                        </div>
                        <div className="p-4 overflow-y-auto">
                            <div className="mt-4">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <div className="flex flex-col">
                                            <label htmlFor="rejectReason" className="fs-6 form-label fw-bold text-gray-900">Reject Reason:</label>
                                            <textarea
                                                id="rejectReason"
                                                value={rejectReason}
                                                onChange={(e) => setRejectReason(e.target.value)}
                                                className="py-3 px-4 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
                                                rows="3"
                                                placeholder="Enter reject reason..."
                                            />
                                        </div>
                                        <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                                            <button
                                                type="submit"
                                                className="inline-block px-4 py-2 mt-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-500 focus:outline-none focus:bg-purple-600 float-right"
                                            >
                                                Submit
                                            </button>
                                            <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-slide-down-animation-modal">
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutDashboard>
    )
}
