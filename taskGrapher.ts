import { indentationChecker } from "./indentationCounter.ts";
import { Task, parseTask } from "./taskParser.ts"

export interface TaskGraph {
    task: Task
    children?: TaskGraph[]
}

export function textToTaskGraph(text: string): TaskGraph[] {
    const results: TaskGraph[] = []

    let lastIndentation = -1
    const taskStack: TaskGraph[] = []
    for (const line of text.split('\n')) {
        const task = parseTask(line)
        if (task) {
            const indentation = indentationChecker(line)
            const validMember = { task: task }

            if (indentation === lastIndentation && taskStack.length > 0) {
                taskStack.pop()
            } else if (indentation < lastIndentation) {
                for (let i = 0; i < lastIndentation - indentation + 1; i++) {
                    taskStack.pop()
                }
            } else if (indentation === lastIndentation + 1 || indentation === lastIndentation) {
                // do nothing
            } else {
                throw new Error('task list jumped too far forward!')
            }
            lastIndentation = indentation

            if (taskStack.length > 0) {
                const parent = taskStack[taskStack.length - 1]
                if (parent?.children) {
                    parent.children.push(validMember)
                } else {
                    parent.children = [validMember]
                }
            } else {
                results.push(validMember)
            }

            taskStack.push(validMember)
        } else {
            lastIndentation = -1
            while (taskStack.length > 0) {
                taskStack.pop()
            }
        }
    }

    return results 
}