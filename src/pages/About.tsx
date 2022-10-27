import { bush_walker, shopping } from "../components/layout/assets"
import {FaFacebook, FaLinkedin, FaGithub, FaGithubAlt} from 'react-icons/fa'

const About = () => {
  return (
    <div className="flex w-full">
<div className="card w-96 bg-base-100 shadow-xl image-full">
    <figure><img src={shopping} alt="shopping" /></figure>
    <div className="card-body">
      <h2 className="card-title">Author</h2>
      <p>Anderson Phiri</p>
      <div className="card-actions justify-end">
      </div>
        </div>
        
      </div>
      <div className="divider divider-horizontal"></div>
      <div className="grid h-20 flex-grow card  rounded-box place-items-center">
        <p>Welcome to the github finder app. It searches and finds github public users with username like what is in the search box</p>
        <p>The original version was written by: <a href={'https://github.com/bradtraversy/github-finder'} target='_blank' rel='noreferrer' className="link link-hover">
          
          <FaGithub className='inline pl-2 text-2xl' />

        </a>
         &nbsp; in javascript

        </p>
        <p>
          This version is written in Typescript. The code can be found here: &nbsp;
          <a href={'https://github.com/andersonphiri/github-finder-typescript'} target='_blank' rel='noreferrer' className="link link-hover">
          
          <FaGithub className='inline pl-2 text-2xl' />

        </a>
        </p>
      </div>


    </div>
    
   
  )
}

export default About