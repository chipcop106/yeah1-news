import { gql } from '@apollo/client';

export const ALL_CATEGORIES = gql`
  query Categories {
    categories {
      id
      name
      tags {
        name
        id
      }
      slug
    }
  }
`;

export const GET_CONTENT_CATEGORY = gql`
    query getLastedPost($where: JSON, $start: Int, $limit: Int) {
        getLastedPost(where: $where, start: $start, limit: $limit) {
            title
            description
            images
            link
            type
            extra_info
            active
            content_tags
            source_id {
                sourceId
                id
            }
            slug
            id
            createdAt
            updatedAt
        }
    }
`;

export const GET_POST = gql`
    query content($id: ID!) {
        content(id: $id) {
            _id
            createdAt
            updatedAt
            title
            slug
            description
            images
            link
            type
            likes_count
            comments_count
            extra_info
            crawler_source_id
            active
            content_tags
            source_id {
                _id
                __typename
            }
            __typename
        }
    }
`

export const GET_LASTED_POST = gql`
    query getLastedPost($where: JSON, $start: Int, $limit: Int) {
        getLastedPost(where: $where, start: $start, limit: $limit) {
            title
            description
            images
            link
            type
            extra_info
            active
            content_tags
            source_id {
                sourceId
                id
            }
            slug
            id
            createdAt
            updatedAt
        }
    }
`

