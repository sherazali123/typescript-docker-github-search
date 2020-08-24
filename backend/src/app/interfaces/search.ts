import { SearchTypes } from './enums';

export interface SearchInput {
  text: string | undefined;
  type: SearchTypes;
}

export interface SearchResult {
  source: string;
  payload: GithubResponse;
}

export interface GithubResponse {
  totalCount: number;
  incompleteResults: boolean;
  items: unknown[];
}

export interface InvalidateResult {
  clear: boolean;
}
