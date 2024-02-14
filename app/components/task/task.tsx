import Image from "next/image"

export default function Task({ title, dateStr }: { title: string, dateStr: string }) {
    return (
        <>
            <tr>
                <td className="h-px w-px whitespace-nowrap">
                    <div className="ps-6 py-3">
                        <label htmlFor="hs-at-with-checkboxes-1" className="flex">
                            <input type="checkbox" className="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-at-with-checkboxes-1"></input>
                            <span className="sr-only">Checkbox</span>
                        </label>
                    </div>
                </td>

                <td className="h-px w-px whitespace-nowrap">
                    <div className="px-6 py-3">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{title}</span>
                    </div>
                </td>
                <td className="h-px w-px whitespace-nowrap">
                    <div className="px-6 py-3">
                        <div className="flex items-center gap-x-2">
                            <Image className="inline-block h-6 w-6 rounded-full" src="/profilePic.png" width={50} height={50} alt="Image Description" />
                            <div className="grow">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Furqan Khan</span>
                            </div>
                        </div>
                    </div>
                </td>
                <td className="h-px w-px whitespace-nowrap">
                    <div className="px-6 py-3">
                        <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                            <svg className="w-2.5 h-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                            </svg>
                            Todo
                        </span>
                    </div>
                </td>
                <td className="h-px w-px whitespace-nowrap">
                    <div className="px-6 py-3">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{dateStr}</span>
                    </div>
                </td>
                <td className="h-px w-px whitespace-nowrap">
                    <div className="px-6 py-1.5">
                        <div className="hs-dropdown relative inline-block [--placement:bottom-right]">
                            <button id="hs-table-dropdown-1" type="button" className="hs-dropdown-toggle py-1.5 px-2 inline-flex justify-center items-center gap-2 rounded-lg text-gray-700 align-middle disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                                <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
                            </button>
                            <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden divide-y divide-gray-200 min-w-[10rem] z-10 bg-white shadow-2xl rounded-lg p-2 mt-2 dark:divide-gray-700 dark:bg-gray-800 dark:border dark:border-gray-700" aria-labelledby="hs-table-dropdown-1">
                                <div className="py-2 first:pt-0 last:pb-0">
                                    <a className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                                        Update
                                    </a>


                                </div>
                                <div className="py-2 first:pt-0 last:pb-0">
                                    <a className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-red-600 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-red-500 dark:hover:bg-gray-700" href="#">
                                        Delete
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        </>
    )
}
