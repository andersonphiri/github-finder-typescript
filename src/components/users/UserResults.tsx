import { useContext } from 'react';
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';
import { GithubContext } from '../../context/github/GithubContext';
import React, {useEffect} from 'react';

export type UserResultsModel = {

}

const UserResults = () => {
    const { state } = useContext(GithubContext);

    let uiItems: React.DetailedReactHTMLElement<{ className: string; }, HTMLElement> | undefined = undefined;

    useEffect(() => {
        uiItems = generateItems();
    },
        []);

    const generateItems = () => {
        const count = state?.users.length ?? 0;
        if (!state || !state?.users || count === 0) return;
        const start = state?.usersOffsetIndex ?? 0;
        let end = start + (state?.itemsPerPage ?? 0);
        if (end > count) {
            end = count;
        }
        const size = end - start;
        if (size === 0) return;
        let children: React.ReactNode[] = new Array<React.ReactNode>(size);

        for (let index = start; index < end; index++) {
            const user = state?.users[index];
            const toRender = <UserItem key={user.login} avatar_url={user.avatar_url} login={user.login} />
            children.push(toRender);
        }

        const items = React.createElement('div',
            { className: 'grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2' }, children);
        
        return items;

    }
    if (!state?.loading) {
        return (
            <>
                {/* <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
                {
                    state?.users && state?.users.map((user, index) => (
                        
                        <UserItem key={user.login}  avatar_url={user.avatar_url} login={user.login}  />
                    ))
                }
                </div> 
                */}
                
                {
                    //uiItems
                    generateItems()
                }
                
            
            </>
            
        )
    } else {
        return <Spinner />
    }
  
}

export default UserResults;