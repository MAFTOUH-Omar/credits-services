import React, { useState, useEffect } from 'react'
import LayoutDashboard from '@/Layouts/Dashboard/LayoutDashboard'
import { Head, Link } from '@inertiajs/react';
import Select from 'react-select';
import { siteSettings } from '@/settings/setting';
import Dropdown from 'react-bootstrap/Dropdown';
import { FaFileInvoiceDollar, FaRegCreditCard, FaTv } from "react-icons/fa6";
import { HSOverlay } from 'preline';
import { useForm, usePage } from '@inertiajs/react';
const isBrowser = typeof window !== 'undefined';
import { InertiaLink } from '@inertiajs/inertia-react';
import Swal from 'sweetalert2';

export default function Dashboard({ ...props }) {

    const { flash } = usePage().props;
    const { auth } = usePage().props
    const [services, setService] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalInfos, setModalInfos] = useState({});
    const { data, setData, post, processing, errors } = useForm({});
    const { data: data2, setData: setData2, post: post2, processing: processing2, errors: errors2 } = useForm({});
    const { data: data3, setData: setData3, post: post3, processing: processing3, errors: errors3 } = useForm({});
    const { data: data4, setData: setData4, post: post4, processing: processing4, errors: errors4 } = useForm({
        name: '',
        action: '',
        username: '',
        creditDesired: '',

    });
    const { formData, setoFrmData } = useState([]);
    const optionsStatus = [
        { value: 'Add Credits', label: 'Add Credits' },
        { value: 'Create New Panel', label: 'Create New Panel' }
    ];
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData4({ ...data4, [name]: value });
    };
    const handleSelectChange = (selectedOption) => {
        setData4({ ...data4, action: selectedOption.value }); // Assuming the value of the selected option is what you want to set
    };
    useEffect(() => {
        setService(props.service.data);
    }, [props.service]);console.log(props.service)
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
    const updatedCredits = {
        ...props.service,
        links: props.service.links.map(link => {
            if (link.label === '&laquo; Previous') {
                return { ...link, label: 'Previous' };
            } else if (link.label === 'Next &raquo;') {
                return { ...link, label: 'Next' };
            } else {
                return link; // Leave other links unchanged
            }
        })
    };
    const modalCredit = (value) => {

        if (isBrowser) {
            setData({ ...data, service_id: value });
            setModalInfos(value);
            HSOverlay.open('#hs-basic-modal');
        }
    };
    const closeModalCredit = () => {
        if (isBrowser) {
            HSOverlay.close('#hs-basic-modal');
        }
    };
    const modalPanel = (value) => {
        if (isBrowser) {
            setData2({ ...data2, service_id: value });
            setModalInfos(value);
            HSOverlay.open('#hs-slide-down-animation-modal');
        }
    };
    const closeModalPanel  = () => {
        if (isBrowser) {
            HSOverlay.close('#hs-slide-down-animation-modal');
        }
    };
    const modalService = () => {
        if (isBrowser) {
            HSOverlay.open('#hs-small-modal');
        }
    };
    const closeModalService  = () => {
        if (isBrowser) {
            HSOverlay.close('#hs-small-modal');
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };
    const handlePanelChange = (e) => {
        const { name, value } = e.target;
        setData2({ ...data2, [name]: value });
    };
    const handleSubmitCredit = (e) => {
        e.preventDefault();
        console.log(data);
        post('/client/new-credit');
        closeModalCredit();
    };
    const handleSubmitPanel = (e) => {
        e.preventDefault();
        post2('/client/new-panel');
        closeModalPanel();
    };
    const Submit = (e) => {
        e.preventDefault();
        post4('/client/add-other-service');
        closeModalService();
    };

    return (
        <LayoutDashboard>
            <Head title="Home Client" />
            <div className="container px-6 mx-auto grid">
                <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                    Dashboard
                </h2>
                <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
                    <div
                        className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
                    >
                        <div
                            className="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </div>
                        <div>
                            <p
                                className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
                            >
                                Request Credits
                            </p>
                            <p
                                className="text-lg font-semibold text-gray-700 dark:text-gray-200"
                            >
                                {props.totalCredits}
                            </p>
                        </div>
                    </div>
                    <div
                        className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
                    >
                        <div
                            className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                                ></path>
                            </svg>
                        </div>
                        <div>
                            <p
                                className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
                            >
                                New Panel
                            </p>
                            <p
                                className="text-lg font-semibold text-gray-700 dark:text-gray-200"
                            >
                                {props.totalPanels}
                            </p>
                        </div>
                    </div>
                    <div
                        className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
                    >
                        <div
                            className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </div>
                        <div>
                            <p
                                className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
                            >
                                Payment
                            </p>
                            <p
                                className="text-lg font-semibold text-gray-700 dark:text-gray-200"
                            >
                                {props.totalPayments}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-white bg-purple-700 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple">
                    <div className="flex items-center">
                        <svg
                            className="w-6 h-6 mr-3 fill-current text-yellow-300"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <span>
                            <span className="font-bold">Our Services </span>
                            <span className="font-normal text-gray-300">
                                " For benefit promo, go to page
                                <Link href={route('client.services')} className="text-yellow-300 hover:underline"> service promo "</Link>
                            </span>
                        </span>
                    </div>
                </div>
                <div className="w-full overflow-hidden rounded-lg shadow-xs">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-blueGray-700">Services</h3>
                            </div>
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                <button className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500" onClick={() => modalService()}>Ask for other service</button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full overflow-x-auto">
                        <table className="w-full whitespace-no-wrap">
                            <thead>
                                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Description</th>
                                    <th className="px-4 py-3">Price</th>
                                    <th className="px-4 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                                {loading === true ? (
                                    <tr>
                                        <td className="text-center" colSpan={4}>Loading...</td>
                                    </tr>
                                ) : services.length !== 0 ? (
                                    services.map((value, index) => (
                                        <tr className="text-gray-700 dark:text-gray-400" key={index}>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center text-sm">
                                                    <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                                        <img className="object-cover w-full h-full rounded-full" src={value.logo} alt="" loading="lazy" />
                                                        <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold">{value.name}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-sm">{value.description}</td>
                                            <td className="px-4 py-3 text-xs">
                                                <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                                                    {value.final_price} {auth.user.currency}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="hs-dropdown relative inline-flex [--placement:right-top]">
                                                    <button id="hs-dropright" type="button" className="hs-dropdown-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                                        Action
                                                        <svg className="flex-shrink-0 size-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                                    </button>

                                                    <div className="hs-dropdown-menu w-72 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10 bg-white shadow-md rounded-lg p-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700" aria-labelledby="hs-dropright">
                                                        <button className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700" onClick={() => modalCredit(value.id)}>
                                                            <FaRegCreditCard className="flex-shrink-0 size-4" width="24" height="24"><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></FaRegCreditCard>
                                                            Request Credit
                                                        </button>
                                                        <button className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700" onClick={() => modalPanel(value.id)}>
                                                            <FaTv className="flex-shrink-0 size-4" width="24" height="24"><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></FaTv>
                                                            Add New Panel
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="text-center" colSpan={4}>No data</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination links */}
                    <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                        <span className="flex items-center col-span-3">
                            Showing {props.service.from}-{props.service.to} of {props.service.total}
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
                    <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                    </div>
                </div>
                <div className="text-right mt-4">
                    <Link href={route('client.services')} className="bg-purple-600  hover:bg-purple-700  text-white font-semibold py-2 px-4 rounded">
                        see more
                    </Link>
                </div>
            </div>
            <div id="hs-basic-modal" className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-[80] opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none">
                <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 opacity-0 transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                    <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                        <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                            <h3 className="font-bold text-gray-800 dark:text-white">
                                Requset Credits
                            </h3>
                            <button type="button" className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-basic-modal">
                                <span className="sr-only">Close</span>
                                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                        </div>
                        <div className="p-4 overflow-y-auto">
                            <form onSubmit={handleSubmitCredit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-semibold mb-2">Userame *</label>
                                    <input type="text" onChange={handleInputChange} name='username' className="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Enter username" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-semibold mb-2"> Amount *</label>
                                    <input type="number" min={10} onChange={handleInputChange} name='amount' className="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Enter amout" />
                                    <p className="text-red text-xs italic">Credit should be greater than 10.</p>
                                </div>
                                <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                                    <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-basic-modal">
                                        Close
                                    </button>
                                    <button type="submit" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div id="hs-slide-down-animation-modal" className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none">
                <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                    <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                        <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                            <h3 className="font-bold text-gray-800 dark:text-white">
                                Create New Panel
                            </h3>
                            <button type="button" className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-slide-down-animation-modal">
                                <span className="sr-only">Close</span>
                                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                        </div>
                        <div className="p-4 overflow-y-auto">
                            <form onSubmit={handleSubmitPanel}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-semibold mb-2">Userame *</label>
                                    <input type="text" onChange={handlePanelChange} name='username' className="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-purple-700 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Enter username" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-semibold mb-2">Password *</label>
                                    <div className="flex mb-2">
                                        <div className="flex-1">
                                            <input type="text" id="hs-strong-password-with-indicator-and-hint" onChange={handlePanelChange} name='password' className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-purple-700 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Enter password" />
                                            <div id="hs-strong-password" data-hs-strong-password='{
                                                    "target": "#hs-strong-password-with-indicator-and-hint",
                                                    "hints": "#hs-strong-password-hints",
                                                    "stripClasses": "hs-strong-password:opacity-100 hs-strong-password-accepted:bg-teal-500 h-2 flex-auto rounded-full bg-blue-500 opacity-50 mx-1"
                                                }' className="flex mt-2 -mx-1"
                                            ></div>
                                        </div>
                                    </div>

                                    <div id="hs-strong-password-hints" className="mb-3">
                                        <div>
                                            <span className="text-sm text-gray-800 dark:text-gray-200">Level:</span>
                                            <span data-hs-strong-password-hints-weakness-text='["Empty", "Weak", "Medium", "Strong", "Very Strong", "Super Strong"]' className="text-sm font-semibold text-gray-800 dark:text-gray-200"></span>
                                        </div>

                                        <h4 className="my-2 text-sm font-semibold text-gray-800 dark:text-white">
                                            Your password must contain:
                                        </h4>

                                        <ul className="space-y-1 text-sm text-gray-500">
                                            <li data-hs-strong-password-hints-rule-text="min-length" className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
                                                <span className="hidden" data-check>
                                                    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                                </span>
                                                <span data-uncheck>
                                                    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                                </span>
                                                Minimum number of characters is 6.
                                            </li>
                                            <li data-hs-strong-password-hints-rule-text="lowercase" className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
                                                <span className="hidden" data-check>
                                                    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                                </span>
                                                <span data-uncheck>
                                                    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                                </span>
                                                Should contain lowercase.
                                            </li>
                                            <li data-hs-strong-password-hints-rule-text="uppercase" className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
                                                <span className="hidden" data-check>
                                                    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                                </span>
                                                <span data-uncheck>
                                                    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                                </span>
                                                Should contain uppercase.
                                            </li>
                                            <li data-hs-strong-password-hints-rule-text="numbers" className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
                                                <span className="hidden" data-check>
                                                    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                                </span>
                                                <span data-uncheck>
                                                    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                                </span>
                                                Should contain numbers.
                                            </li>
                                            <li data-hs-strong-password-hints-rule-text="special-characters" className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
                                                <span className="hidden" data-check>
                                                    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                                </span>
                                                <span data-uncheck>
                                                    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                                </span>
                                                Should contain special characters.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                                    <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-basic-modal">
                                        Close
                                    </button>
                                    <button type="submit" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div id="hs-small-modal" className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none">
                <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-14 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                    <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                        <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                            <h3 className="font-bold text-gray-800 dark:text-white">
                                Other Service
                            </h3>
                            <button type="button" className="hs-dropup-toggle flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-small-modal">
                                <span className="sr-only">Close</span>
                                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                        </div>
                        <div className="p-4 overflow-y-auto">
                            <form onSubmit={Submit} method="POST" className="space-y-4">
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold mb-2">Service Info</h3>
                                    <div className="grid grid-rows-1 md:grid-rows-2 gap-4">
                                        <div>
                                            <label className="block text-gray-700 text-sm font-semibold mb-2">Service Name *</label>
                                            <input type="text" onChange={handleChange} name='name' className="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Enter Service Name" />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 text-sm font-semibold mb-2"> Action  *</label>
                                            <Select name='action' onChange={(selectedOption) => handleSelectChange(selectedOption)} className="react-select-styled" classNamePrefix='react-select' options={optionsStatus} placeholder='Open to chose ' />
                                        </div>
                                        {data4.action === 'Add Credits' && (
                                            <div>
                                                <div>
                                                    <label className="block text-gray-700 text-sm font-semibold mb-2"> Username *</label>
                                                    <input
                                                        type="text"
                                                        onChange={handleChange}
                                                        name='username'
                                                        className="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
                                                        placeholder="Enter Userame"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-700 text-sm font-semibold mb-2"> Credit Desired *</label>
                                                    <input
                                                        type="number"
                                                        onChange={handleChange}
                                                        name='creditDesired'
                                                        min={10}
                                                        className="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
                                                        placeholder="Enter Credit Desired"
                                                    />
                                                    <p className="text-red text-xs italic">Credit should be greater than 10.</p>
                                                </div>
                                            </div>
                                        )}
                                        {data4.action === 'Create New Panel' && (
                                            <div>
                                                <div>
                                                    <label className="block text-gray-700 text-sm font-semibold mb-2"> Username *</label>
                                                    <input
                                                        type="text"
                                                        onChange={handleChange}
                                                        name='username'
                                                        className="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
                                                        placeholder="Enter Userame"
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-semibold mb-2">Password *</label>
                                                    <div className="flex mb-2">
                                                        <div className="flex-1">
                                                            <input type="text" id="hs-strong-password-with-indicator-and-hint" onChange={handleChange} name='password' className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-purple-700 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Enter password" />
                                                            <div id="hs-strong-password" data-hs-strong-password='{
                                                                    "target": "#hs-strong-password-with-indicator-and-hint",
                                                                    "hints": "#hs-strong-password-hints",
                                                                    "stripClasses": "hs-strong-password:opacity-100 hs-strong-password-accepted:bg-teal-500 h-2 flex-auto rounded-full bg-blue-500 opacity-50 mx-1"
                                                                }' className="flex mt-2 -mx-1"
                                                            ></div>
                                                        </div>
                                                    </div>

                                                    <div id="hs-strong-password-hints" className="mb-3">
                                                        <div>
                                                            <span className="text-sm text-gray-800 dark:text-gray-200">Level:</span>
                                                            <span data-hs-strong-password-hints-weakness-text='["Empty", "Weak", "Medium", "Strong", "Very Strong", "Super Strong"]' className="text-sm font-semibold text-gray-800 dark:text-gray-200"></span>
                                                        </div>

                                                        <h4 className="my-2 text-sm font-semibold text-gray-800 dark:text-white">
                                                            Your password must contain:
                                                        </h4>

                                                        <ul className="space-y-1 text-sm text-gray-500">
                                                            <li data-hs-strong-password-hints-rule-text="min-length" className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
                                                                <span className="hidden" data-check>
                                                                    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                                                </span>
                                                                <span data-uncheck>
                                                                    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                                                </span>
                                                                Minimum number of characters is 6.
                                                            </li>
                                                            <li data-hs-strong-password-hints-rule-text="lowercase" className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
                                                                <span className="hidden" data-check>
                                                                    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                                                </span>
                                                                <span data-uncheck>
                                                                    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                                                </span>
                                                                Should contain lowercase.
                                                            </li>
                                                            <li data-hs-strong-password-hints-rule-text="uppercase" className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
                                                                <span className="hidden" data-check>
                                                                    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                                                </span>
                                                                <span data-uncheck>
                                                                    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                                                </span>
                                                                Should contain uppercase.
                                                            </li>
                                                            <li data-hs-strong-password-hints-rule-text="numbers" className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
                                                                <span className="hidden" data-check>
                                                                    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                                                </span>
                                                                <span data-uncheck>
                                                                    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                                                </span>
                                                                Should contain numbers.
                                                            </li>
                                                            <li data-hs-strong-password-hints-rule-text="special-characters" className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
                                                                <span className="hidden" data-check>
                                                                    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                                                </span>
                                                                <span data-uncheck>
                                                                    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                                                </span>
                                                                Should contain special characters.
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                        )}
                                    </div>
                                </div>
                                {/* <div className="mb-4">
                                        <h3 className="text-lg font-semibold mb-2">Client Info</h3>
                                        <div className="grid grid-rows-1 md:grid-rows-2 gap-4">
                                            <div>
                                                <label className="block text-gray-700 text-sm font-semibold mb-2"> Full Name  *</label>
                                                <input type="text" onChange={handleChange} name='full_name' className="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Enter your full anme" />
                                            </div>
                                            <div>
                                                <label className="block text-gray-700 text-sm font-semibold mb-2"> Phone  *</label>
                                                <input type="text" onChange={handleChange} name='phone' className="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Enter your phone for contact you " />
                                            </div>
                                        </div>
                                    </div> */}
                                <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                                    <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-basic-modal">
                                        Close
                                    </button>
                                    <button type="submit" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutDashboard>

    )
}
