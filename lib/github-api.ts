/**
 * GitHub API client with rate limiting and error handling
 */

export interface GitHubApiConfig {
  username: string;
  token?: string;
  baseUrl?: string;
}

export interface GitHubApiResponse<T> {
  data: T | null;
  error?: string;
  rateLimit?: {
    limit: number;
    remaining: number;
    reset: number;
  };
}

export class GitHubApiClient {
  private config: GitHubApiConfig;
  private baseUrl: string;

  constructor(config: GitHubApiConfig) {
    this.config = config;
    this.baseUrl = config.baseUrl || 'https://api.github.com';
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-App/1.0'
    };

    if (this.config.token) {
      headers['Authorization'] = `token ${this.config.token}`;
    }

    return headers;
  }

  private async makeRequest<T>(endpoint: string): Promise<GitHubApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: this.getHeaders(),
        next: { revalidate: 300 } // Cache for 5 minutes
      });

      // Extract rate limit info
      const rateLimit = {
        limit: parseInt(response.headers.get('X-RateLimit-Limit') || '0'),
        remaining: parseInt(response.headers.get('X-RateLimit-Remaining') || '0'),
        reset: parseInt(response.headers.get('X-RateLimit-Reset') || '0')
      };

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          data: null,
          error: `GitHub API error: ${response.status} ${response.statusText}${
            errorData.message ? ` - ${errorData.message}` : ''
          }`,
          rateLimit
        };
      }

      const data = await response.json();
      return { data, rateLimit };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async getUser() {
    return this.makeRequest(`/users/${this.config.username}`);
  }

  async getRepositories(options: {
    sort?: 'created' | 'updated' | 'pushed' | 'full_name';
    direction?: 'asc' | 'desc';
    per_page?: number;
    page?: number;
  } = {}) {
    const params = new URLSearchParams({
      sort: options.sort || 'updated',
      direction: options.direction || 'desc',
      per_page: (options.per_page || 100).toString(),
      page: (options.page || 1).toString()
    });

    return this.makeRequest(`/users/${this.config.username}/repos?${params}`);
  }

  async getRepository(repoName: string) {
    return this.makeRequest(`/repos/${this.config.username}/${repoName}`);
  }

  async getRepositoryLanguages(repoName: string) {
    return this.makeRequest(`/repos/${this.config.username}/${repoName}/languages`);
  }

  async getEvents(options: {
    per_page?: number;
    page?: number;
  } = {}) {
    const params = new URLSearchParams({
      per_page: (options.per_page || 30).toString(),
      page: (options.page || 1).toString()
    });

    return this.makeRequest(`/users/${this.config.username}/events/public?${params}`);
  }

  async getContributions() {
    // Note: GitHub doesn't provide a direct API for contribution graph
    // This would require scraping or using GitHub GraphQL API
    // For now, we'll return mock data
    return {
      data: {
        totalContributions: Math.floor(Math.random() * 1000) + 500,
        weeks: [] // Would contain contribution data
      }
    };
  }
}

// Utility functions
export const createGitHubClient = (username: string, token?: string) => {
  return new GitHubApiClient({ username, token });
};

export const formatGitHubDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const getLanguageColor = (language: string): string => {
  const colors: { [key: string]: string } = {
    'TypeScript': '#3178c6',
    'JavaScript': '#f1e05a',
    'Python': '#3572A5',
    'Java': '#b07219',
    'C++': '#f34b7d',
    'C': '#555555',
    'C#': '#239120',
    'PHP': '#4F5D95',
    'Ruby': '#701516',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'Swift': '#fa7343',
    'Kotlin': '#A97BFF',
    'Dart': '#00B4AB',
    'HTML': '#e34c26',
    'CSS': '#1572B6',
    'SCSS': '#c6538c',
    'Vue': '#4FC08D',
    'React': '#61DAFB',
    'Shell': '#89e051',
    'Dockerfile': '#384d54',
    'Jupyter Notebook': '#DA5B0B',
    'Makefile': '#427819',
    'Objective-C': '#438eff'
  };
  return colors[language] || '#8b949e';
};

export const calculateLanguageStats = (repos: any[]): { [key: string]: number } => {
  const languageCounts: { [key: string]: number } = {};
  let totalSize = 0;

  repos.forEach(repo => {
    if (repo.language && repo.size > 0) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + repo.size;
      totalSize += repo.size;
    }
  });

  // Convert to percentages
  const languageStats: { [key: string]: number } = {};
  Object.keys(languageCounts).forEach(lang => {
    languageStats[lang] = Math.round((languageCounts[lang] / totalSize) * 100);
  });

  // Sort by usage
  return Object.entries(languageStats)
    .sort(([,a], [,b]) => b - a)
    .reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {} as { [key: string]: number });
};