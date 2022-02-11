import * as React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ApolloProvider, ApolloClient } from '@apollo/client';
import { ToastProvider } from 'react-toast-notifications';
import '../styles/index.less';
import { WithApollo } from "../decorators";
import { ConfigProps } from "../interfaces/props.interface";
import { Query } from "../components/query.component";
import { GET_SITE_METADATA } from "../graphql/metadata.gql";

interface MyAppProps extends ConfigProps {
    apolloClient?: ApolloClient<any>;
    user?: any;
}

@WithApollo()
export default class MyApp extends App<MyAppProps> {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }

    render() {
        const { Component, pageProps, apolloClient, user } = this.props;
        return (
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
                        <Component {...pageProps} user={user} meta={meta}/>
                    </>}/>
                </ToastProvider>
            </ApolloProvider>
        );
    }
}
