import { exampleMap } from "./example-data"
import { Processor } from "./processor"
import { ISpenglersIntent as ISpenglersIntent } from "./types"

let processor: Processor

describe("Processor", () => {
    beforeEach(async () => {
        processor = new Processor()
    })

    it("processes direct match", async () => {
        await processor.learn(exampleMap)
        expect(await processor.process("hi"))
            .toEqual({
                actions: ["thumbs up", "thumbs down"],
                text: "hey man",
            })
    })

    it("processes advanced shit", async () => {
        await processor.learn(exampleMap)
        expect(await processor.process("how are you"))
            .toEqual({
                actions: ["thumbs up", "thumbs down"],
                text: "hey man",
            })
    })

    it("adds intents and processes accordingly", async () => {
        const additionalIntent: ISpenglersIntent = {
            answers: [{
                actions: ["Thanks", "thumbs down"],
                text: "Here is the data you asked me for:",
            }],
            intent: "provide-currency-exchange-rates",
            language: "en",
            utterances: ["provide exchange rates", "currency exchange rates", "rates"],
        }
        const map: ISpenglersIntent[] = exampleMap
        map.push(additionalIntent)
        await processor.learn(map)
        expect(await processor.process("exchange rates"))
            .toEqual({
                actions: ["Thanks", "thumbs down"],
                text: "Here is the data you asked me for:",
            })
    })

    it("rejects inconsistent training data", async () => {
        const intentContainingAnswerWithUnknownAction: ISpenglersIntent = {
            answers: [{
                actions: ["unknownAction"],
                text: "42",
            }],
            intent: "answer-contains-unknown-action",
            language: "en",
            utterances: ["42"],
        }
        const map: ISpenglersIntent[] = exampleMap
        map.push(intentContainingAnswerWithUnknownAction)
        try {
            await processor.learn(map)

            fail("please let me think about it")

        } catch (error) {
            // Works as defined
        }
    })
})
