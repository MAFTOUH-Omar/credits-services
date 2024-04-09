import LayoutDashboard from '@/Layouts/Dashboard/LayoutDashboard'
import { Head, Link } from '@inertiajs/react'
import React from 'react';
import { useState, useEffect } from 'react';

export default function Dashboard({ ...props }) {

    const [panels, setPanels] = useState([]);
    const [credits, setCredits] = useState([]);
    const [payments, setPayments] = useState([]);
    useEffect(() => {
        setPanels(props.panels.data);
        setCredits(props.credits.data);
        setPayments(props.payments.data);
    }, [props.panels.data, props.credits.data, props.payments.data]);

    const formatCreatedAtDate = (created_at) => {
        const createdAtDate = new Date(created_at);
        return createdAtDate.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    }
    return (
        <LayoutDashboard>
            <Head title="Home admin" />
            <div className="container px-6 mx-auto grid">
                <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                    Dashboard
                </h2>
                <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">

                    <div
                        className="flex items-center p-4 bg-white rounded-lg shadow dark:bg-gray-800"
                    >
                        <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500" >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                                ></path>
                            </svg>
                        </div>
                        <div>
                            <p
                                className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
                            >
                                Total clients
                            </p>
                            <p
                                className="text-lg font-semibold text-gray-700 dark:text-gray-200"
                            >
                                {props.totalClients}
                            </p>
                        </div>
                    </div>
                    <div
                        className="flex items-center p-4 bg-white rounded-lg shadow dark:bg-gray-800"
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
                                {props.totalPanels !== null ? props.totalPanels : "0"}

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
                                {props.totalPayments !== null ? props.totalPayments : "0"}
                            </p>
                        </div>
                    </div>
                </div>
                <a
                    className="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-purple-100 bg-purple-500 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple"

                >
                    <div className="flex items-center">
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            ></path>
                        </svg>
                        <span>Last Request </span>
                    </div>

                </a>
                <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
                    <div className="relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
                        <div className="rounded-t mb-0 px-0 border-0">
                            <div className="flex flex-wrap items-center px-4 py-2">
                                <div className="relative w-full max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">Request Credits</h3>
                                </div>
                                <div className="relative w-full max-w-full flex-grow flex-1 text-right">
                                    <Link href={route('admin.request-credits')} className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-purple-500  text-white" type="button">See all</Link>
                                </div>
                            </div>
                            <div className="block w-full overflow-x-auto">
                                <table className="items-center w-full bg-transparent border-collapse">
                                    <thead>

                                        <tr >
                                            <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Client</th>
                                            <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Amount</th>
                                            <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ">Service</th>
                                            <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ">Date</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {credits.length !== 0 ?
                                            (
                                                credits.map((value, index) => (
                                                    <tr className="text-gray-700 dark:text-gray-100" key={index}>
                                                        <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">{value.user?.username}</th>
                                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{value.amount}</td>
                                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                            <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium border border-teal-500 text-teal-500">{value.service?.name}</span>
                                                        </td>
                                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"> {formatCreatedAtDate(value.created_at)}</td>
                                                    </tr>
                                                ))

                                            ) : (
                                                <tr>
                                                    <td className="text-center" colSpan={4}>no data</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
                        <div className="rounded-t mb-0 px-0 border-0">
                            <div className="flex flex-wrap items-center px-4 py-2">
                                <div className="relative w-full max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">Request New Panel</h3>
                                </div>
                                <div className="relative w-full max-w-full flex-grow flex-1 text-right">
                                    <Link href={route('admin.panel')} className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-purple-500 text-white" type="button">See all</Link>
                                </div>
                            </div>
                            <div className="block w-full overflow-x-auto">
                                <table className="items-center w-full bg-transparent border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Client</th>
                                            <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Service</th>
                                            <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {panels && panels.length !== 0 && panels.map((value, index) => (
                                            <tr className="text-gray-700 dark:text-gray-100" key={index}>
                                                <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">{value.user?.username}</th>
                                                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <span className="text-[13px] font-medium inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs border border-red-500 text-red-500">{value.service?.name}</span>
                                                </td>
                                                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"> {formatCreatedAtDate(value.created_at)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4 mx-4">
                    <div className="w-full overflow-hidden rounded-lg shadow-xs">
                        <div className="flex flex-wrap items-center px-4 py-2">
                            <div className="relative w-full max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">Last Payment</h3>
                                <div className="relative w-full max-w-full flex-grow flex-1 text-right">
                                    <Link href={route('admin.payment')} className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-purple-500 text-white" type="button">More payment</Link>
                                </div>
                            </div>
                            <div className="w-full overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                            <th className="px-4 py-3">Client</th>
                                            <th className="px-4 py-3">Amount</th>
                                            <th className="px-4 py-3">Devise</th>
                                            <th className="px-4 py-3">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                                        {payments && payments.length !== 0 ? (
                                            payments.map((value, index) => (
                                                <tr key={index} className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                                                    <td className="px-4 py-3">
                                                        <p className="font-semibold">{value.user.username}</p>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm">{value.amount}</td>
                                                    <td className="px-4 py-3 text-xs">
                                                        <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"> {value.currency} </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm">{formatCreatedAtDate(value.created_at)}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td className="text-center" colSpan={4}>no data</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutDashboard >

    )
}
