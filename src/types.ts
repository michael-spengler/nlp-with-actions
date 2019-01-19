export interface ISpenglersIntent {
    intent: string
    language: string
    utterances: string[]
    answers: IAnswer[]
}

export interface IAnswerExtended {
    text: string
    actions: string[]
    details: any
}

export interface IAnswer {
    text: string
    actions: string[]
}
