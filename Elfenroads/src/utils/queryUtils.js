// import {gql} from '@apollo/client';
import axios from 'axios';
const URL = 'http://elfenroads.westus3.cloudapp.azure.com:3454/graphql';

export const newLSUser = (password, name) => axios.post(URL, {
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
}, {
    headers: {
        'Content-Type': 'application/json',
    },
});

export const verifyUser = (password, username) => axios.post(URL, {
    query: `
    query verifyLSUser($password: String!, $username: String!) {
        verifyLSUser(
            password: $password
            username: $username
            grand_type: "password"
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
}, {
    headers: {
        'Content-Type': 'application/json',
    },
});

export const registerGameService = (displayname, name, minSessionPlayers, maxSessionPlayers) => axios.post(URL, {
    query: `
    mutation registerGameService($displayname: String!, $name: String!, $minSessionPlayers: String!, $maxSessionPlayers: String!) {
        registerGameService(
            displayname: $displayname
            name: $name
            minSessionPlayers: $minSessionPlayers
            maxSessionPlayers: $maxSessionPlayers
            location: "http://elfenroads.westus3.cloudapp.azure.com:3454/"
        )
    }
    `,
    variables: {
        displayname: displayname,
        name: name,
        minSessionPlayers: minSessionPlayers,
        maxSessionPlayers: maxSessionPlayers,
    },
}, {
    headers: {
        'Content-Type': 'application/json',
    },
});

export const createSession = (game, creator, accessToken) => axios.post(URL, {
    query: `
    mutation createSession($game: String!, $creator: String!, $access_token: String!) {
        createSession(
            savegame: ""
            game: $game
            creator: $creator
            access_token: $access_token
        )
    }
    `,
    variables: {
        game: game,
        creator: creator,
        access_token: accessToken,
    },
}, {
    headers: {
        'Content-Type': 'application/json',
    },
});

export const joinSession = (accessToken, name, sessionId) => axios.post(URL, {
    query: `
    mutation joinSession($access_token: String!, $name: String!, $session_id: String!) {
        joinSession(
            access_token: $access_token
            name: $name
            session_id: $session_id
        )
    }
    `,
    variables: {
        access_token: accessToken,
        name: name,
        session_id: sessionId,
    },
}, {
    headers: {
        'Content-Type': 'application/json',
    },
});

export const allSessions = () => axios.post(URL, {
    query: `
    query{
        AllSessions
    }
    `,
});

export const singleSession = (sessionId) => axios.post(URL, {
    query: `
    query Session($session_id: String!) {
        Session(
            session_id: $session_id
        ) {
            creator
            gameParameters {
                name
                displayName
                maxSessionPlayers
                minSessionPlayers
            }
            launched
            players
        }
    }
    `,
    variables: {
        session_id: sessionId,
    },
}, {
    headers: {
        'Content-Type': 'application/json',
    },
});

export const createGameUser = (color, sessionId, name) => axios.post(URL, {
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
}, {
    headers: {
        'Content-Type': 'application/json',
    },
});

export const launchSession = (accessToken, sessionId) => axios.post(URL, {
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
}, {
    headers: {
        'Content-Type': 'application/json',
    },
});
