import * as React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ApolloProvider, ApolloClient } from '@apollo/client';
import { ToastProvider } from 'react-toast-notifications';
import '../styles/index.less';
import { WithApollo, WithCookies } from "../decorators";
import { ConfigProps } from "../interfaces/props.interface";
import { Query } from "../components/query.component";
import { GET_SITE_METADATA } from "../graphql/metadata.gql";
import { Cookies } from 'react-cookie';

interface MyAppProps extends ConfigProps {
    apolloClient?: ApolloClient<any>;
    user?: any;
    cookies: Cookies;
}

@WithApollo()
@WithCookies()
export default class MyApp extends App<MyAppProps> {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }

    render() {
        const { Component, pageProps, apolloClient, user, cookies } = this.props;
        const isDark = cookies.get('mode') === 'dark';
        const Children = Component as any;
        return (
            <html className={isDark ? 'dark' : ''}>
            <ApolloProvider client={apolloClient}>
                <ToastProvider autoDismissTimeout={2000} autoDismiss={true}>
                    <Query type="object" query={GET_SITE_METADATA} render={meta => <>
                        <Head>
                            <link rel="shortcut icon" href={"favicon.ico"} type="image/x-icon"/>

                            <meta
                                name="viewport"
                                content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no"/>
                            <meta name="keywords" content={meta.keywords}/>
                            <meta name="description" content={meta.description}/>
                            <script dangerouslySetInnerHTML={{ __html: meta.header_script }}/>
                        </Head>
                        <body className="dark:bg-neutral-900 dark:text-gray-50">
                        <Children {...pageProps} user={user} meta={meta}/>
                        </body>
                    </>}/>
                </ToastProvider>
            </ApolloProvider>
            </html>
        );
    }
}
