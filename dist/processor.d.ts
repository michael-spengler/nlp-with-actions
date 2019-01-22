import { IIntent } from "nlp-trainer";
import { IAnswer, IAnswerExtended } from "./types";
export declare class Processor {
    private successfullyTrained;
    private intents;
    private readonly manager;
    learn(intents: IIntent[]): Promise<void>;
    process(input: string): Promise<IAnswer>;
    processAndDeliverDetails(input: string): Promise<IAnswerExtended>;
    private getActionsByAnswer;
    private getAdvancedNLPResponse;
    private getAdvancedNLPResponseWithDetails;
    private getDirectMatchResponse;
}
