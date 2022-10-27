export type OrNull<TType> = TType | null;

export interface GithubUserTypes {
    login ?: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id : OrNull<string>;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

export interface IGithubPublicUser {
      login: string;
      id: number;
      node_id: string;
      /** Format: uri */
      avatar_url: string;
  gravatar_id: string | null;
      /** Format: uri */
      url: string;
      /** Format: uri */
      html_url: string;
      /** Format: uri */
      followers_url: string;
      following_url: string;
      gists_url: string;
      starred_url: string;
      /** Format: uri */
      subscriptions_url: string;
      /** Format: uri */
      organizations_url: string;
      /** Format: uri */
      repos_url: string;
      events_url: string;
      /** Format: uri */
      received_events_url: string;
      type: string;
      site_admin: boolean;
      name: string | null;
      company: string | null;
      blog: string | null;
      location: string | null;
      /** Format: email */
      email: string | null;
      hireable: boolean | null;
      bio: string | null;
      twitter_username?: string | null;
      public_repos: number;
      public_gists: number;
      followers: number;
      following: number;
      /** Format: date-time */
      created_at: string;
      /** Format: date-time */
      updated_at: string;
      plan?: {
        collaborators: number;
        name: string;
        space: number;
        private_repos: number;
      };
      /** Format: date-time */
      suspended_at?: string | null;
      /** @example 1 */
      private_gists?: number;
      /** @example 2 */
      total_private_repos?: number;
      /** @example 2 */
      owned_private_repos?: number;
      /** @example 1 */
      disk_usage?: number;
      /** @example 3 */
      collaborators?: number;
}

export interface IGithubMinimumRepo {
   /** @example 1296269 */
   id: number;
   /** @example MDEwOlJlcG9zaXRvcnkxMjk2MjY5 */
  node_id: string;
  
  owner: {
    name?: string | null;
    email?: string | null;
    /** @example octocat */
    login: string;
    /** @example 1 */
    id: number;
    /** @example MDQ6VXNlcjE= */
    node_id: string;
    /**
     * Format: uri
     * @example https://github.com/images/error/octocat_happy.gif
     */
    avatar_url: string;
    /** @example 41d064eb2195891e12d0413f63227ea7 */
    gravatar_id: string | null;
    /**
     * Format: uri
     * @example https://api.github.com/users/octocat
     */
    url: string;
    /**
     * Format: uri
     * @example https://github.com/octocat
     */
    html_url: string;
    /**
     * Format: uri
     * @example https://api.github.com/users/octocat/followers
     */
    followers_url: string;
    /** @example https://api.github.com/users/octocat/following{/other_user} */
    following_url: string;
    /** @example https://api.github.com/users/octocat/gists{/gist_id} */
    gists_url: string;
    /** @example https://api.github.com/users/octocat/starred{/owner}{/repo} */
    starred_url: string;
    /**
     * Format: uri
     * @example https://api.github.com/users/octocat/subscriptions
     */
    subscriptions_url: string;
    /**
     * Format: uri
     * @example https://api.github.com/users/octocat/orgs
     */
    organizations_url: string;
    /**
     * Format: uri
     * @example https://api.github.com/users/octocat/repos
     */
    repos_url: string;
    /** @example https://api.github.com/users/octocat/events{/privacy} */
    events_url: string;
    /**
     * Format: uri
     * @example https://api.github.com/users/octocat/received_events
     */
    received_events_url: string;
    /** @example User */
    type: string;
    site_admin: boolean;
    /** @example "2020-07-09T00:17:55Z" */
    starred_at?: string;
  };

   /** @example Hello-World */
   name: string;
   /** @example octocat/Hello-World */
   full_name: string;
   private: boolean;
   /**
    * Format: uri
    * @example https://github.com/octocat/Hello-World
    */
   html_url: string;
   /** @example This your first repo! */
   description: string | null;
   fork: boolean;
   /**
    * Format: uri
    * @example https://api.github.com/repos/octocat/Hello-World
    */
   url: string;
   /** @example http://api.github.com/repos/octocat/Hello-World/{archive_format}{/ref} */
   archive_url: string;
   /** @example http://api.github.com/repos/octocat/Hello-World/assignees{/user} */
   assignees_url: string;
   /** @example http://api.github.com/repos/octocat/Hello-World/git/blobs{/sha} */
   blobs_url: string;
   /** @example http://api.github.com/repos/octocat/Hello-World/branches{/branch} */
   branches_url: string;
   /** @example http://api.github.com/repos/octocat/Hello-World/collaborators{/collaborator} */
   collaborators_url: string;
   /** @example http://api.github.com/repos/octocat/Hello-World/comments{/number} */
   comments_url: string;
   /** @example http://api.github.com/repos/octocat/Hello-World/commits{/sha} */
   commits_url: string;
   /** @example http://api.github.com/repos/octocat/Hello-World/compare/{base}...{head} */
   compare_url: string;
   /** @example http://api.github.com/repos/octocat/Hello-World/contents/{+path} */
   contents_url: string;
   /**
    * Format: uri
    * @example http://api.github.com/repos/octocat/Hello-World/contributors
    */
   contributors_url: string;
   /**
    * Format: uri
    * @example http://api.github.com/repos/octocat/Hello-World/deployments
    */
   deployments_url: string;
   /**
    * Format: uri
    * @example http://api.github.com/repos/octocat/Hello-World/downloads
    */
   downloads_url: string;
   /**
    * Format: uri
    * @example http://api.github.com/repos/octocat/Hello-World/events
    */
   events_url: string;
   /**
    * Format: uri
    * @example http://api.github.com/repos/octocat/Hello-World/forks
    */
   forks_url: string;
   /** @example http://api.github.com/repos/octocat/Hello-World/git/commits{/sha} */
   git_commits_url: string;
   /** @example http://api.github.com/repos/octocat/Hello-World/git/refs{/sha} */
   git_refs_url: string;
   /** @example http://api.github.com/repos/octocat/Hello-World/git/tags{/sha} */
   git_tags_url: string;
   git_url?: string;
   /** @example http://api.github.com/repos/octocat/Hello-World/issues/comments{/number} */
   issue_comment_url: string;
   /** @example http://api.github.com/repos/octocat/Hello-World/issues/events{/number} */
   issue_events_url: string;
   /** @example http://api.github.com/repos/octocat/Hello-World/issues{/number} */
   issues_url: string;
   /** @example http://api.github.com/repos/octocat/Hello-World/keys{/key_id} */
   keys_url: string;
   /** @example http://api.github.com/repos/octocat/Hello-World/labels{/name} */
   labels_url: string;
} 