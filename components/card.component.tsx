import * as React from 'react';

export const Cards = ({ children, title }) => (
    <div className="mb-12">
        <h2 className="mx-8 font-bold text-4xl md:mx-16">{title}</h2>
        <div className="grid grid-cols-1 gap-12 mx-8 md:mx-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {children}
        </div>
    </div>
);

interface PostCardProps {
    url?: string;
    title?: string;
    thumb?: string;
    description?: string;
}

export const Card = ({ url, thumb, title, description }: PostCardProps) => {
    const isExternalUrl = url?.indexOf('http') === 0;
    return <article
        className="
            grid bg-white rounded-lg border border-solid border-gray-100
            overflow-hidden leading-normal mt-12 hover:shadow-post transition-all duration-300
        ">
        <a href={url} target={isExternalUrl ? '_blank' : ''} rel="noreferrer">
            {!!thumb && (<img src={thumb + '?x-oss-process=style/post-thumb'} alt={title}/>)}
        </a>
        <header className="p-10">
            <h2 className="text-black text-3xl mb-1">
                <a href={url} target={isExternalUrl ? '_blank' : ''} rel="noreferrer" className="hover:text-primary">
                    {title}
                </a>
            </h2>
            <div className="font-extralight mb-0">{description}</div>
        </header>
    </article>;
}
