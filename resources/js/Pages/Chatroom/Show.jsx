import React, {useEffect} from 'react';
import {Head, router} from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ChatMessageForm from "@/Components/ChatMessageForm";

const ShowChatroom = ({auth, chatroom, messages}) => {
    let intervalHandler;

    useEffect(() => {
        intervalHandler = window.setInterval(() => {
            router.reload({ only: ['messages'] })
        }, 3000);

        return function cleanup() {
            window.clearInterval(intervalHandler);
        };
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title={chatroom.name}/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="font-semibold text-2xl text-gray-800 dark:text-gray-200 leading-tight mb-4">
                        {chatroom.name}
                    </h2>
                    <p className="text-lg leading-relaxed text-gray-900 dark:text-white mb-8">{chatroom.description}</p>

                    <div className="mb-10 p-6 bg-gray-100 dark:bg-gray-900 rounded dark:ring-1 dark:ring-inset dark:ring-white/5">
                        {messages.map((message) => (
                            <div className="chat-message" key={message.id}>
                                <div className="flex items-start mb-4">
                                    <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                                        <div>
                                            <span
                                                className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600 text-base">{message.content}</span>
                                            {message.image_path && (
                                                <img src={message.image_path}
                                                     alt="Message image"
                                                     className="max-w-[400px] h-auto mt-2 rounded"
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center order-1">
                                        <img
                                            src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                                            className="w-6 h-6 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"/>
                                        <span className="ml-2 font-medium text-sm text-gray-800 dark:text-gray-200">{message.sender.name}:</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <ChatMessageForm chatroom={chatroom}/>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ShowChatroom;
