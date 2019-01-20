
import { IIntent } from "nlp-trainer"
import { IAnswer, IAnswerExtended } from "./types"

const { NlpManager } =
    // tslint:disable-next-line:no-require-imports
    require("node-nlp")

export class Processor {

    private successfullyTrained: boolean = false
    private intents: IIntent[] = []
    private readonly manager: any = new NlpManager({ languages: ["en"] })

    public async learn(intents: IIntent[]): Promise<void> {
        this.intents = intents

        intents.forEach((intent: IIntent) => {

            intent.utterances.forEach((utterance: string) => {
                this.manager.addDocument(intent.language, utterance, intent.name)
            })

            intent.answers.forEach((answer: IAnswer) => {
                this.manager.addAnswer(intent.language, intent.name, answer.text)
            })
        })

        await this.manager.train()
        await this.manager.save()

        this.successfullyTrained = true
    }

    public async process(input: string): Promise<IAnswer> {
        if (!this.successfullyTrained) {
            throw new Error("Please call learn(withConsistentTrainingData) before processing.")
        }

        let answer: IAnswer | undefined = this.getDirectMatchResponse(input)
        if (answer === undefined) {
            answer = await this.getAdvancedNLPResponse(input)
        }

        return answer
    }

    public async processAndDeliverDetails(input: string): Promise<IAnswerExtended> {
        if (!this.successfullyTrained) {
            throw new Error("Please call learn(withConsistentTrainingData) before processing.")
        }

        const answer: any = await this.getAdvancedNLPResponseWithDetails(input)

        return answer
    }

    private getActionsByAnswer(answer: string): string[] {

        let actions: string[] = []

        this.intents.forEach((entry: IIntent) => {
            const foundAnswers: IAnswer[] = entry.answers.filter((element: IAnswer) => answer === element.text)

            if (foundAnswers.length === 1) {
                actions = foundAnswers[0].actions
            }
        })

        return actions
    }

    private async getAdvancedNLPResponse(input: string): Promise<IAnswer> {

        const response: any = await this.manager.process("en", input)

        return {
            actions: this.getActionsByAnswer(response.answer),
            text: response.answer,
        }
    }

    private async getAdvancedNLPResponseWithDetails(input: string): Promise<any> {

        const response: any = await this.manager.process("en", input)

        return {
            actions: this.getActionsByAnswer(response.answer),
            details: response,
            text: response.answer,
        }
    }

    private getDirectMatchResponse(input: string): IAnswer | undefined {
        let answer: IAnswer | undefined

        this.intents.forEach((nlpMapEntry: IIntent) => {
            if (nlpMapEntry.utterances.some((utterance: string) => utterance === input)) {
                answer = nlpMapEntry.answers[0]
            }
        })

        return answer
    }
}
