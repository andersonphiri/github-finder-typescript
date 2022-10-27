import React from 'react';
import { spinner } from './assets';
import {useContext} from 'react';
import GithubContext from '../../context/github/GithubContext';

const Spinner = () => {
  const {state} = useContext(GithubContext);
  return (
    <div>
        <img width={180} className='text-center mx-auto block' src={spinner} alt='Loading...'></img>
      <p className='text-center'>{ state?.what}</p>
    </div>
  )
}

export default Spinner