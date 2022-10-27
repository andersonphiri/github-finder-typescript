import React, { ChangeEvent, EventHandler, FormEvent, useContext, useState } from 'react'
import { AlertContext } from '../../context/alert/AlertContext';
import { AlertState } from '../../context/alert/AlertReducer';
import { defaultGithubService } from '../../context/github/GithubActions';
import GithubContext, { DEFAULT_CURRENT_PAGE, DEFAULT_ITEMS_PER_PAGE, DEFAULT_USERS_OFFSET_INDEX } from '../../context/github/GithubContext';
import { GithubAction } from '../../context/github/GithubReducer';

const UserSearch = () => {
    const {dispatch, state} = useContext(GithubContext);
    const {setAlert} = useContext(AlertContext)    ;
    const [text, setText] = useState<string>('');
    const [textPlaceholder, setTextPlaceholder] = useState<string>('type your search term here');

    const pageOptions: ReadonlyArray<number> = ([4, 12, 24, 32, 60]).sort((a,b) => a - b);
    const lcm: number = 300;

    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{
        setText(e.target.value);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (text === '') {
            setAlert && setAlert('please set text in the form field' ,AlertState.Error);
        } else {
            searchByName(text, lcm, 1); // do a bulk fetch the first time
            //setText('');
            //setTextPlaceholder('type your search term here');
        }
    }

    const executeDispatch = (action: GithubAction) => {
        dispatch && dispatch(action);
    }

    const setLoadingState = (what: string, loading : boolean) => {
        executeDispatch({
               type: 'SET_LOADING', payload: loading, what
           });
   }

    const searchByName = (text: string, per_page: number, page: number): boolean => {
        let canGoNext: boolean = false;
        setLoadingState(`loading users with login name like ${text}`, true);
        defaultGithubService.searchUsersAsync(text, per_page, page).then(users => {
            if (users.length === 0) {
                return false;
            } else {
                canGoNext = true;
                executeDispatch({ type: 'GET_USERS', payload: users });
                executeDispatch({
                    type: 'SET_PAGING_INDEXES', payload: {
                        offsetIndex: DEFAULT_USERS_OFFSET_INDEX,
                        itemPerPage: DEFAULT_ITEMS_PER_PAGE
                    }
                });
                executeDispatch({type: 'SET_CURRENT_PAGE_NUMBER', payload: DEFAULT_CURRENT_PAGE})
            }
            
        }).finally(() => {
            setLoadingState(``, false);
        })
        return canGoNext;
    }

    const handleClear = () => {
        executeDispatch({ type: 'CLEAR_USERS' });
        setText('');
        setTextPlaceholder('type your search term here');
    }

    const handleSelect = (e: React.SyntheticEvent<HTMLSelectElement, Event>) => {
       //  setItemsPerPage(e.)
        console.log(`select happening `);
    }

    const goToNextPage = () => {
        if (!state) {
            return
        }
        if (state.usersOffsetIndex === undefined) {
            console.log(`usersOffsetIndex is undefined, has value ${state.usersOffsetIndex}`)
            return ;
        }
        const currentOffset = state?.usersOffsetIndex as number;
        const nextOffset = currentOffset + state.itemsPerPage;
        const nextPage = state?.currentPage + 1;
        executeDispatch({ type: 'SET_OFFSET_INDEX', payload: nextOffset });
        executeDispatch({type: 'SET_CURRENT_PAGE_NUMBER', payload: nextPage })
        if (nextOffset  >= state?.users.length) {
            // then fetch new data but if its empty then disable 
          searchByName(text,state.itemsPerPage, nextPage)

        }
    }

    const goToPrevPage = (): boolean => {
        let canGo = true;
        if (!state) {
            return false;
        }
        const currentPage = state?.currentPage;
        const prevPage = currentPage <= DEFAULT_CURRENT_PAGE ? DEFAULT_CURRENT_PAGE : currentPage - 1;
        const prevTemp = state?.usersOffsetIndex - state?.itemsPerPage
        const prevOffset = prevTemp <= 0 ? DEFAULT_USERS_OFFSET_INDEX : prevTemp;
        executeDispatch({ type: 'SET_OFFSET_INDEX', payload: prevOffset });
        executeDispatch({ type: 'SET_CURRENT_PAGE_NUMBER', payload: prevPage });
        return prevPage > 1;


    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue: number = +e.target.value;
        executeDispatch({ type: 'SET_ITEMS_PER_PAGE', payload: newValue });


    }


    const createSelectElements = () => {
        const currentOffset = state?.usersOffsetIndex ?? 0;
        const count = state?.users?.length ?? 0;
        const remaining = count - currentOffset ;
        if (remaining <= 1) return;
        let children: React.ReactNode[] = new Array<React.ReactNode>(remaining);
        let ix: number = -1;
        let next = pageOptions[(++ix)]; // ['4', '12', '24', '32', '60']
        const max = +pageOptions[pageOptions.length];
        let nextMax = next;
        do {
            let child = <option key={next} value={`${next}`}>{next}</option>;
            if (next === state?.itemsPerPage) {
                <option key={next} selected value={`${next}`}>{next}</option>;
            }
            children.push(child);
            next = pageOptions[(++ix)]; 
            nextMax = next;

        } while (ix < pageOptions.length && (next <= remaining || next <= max));

        // const _key = `${state?.itemsPerPage ?? nextMax}`;
        // const first = <option key={_key} value={_key} disabled >Select Items per Page</option>;
        // children[0] = first;

        const selectRoot = React.createElement('select', {
            className: "select pr-40 bg-gray-200",
            onChange: handleSelectChange 
        }, children);

        return selectRoot;

        
    }


  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <div className="relative">
                        <input placeholder={textPlaceholder} value={text} onChange={handleChange}
                        type='text' className='w-full pr-40 bg-gray-200 input input-lg text-black' />
                        <button type='submit' className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg'>
                            Go
                          </button>
                          
                    </div>
                </div>
              </form>
             
          </div>
          

        {
            state?.users && state?.users.length > 0 && (
                  <div className='relative'>
                      
                      

            <button className='btn btn-ghost btn-lg' onClick={(e) => handleClear()} >Clear</button>
                      
                      {/* <select className="select pr-40 bg-gray-200"
                          onChange={handleSelectChange} >
                        
                          {
                              pageOptions.map((opt, index) => (
                                  <option key={opt} >{opt}</option>
                              ))
                          }
                      </select> */}
                      {
                          createSelectElements()
                      }
                      <button className={`btn btn-outline p-2 ${state?.currentPage > 1 ? '' : 'btn-disabled'}`}
                          onClick={(e) => goToPrevPage()}>Previous page</button>
                      <button className={`btn btn-outline ${(state?.usersOffsetIndex + 1) >= state?.users.length ? 'btn-disabled' : ''}`}
                      onClick={(e)=> goToNextPage()}
                      >Next</button>
        </div>
            )
        }
        
    </div>
  )
}

export default UserSearch