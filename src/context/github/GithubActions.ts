import { Octokit } from "octokit";
import { GithubUserTypes, IGithubMinimumRepo, IGithubPublicUser, OrNull } from "../../components/users/UserTypes";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const octokit = new Octokit({ auth: `${process.env.REACT_APP_GITHUB_TOKEN}` });

var userLoggedIn: boolean = false;
export interface IGithubClientService {
    getUsers(per_page ?: number, page ?: number) : Promise<GithubUserTypes[]>;
    findUserByLogin(query: string) : Promise<OrNull<IGithubPublicUser>>;
    searchUsersAsync(query: string, per_page: number, page: number): Promise<GithubUserTypes[]>;
    loginAsync(token: string): Promise<void>;
    loginDefault(): void;
    getUserReposAsync(login : string): Promise<IGithubMinimumRepo[]>
}


const loginAsync = async () : Promise<boolean> => {
    const req = await octokit.rest.users.getAuthenticated();
    if (req.status === 200 && req.data.login.length > 0) {
        return true;
    }
    return false;
}

function memoization(targe: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalValue = descriptor.value;
    const cache = new Map<any, any>();
    descriptor.value = function (arg: any) {
        if (cache.has(arg)) {
            return cache.get(arg);
        }
        var result = originalValue.apply(this, [arg]);
        cache.set(arg, result);
        return result;
    }
}

function loginFunc() {
    loginAsync().then((pass) => {
        if (pass === true) {
            userLoggedIn = pass;
        } else {
            throw Error(`failed to log in`);
        }
        
        
    }).catch(err => {
        throw Error(`error when logging in for configured user or token: ${err}`);
    }).finally(() => {
        if (userLoggedIn !== true) {
            throw Error(`user must be logged in`);
        }
        
    })
}
function checkLogin(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    loginFunc();
    
}

function tokenMustBeLoggedIn(constructor: Function) {
    loginFunc();
}


class DefaultGithubClientService implements IGithubClientService {
    loginDefault(): void {
        loginFunc()
    }
    async getUsers(per_page?: number | undefined, page?: number | undefined): Promise<GithubUserTypes[]> {
        let result: GithubUserTypes[] = [];
        try {
            const users = await octokit.rest.users.list({
                per_page, page,
            });
            result = users.data;
        } catch (error) {
            throw Error(`Error fetching users: ${error}`);

        } finally {
        }
        return result;
    }
    async findUserByLogin(login: string): Promise<OrNull<IGithubPublicUser>> {
        let result = null;
        try {
            const sr = await octokit.request("GET /users/{username}", {
                username: login
            });
            result  = sr.data;
        } catch (error) {
            throw Error(`Error searching user: ${error}`);

        } finally {
        }
        return result;
    }
    async searchUsersAsync(query: string, per_page: number, page: number): Promise<GithubUserTypes[]> {
        let result: GithubUserTypes[] = [];
        try {
            const sr = await octokit.request("GET /search/users", {q: `${query} in:login`, per_page, page})
            result  = sr.data.items;
        } catch (error) {
            throw Error(`Error searching users: ${error}`);
    
        } finally {
        }
        return result;
    }
    async loginAsync(token: string): Promise<void> {
        await loginAsync()
    }
    async getUserReposAsync(login: string): Promise<IGithubMinimumRepo[]> {
        await octokit.rest.users.getAuthenticated();
        let result: IGithubMinimumRepo[] = [];
        try {
            const sr = await octokit.request("GET /users/{username}/repos", { username: login, per_page: 10, sort: "created", direction: "desc" }); 
            result = sr.data;
       } catch (error) {
            console.error(`Error getting repos for user ${login}: ${error}`);
            

        } finally {
            
       }
       return result;
    }
    
}

export const defaultGithubService: IGithubClientService = new DefaultGithubClientService();