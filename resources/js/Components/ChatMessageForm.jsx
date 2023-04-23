import React from 'react';
import {useForm} from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';

function CreateChatMessage({chatroom}) {
    const {data, setData, post, processing, progress, errors, reset} = useForm({
        content: '',
        image: '',
    });

    const handleUploadedFile = (e) => {
        setData('image', e.target.files[0]);
    }

    const submit = (e) => {
        e.preventDefault();
        post(route('chatrooms.messages.store', {chatroom: chatroom.id}), {
            preserveScroll: true,
            onSuccess: () => reset('content', 'image'),
        });
    };

    return (
        <div className="w-full">
            <form onSubmit={submit}>
                <div>
                    <TextInput
                        id="content"
                        type="text"
                        name="content"
                        value={data.content}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('content', e.target.value)}
                    />
                    <InputError message={errors.content} className="mt-2"/>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="image" value="Upload Image" className="mb-1"/>
                    <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        type="file"
                        onChange={handleUploadedFile}/>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or
                        GIF (MAX. 2048B).</p>
                    {progress && (
                        <progress value={progress.percentage} max="100">
                            {progress.percentage}%
                        </progress>
                    )}
                    <InputError message={errors.image} className="mt-2"/>
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ml-4" disabled={processing}>
                        Send Message
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
}

export default CreateChatMessage;
