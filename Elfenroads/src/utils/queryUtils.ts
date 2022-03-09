// import {gql} from '@apollo/client';
import axios from 'axios';
const URL = 'http://elfenroads.westus3.cloudapp.azure.com:3454/graphql';

export const newLSUser = (password: any, name: any) =>
  axios.post(
    URL,
    {
      query: `
    mutation createLSUser($password: String!, $name: String!) {
        createLSUser(
            role: "ROLE_PLAYER"
            preferredColour: "FFFFFF"
            password: $password
            name: $name
        )
    }
    `,
      variables: {
        password: password,
        name: name,
      },
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

export const verifyUser = (password: any, username: any) =>
  axios.post(
    URL,
    {
      query: `
    query verifyLSUser($password: String!, $username: String!) {
        verifyLSUser(
            password: $password
            username: $username
        ) {
            access_token
            lsUser {
                name
                preferredColour
            }
        }
    }
    `,
      variables: {
        password: password,
        username: username,
      },
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

// export const registerGameService = (
//   displayname: any,
//   name: any,
//   minSessionPlayers: any,
//   maxSessionPlayers: any
// ) =>
//   axios.post(
//     URL,
//     {
//       query: `
//     mutation registerGameService($displayname: String!, $name: String!, $minSessionPlayers: String!, $maxSessionPlayers: String!) {
//         registerGameService(
//             displayname: $displayname
//             name: $name
//             minSessionPlayers: $minSessionPlayers
//             maxSessionPlayers: $maxSessionPlayers
//             location: "http://elfenroads.westus3.cloudapp.azure.com:3454/"
//         )
//     }
//     `,
//       variables: {
//         displayname: displayname,
//         name: name,
//         minSessionPlayers: minSessionPlayers,
//         maxSessionPlayers: maxSessionPlayers,
//       },
//     },
//     {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     }
//   );

export const createSession = (accessToken: any, creator: any, game: any) =>
  axios.post(
    URL,
    {
      query: `
    mutation createSession($access_token: String!, $creator: String!, $game: String!) {
        createSession(
            access_token: $access_token
            creator: $creator
            game: $game
            savegame: ""
        ) {
          gameSession {
            sessionid
          }
        }
    }
    `,
      variables: {
        access_token: accessToken,
        creator: creator,
        game: game,
      },
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

export const joinSession = (accessToken: any, name: any, sessionId: any) =>
  axios.post(
    URL,
    {
      query: `
    mutation joinSession($access_token: String!, $name: String!, $session_id: String!) {
        joinSession(
            access_token: $access_token
            name: $name
            session_id: $session_id
        ) {
          gameSession {
            sessionid
          }
        }
    }
    `,
      variables: {
        access_token: accessToken,
        name: name,
        session_id: sessionId,
      },
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
export const allSessions = () =>
  axios.post(URL, {
    query: `
    query{
        AllSessions {
          sessionid
          creator
          gameParameters {
            name
            displayName
            maxSessionPlayers
            minSessionPlayers
          }
          launched
          players
          savegameid
        }
    }
    `,
  });

export const singleSession = (sessionId: any) =>
  axios.post(
    URL,
    {
      query: `
    query Session($session_id: String!) {
        Session(
            session_id: $session_id
        ) {
          gameSession {
            creator
            gameParameters {
                maxSessionPlayers
                minSessionPlayers
            }
            launched
          }
          users {
            name
            preferredColour
          }
        }
    }
    `,
      variables: {
        session_id: sessionId,
      },
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

export const createGameUser = (color: any, sessionId: any, name: any) =>
  axios.post(
    URL,
    {
      query: `
    mutation createGameUser($color: String!, $session_id: String!, $name: String!) {
        createGameUser(
            color: $color
            session_id: $session_id
            name: $name
        ) {
            name
        }
    }
    `,
      variables: {
        color: color,
        session_id: sessionId,
        name: name,
      },
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

export const launchSession = (accessToken: any, sessionId: any) =>
  axios.post(
    URL,
    {
      query: `
    mutation LaunchSession($access_token: String!, $session_id: String!) {
        LaunchSession(
            access_token: $access_token
            session_id: $session_id
        )
    }
    `,
      variables: {
        access_token: accessToken,
        session_id: sessionId,
      },
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

export const changeColor = (colour: any, accessToken: any, name: any) =>
  axios.post(
    URL,
    {
      query: `
    mutation modifyLSUserColor($colour: String!, $access_token: String!, $name: String!) {
        modifyLSUserColor(
            colour: $colour
            access_token: $access_token
            name: $name
        )
    }
    `,
      variables: {
        colour: colour,
        access_token: accessToken,
        name: name,
      },
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

export const createTowns = (sessionId: any) =>
  axios.post(
    URL,
    {
      query: `
    mutation createTowns($session_id: String!) {
        createTowns(
            session_id: $session_id
        ) {
            name
        }
    }
    `,
      variables: {
        session_id: sessionId,
      },
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

export const allTowns = (sessionId: any) =>
  axios.post(
    URL,
    {
      query: `
    query AllTowns($session_id: String!) {
        AllTowns(
            session_id: $session_id
        ) {
            name
            townPieces
            currentPlayers {
                name
                color
            }
        }
    }
    `,
      variables: {
        session_id: sessionId,
      },
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

export const moveToNewTown = (
  username: any,
  newTown: any,
  oldTown: any,
  sessionId: any
) =>
  axios.post(
    URL,
    {
      query: `
    mutation moveToNewTown($username: String!, $new_town: String!, $old_town: String!, $session_id: String!) {
        moveToNewTown(
            username: $username
            new_town: $new_town
            old_town: $old_town
            session_id: $session_id
        ) {
            name
        }
    }
    `,
      variables: {
        username: username,
        new_town: newTown,
        old_town: oldTown,
        session_id: sessionId,
      },
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
