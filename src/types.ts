export interface ISpenglersIntent {
    intent: string
    language: string
    utterances: string[]
    answers: IAnswer[]
}

export interface IAnswer {
    text: string
    actions: string[]
}
