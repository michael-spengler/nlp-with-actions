"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { NlpManager } = require("node-nlp");
class Processor {
    constructor() {
        this.successfullyTrained = false;
        this.manager = new NlpManager({ languages: ["en"] });
    }
    learn(map) {
        return __awaiter(this, void 0, void 0, function* () {
            this.map = map;
            map.forEach((entry) => {
                entry.utterances.forEach((utterance) => {
                    this.manager.addDocument(entry.language, utterance, entry.intent);
                });
                entry.answers.forEach((answer) => {
                    this.manager.addAnswer(entry.language, entry.intent, answer.text);
                });
            });
            yield this.manager.train();
            yield this.manager.save();
            this.successfullyTrained = true;
        });
    }
    process(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.successfullyTrained) {
                throw new Error("Please call learn() before processing.");
            }
            let answer = this.getDirectMatchResponse(input);
            if (answer === undefined) {
                answer = yield this.getAdvancedNLPResponse(input);
            }
            return answer;
        });
    }
    getAdvancedNLPResponse(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.manager.process("en", input);
            return {
                actions: [],
                text: response.answer,
            };
        });
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
//# sourceMappingURL=processor.js.map