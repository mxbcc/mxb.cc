import * as React from 'react';
import { useCookies } from 'react-cookie';
import { Icons } from "../constants/icons.constants";

export const Nav = () => {
    const [cookies, setCookies] = useCookies(['mode']);
    const setMode = (mode: string) => setCookies('mode', mode);
    const isDark = cookies.mode === 'dark';
    return <nav>
        <ul className="flex list-none p-0">
            <li className="uppercase text-xl sm:text-2xl text-gray-500 ml-4 sm:ml-8">
                <a href={'/posts'}>Blog</a>
            </li>
            <li className="uppercase text-xl sm:text-2xl text-gray-500 ml-4 sm:ml-8">
                <a target="_blank" href={'https://resume.mxb.cc'} rel="noreferrer">Resume</a>
            </li>
            <li className="uppercase text-xl sm:text-2xl text-gray-500 ml-4 sm:ml-8">
                <a href={'/music'}>Music</a>
            </li>
            <li className="uppercase text-xl sm:text-2xl text-gray-500 ml-4 sm:ml-8">
                <a href={'/contact'}>Contact</a>
            </li>
            <li className="uppercase text-xl sm:text-2xl text-gray-500 ml-4 sm:ml-8">
                <a href={'/about'}>About</a>
            </li>
            <li className="hidden sm:block uppercase text-xl sm:text-2xl text-gray-500 ml-4 sm:ml-8">
                <a href={'/guest-book'}>GuestBook</a>
            </li>
            <li className="hidden sm:block uppercase text-xl sm:text-2xl text-gray-500 ml-4 sm:ml-8">
                <a href={'/links'}>Links</a>
            </li>
            <li className="hidden sm:block uppercase text-xl sm:text-2xl text-gray-500 ml-4 sm:ml-8">
                <a onClick={() => setMode(isDark ? 'light' : 'dark')}>
                    {isDark ? Icons().light : Icons().dark}
                </a>
            </li>
        </ul>
    </nav>;
};
