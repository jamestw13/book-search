import { gql } from '@apollo/client';

export const GET_ME = gql`
  {
    me {
      _id
      username
      bookCount
      savedBooks {
        bookId
        title
        authors
        description
        image
        link
      }
    }
  }
`;
