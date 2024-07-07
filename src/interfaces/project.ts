export interface Project {
  id?: number;
  title?: string;
  content?: string;
  user?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
