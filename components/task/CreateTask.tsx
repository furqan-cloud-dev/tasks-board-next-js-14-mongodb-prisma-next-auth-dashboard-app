'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { SubmitButton } from '../buttons/submit-button'
import { createTask } from "@/lib/actions"
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';


const initialState = {
    message: '',
}

export default function CreateTask() {
    const [state, formAction] = useFormState(createTask, initialState)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [successMessage, setSuccessMessage] = useState("Task Created Successfully!");

    const form1 = useRef<HTMLFormElement | null>(null);
    const router = useRouter();

    // const resetForm = () => {
    //     setTitle("")
    //     setDescription("")
    // }

    const onTitleChange = (e: any) => {
        if ((e.target.value.lenght > 1) && (successMessage !== "")) {
            setSuccessMessage("");
        }
    }

    function handleChange(event: any) {
        return;
        console.log(event.target.value);
        if (event.target.value.length > 1) {
            setSuccessMessage("");
        }
    }

    useEffect(() => {
        if (state?.message === 'success') {
            form1.current?.reset();
            // router.refresh();
            // window.location.reload();
        }
    }, [state])

    return (
        <div id="hs-modal-create-task" className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto">
            <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center justify-center m-5">
                        <button type="button" className="flex justify-center items-center size-7 text-sm font-semibold rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-transparent dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-modal-create-task">
                            <span className="sr-only">Close</span>
                            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </button>
                    </div>

                    <div className="p-4 sm:p-7">
                        <div className="text-center">
                            <h2 className="block text-2xl font-bold text-gray-800 dark:text-gray-200">Create Task</h2>
                        </div>

                        <div className="mt-5">
                            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">create multiple tasks now</div>
                            <form ref={form1} action={formAction}>
                                <div className="grid gap-y-4">
                                    <div>
                                        <label htmlFor="title" className="block text-sm mb-2 dark:text-white">Title</label>
                                        <div className="relative">
                                            <input type="text" id="title" name="title" onChange={onTitleChange} className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" required aria-describedby="email-error"></input>
                                            <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                                <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center">
                                            <label htmlFor="password" className="block text-sm mb-2 dark:text-white">Description</label>
                                        </div>
                                        <div className="relative">
                                            <textarea id="description" name='description' className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"></textarea>
                                            <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                                <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <p className="hidden text-xs text-red-600 mt-2" id="password-error">8+ characters required</p>
                                    </div>

                                    <p className="text-red-500">
                                        {state?.message !== 'success' && state.message}
                                    </p>

                                    <SubmitButton title='Create' />

                                    <p className="text-green-500">
                                        {state?.message === 'success' && successMessage}
                                    </p>

                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
