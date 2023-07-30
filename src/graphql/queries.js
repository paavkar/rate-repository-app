import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query repositories {
    repositories {
      edges {
        node {
          name
          ownerName
          fullName
          reviewCount
          ratingAverage
          forksCount
          stargazersCount
          description
          language
          ownerAvatarUrl
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query {
    me {
      id
      username
    }
  }
`;

// other queries...
