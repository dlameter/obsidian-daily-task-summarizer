import moment from "https://deno.land/x/momentjs@2.29.1-deno/mod.ts";
import { TaskAggregator } from "./taskAggregator.ts";
import { taskAggregateToString } from "./taskAggregateToString.ts";
import { textToTaskGraph } from "./taskGrapher.ts";

const days: string[] = []
const day = moment().startOf('Day')
for (let i = 0; i < 7; i++) {
    days.push(day.subtract(1, 'days').format('yyyy-MM-DD'))
}

console.log(await Promise.all(
    days.map((day) => {
        return Deno.readTextFile('./test_data/' + day + '.md').catch(() => null)
    })
)
.then((text) => {
    const taskAggregator = new TaskAggregator()

    text.flatMap((result) => result !== null ? [result] : [])
        .map((text) => textToTaskGraph(text))
        .forEach((taskGraphs) => taskAggregator.addTaskGraphs(taskGraphs))

    return taskAggregateToString(taskAggregator.getResult())
}))
