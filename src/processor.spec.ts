
import { IIntent, NLPTrainer } from "nlp-trainer"
import { Processor } from "./processor"
import { IAnswerExtended } from "./types"

let processor: Processor
let nlpTrainer: NLPTrainer

describe("Processor", () => {
    beforeEach(async () => {
        processor = new Processor()
        nlpTrainer = new NLPTrainer()
    })

    it("processes direct match", async () => {
        await processor.learn(nlpTrainer.getTrainingMap("exampleMap") as IIntent[])
        expect(await processor.process("hi"))
            .toEqual({
                actions: ["thumbs up", "thumbs down"],
                text: "hey man",
            })
    })

    it("processes advanced shit", async () => {
        await processor.learn(nlpTrainer.getTrainingMap("exampleMap") as IIntent[])
        expect(await processor.process("how are you"))
            .toEqual({
                actions: ["thumbs up", "thumbs down"],
                text: "hey man",
            })
    })

    it("throws an error when not trained properly", async () => {
        try {
            await processor.process("how are you")
            fail("hmm - let me think about it")
        } catch (error) {
            // works as designed
        }

        try {
            await processor.processAndDeliverDetails("Hi. I'm 25.")
            fail("hmm - let me think about it")
        } catch (error) {
            // works as designed
        }
    })

    it("adds intents and processes accordingly", async () => {
        const additionalIntent: IIntent = {
            answers: [{
                actions: ["Thanks", "thumbs down"],
                text: "Here is the data you asked me for:",
            }],
            language: "en",
            name: "provide-currency-exchange-rates",
            utterances: ["provide exchange rates", "currency exchange rates", "rates"],
        }
        const map: IIntent[] = nlpTrainer.getTrainingMap("exampleMap") as IIntent[]
        map.push(additionalIntent)
        await processor.learn(map)
        expect(await processor.process("exchange rates"))
            .toEqual({
                actions: ["Thanks", "thumbs down"],
                text: "Here is the data you asked me for:",
            })
    })

    it("processes and delivers details", async () => {
        await processor.learn(nlpTrainer.getTrainingMap("exampleMap") as IIntent[])
        const details: IAnswerExtended = await processor.processAndDeliverDetails("Hi. I'm 25.")
        expect(details.text)
            .toBe("hey man")

        expect(details.actions)
            .toEqual(["thumbs up", "thumbs down"])

        expect(details.details)
            .toBeDefined()
    })
})
