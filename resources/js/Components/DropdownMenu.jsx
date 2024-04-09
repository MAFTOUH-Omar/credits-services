import React from 'react'

export default function DropdownMenu({ children }) {

    return (
        <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 divide-y divide-gray-200 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700 z-500" aria-labelledby="hs-dropdown-with-icons">
            
                {children}
            
        </div>
    )
}
