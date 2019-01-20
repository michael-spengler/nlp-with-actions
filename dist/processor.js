"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { NlpManager } = 
// tslint:disable-next-line:no-require-imports
require("node-nlp");
class Processor {
    constructor() {
        this.successfullyTrained = false;
        this.intents = [];
        this.manager = new NlpManager({ languages: ["en"] });
    }
    async learn(intents) {
        this.intents = intents;
        intents.forEach((intent) => {
            intent.utterances.forEach((utterance) => {
                this.manager.addDocument(intent.language, utterance, intent.name);
            });
            intent.answers.forEach((answer) => {
                this.manager.addAnswer(intent.language, intent.name, answer.text);
            });
        });
        await this.manager.train();
        await this.manager.save();
        this.successfullyTrained = true;
    }
    async process(input) {
        if (!this.successfullyTrained) {
            throw new Error("Please call learn(withConsistentTrainingData) before processing.");
        }
        let answer = this.getDirectMatchResponse(input);
        if (answer === undefined) {
            answer = await this.getAdvancedNLPResponse(input);
        }
        return answer;
    }
    async processAndDeliverDetails(input) {
        if (!this.successfullyTrained) {
            throw new Error("Please call learn(withConsistentTrainingData) before processing.");
        }
        const answer = await this.getAdvancedNLPResponseWithDetails(input);
        return answer;
    }
    getActionsByAnswer(answer) {
        let actions = [];
        this.intents.forEach((entry) => {
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
    async getAdvancedNLPResponseWithDetails(input) {
        const response = await this.manager.process("en", input);
        return {
            actions: this.getActionsByAnswer(response.answer),
            details: response,
            text: response.answer,
        };
    }
    getDirectMatchResponse(input) {
        let answer;
        this.intents.forEach((nlpMapEntry) => {
            if (nlpMapEntry.utterances.some((utterance) => utterance === input)) {
                answer = nlpMapEntry.answers[0];
            }
        });
        return answer;
    }
}
exports.Processor = Processor;
