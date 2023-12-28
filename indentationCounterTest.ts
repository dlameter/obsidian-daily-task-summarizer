import { assertEquals } from "https://deno.land/std@0.210.0/assert/assert_equals.ts";
import { indentationChecker } from "./indentationCounter.ts";

Deno.test('indentationChecker', async (t) => {
    const verifyCheckerReturns = async (t: Deno.TestContext, input: string, expected: number | null) => {
        await t.step(`when input is "${input}"`, async () => {
            await assertEquals(indentationChecker(input), expected)
        })
    }

    await verifyCheckerReturns(t, '', 0)
    await verifyCheckerReturns(t, '   ', 0)
    await verifyCheckerReturns(t, 'blah ', 0)
    await verifyCheckerReturns(t, '\t', 1)
    await verifyCheckerReturns(t, '\t\t', 2)
    await verifyCheckerReturns(t, '\t\t\t\t\t', 5)
    await verifyCheckerReturns(t, '\tblah', 1)
    await verifyCheckerReturns(t, 'blah\t', 0)
    await verifyCheckerReturns(t, '\t\t- [ ]', 2)
    await verifyCheckerReturns(t, '\t- [x]', 1)
    await verifyCheckerReturns(t, '- [ ]', 0)
})