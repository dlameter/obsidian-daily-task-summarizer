import moment from "https://deno.land/x/momentjs@2.29.1-deno/mod.ts";
import { TaskAggregator } from "./taskAggregator.ts";
import { taskAggregateToString } from "./taskAggregateToString.ts";
import { textToTaskGraph } from "./taskGrapher.ts";

if (Deno.args.length < 1) {
    console.log('USAGE: program <path-to-daily-notes>')
    Deno.exit(0)
}

const dataDirectory: string = Deno.args[0]

const day = moment().startOf('Day')
const days: string[] = [moment(day).format('yyyy-MM-DD')]
for (let i = 0; i < 7; i++) {
    days.push(day.subtract(1, 'days').format('yyyy-MM-DD'))
}

console.log(await Promise.all(
    days.map((day) => {
        return Deno.readTextFile(dataDirectory + day + '.md').catch(() => null)
    })
)
.then((text) => {
    const taskAggregator = new TaskAggregator()

    text.flatMap((result) => result !== null ? [result] : [])
        .map((text) => textToTaskGraph(text))
        .forEach((taskGraphs) => taskAggregator.addTaskGraphs(taskGraphs))

    return taskAggregateToString(taskAggregator.getResult())
}))
