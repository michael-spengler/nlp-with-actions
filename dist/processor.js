"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { NlpManager } = 
// tslint:disable-next-line:no-require-imports
require("node-nlp");
class Processor {
    constructor() {
        this.successfullyTrained = false;
        this.map = [];
        this.manager = new NlpManager({ languages: ["en"] });
    }
    async learn(map) {
        this.map = map;
        map.forEach((entry) => {
            entry.utterances.forEach((utterance) => {
                this.manager.addDocument(entry.language, utterance, entry.intent);
            });
            entry.answers.forEach((answer) => {
                this.manager.addAnswer(entry.language, entry.intent, answer.text);
            });
        });
        await this.manager.train();
        await this.manager.save();
        this.successfullyTrained = true;
    }
    async process(input) {
        if (!this.successfullyTrained) {
            throw new Error("Please call learn() before processing.");
        }
        let answer = this.getDirectMatchResponse(input);
        if (answer === undefined) {
            answer = await this.getAdvancedNLPResponse(input);
        }
        return answer;
    }
    getActionsByAnswer(answer) {
        let actions = [];
        this.map.forEach((entry) => {
            const foundAnswers = entry.answers.filter((element) => answer === element.text);
            if (foundAnswers.length === 1) {
                actions = foundAnswers[0].actions;
            }
        });
        return actions;
    }
    async getAdvancedNLPResponse(input) {
        const response = await this.manager.process("en", input);
        return {
            actions: this.getActionsByAnswer(response.answer),
            text: response.answer,
        };
    }
    getDirectMatchResponse(input) {
        let answer;
        this.map.forEach((nlpMapEntry) => {
            if (nlpMapEntry.utterances.some((utterance) => utterance === input)) {
                answer = nlpMapEntry.answers[0];
            }
        });
        return answer;
    }
}
exports.Processor = Processor;
