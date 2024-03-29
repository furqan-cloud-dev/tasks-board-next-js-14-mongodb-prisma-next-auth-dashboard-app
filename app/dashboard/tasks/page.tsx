import CreateTask from "@/components/task/CreateTask"
import TaskComp from "@/components/task/TaskComp";
import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client"
import { Suspense } from "react";

const prisma = new PrismaClient()
let totalTasks = 0;

async function TasksList() {
    const session = await auth() // calling session
    const user = session?.user;
    const tasks = await prisma.task.findMany({
        where: { userId: user?.id },
        orderBy: [
            {
                createdAt: 'desc',
            }
        ]
    });

    totalTasks = tasks.length;

    return (
        <>
            {tasks.map((task) => <TaskComp key={task.id} title={task.title} dateStr={task.createdAt.toDateString()} />)}
        </>
    )
}

export default function TasksPage() {



    return (
        <>
            <div className="w-full px-4 sm:px-6 md:px-8 lg:ps-72">
                <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                    {/* <!-- Card --> */}
                    <div className="flex flex-col">
                        <div className="-m-1.5 overflow-x-auto">
                            <div className="p-1.5 min-w-full inline-block align-middle">
                                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                                    {/* <!-- Header --> */}
                                    <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                                Tasks
                                            </h2>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                tasks created by user
                                            </p>
                                        </div>

                                        <div>
                                            <div className="inline-flex gap-x-2">

                                                <button className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-modal-create-task">
                                                    <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>

                                                    Create


                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-slate-900">
                                            <tr>
                                                <th scope="col" className="ps-6 py-3 text-start">
                                                    <label htmlFor="hs-at-with-checkboxes-main" className="flex">
                                                        <input type="checkbox" className="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-at-with-checkboxes-main"></input>
                                                        <span className="sr-only">Checkbox</span>
                                                    </label>
                                                </th>

                                                <th scope="col" className="px-6 py-3 text-start">
                                                    <div className="flex items-center gap-x-2">
                                                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                            Name
                                                        </span>
                                                    </div>
                                                </th>

                                                <th scope="col" className="px-6 py-3 text-start">
                                                    <div className="flex items-center gap-x-2">
                                                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                            Created by
                                                        </span>
                                                    </div>
                                                </th>

                                                <th scope="col" className="px-6 py-3 text-start">
                                                    <div className="flex items-center gap-x-2">
                                                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                            Status
                                                        </span>
                                                    </div>
                                                </th>

                                                <th scope="col" className="px-6 py-3 text-start">
                                                    <div className="flex items-center gap-x-2">
                                                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                            Created
                                                        </span>
                                                    </div>
                                                </th>

                                                <th scope="col" className="px-6 py-3 text-end"></th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            <Suspense fallback={<div>Loading...</div>}>
                                                <TasksList />
                                            </Suspense>

                                        </tbody>
                                    </table>
                                    {/* <!-- End Table -->

          <!-- Footer --> */}
                                    <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                <span className="font-semibold text-gray-800 dark:text-gray-200"></span> results
                                            </p>
                                        </div>

                                        <div>
                                            <div className="inline-flex gap-x-2">
                                                <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                                    <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                                                    Prev
                                                </button>

                                                <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                                    Next
                                                    <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CreateTask />
        </>
    )
}
