import { Task, parseTask } from "./taskParser.ts"

export interface TaskGraph {
    task: Task
    children?: TaskGraph[]
}

export function textToTaskGraph(text: string): TaskGraph[] {
    const results: TaskGraph[] = []

    for (const line of text.split('\n')) {
        const task = parseTask(line)
        if (task) {
            results.push({ task: task })
        }
    }

    return results 
}