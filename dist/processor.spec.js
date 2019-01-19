"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const example_data_1 = require("./example-data");
const processor_1 = require("./processor");
let processor;
describe("Processor", () => {
    beforeEach(async () => {
        processor = new processor_1.Processor();
    });
    it("processes direct match", async () => {
        await processor.learn(example_data_1.exampleMap);
        expect(await processor.process("hi"))
            .toEqual({
            actions: ["I like your response", "I do not like your response"],
            text: "hey man",
        });
    });
    it("processes advanced shit", async () => {
        await processor.learn(example_data_1.exampleMap);
        expect(await processor.process("how are you"))
            .toEqual({
            actions: ["I like your response", "I do not like your response"],
            text: "hey man",
        });
    });
    it("adds intents and processes accordingly", async () => {
        const additionalIntent = {
            answers: [{
                    actions: ["Thanks", "I have an improvement proposal"],
                    text: "Here is the data you asked me for:",
                }],
            intent: "provide-currency-exchange-rates",
            language: "en",
            utterances: ["provide exchange rates", "currency exchange rates", "rates"],
        };
        const map = example_data_1.exampleMap;
        map.push(additionalIntent);
        await processor.learn(map);
        expect(await processor.process("exchange rates"))
            .toEqual({
            actions: ["Thanks", "I have an improvement proposal"],
            text: "Here is the data you asked me for:",
        });
    });
});
