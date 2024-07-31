export interface User {
  id?: number;
  firstname: string;
  lastname: string;
  email?: string;
  roles?: string;
  password?: string;
  projects?: string[];
  readonly userIdentifier?: string;
}
