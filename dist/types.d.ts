export interface ISpenglerNLPMapEntry {
    intent: string;
    language: string;
    utterances: string[];
    answers: ISpenglerAnswer[];
}
export interface ISpenglerAnswer {
    text: string;
    actions: string[];
}
