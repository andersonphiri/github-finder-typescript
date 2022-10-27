import React from 'react'
import {useEffect, useContext} from 'react'
import GithubContext from '../../context/github/GithubContext';
import { useParams } from 'react-router-dom';
import { FaCodepen, FaStore, FaUserFriends, FaUsers, FaTwitter } from 'react-icons/fa';

import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import RepoList from '../repos/RepoList';
import { defaultGithubService } from '../../context/github/GithubActions';
import { GithubAction } from '../../context/github/GithubReducer';
import { GithubUserTypes, IGithubPublicUser, OrNull } from './UserTypes';


const User = () => {
    const {state, dispatch} = useContext(GithubContext);
    const params = useParams();
    const login: string = params.login ?? '';
    let selectedUser: OrNull<IGithubPublicUser> = state?.selectedUser ?? null ;
    useEffect(()=> {
        getUserAndLoadRepos(login);
        selectedUser = state?.selectedUser ?? null;
    }, []);
    if (state && state?.loading === true) {
        return <Spinner />
    }

    const executeDispatch = (action: GithubAction) => {
        dispatch && dispatch(action);
    }

    const getUserAndLoadRepos = (login: string) => {
        executeDispatch({ type: 'SET_LOADING', what: `loading user data for ${login}`, payload: true });
        defaultGithubService.findUserByLogin(login).then(userOrNull => {
            if (!userOrNull) {
                console.error(`no user found with login: ${login}`);
                return ''
            } else {
                executeDispatch({ type: 'GET_USER', payload: userOrNull as IGithubPublicUser });
                return userOrNull?.login;
            }
        }).then(async (uname) => {
            await defaultGithubService.getUserReposAsync(uname).then(repos => {
                executeDispatch({ type: 'GET_REPOS', payload: repos });
            })
        }).finally(() => {
            executeDispatch({ type: 'SET_LOADING', what: '', payload: false });
        })
    }

  return (
    <>
    <div className={'w-full mx-auto lg:w-10/12'}>
        
        <div className='mb-4'>
            <Link to={'/'} className={'btn btn-ghost'}>Back To Search</Link>

        </div>
        <div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8'>
            <div className='custom-card-image mb-6 md:mb-0'>
                <div className='rounded-lg shadow-xl card image-full'>
                    <figure>
                        <img src={selectedUser?.avatar_url} alt='user profile photo'></img>
                    </figure>
                    <div className='card-body justify-end'>
                        <h2 className='card-title mb-0'>
                            {selectedUser?.name}
                        </h2>
                        <p>{selectedUser?.login}</p>

                    </div>
                </div>

            </div>

            <div className='col-span-2'>
                <div className="mb-6">
                    <h1 className='text-3xl card-title'>
                        {selectedUser?.name}
                        <div className='ml-2 mr-1 badge badge-success'>
                            {selectedUser?.type}

                        </div>
                        {
                            selectedUser?.hireable && selectedUser?.hireable === true && (
                                <div className='mx-1 badge badge-info'>
                                    Hireable
                                </div>
                            )
                        }
                    </h1>
                    <p>
                        {selectedUser?.bio}   </p>
                        <div className='mt-4 card-actions'>
                            <a href={selectedUser?.html_url} target='_blank' rel='noreferrer' className='btn btn-outline'>
                                Visit Github Profile
                            </a>

                        </div>
                 
                </div>

                <div className='w-full rounded-lg shadow-md bg-base-100 stats'>
                    {
                        selectedUser?.location &&(
                            <div className='stat'>
                                <div className='stat'>
                                    <div className='stat-title text-md'>
                                        Location

                                    </div>
                                    <div className="text-lg stat-value">{selectedUser?.location}</div>

                                </div>

                            </div>
                        )
                    }

                    {
                        selectedUser?.blog &&(
                            <div className='stat'>
                                <div className='stat'>
                                    <div className='stat-title text-md'>
                                        Website

                                    </div>
                                    <div className="text-lg stat-value">
                                        <a href={`https://${selectedUser?.blog}`} target='_blank' rel='noreferrer'>{selectedUser?.blog}</a>
                                    </div>

                                </div>

                            </div>
                        )
                    }
                    {
                        selectedUser?.twitter_username &&(
                            <div className='stat'>
                                <div className='stat'>
                                    <div className='stat-title text-md'>
                                        Twitter

                                    </div>
                                    <div className="text-lg stat-value">
                                        <a href={`https://twitter.com/${selectedUser?.twitter_username}`} target='_blank' rel='noreferrer'><FaTwitter /></a>
                                    </div>

                                </div>

                            </div>
                        )
                    }

                </div>
            </div>

        </div>

        <div className="width-ful py-5 mb-6 rounded-lg shadow-md bg-base-100 stats">

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <FaUsers className='text-3xl md:text-5xl' />

                </div>
                <div className="stat-title pr-5">
                    Followers 
                </div>
                <div className="stat-value pr-5 text-3xl md:text-4xl">{selectedUser?.followers}</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <FaUserFriends className='text-3xl md:text-5xl' />

                </div>
                <div className="stat-title pr-5">
                    Following 
                </div>
                <div className="stat-value pr-5 text-3xl md:text-4xl">{selectedUser?.following}</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <FaCodepen className='text-3xl md:text-5xl' />

                </div>
                <div className="stat-title pr-5">
                    Public Repos  
                </div>
                <div className="stat-value pr-5 text-3xl md:text-4xl">{selectedUser?.public_repos}</div>
            </div>

             <div className="stat">
                <div className="stat-figure text-secondary">
                    <FaStore className='text-3xl md:text-5xl' />

                </div>
                <div className="stat-title pr-5">
                    Gists
                </div>
                <div className="stat-value pr-5 text-3xl md:text-4xl">{selectedUser?.public_gists}</div>
            </div>


        </div>

        <RepoList login={login} repos={state?.repos} />
    
    
    </div>
    
    </>

    
  )
}

export default User