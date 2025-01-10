export interface RepoRequest {
  id: number;
  repo_url: string;
  status: string;
  created_at: string;
}

export interface ReadMeFile {
  id: number;
  key: string;
  content: string;
  created_at: string;
  repo_request: number;
}
  