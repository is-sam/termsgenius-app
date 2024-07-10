import { Datetime } from "./Datetime";

export interface Project {
  id?: number;
  title?: string;
  content?: string;
  user?: string;
  readonly createdAt?: Datetime;
  readonly updatedAt?: Datetime;
}
