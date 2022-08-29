import * as React from 'react';
import ReactMarkdown from "react-markdown";
import { prettyDate } from "../helpers/date.helper";
import { AvatarCard } from "../components/avatar-card.component";
import { useQuery } from "@apollo/client";
import { GET_AVATAR_META } from "../graphql/meta.gql";
import { StickyContainer, Sticky } from 'react-sticky';
import { RandomPost } from "../components/random-post.component";
import { GET_ALL_POSTS } from "../graphql/post.gql";
import { Post as IPost } from '../interfaces/post.interface';
import { getRandomArrayElements } from "../helpers/data.helper";
import { useEffect, useState } from "react";

export const Post = ({ post, children, meta }) => {
    let content = <div className="post" dangerouslySetInnerHTML={{ __html: post.html_content }}/>;
    if (post.content) {
        content = <div className="post"><ReactMarkdown source={post.content}/></div>;
    }
    const [randomPosts, updatePosts] = useState<any[]>([]);
    const { data } = useQuery(GET_AVATAR_META);
    const { posts } = useQuery<{ posts: IPost[] }>(GET_ALL_POSTS).data ?? { posts: [] };
    const postCount = data?._allPostsMeta?.count;
    const commentCount = data?._allCommentsMeta?.count;
    const tagCount = data?._allTagsMeta?.count;

    useEffect(() => updatePosts(getRandomArrayElements(posts, 3)), [posts]);

    return (
        <>
            <article className="px-8 md:px-16 text-gray-500 leading-loose">
                <div
                    style={{ backgroundImage: `${post.cover ? `url(${post?.cover?.publicUrl})` : 'none'}` }}
                    className="
                        text-center min-h-banner bg-no-repeat bg-cover bg-footer bg-center rounded-3xl
                        mb-14 text-white grid content-center relative p-8 overflow-hidden dark:bg-zinc-800
                    ">
                    <h1 className="text-center mx-auto mb-2 text-5xl max-w-screen-sm">
                        {post.title}
                    </h1>
                    <div className="mx-auto text-center max-w-screen-sm text-100xl">
                        {prettyDate(post.createdAt)}
                    </div>
                </div>
                <StickyContainer className="justify-center flex gap-10x">
                    <div className="max-w-post w-0 flex-1 lg:mr-10">
                        <div className="
                            border border-solid border-gray-100 p-8 sm:p-12
                            bg-white rounded dark:bg-zinc-800 dark:border-zinc-800
                            dark:text-gray-50
                        ">
                            {content}
                        </div>
                        {post?.tags?.length > 0 ? (
                            <div className="w-full mt-8 -mx-2">
                                <div className="flex gap-2 text-2xl">
                                    {post.tags?.map(tag => (
                                        <span key={tag.key}
                                              className="
                                                block mx-2 px-4 bg-primary text-white
                                                rounded py-2 dark:bg-zinc-800
                                              "
                                        >
                                        {tag.name}
                                    </span>
                                    ))}
                                </div>
                            </div>
                        ) : ''}
                        <div className={post?.content ? 'mt-12' : ''}>
                            {children}
                        </div>
                    </div>
                    <div className="hidden lg:block">
                        <div className="w-104"/>
                        <Sticky>
                            {({ style }) => (
                                <div style={style}>
                                    <AvatarCard
                                        avatar={meta?.avatar?.publicUrl}
                                        background={meta?.avatar_background?.publicUrl}
                                        title={meta.title}
                                        postCount={postCount}
                                        commentCount={commentCount}
                                        tagCount={tagCount}
                                    />
                                    <RandomPost posts={randomPosts}/>
                                </div>
                            )}
                        </Sticky>
                    </div>
                </StickyContainer>
            </article>
        </>
    )
}
