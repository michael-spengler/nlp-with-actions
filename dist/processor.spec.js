"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nlp_trainer_1 = require("nlp-trainer");
const processor_1 = require("./processor");
let processor;
let nlpTrainer;
describe("Processor", () => {
    beforeEach(async () => {
        processor = new processor_1.Processor();
        nlpTrainer = new nlp_trainer_1.NLPTrainer();
    });
    it("processes direct match", async () => {
        await processor.learn(await nlpTrainer.getIntents("exampleMap"));
        expect(await processor.process("hi"))
            .toEqual({
            actions: ["thumbs up", "thumbs down"],
            text: "hey man",
        });
    });
    it("processes advanced shit", async () => {
        await processor.learn(await nlpTrainer.getIntents("exampleMap"));
        expect(await processor.process("how are you"))
            .toEqual({
            actions: ["thumbs up", "thumbs down"],
            text: "hey man",
        });
    });
    it("throws an error when not trained properly", async () => {
        try {
            await processor.process("how are you");
            fail("hmm - let me think about it");
        }
        catch (error) {
            // works as designed
        }
        try {
            await processor.processAndDeliverDetails("Hi. I'm 25.");
            fail("hmm - let me think about it");
        }
        catch (error) {
            // works as designed
        }
    });
    it("adds intents and processes accordingly", async () => {
        const additionalIntent = {
            answers: [{
                    actions: ["Thanks", "thumbs down"],
                    text: "Here is the data you asked me for:",
                }],
            language: "en",
            name: "provide-currency-exchange-rates",
            utterances: ["provide exchange rates", "currency exchange rates", "rates"],
        };
        const map = await nlpTrainer.getIntents("exampleMap");
        map.push(additionalIntent);
        await processor.learn(map);
        const answer = await processor.process("exchange rates");
        expect(answer)
            .toEqual({
            actions: ["Thanks", "thumbs down"],
            text: "Here is the data you asked me for:",
        });
    });
    it("processes and delivers details", async () => {
        await processor.learn(await nlpTrainer.getIntents("exampleMap"));
        const details = await processor.processAndDeliverDetails("Hi. I'm 25.");
        expect(details.text)
            .toBe("hey man");
        expect(details.actions)
            .toEqual(["thumbs up", "thumbs down"]);
        expect(details.details)
            .toBeDefined();
    });
});
