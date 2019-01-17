
import { IAnswer, ISpenglersNLPMapEntry as ISpenglersNLPMapEntry } from "./types"
const { NlpManager } =
    // tslint:disable-next-line:no-require-imports
    require("node-nlp")

export class Processor {

    private successfullyTrained: boolean = false
    private map: ISpenglersNLPMapEntry[]
    private readonly manager: any = new NlpManager({ languages: ["en"] })

    public async learn(map: ISpenglersNLPMapEntry[]): Promise<void> {
        this.map = map
        map.forEach((entry: ISpenglersNLPMapEntry) => {

            entry.utterances.forEach((utterance: string) => {
                this.manager.addDocument(entry.language, utterance, entry.intent)
            })

            entry.answers.forEach((answer: IAnswer) => {
                this.manager.addAnswer(entry.language, entry.intent, answer.text)
            })
        })

        await this.manager.train()
        await this.manager.save()

        this.successfullyTrained = true
    }

    public async process(input: string): Promise<IAnswer> {
        if (!this.successfullyTrained) {
            throw new Error("Please call learn() before processing.")
        }

        let answer: IAnswer = this.getDirectMatchResponse(input)
        if (answer === undefined) {
            answer = await this.getAdvancedNLPResponse(input)
        }

        return answer
    }

    private async getAdvancedNLPResponse(input: string): Promise<IAnswer> {
        const response: any = await this.manager.process("en", input)

        return {
            actions: [],
            text: response.answer,
        }
    }

    private getDirectMatchResponse(input: string): IAnswer | undefined {
        let answer: IAnswer
        this.map.forEach((nlpMapEntry: ISpenglersNLPMapEntry) => {
            if (nlpMapEntry.utterances.some((utterance: string) => utterance === input)) {
                answer = nlpMapEntry.answers[0]
            }
        })

        return answer
    }
}
