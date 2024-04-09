import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { FaUser, FaPhoneFlip, FaLock, FaChevronRight } from "react-icons/fa6";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import { FiDollarSign } from 'react-icons/fi';
import { useState } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        phone: '',
        password: '',
        password_confirmation: '',
        currency: '',
    });

    const [value, setValue] = useState();

    useEffect(() => {
        setData({...data, phone: value})
    }, [value]);


    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <>
            <Head title="Register" />

            {/* <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm password" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form> */}
            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0" id='login'>
                <div className="screen">
                    <div className="screen__content">
                        <form className="login mt-1" onSubmit={submit}>
                            <div className="login__field">
                                <FaUser className="login__icon" />
                                <input type="text" className="login__input" placeholder="username"
                                    name="username" onChange={(e) => setData('username', e.target.value)}
                                    value={data.username}
                                    required
                                />
                                <InputError message={errors.username} className="mt-2" />
                            </div>
                            <div className="login__field">
                                <PhoneInput type="text" className="custom-phone-input" placeholder="Phone" autoComplete="Phone"
                                    onChange={setValue}
                                    rules={{ required: true }} 
                                />
                                <InputError message={errors.phone} className="mt-2" />
                                
                            </div>
                            <div className="login__field">
                                <FiDollarSign className="login__icon" />
                                <select
                                    className="login__input"
                                    name="currency"
                                    onChange={(e) => setData('currency', e.target.value)}
                                    value={data.currency}
                                    required
                                >
                                    <option value="">Select currency</option>
                                    <option value="EUR">EUR</option>
                                    <option value="MAD">MAD</option>        
                                    <option value="USD">USD</option>
                                    {/* <option value="USDT">USDT</option> */}
                                </select>
                                <InputError message={errors.currency} className="mt-2" />
                            </div>
                            <div className="login__field">
                                <FaLock className="login__icon" />
                                <input type="password" className="login__input" placeholder="password"
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="login__field">
                                <FaLock className="login__icon" />
                                <input type="password" className="login__input" placeholder="Confirm password"
                                    autoComplete="new-password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>
                            <button type='submit' className="button login__submit" disabled={processing}>
                                <span className="button__text">Register</span>
                                <FaChevronRight className="button__icon fas fa-chevron-right" />
                            </button>
                        </form>
                        <div className="social-login">

                            <Link
                                href={route('login')}
                                className="underline text-sm text-white hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Already registered?
                            </Link>

                        </div>
                    </div>
                    <div className="screen__background">
                        <span className="screen__background__shape screen__background__shape4"></span>
                        <span className="screen__background__shape screen__background__shape3"></span>
                        <span className="screen__background__shape screen__background__shape2"></span>
                        <span className="screen__background__shape screen__background__shape1"></span>
                    </div>
                </div>
            </div>

        </>
    );
}
