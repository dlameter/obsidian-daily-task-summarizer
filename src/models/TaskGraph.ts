import { Task } from "./Task.ts";

export interface TaskGraph {
    task: Task
    children?: TaskGraph[]
}