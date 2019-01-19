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
                actions: ["I like your response", "I do not like your response"],
                text: "hey man",
            })
    })

    it("processes advanced shit", async () => {
        await processor.learn(exampleMap)
        expect(await processor.process("how are you"))
            .toEqual({
                actions: ["I like your response", "I do not like your response"],
                text: "hey man",
            })
    })

    it("adds intents and processes accordingly", async () => {
        const additionalIntent: ISpenglersIntent = {
            answers: [{
                actions: ["Thanks", "I have an improvement proposal"],
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
                actions: ["Thanks", "I have an improvement proposal"],
                text: "Here is the data you asked me for:",
            })
    })
})
