import { GithubUserTypes, IGithubMinimumRepo, IGithubPublicUser, OrNull } from "../../components/users/UserTypes"



export type GithubState = {
    users: GithubUserTypes[],
    usersOffsetIndex: number;
    itemsPerPage: number,
    currentPage: number;
    selectedUser?: OrNull<IGithubPublicUser>,
    repos : IGithubMinimumRepo[],
    loading: boolean,
    error ? : string,
    what?: string,
}

export type GithubAction = {
    type: 'GET_USERS', payload: GithubUserTypes[]}| {type: 'CLEAR_USERS'} | { type: 'SET_LOADING', payload: boolean, what: string }|
{ type: 'GET_REPOS', payload: IGithubMinimumRepo[]} | 
{ type: 'error', error: string } | { type: 'GET_USER', payload: OrNull<IGithubPublicUser> }
    | { type: 'SET_OFFSET_INDEX', payload: number } | { type: 'SET_ITEMS_PER_PAGE', payload: number }
    | { type: 'SET_PAGING_INDEXES', payload: { offsetIndex: number, itemPerPage: number } }

    | {type: 'SET_CURRENT_PAGE_NUMBER', payload: number}

const gitHubReducer = (state: GithubState, action: GithubAction): GithubState => {
    switch (action.type) {
        case 'GET_USERS':
            //const users =  [];
            return {...state,users: action.payload}
        case 'SET_LOADING':
            return { ...state, loading: action.payload, what: action.what }
        case 'CLEAR_USERS':
            return { ...state, users: []};
        case 'GET_USER':
            return { ...state, selectedUser: action.payload };
        case 'GET_REPOS':
            return { ...state, repos: action.payload };
        
        case 'SET_OFFSET_INDEX':
            return { ...state, usersOffsetIndex: action.payload }
        
        case 'SET_ITEMS_PER_PAGE':
            return { ...state, itemsPerPage: action.payload };
        
        case 'SET_PAGING_INDEXES':
            return { ...state, usersOffsetIndex: action.payload.offsetIndex, itemsPerPage: action.payload.itemPerPage };
        
        case 'SET_CURRENT_PAGE_NUMBER':
            return { ...state, currentPage: action.payload};


        default:
            return state;
    }
}

export default gitHubReducer;