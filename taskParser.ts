export interface Task {
    checked: boolean
    text: string
}

export function parseTask(line: string): Task | null {
    const matches = line.match(/\s*- \[([ x])\](.*)$/)
    if (matches && matches.length > 0) {
        return { checked: matches[1] == 'x', text: matches[2].trim() }
    }
    return null
}
