import { assertEquals } from "https://deno.land/std@0.210.0/assert/assert_equals.ts";
import { taskAggregateToString } from "./taskAggregateToString.ts";

Deno.test('taskAggregateToString', () => {
    assertEquals(taskAggregateToString(
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
        }), 
`- task 1 (c: 1, u: 2)
\t- task 1 (c: 1, u: 2)
\t- task 2 (c: 2, u: 1)
\t- task 3 (c: 1, u: 1)
- task 2 (c: 2, u: 1)
- task 3 (c: 1, u: 1)
`
    )
})