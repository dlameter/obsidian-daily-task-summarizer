import { TaskAggregate } from "./models/TaskAggregator.ts";
import { TaskGraph } from "./models/TaskGraph.ts";

export class TaskAggregator {
    result: TaskAggregate = {}

    addTaskGraphs(taskGraphs: TaskGraph[]) {
        this.result = this.taskGraphsToTaskAggregate(taskGraphs, this.result)
    }

    getResult(): TaskAggregate {
        return this.result
    }

    private taskGraphsToTaskAggregate(taskGraphs: TaskGraph[], taskAggregate: TaskAggregate = {}): TaskAggregate {
        for (const taskGraph of taskGraphs) {
            const task = taskGraph.task
            if (taskAggregate[task.text]) {
                if (taskGraph.task.checked) {
                    taskAggregate[task.text].numChecked++
                } else {
                    taskAggregate[task.text].numUnchecked++
                }
            } else {
                taskAggregate[task.text] = {
                    numChecked: taskGraph.task.checked ? 1 : 0,
                    numUnchecked: taskGraph.task.checked ? 0 : 1
                }
            }

            if (taskGraph.children && taskGraph.children.length > 0) {
                let childAggregate: TaskAggregate
                if (taskAggregate[task.text].children) {
                    childAggregate = this.taskGraphsToTaskAggregate(taskGraph.children, taskAggregate[task.text].children)
                } else {
                    childAggregate = this.taskGraphsToTaskAggregate(taskGraph.children)
                }

                taskAggregate[task.text].children = childAggregate 
            }
        }

        return taskAggregate
    }
}