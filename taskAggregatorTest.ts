import { assertEquals } from "https://deno.land/std@0.210.0/assert/assert_equals.ts";
import { TaskGraph } from "./models/TaskGraph.ts";
import { TaskAggregator } from "./taskAggregator.ts";
import { TaskAggregate } from "./models/TaskAggregate.ts";

Deno.test('TaskAggregator', async (t) => {
    const verifyAggregatorResult = (taskGraphsArray: TaskGraph[][], expected: TaskAggregate) => {
        const aggregator = new TaskAggregator()

        for (const taskGraphs of taskGraphsArray) {
            aggregator.addTaskGraphs(taskGraphs)
        }

        assertEquals(aggregator.getResult(), expected)
    }

    await t.step('aggregates checked and unchecked values', () => {
        verifyAggregatorResult(
            [
                [
                    {
                        task: { checked: true, text: 'task 1' },
                        children: [
                            { task: { checked: true, text: 'task 1'} },
                            { task: { checked: true, text: 'task 2'} },
                            { task: { checked: true, text: 'task 3'} }
                        ]
                    },
                    { task: { checked: true, text: 'task 2' } },
                    { task: { checked: true, text: 'task 3' } }
                ],
                [
                    {
                        task: { checked: false, text: 'task 1' },
                        children: [
                            { task: { checked: false, text: 'task 1' } },
                            { task: { checked: false, text: 'task 2' } },
                            { task: { checked: false, text: 'task 3' } }
                        ]
                    },
                    { task: { checked: false, text: 'task 2' } },
                    { task: { checked: false, text: 'task 3' } }
                ],
                [
                    {
                        task: { checked: false, text: 'task 1' },
                        children: [
                            { task: { checked: false, text: 'task 1' } },
                            { task: { checked: true, text: 'task 2' } }
                        ]
                    },
                    { task: { checked: true, text: 'task 2' } },
                ]
            ],
            {
                'task 1': {
                    numChecked: 1,
                    numUnchecked: 2,
                    children: {
                        'task 1': {
                            numChecked: 1,
                            numUnchecked: 2
                        },
                        'task 2': {
                            numChecked: 2,
                            numUnchecked: 1
                        },
                        'task 3': {
                            numChecked: 1,
                            numUnchecked: 1
                        },
                    }
                },
                'task 2': {
                    numChecked: 2,
                    numUnchecked: 1
                },
                'task 3': {
                    numChecked: 1,
                    numUnchecked: 1
                }
            }
        )
    })
})