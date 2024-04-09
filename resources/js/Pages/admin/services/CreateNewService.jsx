import React from 'react'
import LayoutDashboard from '@/Layouts/Dashboard/LayoutDashboard'
import { Head } from '@inertiajs/react';
import Select from 'react-select';
import { useForm, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function CreateNewService({...props}) {
    const { flash } = usePage().props
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        price: '',
        old_price: '', 
        description: '',
        logo: ''
    });
    const handelInput = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };
    const handleFile = (e) => {
        const { name } = e.target;
        const file = e.target.files[0]; // Access the first file from the selected files
    
        setData({ ...data, [name]: file });
    };
    useEffect(() => {
        if (flash.sweet_success) {
            Swal.fire({
                title: 'Success!',
                text: flash.sweet_success,
                icon: 'success'
            });
        } else if (flash.sweet_error ) {
            Swal.fire({
                title: 'Oops..!',
                text: flash.sweet_error,
                icon: 'error'
            });
        }
    }, [flash.sweet_success, flash.sweet_error ]);
    
    function submit(e) {
        e.preventDefault()
        // console.log(data);
        post('/admin/new-service')
    }
    return (
        <LayoutDashboard>
            <Head title="Create-New-Service" />
            <div className="container px-6 mx-auto grid">
                <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                    Create New Service
                </h2>

                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
                    <h4
                        className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300"
                    >
                        Form
                    </h4>
                    <form onSubmit={submit}>
                        <div className="-mx-3 md:flex mb-6">
                            <div className="md:w-full px-3">
                                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="name">
                                    Name
                                </label>
                                <input  name='name' onChange={handelInput} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="name" type="text" placeholder="Service Name" />
                                <p className="text-red text-xs italic">Please fill out this field.</p>
                            </div>
                        </div>
                        <div className="-mx-3 md:flex mb-6">
                            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="price">
                                    Price General
                                </label>
                                <input name='price' onChange={handelInput} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="price" type="number" placeholder="00.00 $" />

                            </div>
                            <div className="md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="old_price">
                                    Old Price
                                </label>
                                <input name='old_price' onChange={handelInput} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="old_price" type="number" placeholder="00.00 $" />
                            </div>
                        </div>
                        <div className="-mx-3 md:flex mb-6">
                            <div className="md:w-full px-3">
                                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="description">
                                    Description
                                </label>
                                <textarea name='description' onChange={handelInput} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="description" type="texte" placeholder="description..." />
                            </div>
                        </div>
                        <div className="-mx-3 md:flex mb-6">
                            <div className="md:w-full px-3">
                                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="logo">
                                    Logo
                                </label>
                                <input name='logo' onChange={handleFile} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="logo" type="file" placeholder="Service Name" />
                            </div>
                        </div>
                        <div className="-mx-3 md:flex mb-6 ">
                            <button
                                type='submit' className="px-4 py-2 mr-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                            >
                                Submit
                            </button>
                            <button
                                className="px-4 py-2 text-sm font-medium leading-5 text-dark transition-colors duration-150 bg-transparent border border-gray-600 rounded-lg active:bg-purple-400 hover:bg-purple-500 focus:outline-none focus:shadow-outline-purple"
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </LayoutDashboard>
    )
}
