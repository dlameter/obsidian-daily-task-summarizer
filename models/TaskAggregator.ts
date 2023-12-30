export interface TaskAggregate {
    [text: string]: {
        numChecked: number
        numUnchecked: number
        children?: TaskAggregate
    }
}