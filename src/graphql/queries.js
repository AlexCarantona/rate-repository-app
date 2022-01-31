import { gql } from "@apollo/client";

export const GET_REPOS = gql`
query Query($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $after: String) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: 8, after: $after) {
        pageInfo {
            hasNextPage
            endCursor
            startCursor
        }
        edges {
            cursor
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
  query Repository($id: ID!, $after: String) {
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
          reviews (first: 5, after: $after) {
              totalCount
              pageInfo {
                  hasNextPage
                  endCursor
              }
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
    query Me($includeRevs : Boolean = false) {
        me {
            id
            username
            reviews @include(if: $includeRevs) {
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        repository {
                            name
                        }
                    }
                }
            }
        }
    }
`