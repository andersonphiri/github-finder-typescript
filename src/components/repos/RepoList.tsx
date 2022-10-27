import React, { useContext, useEffect } from 'react';
import GithubContext from '../../context/github/GithubContext';
import { useParams } from 'react-router-dom';
import { IGithubMinimumRepo } from '../users/UserTypes';

export interface RepoListModel {
  login: string,
  repos ?: IGithubMinimumRepo[],
}

const RepoList = ({login, repos} : RepoListModel) => {
 
  return (
    <div className='rounded-lg shadow-lg card bg-base-100'>
      <div className='card-body'>
        <h2 className="text-3xl my-4 font-bold card-title">Latest Repositories</h2>
        {
        repos?.map((repo, _) => (
          <div key={repo.id}>{repo?.name}</div>
        ))
      }

      </div>
     
    </div>
    
  );
}

export default RepoList