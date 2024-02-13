'use client'

import { useFormStatus } from 'react-dom'

export function SubmitButton({ title }: { title: string }) {
    const { pending } = useFormStatus()

    return (
        <>
            {pending ? (
                <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-slate-500 text-white hover:bg-slate-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" disabled>
                    <span className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
                    Loading
                </button>) : (
                <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" disabled={pending}>
                    {title}
                </button >)
            }

        </>
    )
}