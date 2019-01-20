import { IAnswer, IAnswerExtended, ISpenglersIntent } from "./types";
export declare class Processor {
    private successfullyTrained;
    private map;
    private readonly manager;
    learn(map: ISpenglersIntent[]): Promise<void>;
    process(input: string): Promise<IAnswer>;
    processAndDeliverDetails(input: string): Promise<IAnswerExtended>;
    private validateTrainingData();
    private getActionsByAnswer(answer);
    private getAdvancedNLPResponse(input);
    private getAdvancedNLPResponseWithDetails(input);
    private getDirectMatchResponse(input);
}
