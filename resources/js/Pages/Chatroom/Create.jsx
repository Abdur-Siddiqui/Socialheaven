import React, {useEffect} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Checkbox from "@/Components/Checkbox";
import {Head, useForm} from '@inertiajs/react';

export default function CreateChatroom({auth}) {
    const {data, setData, post, processing, errors, reset} = useForm({
        name: '',
        description: '',
        is_private: false,
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('chatrooms.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Create Chatroom"/>

            <div
                className="flex flex-col sm:justify-center items-center py-14">
                <div
                    className="w-full sm:max-w-md mt-6 p-6 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
                    <form onSubmit={submit}>
                        <div className="flex flex-col items-center pt-2">
                        <h2 className="pt-2 pb-8 font-semibold text-center text-xl text-gray-800 dark:text-gray-200 leading-tight">
                            Create a Chatroom
                        </h2>
                        </div>
                        <div>
                            <InputLabel htmlFor="name" value="Chatroom Name"/>
                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            <InputError message={errors.name} className="mt-2"/>
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="description" value="Description"/>
                            <TextInput
                                id="description"
                                type="text"
                                name="description"
                                value={data.description}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('description', e.target.value)}
                            />
                            <InputError message={errors.description} className="mt-2"/>
                        </div>

                        <div className="block mt-4">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.is_private}
                                    onChange={(e) => setData('is_private', e.target.checked)}
                                />
                                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Private Chatroom</span>
                            </label>
                        </div>

                        {data.is_private && (
                            <div className="mt-4">
                                <InputLabel htmlFor="password" value="Password"/>
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className="mt-2"/>
                            </div>
                        )}

                        <div className="flex items-center justify-end mt-4">
                            <PrimaryButton className="ml-4" disabled={processing}>
                                Create Chatroom
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
