import { Datetime } from "./Datetime";
import { Project } from "./project";

export interface ProjectMessage {
  id?: number;
  project?: Project;
  text?: string;
  owner?: 'user'|'ai';
  readonly createdAt?: Datetime;
}
