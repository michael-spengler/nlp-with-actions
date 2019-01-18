import { exampleMap } from "./example-data"
import { Processor } from "./processor"
let processor: Processor

describe("Processor", () => {
    beforeEach(async () => {
        processor = new Processor()
        await processor.learn(exampleMap)
    })
    it("processes direct match", async () => {
        expect(await processor.process("hi"))
            .toEqual({
                actions: [],
                text: "hey man",
            })
    })

    it("processes advanced shit", async () => {
        expect(await processor.process("how are you"))
            .toEqual({
                actions: [],
                text: "hey man",
            })
    })
})
