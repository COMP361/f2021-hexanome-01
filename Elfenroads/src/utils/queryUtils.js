import {gql} from '@apollo/client';

export const POST_USER = gql`
  mutation createLSUser($password: String!, $name: String!) {
    createLSUser(
      role: "ROLE_PLAYER"
      preferredColour: "FFFFFF"
      password: $password
      name: $name
    )
  }
`;

export const VERIFY_USER = gql`
  query verifyLSUser($password: String!, $username: String!) {
    verifyLSUser(
      password: $password
      username: $username
      grand_type: "password"
    ) {
      access_token
      token_type
      refresh_token
      expires_in
      scope
      lsUser {
        name
        preferredColour
        role
      }
    }
  }
`;
