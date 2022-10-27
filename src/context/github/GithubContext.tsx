import React, { createContext } from "react";
import { useEffect, useReducer } from 'react';
import { GithubUserTypes, IGithubMinimumRepo, IGithubPublicUser, OrNull } from "../../components/users/UserTypes";
import gitHubReducer, { GithubAction, GithubState } from "./GithubReducer";
import { stat } from "fs";
import { UserItemModel } from "../../components/users/UserItem";
import { stringify } from "querystring";


export type GithubContextModel = {
    children ?: React.ReactNode,
    users ?: GithubUserTypes[],
    selectedUser ?  : OrNull< IGithubPublicUser>,
    getUser?: (login: string) => void,
    getUserRepos?: (loginOrUsername: string) => void,
    repos ? :IGithubMinimumRepo[] ,
    loading?: boolean,
    what ?: string,
    // loadUsers ?: () => Promise<void>,
    searchByName ? : (q : string) => void,
    clearUsersSearchResults?: () => void,
    dispatch ?: React.Dispatch<GithubAction>
}

export type SimplifiedGithubContextModel = {
    state?: GithubState,
    dispatch?: React.Dispatch<GithubAction>,
    children? : React.ReactNode,
}

export const GithubContext = createContext<SimplifiedGithubContextModel>({});

export const DEFAULT_USERS_OFFSET_INDEX = 0;
export const DEFAULT_ITEMS_PER_PAGE = 12;
export const DEFAULT_CURRENT_PAGE = 1;

export const GithubProvider = ({children} : SimplifiedGithubContextModel) => {
   
    const initialState: GithubState  = {
        users: [],
        repos: [],
        //selectedUser: null,
        loading: false,
        //loadUsers: fetchUsers,
        what: '',
        usersOffsetIndex: DEFAULT_USERS_OFFSET_INDEX,
        itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
        currentPage: DEFAULT_CURRENT_PAGE
    }
  
    const [state, dispatch] = useReducer(gitHubReducer, initialState);
    return <GithubContext.Provider value={
        {state, dispatch
        }
    }>
        {children}
        </GithubContext.Provider>

}

export default GithubContext;
