import moment from "https://deno.land/x/momentjs@2.29.1-deno/mod.ts";

const days: string[] = []
const day = moment().startOf('Day')
for (let i = 0; i < 7; i++) {
    days.push(day.subtract(1, 'days').format('yyyy-MM-DD'))
}

const allText = await Promise.all(
    days.map((day) => {
        return Deno.readTextFile('./test_data/' + day + '.md').catch(() => null)
    })
)
.then((text) => 
    text.filter((result) => result !== null)
        .reduce((prev, curr) => {
            let text = ""
            if (prev) {
                text = prev
            }

            if (curr) {
                if (text) {
                    text += curr
                } else {
                    text = curr
                }
            }

            return text
        })
)

console.log(allText)
