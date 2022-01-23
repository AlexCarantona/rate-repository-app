import { gql } from "@apollo/client";

export const GET_REPOS = gql`
    query Repositories {
        repositories {
        edges {
            node {
            ratingAverage
            reviewCount
            stargazersCount
            name
            ownerAvatarUrl
            forksCount
            language
            description
            reviews {
                totalCount
            }
            }
        }
        }
  }
`