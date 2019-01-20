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
        if (this.validateTrainingData().length > 0) {
            throw new Error(`Errors while validating training data: \n${this.validateTrainingData()}`);
        }
        else {
            map.forEach((entry) => {
                entry.utterances.forEach((utterance) => {
                    this.manager.addDocument(entry.language, utterance, entry.intent);
                });
                entry.answers.forEach((answer) => {
                    this.manager.addAnswer(entry.language, entry.intent, answer.text);
                });
            });
        }
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
    validateTrainingData() {
        const errors = [];
        const utterances = [];
        const actions = [];
        this.map.forEach((intent) => {
            intent.answers.forEach((answer) => {
                answer.actions.forEach((action) => {
                    actions.push(action);
                });
            });
        });
        this.map.forEach((intent) => {
            intent.utterances.forEach((utterance) => {
                utterances.push(utterance);
            });
        });
        actions.forEach((action) => {
            if (!utterances.some((utterance) => utterance === action)) {
                errors.push(`Could not find an utterance for action: ${action}`);
            }
        });
        return errors;
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
        this.map.forEach((nlpMapEntry) => {
            if (nlpMapEntry.utterances.some((utterance) => utterance === input)) {
                answer = nlpMapEntry.answers[0];
            }
        });
        return answer;
    }
}
exports.Processor = Processor;
