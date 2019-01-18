"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const example_data_1 = require("./example-data");
const processor_1 = require("./processor");
let processor;
describe("Processor", () => {
    beforeEach(async () => {
        processor = new processor_1.Processor();
        await processor.learn(example_data_1.exampleMap);
    });
    it("processes direct match", async () => {
        expect(await processor.process("hi"))
            .toEqual({
            actions: [],
            text: "hey man",
        });
    });
    it("processes advanced shit", async () => {
        expect(await processor.process("how are you"))
            .toEqual({
            actions: [],
            text: "hey man",
        });
    });
});
