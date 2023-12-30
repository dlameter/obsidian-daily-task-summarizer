import { createListItemString } from "./listItemPrinter.ts";
import { TaskAggregate } from "./models/TaskAggregate.ts";

export function taskAggregateToString(taskAggregate: TaskAggregate, indentation = 0): string {
    let result = ''

    for (const [text, information] of Object.entries(taskAggregate)) {
        const listItemText = `${text} (c: ${information.numChecked}, u: ${information.numUnchecked})\n`
        result += createListItemString(listItemText, indentation)

        if (information.children && Object.keys(information.children).length > 0) {
            result += taskAggregateToString(information.children, indentation + 1)
        }
    }

    return result
}