/**
 * TypeScript type definitions for GitHub API responses
 */

export interface GitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
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
  name: string;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubRepository {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: GitHubUser;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  archive_url: string;
  assignees_url: string;
  blobs_url: string;
  branches_url: string;
  collaborators_url: string;
  comments_url: string;
  commits_url: string;
  compare_url: string;
  contents_url: string;
  contributors_url: string;
  deployments_url: string;
  downloads_url: string;
  events_url: string;
  forks_url: string;
  git_commits_url: string;
  git_refs_url: string;
  git_tags_url: string;
  git_url: string;
  issue_comment_url: string;
  issue_events_url: string;
  issues_url: string;
  keys_url: string;
  labels_url: string;
  languages_url: string;
  merges_url: string;
  milestones_url: string;
  notifications_url: string;
  pulls_url: string;
  releases_url: string;
  ssh_url: string;
  stargazers_url: string;
  statuses_url: string;
  subscribers_url: string;
  subscription_url: string;
  tags_url: string;
  teams_url: string;
  trees_url: string;
  clone_url: string;
  mirror_url: string | null;
  hooks_url: string;
  svn_url: string;
  homepage: string | null;
  language: string | null;
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
  size: number;
  default_branch: string;
  open_issues_count: number;
  is_template: boolean;
  topics: string[];
  has_issues: boolean;
  has_projects: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_downloads: boolean;
  archived: boolean;
  disabled: boolean;
  visibility: string;
  pushed_at: string;
  created_at: string;
  updated_at: string;
  permissions?: {
    admin: boolean;
    maintain: boolean;
    push: boolean;
    triage: boolean;
    pull: boolean;
  };
  allow_rebase_merge: boolean;
  template_repository: GitHubRepository | null;
  temp_clone_token: string;
  allow_squash_merge: boolean;
  allow_auto_merge: boolean;
  delete_branch_on_merge: boolean;
  allow_merge_commit: boolean;
  subscribers_count: number;
  network_count: number;
  license: {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string;
  } | null;
  forks: number;
  open_issues: number;
  watchers: number;
}

export interface GitHubEvent {
  id: string;
  type: string;
  actor: GitHubUser;
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: any;
  public: boolean;
  created_at: string;
}

export interface GitHubLanguages {
  [language: string]: number;
}

export interface GitHubStats {
  totalStars: number;
  totalForks: number;
  totalRepos: number;
  totalCommits: number;
  languages: { [key: string]: number };
  recentActivity: {
    commits: number;
    prs: number;
    issues: number;
    reviews: number;
  };
  contributionStreak: {
    current: number;
    longest: number;
  };
}

export interface GitHubContribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubContributionWeek {
  contributionDays: GitHubContribution[];
  firstDay: string;
}

export interface GitHubContributionData {
  totalContributions: number;
  weeks: GitHubContributionWeek[];
  contributionCalendar: {
    colors: string[];
    totalContributions: number;
    weeks: GitHubContributionWeek[];
  };
}

export interface GitHubRateLimit {
  limit: number;
  remaining: number;
  reset: number;
  used: number;
  resource: string;
}

export interface GitHubApiError {
  message: string;
  documentation_url?: string;
  errors?: Array<{
    resource: string;
    field: string;
    code: string;
  }>;
}

export interface GitHubSearchResult<T> {
  total_count: number;
  incomplete_results: boolean;
  items: T[];
}

// Utility types
export type GitHubEventType = 
  | 'PushEvent'
  | 'PullRequestEvent'
  | 'IssuesEvent'
  | 'IssueCommentEvent'
  | 'CreateEvent'
  | 'DeleteEvent'
  | 'ForkEvent'
  | 'WatchEvent'
  | 'StarEvent'
  | 'ReleaseEvent';

export type GitHubRepositorySort = 
  | 'created'
  | 'updated'
  | 'pushed'
  | 'full_name';

export type GitHubRepositoryType = 
  | 'all'
  | 'owner'
  | 'member';

export type GitHubRepositoryDirection = 
  | 'asc'
  | 'desc';