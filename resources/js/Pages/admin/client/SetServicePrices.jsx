import React from 'react'
import LayoutDashboard from '@/Layouts/Dashboard/LayoutDashboard'
import { Head } from '@inertiajs/react';
import Select from 'react-select';
import { useForm, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2';

export default function SetServicePrices({ ...props }) {
    const { flash } = usePage().props;
    const [services, setService] = useState([]);
    const [prices, setPrices] = useState([]);
    const [client, setClient] = useState(props.client);
    useEffect(() => {
        setService(props.services);
        setPrices(props.prices);
    }, [props.services, props.prices]);
    const { data, setData, post, processing, errors } = useForm({
        client_id: client.id,
    });
    const handelInput = (serviceId, value ) => {
        setData(prevData => ({
            ...prevData,
            prices: {
                ...prevData.prices,
                [serviceId]: value
            }
        }));
    };
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

    function submit(e) {
        e.preventDefault()
        console.log(data);
        post('/admin/update-Price')
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
                    {/* <form onSubmit={submit} className="space-y-4">
                        {services.map(service => (
                            <div key={service.id} className="flex items-center">
                                <label htmlFor={`price_${service.id}`} className="w-32">{service.name}</label>
                                <input
                                    type="number"
                                    id={`price_${service.id}`}
                                    name={`prices[${service.id}]`}
                                    value={prices[service.id] || ''}
                                    onChange={(e) => handleChange(e, service.id)}
                                    className="flex-grow"
                                />
                            </div>
                        ))}
                        <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
                    </form> */}
                    {/* <div class="min-w-screen min-h-screen bg-gray-100 flex flex-col items-center justify-center"> */}
                    <form onSubmit={submit} className="space-y-4">
                        <div className="w-full rounded-xl bg-gradient-to-b from-gray-100 to-gray-100 mr-3">
                            <div className="flex flex-col">
                                <div id="converters-area" className="px-4 py-5">
                                    <div className="flex flex-col text-dark">
                                        <div className="flex flex-wrap">
                                            {/* {prices.length !== 0 ? (
                                                prices.map(price => (
                                                    <div key={price.id} className="flex flex-col text-center w-1/2 px-2">
                                                        <strong><label className="mb-1">{price.services?.name}</label></strong>
                                                        <input
                                                            type="number"
                                                            name='price'
                                                            value={price.price}
                                                            data-service-id={price.services.id}
                                                            onChange={handelInput}
                                                            className="py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                                                        />
                                                    </div>
                                                ))
                                            ) : ( */}
                                                {services.map(service => (
                                                    <div key={service.id} className="flex flex-col text-center w-1/2 px-2">
                                                        <strong><label className="mb-1">{service.name}</label></strong>
                                                        <input
                                                            type="number"
                                                            name='price'
                                                            data-service-id={service.id}
                                                            defaultValue={service.price}
                                                            onChange={(e) => handelInput( service.id, e.target.value)}
                                                            className="py-3 px-5 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                                                        />
                                                    </div>
                                                ))}
                                            {/* )} */}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="mt-4 bg-purple-600 hover:bg-purple-700 text-left text-white font-bold py-2 px-4 rounded">Submit</button>
                    </form>
                    {/* </div> */}


                </div>
            </div>

        </LayoutDashboard>
    )
}
