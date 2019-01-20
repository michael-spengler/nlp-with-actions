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
        await processor.learn(nlpTrainer.getTrainingMap("exampleMap"));
        expect(await processor.process("hi"))
            .toEqual({
            actions: ["thumbs up", "thumbs down"],
            text: "hey man",
        });
    });
    it("processes advanced shit", async () => {
        await processor.learn(nlpTrainer.getTrainingMap("exampleMap"));
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
            language: "en",
            name: "provide-currency-exchange-rates",
            utterances: ["provide exchange rates", "currency exchange rates", "rates"],
        };
        const map = nlpTrainer.getTrainingMap("exampleMap");
        map.push(additionalIntent);
        await processor.learn(map);
        expect(await processor.process("exchange rates"))
            .toEqual({
            actions: ["Thanks", "thumbs down"],
            text: "Here is the data you asked me for:",
        });
    });
    it("processes and delivers details", async () => {
        await processor.learn(nlpTrainer.getTrainingMap("exampleMap"));
        const details = await processor.processAndDeliverDetails("Hi. I'm 25.");
        expect(details.text)
            .toBe("hey man");
        expect(details.actions)
            .toEqual(["thumbs up", "thumbs down"]);
        expect(details.details)
            .toBeDefined();
    });
});
