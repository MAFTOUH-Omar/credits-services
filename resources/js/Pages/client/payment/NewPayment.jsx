import React from 'react'
import LayoutDashboard from '@/Layouts/Dashboard/LayoutDashboard'
import { Head, router } from '@inertiajs/react';
import Select from 'react-select';
import { useForm, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2';

export default function NewPayment({ ...props }) {
    const { flash } = usePage().props;
    const { auth } = usePage().props;
    const [formData, setFormData] = useState({ amount: '', currency: '' });
    const [equivalence, setEquivalence] = useState('');
    const [data, setData] = useState([]);

    
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
    const handleExchange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setData({ ...data, [name]: value })

        // Fetch exchange rate when both amount and currency are entered
        if (name === 'amount' && formData.currency) {
            fetchExchangeRate(formData.currency, auth.user.currency, value);
        } else if (name === 'currency' && formData.amount) {
            fetchExchangeRate(value, auth.user.currency, formData.amount);
        }
    };
    useEffect(() => {
        console.log('equivalence', equivalence);
    }, [equivalence]);
    
    const fetchExchangeRate = async (fromCurrency, toCurrency, amount) => {
        try {
            const response = await fetch(`https://v6.exchangerate-api.com/v6/9bb324b841bba90ca6fa7430/latest/${fromCurrency}`);
            const data = await response.json();
    
            console.log('Response Data:', data);
                if (data && data.conversion_rates && data.conversion_rates[toCurrency]) {
                const exchangeRate = data.conversion_rates[toCurrency];
                const convertedAmount = amount * exchangeRate;
                setEquivalence(`${convertedAmount} ${toCurrency}`);
            } else {
                console.error('Error: Rates data not found in response');
            }
        } catch (error) {
            console.error('Error fetching exchange rate:', error);
        }
    };
    // const fetchExchangeRate = async (fromCurrency, toCurrency, amount) => {
    //     try {
    //         const response = await axios.get('/client/exchange-rate', {
    //             params: { fromCurrency, toCurrency, amount }
    //         });
    //         const { equivalence } = response.data;
    //         setEquivalence(equivalence);
    //     } catch (error) {
    //         console.error('Error fetching exchange rate:', error);
    //     }
    // };
    
    const handelInput = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value});
    };
    const handleFile = (e) => {
        const { name } = e.target;
        const file = e.target.files[0]; // Access the first file from the selected files

        setData({ ...data, [name]: file });
    };
    function submit(e) {
        e.preventDefault()
        const newData = {data,equivalence};
         console.log(newData);
        router.post('/client/new-paymet',newData)
    }
    return (
        <LayoutDashboard>
            <Head title="Add New Payment" />
            <div className="container px-6 mx-auto grid">
                <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                    Add New Payment
                </h2>

                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
                    <h4
                        className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300"
                    >
                        Form
                    </h4>
                    <form onSubmit={submit}>
                        <div className="-mx-3 md:flex mb-6">
                            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="name">
                                    Amount
                                </label>
                                <input name='amount' onChange={handleExchange} className="appearance-none block w-full bg-grey-lighter focus:border-purple-600 focus:ring-purple-600 text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="amount" type="text" placeholder="Enter amount" />
                                <p className="text-red text-xs italic">Please fill out this field.</p>
                            </div>
                            <div className="md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="type">
                                    Type
                                </label>
                                <select onChange={handelInput} name='type' className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-purple-600 focus:ring-purple-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
                                    <option >Open this select menu</option>
                                    <option value="USD">USD</option>
                                    <option value="Paypal Normal">Paypal Normal</option>
                                    <option value="Paypal Gift Mony">Paypal  Gift Mony</option>
                                    <option value="Especes">Especes</option>
                                    <option value="bank transfer">bank transfer</option>
                                </select>
                            </div>
                        </div>
                        <div className="-mx-3 md:flex mb-6">
                            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="price">
                                     Currency
                                </label>
                                <select onChange={handleExchange}  name='currency' className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-purple-600 focus:ring-purple-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
                                    <option >Open this select menu</option>
                                    <option value="EUR">Euro (EUR)</option>
                                    <option value="MAD">Morrocan Dirham (MAD)</option>
                                    <option value="USD">US Dollar (USD)</option>
                                    <option value="USDT">Tether (USDT)</option>
                                </select>
                            </div>
                            <div className="md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="equivalence">
                                    Equivalence in {auth.user.currency}
                                </label>
                                <input name='equivalence' id="equivalence" type="text" value={equivalence} readOnly className="appearance-none block w-full bg-grey-lighter text-grey-darker focus:border-purple-600 focus:ring-purple-600 border border-grey-lighter rounded py-3 px-4 mb-3"  />
                            </div>
                        </div>
                        <div className="-mx-3 md:flex mb-6">
                            <div className="md:w-full px-3">
                                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="preuve">
                                    Preuve
                                </label>
                                <input name='preuve' onChange={handleFile} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 focus:border-purple-600 focus:ring-purple-600 " id="preuve" type="file" placeholder="Service Name" />
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
