import Document, { Html, Head, Main, NextScript } from 'next/document'
import { getCookie } from "cookies-next";

export default function MyDocument({ mode }) {
    return (
        <Html className={mode}>
            <Head/>
            <body className="dark:bg-neutral-900 dark:text-gray-50">
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}

MyDocument.getInitialProps = async (ctx) => {
    const mode = getCookie('mode', { req: ctx.req, res: ctx.res });
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, mode };
}
