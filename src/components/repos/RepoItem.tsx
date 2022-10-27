import React from 'react'
import { FaEye, FaInfo, FaLink, FaStar, FaUtensils } from 'react-icons/fa'
import { IGithubMinimumRepo } from '../users/UserTypes'


const RepoItem = ({name, description, html_url, forks_url,issues_url,} : IGithubMinimumRepo) => {
  return (
      <div className='mb-2 rounded-md card bg-gray-800 hover:bg-gray-900'>
          <div className='card-body'>
              <h3 className='mb-2 text-xl font-semibold'>
                  <a href={html_url}>
                      <FaLink className='inline mr-1' />
                      {name}
                  </a>
              </h3>
              <p className='mb-3'>{description}
              </p>
              <div>
                  <div className='mr-2 badge badge-info badge-lg'>
                      <FaEye className='mr-2' />{'watchers count here'}
                  </div>
                  
                  <div className='mr-2 badge badge-success badge-lg'>
                      <FaStar className='mr-2' />{'Stargazers'}
                  </div>
                  
                  <div className='mr-2 badge badge-warning badge-lg'>
                      <FaInfo className='mr-2' />{'open issues here'}
                  </div>
                  
                  <div className='mr-2 badge badge-info badge-lg'>
                      <FaUtensils className='mr-2' />{'forks here'}
                  </div>
                  

                  </div>
          </div>
      </div>
  )
}

export default RepoItem