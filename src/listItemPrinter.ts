export function createListItemString(text: string, indentation = 0): string {
    return '\t'.repeat(indentation) + '- ' + text
}