import * as React from 'react';
import Head from "next/head";
import { Layout } from "../containers/layout.container";
import { Header } from "../containers/header.container";
import { Query } from "../components/query.component";
import { GET_GUEST_BOOK } from "../graphql/post.gql";
import { Footer } from "../containers/footer.container";
import { BaseProps } from "../interfaces/props.interface";
import { OpenaiContainer } from "../containers/openai.container";

export default class OpenaiPage extends React.Component<BaseProps, any> {
    render() {
        const { meta, mode } = this.props;
        return <>
            <Layout>
                <Head>
                    <title>Talk with Open AI - {meta.title} - {meta.description}</title>
                </Head>
                <Header title={meta.title} avatar={meta?.avatar?.publicUrl} mode={mode}/>
                <Query type="object" query={GET_GUEST_BOOK} render={post => <Layout>
                    <OpenaiContainer/>
                </Layout>}/>
                <Footer meta={meta}/>
            </Layout>
        </>;
    }
}
