import { assertEquals } from "https://deno.land/std@0.210.0/assert/assert_equals.ts";
import { TaskGraph, textToTaskGraph } from "./taskGrapher.ts";

Deno.test('taskGrapher',  async (t) => {
    const verifyParsedFileReturns = (fileContents: string, expected: TaskGraph[]) => {
        assertEquals(textToTaskGraph(fileContents), expected)
    }

    await t.step('returns empty list if file is empty', () => {
        verifyParsedFileReturns('', [])
    })

    await t.step('returns empty list if file has no checkboxes', () => {
        verifyParsedFileReturns(
`# Start of the file
here is a bunch of text!

[[A link to another file!]]

[A link to a web-site](https://localhost:3000)

## Another header
this is some text under the header
`, 
            [])
    })

    await t.step('returns a single task if file is one checkbox', () => {
        verifyParsedFileReturns('- [ ] [[linked text]]', [{ task: { checked: false, text: '[[linked text]]' } }])
    })

    await t.step('returns a single task if file has one checkbox', () => {
        verifyParsedFileReturns(
`# Start of the file
here is a bunch of text!

[[A link to another file!]]

[A link to a web-site](https://localhost:3000)

- [ ] This is a task!

## Another header
this is some text under the header`, 
            [{ task: { checked: false, text: 'This is a task!' } }])
    })

    await t.step('returns multiple tasks if file is a few checkboxes', () => {
        verifyParsedFileReturns(
`- [ ] unchecked
- [x] checked 
- [ ] we have numbers, 142.34`,
            [
                { task: { checked: false, text: 'unchecked' } },
                { task: { checked: true, text: 'checked' } },
                { task: { checked: false, text: 'we have numbers, 142.34' } }
            ]
        )
    })

    await t.step('returns multiple tasks if file has a few checkboxes spread throughout', () => {
        verifyParsedFileReturns(
`# Todo
Here is what I need to do:
- [ ] unchecked

## Project setup
- [x] checked 
Good thing I got that done

Miscellaneous
- [ ] we have numbers, 142.34`,
            [
                { task: { checked: false, text: 'unchecked' } },
                { task: { checked: true, text: 'checked' } },
                { task: { checked: false, text: 'we have numbers, 142.34' } }
            ]
        )
    })

    await t.step('returns indented tasks', () => {
        verifyParsedFileReturns(
`- [ ] unchecked
\t- [x] checked 
\t\t- [ ] we have numbers, 142.34`,
            [
                { task: { checked: false, text: 'unchecked' }, children: [
                    { task: { checked: true, text: 'checked' }, children: [
                        { task: { checked: false, text: 'we have numbers, 142.34' } }
                    ] }
                ] }
            ]
        )
    })

    await t.step('returns indented tasks that go back and forth', () => {
        verifyParsedFileReturns(
`- [ ] unchecked
\t- [x] checked 
\t\t- [ ] we have numbers, 142.34
\t- [x] checked 
- [ ] unchecked`,
            [
                {
                    task: { checked: false, text: 'unchecked' },
                    children: [
                        {
                            task: { checked: true, text: 'checked' },
                            children: [
                                { task: { checked: false, text: 'we have numbers, 142.34' } }
                            ]
                        },
                        {
                            task: { checked: true, text: 'checked' }
                        }
                    ]
                },
                { task: { checked: false, text: 'unchecked' } }
            ]
        )
    })

    await t.step('returns indented tasks that jump back to the start', () => {
        verifyParsedFileReturns(
`- [ ] unchecked
\t- [x] checked 
\t\t- [ ] we have numbers, 142.34
- [x] checked`,
            [
                {
                    task: { checked: false, text: 'unchecked' },
                    children: [
                        {
                            task: { checked: true, text: 'checked' },
                            children: [
                                { task: { checked: false, text: 'we have numbers, 142.34' } }
                            ]
                        }
                    ]
                },
                { task: { checked: true, text: 'checked' } }
            ]
        )
    })
})