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
`;

export const GET_POSTS = gql`
  query getPosts(
    $where: JSON
    $start: Int
    $limit: Int
    $q: String
    $command: String
  ) {
    getPosts(
      where: $where
      start: $start
      limit: $limit
      q: $q
      command: $command
    ) {
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
