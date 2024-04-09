import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import LayoutDashboard from '@/Layouts/Dashboard/LayoutDashboard'
import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status }) {
    
    return (
        // <AuthenticatedLayout
        //    
        //     header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        // >
        //     <Head title="Profile" />

        //     <div className="py-12">
        //         <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
        //             <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
        //                 <UpdateProfileInformationForm
        //                     mustVerifyEmail={mustVerifyEmail}
        //                     status={status}
        //                     className="max-w-xl"
        //                 />
        //             </div>

        //             <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
        //                 <UpdatePasswordForm className="max-w-xl" />
        //             </div>

        //             <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
        //                 <DeleteUserForm className="max-w-xl" />
        //             </div>
        //         </div>
        //     </div>
        // </AuthenticatedLayout>
        <LayoutDashboard>
            <Head title="Create-New-Service" />
            <div className="container px-6 mx-auto grid">
                <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                    Edit Profil
                </h2>

                <div className="bg-gray shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                    className="max-w-xl"
                                />
                            </div>

                            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                                <UpdatePasswordForm className="max-w-xl" />
                            </div>

                            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                                <DeleteUserForm className="max-w-xl" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </LayoutDashboard>
    );
}
