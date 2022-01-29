import { gql } from "@apollo/client";

export const GET_REPOS = gql`
    query Repositories {
        repositories {
        edges {
            node {
                id
                fullName
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

export const GET_REPO = gql`
  query Repository($id: ID!) {
      repository(id: $id) {
          fullName
          ratingAverage
          reviewCount
          stargazersCount
          name
          ownerAvatarUrl
          forksCount
          language
          description
          url
          reviews {
              totalCount
                  edges{
                      node{
                          id
                          text
                          rating
                          createdAt
                          user {
                              username
                          }
                      }
                }
            }
      }
  }
`

export const ME = gql`
    query Me {
        me {
            id
            username
        }
    }
`