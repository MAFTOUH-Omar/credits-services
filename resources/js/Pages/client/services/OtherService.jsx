import React from 'react'
import LayoutDashboard from '@/Layouts/Dashboard/LayoutDashboard'
import { Head, Link, router } from '@inertiajs/react';
import Select from 'react-select';
import { useState, useEffect } from 'react';
import { siteSettings } from '@/settings/setting';
import { useForm, usePage } from '@inertiajs/react';
import { FaCircleInfo, FaRegCircleUser, FaLock, FaTv, FaCheck, FaRegCircleXmark, FaPenClip, FaRegCreditCard } from "react-icons/fa6";
import { HSOverlay } from 'preline';
const isBrowser = typeof window !== 'undefined';
import Swal from 'sweetalert2';

export default function OtherService({ ...props }) {

    const asset = siteSettings.base_url_asset;
    const { flash } = usePage().props
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalInfos, setModalInfos] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [showRejectForm, setShowRejectForm] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const [search, setSearch] = useState('');
    const [searchBy, setSearchBy] = useState('');
    const { data, setData, post, processing, errors } = useForm({});
    useEffect(() => {
        setServices(props.services.data);
    }, [props.services.data]);
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
    const handleDelet = (RequestID) => {
      
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delet this Request?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(`/client/delet-other-service/${RequestID}`,
                    {
                        onFinish: () => console.log('finish'),
                    }
                );              
            }
        });
    };
    const optionsStatus = [
        { value: 1, label: 'All' },
        { value: 2, label: 'In progress' },
        { value: 3, label: 'Accepted' },
        { value: 3, label: 'Rejected' }
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
    const modalAction = (value) => {

        if (isBrowser) {
            setData({ id: value.id, client_id: value.user_id, price: '', });
            setModalInfos(value);
            HSOverlay.open('#hs-slide-down-animation-modal');
        }
    };
    const closeModal = () => {
        if (isBrowser) {
            HSOverlay.close('#hs-slide-down-animation-modal');
        }
    };
    const handleAccept = () => {
        setShowForm(true);
        setShowRejectForm(false);
    };
    const handleReject = () => {
        // Show the reject form
        setShowRejectForm(true);
        setShowForm(false);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (showForm) {
            const newData = { id: data.id, status: 'Approved', price: data.price };
            console.log(newData);
            router.post('/admin/response-other-service', newData)
        } else if (showRejectForm) {
            const newData = { id: data.id, status: 'Rejected', rejectReason };
            console.log(newData);
            router.post('/admin/response-other-service', newData)
        }

    };
    const handleSearch = (e) => {
        e.preventDefault();
        setLoading(true)
        let payload = {
            search: search,
            searchBy: searchBy,
        }

        router.post(route('getCredit'),
            payload,
            {
                preserveScroll: true,
                preserveState: true,
                onFinish: () => setLoading(false),
            });
    };

    return (
        <LayoutDashboard>
            <Head title="Other Service" />
            <div className="container px-6 mx-auto grid">
                <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                    Request Other Service
                </h2>
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
                                placeholder="Search...."
                                aria-label="Search"
                            />
                        </div>
                    </div>
                    <div className="bg-red-600 py-3 px-5 text-white font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer text-end">
                        <span>Search</span>
                    </div>

                </div>
                <div className="w-full overflow-hidden rounded-lg shadow-xs">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full whitespace-no-wrap">
                            <thead>
                                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                    <th className="px-4 py-3">Service Name</th>
                                    <th className="px-4 py-3">Action</th>
                                    <th className="px-4 py-3">Price</th>
                                    <th className="px-4 py-3">Status</th>
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
                                                    <div>
                                                        <p className="font-semibold">{value.name}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-xs">
                                                <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                                                    {value.action}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm">{value.price}</td>
                                            <td className="px-4 py-3 text-xs">
                                                {getStatus(value)}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center space-x-4 text-sm">
                                                    <button
                                                        className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                                        aria-label="info" onClick={() => modalAction(value)}
                                                    >
                                                        <FaCircleInfo />
                                                    </button>
                                                    {value.status !== 'Approved' && (
                                                        <button
                                                            class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                                            aria-label="Delete" onClick={() => handleDelet(value.id)}
                                                        >
                                                            <svg
                                                                class="w-5 h-5"
                                                                aria-hidden="true"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                                    clip-rule="evenodd"
                                                                ></path>
                                                            </svg>
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="text-center" colSpan={4}>NO DATA </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
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
                                            <FaTv />
                                        </span>
                                        <div className="flex flex-col flex-1">
                                            <h3 className="text-sm font-medium">Service</h3>
                                            <div className="divide-x divide-gray-200 mt-auto">
                                                <span className="inline-block px-3 text-sm leading-none text-gray-500 font-medium first:pl-0">{modalInfos?.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4 p-3.5 rounded-full bg-gray-100">
                                        <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-white text-gray-900">
                                            <FaPenClip />
                                        </span>
                                        <div className="flex flex-col flex-1">
                                            <h3 className="text-sm font-medium">Action</h3>
                                            <div className="divide-x divide-gray-200 mt-auto">
                                                <span className="inline-block px-3 text-sm leading-none text-gray-500 font-medium first:pl-0">{modalInfos?.action}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {modalInfos?.action === 'Add Credits' && (
                                        <>
                                            <div className="flex items-center space-x-4 p-3.5 rounded-full bg-gray-100">
                                                <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-white text-gray-900">
                                                    <FaRegCircleUser />
                                                </span>
                                                <div className="flex flex-col flex-1">
                                                    <h3 className="text-sm font-medium">Userame</h3>
                                                    <div className="divide-x divide-gray-200 mt-auto">
                                                        <span className="inline-block px-3 text-sm leading-none text-gray-500 font-medium first:pl-0">{modalInfos?.username}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4 p-3.5 rounded-full bg-gray-100">
                                                <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-white text-gray-900">
                                                    <FaRegCreditCard />
                                                </span>
                                                <div className="flex flex-col flex-1">
                                                    <h3 className="text-sm font-medium">Amount</h3>
                                                    <div className="divide-x divide-gray-200 mt-auto">
                                                        <span className="inline-block px-3 text-sm leading-none text-gray-500 font-medium first:pl-0">{modalInfos?.credits} Credits</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {modalInfos?.action === 'Create New Panel' && (
                                        <>
                                            <div className="flex items-center space-x-4 p-3.5 rounded-full bg-gray-100">
                                                <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-white text-gray-900">
                                                    <FaRegCircleUser />
                                                </span>
                                                <div className="flex flex-col flex-1">
                                                    <h3 className="text-sm font-medium">Userame</h3>
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
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </LayoutDashboard>
    )
}
