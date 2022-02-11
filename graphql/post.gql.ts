import gql from "graphql-tag";

export const POST_DATA = gql`
  fragment PostData on Post {
    id,
    key,
    title,
    description,
    thumb {
      publicUrl
    }
    cover {
      publicUrl
    }
    tags {
      key,
      name,
      description
    }
    content,
    html_content,
    publish,
    top,
    source,
    createdAt,
    source_url,
  }
`;

export const GET_ABOUT = gql`
  query {
    allPosts(where: {key: "about-me"}) {
      ...PostData
    }       
  }
  ${POST_DATA}
`;

export const GET_GUEST_BOOK = gql`
  query {
    allPosts(where: {key: "guest-book"}) {
      ...PostData
    }       
  }
  ${POST_DATA}
`;

export const GET_LATEST_POSTS = gql`
  query {
    allPosts(where: {publish: true}, orderBy: "createdAt_DESC", skip: 0, first: 8) {
      ...PostData
    }       
  }
  ${POST_DATA}
`;

export const GET_POSTS = gql`
  query getPosts($skip: Int!, $first: Int!) {
    allPosts(where: {publish: true}, sortBy: [top_DESC, createdAt_DESC], skip: $skip, first: $first) {
      ...PostData
    }
    _allPostsMeta(where: {publish: true}) {
      count
    }      
  }
  ${POST_DATA}
`;

export const GET_POST = gql`
  query getPost($key: String!) {
    allPosts(where: {key: $key}) {
      ...PostData
    }
  }
  ${POST_DATA}
`;

export const GET_ALL_POSTS = gql`
  query {
    posts: allPosts(where: {publish: true}) {
      id,
      key,
      title,
      createdAt,
      thumb {
        publicUrl
      }
    }
  }
`;

