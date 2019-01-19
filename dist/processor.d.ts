import { IAnswer, ISpenglersIntent } from "./types";
export declare class Processor {
    private successfullyTrained;
    private map;
    private readonly manager;
    learn(map: ISpenglersIntent[]): Promise<void>;
    process(input: string): Promise<IAnswer>;
    private getActionsByAnswer(answer);
    private getAdvancedNLPResponse(input);
    private getDirectMatchResponse(input);
}
