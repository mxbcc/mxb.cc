import * as React from 'react';
import Head from "next/head";
import { Layout } from "../containers/layout.container";
import { Header } from "../containers/header.container";
import { Query } from "../components/query.component";
import { GET_ABOUT } from "../graphql/post.gql";
import { Post } from "../containers/post.container";
import { Footer } from "../containers/footer.container";
import { BaseProps } from "../interfaces/props.interface";
import { CommentContainer } from "../containers/comment.container";

export default class AboutPage extends React.Component<BaseProps, any> {
    render() {
        const { meta, mode } = this.props;
        return <>
            <Layout>
                <Head>
                    <title>About - {meta.title} - {meta.description}</title>
                </Head>
                <Header title={meta.title} avatar={meta?.avatar?.publicUrl} mode={mode}/>
                <Query type="object" query={GET_ABOUT} render={post => <Layout>
                    <Post post={post} meta={meta}>
                        <CommentContainer page="/about" meta={meta}  mode={mode}/>
                    </Post>
                </Layout>}/>
                <Footer meta={meta}/>
            </Layout>
        </>;
    }
}
