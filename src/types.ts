export interface ISpenglersNLPMapEntry {
    intent: string
    language: string
    utterances: string[]
    answers: ISpenglerAnswer[]
}

export interface ISpenglerAnswer {
    text: string
    actions: string[]
}

export interface IResponseRaw {
    text: string
    actions: string[]
}
