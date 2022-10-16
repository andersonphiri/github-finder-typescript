import {useEffect, useState} from 'react'
 import { Octokit, App } from "octokit";
import { GithubUserTypes } from './UserTypes';

const UserResults = () => {
    const octokit = new Octokit({ auth: `${process.env.REACT_APP_GITHUB_TOKEN}` });
    
 
    const [users, setUsers] = useState<GithubUserTypes[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const {
            data: { login },
        } = await octokit.rest.users.getAuthenticated();
        console.log("Hello, %s", login);
        
        try {
            // const {
            //     data: { login },
            // } = await octokit.rest.users.getAuthenticated();
            // console.log(`logged int: ${login}`);

           const users = await octokit.rest.users.list({
                per_page: 10
            });
           // console.log(users);
            setUsers(users.data)
        } catch (error) {
            console.error(error);
            
        } finally {
            setLoading(false);
        }
    }

  return (
    <div>
        {
            users.map((user, index) => (
                <h3 key={index}>{user.login}</h3>
            ))
        }
    </div>
  )
}

export default UserResults