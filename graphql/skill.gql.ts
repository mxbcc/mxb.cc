import gql from "graphql-tag";

export const GET_SKILLS = gql`
query getSkill {
  allSkills {
    title,
    content
  }
}
`;

export const GET_BANNER_IMAGES = gql`
query getBannerImages {
  allBannerImages(sortBy: [sort_ASC]) {
    image {
      publicUrl
    },
    content,
    sort
  }
}
`
