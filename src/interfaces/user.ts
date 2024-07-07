export interface User {
  id?: number;
  email?: string;
  roles?: string;
  password?: string;
  projects?: string[];
  readonly userIdentifier?: string;
}
