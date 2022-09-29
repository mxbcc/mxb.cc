import * as React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ApolloProvider, ApolloClient } from '@apollo/client';
import { ToastProvider } from 'react-toast-notifications';
import '../styles/index.less';
import { WithApollo } from "../decorators";
import { ConfigProps } from "../interfaces/props.interface";
import { Query } from "../components/query.component";
import { getCookie } from "cookies-next";
import { GET_SETTINGS } from "../graphql/setting.gql";
import { Metadata } from "../interfaces/meta.interface";
import { Setting } from "../enums/setting.enum";

interface MyAppProps extends ConfigProps {
    apolloClient?: ApolloClient<any>;
    user?: any;
    mode: 'dark' | 'light';
    Component: any;
}

@WithApollo()
export default class MyApp extends App<MyAppProps> {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        const mode = getCookie('mode', { req: ctx.req, res: ctx.res });

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps, mode };
    }

    getMeta(settings): Metadata {
        const map = new Map<string, string>();
        settings.forEach(setting => map.set(setting.key, setting.value));
        return {
            title: map.get(Setting.MXB_TITLE),
            keywords: map.get(Setting.MXB_KEYWORDS),
            description: map.get(Setting.MXB_DESCRIPTION),
            avatar: {
                publicUrl: map.get(Setting.MXB_AVATAR),
            },
            avatar_background: {
                publicUrl: map.get(Setting.MXB_AVATAR_BG),
            },
            qrcode: {
                publicUrl: map.get(Setting.MXB_QRCODE),
            },
            admin_name: map.get(Setting.MXB_ADMIN_NAME),
            admin_email: map.get(Setting.MXB_ADMIN_EMAIL),
            script: map.get(Setting.MXB_SCRIPT),
        }
    }

    render() {
        const { Component, pageProps, apolloClient, user, mode } = this.props;
        return (
            <ApolloProvider client={apolloClient}>
                <ToastProvider autoDismissTimeout={2000} autoDismiss={true}>
                    <Query
                        type="array"
                        query={GET_SETTINGS}
                        variables={{ type: 'mxb' }}
                        render={settings => {
                            const meta = this.getMeta(settings);
                            return <>
                                <Head>
                                    <link
                                        rel="shortcut icon"
                                        href={"favicon.ico"}
                                        type="image/x-icon"
                                    />

                                    <meta
                                        name="viewport"
                                        content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no"/>
                                    <meta name="keywords" content={meta.keywords}/>
                                    <meta name="description" content={meta.description}/>
                                    <script
                                        dangerouslySetInnerHTML={{ __html: meta.script }}/>
                                </Head>
                                <Component {...pageProps} user={user} meta={meta} mode={mode}/>
                            </>;
                        }}
                    />
                </ToastProvider>
            </ApolloProvider>
        );
    }
}
