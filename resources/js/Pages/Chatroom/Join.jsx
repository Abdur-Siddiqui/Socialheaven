import React, {useEffect} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Head, useForm} from '@inertiajs/react';

export default function JoinChatroom({auth}) {
    const {data, setData, post, processing, errors, reset} = useForm({
        chatroom_id: '',
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('chatrooms.join', {chatroom: data.chatroom_id}));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Join Chatroom"/>

            <div className="flex flex-col sm:justify-center items-center py-14">
                <div
                    className="w-full sm:max-w-md mt-6 p-6 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
                    <form onSubmit={submit}>
                        <div className="flex flex-col items-center pt-2">
                            <h2 className="pt-2 pb-8 font-semibold text-center text-xl text-gray-800 dark:text-gray-200 leading-tight">
                                Join a Chatroom
                            </h2>
                        </div>
                        <div>
                            <InputLabel htmlFor="chatroom_id" value="Chatroom ID"/>
                            <TextInput
                                id="chatroom_id"
                                type="text"
                                name="chatroom_id"
                                value={data.chatroom_id}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('chatroom_id', e.target.value)}
                            />
                            <InputError message={errors.chatroom_id} className="mt-2"/>
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password (if required)"/>
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

                        <div className="flex items-center justify-end mt-4">
                            <PrimaryButton className="ml-4" disabled={processing}>
                                Join Chatroom
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
