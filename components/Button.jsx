import React from 'react'


export const AppButton = (show1, onClick, isDarkMode, content) => {
    return (
        <>
        <button
            onClick={onClick}
            className={`flex justify-center items-center px-2.5 lg:px-5 py-2.5 rounded-[var(--md,8px)]  text-[14px] lg:text-lg not-italic font-normal leading-[normal]   ${
                show1 === 1 && `${isDarkMode ? 'bg-white text-[#454547]' : 'bg-primary text-white'}`
            } ${show1 === 2 && `bg-transparent  ${isDarkMode ? 'text-[#454547]' : 'text-[#28282A66]'}`} `}
            >
            {content}
        </button>
        </>
    )
}