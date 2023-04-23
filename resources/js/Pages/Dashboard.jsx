import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router} from '@inertiajs/react';
import React, {useState} from "react";
import DangerButton from "@/Components/DangerButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Modal from "@/Components/Modal";
import LinkButton from "@/Components/LinkButton";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Dashboard({auth, chatrooms}) {
    const [processing, setProcessing] = useState(false);
    const [selectedChatroom, setSelectedChatroom] = useState(null);
    const [confirmingChatroomDeletion, setConfirmingChatroomDeletion] = useState(false);

    const confirmChatroomDeletion = (e, chatroom) => {
        e.preventDefault();
        setSelectedChatroom(chatroom);
        setConfirmingChatroomDeletion(true);
    };

    const leaveChat = (e, chatroom) => {
        e.preventDefault();
        setProcessing(true);
        router.post(route('chatrooms.leave', {chatroom: chatroom.id}), {}, {
            onFinish: () => {
                setProcessing(false);
            }
        });
    }

    const deleteChat = (e) => {
        e.preventDefault();
        setProcessing(true);

        router.delete(route('chatrooms.destroy', {chatroom: selectedChatroom.id}), {
            onFinish: () => {
                setProcessing(false);
                closeModal();
            }
        });
    };

    const closeModal = () => {
        setSelectedChatroom(null);
        setConfirmingChatroomDeletion(false);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Chatrooms</h2>
                <LinkButton href="/chatrooms/join">Join Chatroom</LinkButton>
            </div>}
        >
            <Head title="Chatrooms"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {chatrooms.map((chatroom) => (
                            <Link href={`/chatrooms/${chatroom.id}`} key={chatroom.id}
                                  className="scale-100 flex flex-col items-start h-52 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{chatroom.name}</h2>
                                <p className="text-sm leading-relaxed text-gray-900 dark:text-white">{chatroom.description}</p>

                                <div className="flex self-stretch justify-end mt-auto">
                                    {chatroom.creator_id === auth.user.id ? (
                                        <DangerButton onClick={(e) => confirmChatroomDeletion(e, chatroom)}>
                                            Delete Chat
                                        </DangerButton>
                                    ) : (
                                        <PrimaryButton disabled={processing} onClick={(e) => leaveChat(e, chatroom)}>Leave Chat</PrimaryButton>
                                    )}
                                </div>
                            </Link>
                        ))}

                        <Link href="/chatrooms/create"
                              className="flex justify-center items-center scale-100 p-6 bg-gray-100 dark:bg-gray-900 dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500 text-gray-500 dark:text-gray-500">
                            <svg className="w-16" fill="none" stroke="currentColor" strokeWidth="1.5"
                                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
                            </svg>
                        </Link>
                    </div>
                </div>

                <Modal show={confirmingChatroomDeletion} onClose={closeModal}>
                    <div className="p-6">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Are you sure you want to delete the chat?
                        </h2>

                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Once the chat is deleted, all of its messages will be permanently deleted.
                        </p>

                        <div className="mt-6 flex justify-end">
                            <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                            <DangerButton className="ml-3" disabled={processing} onClick={deleteChat}>
                                Delete Chat
                            </DangerButton>
                        </div>
                    </div>
                </Modal>
            </div>
        </AuthenticatedLayout>
    );
}
