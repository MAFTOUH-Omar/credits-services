import React from 'react'

export default function Pagination({ currentPage, totalPages, onPageChange }) {

    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }
    return (
        <div  className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
            <span class="flex items-center col-span-3">
                Showing 21-30 of 100
            </span>
            <span class="col-span-2"></span>
            <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                <nav aria-label="Table navigation">
                    <ul class="inline-flex items-center">
                        <li>
                            <button
                                class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                                aria-label="Previous"  onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}
                            >
                                <svg
                                    class="w-4 h-4 fill-current"
                                    aria-hidden="true"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        </li>
                        {pageNumbers.map((number) => (
                        <li>
                            <button
                                class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                            >
                                1
                            </button>
                        </li>
                        ))}
                        <li>
                            <span class="px-3 py-1">...</span>
                        </li>
                        <li>
                            <button
                                class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                                aria-label="Next" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}
                            >
                                <svg
                                    class="w-4 h-4 fill-current"
                                    aria-hidden="true"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        </li>
                    </ul>
                </nav>
            </span>
        </div>
    )
}
