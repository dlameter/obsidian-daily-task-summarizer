import { assertEquals } from "https://deno.land/std@0.210.0/assert/mod.ts";
import { parseTask } from "./taskParser.ts";
import { Task } from "./models/Task.ts";

Deno.test('Task parser test', async (t) => {
    const verifyParserReturns = async (t: Deno.TestContext, input: string, expected: Task | null) => {
        await t.step(`string is "${input}"`, () => {
            assertEquals(parseTask(input), expected)
        })
    }

    await t.step('returns null when', async (t) => {
        await verifyParserReturns(t, '', null)
        await verifyParserReturns(t, 'hello', null)
        await verifyParserReturns(t, '[[]]', null)
        await verifyParserReturns(t, '-[ ]', null)
        await verifyParserReturns(t, '- []', null)
    })

    await t.step('returns a checked task when', async (t) => {
        await verifyParserReturns(t, '- [x]', { checked: true, text: ''})
        await verifyParserReturns(t, ' - [x]', { checked: true, text: ''})
        await verifyParserReturns(t, '    - [x]', { checked: true, text: ''})
        await verifyParserReturns(t, '\t- [x]', { checked: true, text: ''})
        await verifyParserReturns(t, '\t\t\t\t\t\t- [x]', { checked: true, text: ''})
        await verifyParserReturns(t, '- [x] ', { checked: true, text: ''})
        await verifyParserReturns(t, '- [x] hello', { checked: true, text: 'hello'})
        await verifyParserReturns(t, '- [x] [[more brackets]] with a -?', { checked: true, text: '[[more brackets]] with a -?'})
    })

    await t.step('returns an unchecked task when', async (t) => {
        await verifyParserReturns(t, '- [ ]', { checked: false, text: ''})
        await verifyParserReturns(t, ' - [ ]', { checked: false, text: ''})
        await verifyParserReturns(t, '     - [ ]', { checked: false, text: ''})
        await verifyParserReturns(t, '\t- [ ]', { checked: false, text: ''})
        await verifyParserReturns(t, '\t\t\t\t- [ ]', { checked: false, text: ''})
        await verifyParserReturns(t, '- [ ] ', { checked: false, text: ''})
        await verifyParserReturns(t, '- [ ] hello', { checked: false, text: 'hello'})
        await verifyParserReturns(t, '- [ ] [[more brackets]] with a -?', { checked: false, text: '[[more brackets]] with a -?'})
    })

    // Need tests for indented tasks...
})