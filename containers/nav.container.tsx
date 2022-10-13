import * as React from 'react';
import { setCookie } from 'cookies-next';
import { Icons } from "../constants/icons.constants";
import { useEffect, useState } from "react";

export const Nav = ({ mode: darkMode }) => {
    const [mode, setMode] = useState(darkMode);
    const isDark = mode === 'dark';

    const updateMode = (mode: string) => {
        setMode(mode);
        setCookie('mode', mode);
        const htmlTag = document.getElementsByTagName('html')[0];
        if (htmlTag) {
            htmlTag.className = mode;
        }
    }

    return <nav>
        <ul className="flex list-none p-0">
            <li className="uppercase text-xl sm:text-2xl text-gray-500 ml-4 sm:ml-8">
                <a className="dark:hover:text-white" href={'/posts'}>Blog</a>
            </li>
            <li className="uppercase text-xl sm:text-2xl text-gray-500 ml-4 sm:ml-8">
                <a className="dark:hover:text-white" target="_blank" href={'https://resume.mxb.cc'} rel="noreferrer">Resume</a>
            </li>
            <li className="uppercase text-xl sm:text-2xl text-gray-500 ml-4 sm:ml-8">
                <a className="dark:hover:text-white" href={'/music'}>Music</a>
            </li>
            <li className="uppercase text-xl sm:text-2xl text-gray-500 ml-4 sm:ml-8">
                <a className="dark:hover:text-white" href={'/contact'}>Contact</a>
            </li>
            <li className="uppercase text-xl sm:text-2xl text-gray-500 ml-4 sm:ml-8">
                <a className="dark:hover:text-white" href={'/about'}>About</a>
            </li>
            <li className="hidden sm:block uppercase text-xl sm:text-2xl text-gray-500 ml-4 sm:ml-8">
                <a className="dark:hover:text-white" href={'/guest-book'}>GuestBook</a>
            </li>
            <li className="hidden sm:block uppercase text-xl sm:text-2xl text-gray-500 ml-4 sm:ml-8">
                <a className="dark:hover:text-white" href={'/links'}>Links</a>
            </li>
            <li className="sm:block uppercase text-xl sm:text-2xl text-gray-500 ml-4 sm:ml-8">
                <a className="cursor-pointer" onClick={() => updateMode(isDark ? 'light' : 'dark')}>
                    {isDark}{isDark ? Icons().light : Icons().dark}
                </a>
            </li>
        </ul>
    </nav>;
};
