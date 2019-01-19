import { exampleMap } from "./example-data"
import { Processor } from "./processor"
let processor: Processor

describe("Processor", () => {
    beforeEach(async () => {
        processor = new Processor()
    })
    it("processes direct match", async () => {
        await processor.learn(exampleMap)
        expect(await processor.process("hi"))
            .toEqual({
                actions: [],
                text: "hey man",
            })
    })

    it("processes advanced shit", async () => {
        await processor.learn(exampleMap)
        expect(await processor.process("how are you"))
            .toEqual({
                actions: [],
                text: "hey man",
            })
    })
})
