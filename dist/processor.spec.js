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
            actions: ["thumbs up", "thumbs down"],
            text: "hey man",
        });
    });
    it("processes advanced shit", async () => {
        await processor.learn(example_data_1.exampleMap);
        expect(await processor.process("how are you"))
            .toEqual({
            actions: ["thumbs up", "thumbs down"],
            text: "hey man",
        });
    });
    it("adds intents and processes accordingly", async () => {
        const additionalIntent = {
            answers: [{
                    actions: ["Thanks", "thumbs down"],
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
            actions: ["Thanks", "thumbs down"],
            text: "Here is the data you asked me for:",
        });
    });
    it("processes and delivers details", async () => {
        await processor.learn(example_data_1.exampleMap);
        const details = await processor.processAndDeliverDetails("Hi. I'm 25.");
        expect(details.text)
            .toBe("hey man");
        expect(details.actions)
            .toEqual(["thumbs up", "thumbs down"]);
        expect(details.details)
            .toBeDefined();
    });
    it("rejects inconsistent training data", async () => {
        const intentContainingAnswerWithUnknownAction = {
            answers: [{
                    actions: ["unknownAction"],
                    text: "42",
                }],
            intent: "answer-contains-unknown-action",
            language: "en",
            utterances: ["42"],
        };
        const map = example_data_1.exampleMap;
        map.push(intentContainingAnswerWithUnknownAction);
        try {
            await processor.learn(map);
            fail("please let me think about it");
        }
        catch (error) {
            // Works as defined
        }
    });
});
