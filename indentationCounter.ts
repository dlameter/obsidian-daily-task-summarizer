export function indentationChecker(line: string): number {
    let count = 0
    for (let i = 0; i < line.length; i++) {
        if (line.charAt(i) !== '\t') {
            break
        }
        count++
    }
    return count
}