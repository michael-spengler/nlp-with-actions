import { IAnswer, ISpenglersNLPMapEntry as ISpenglersNLPMapEntry } from "./types";
export declare class Processor {
    private successfullyTrained;
    private map;
    private readonly manager;
    learn(map: ISpenglersNLPMapEntry[]): Promise<void>;
    process(input: string): Promise<IAnswer>;
    private getAdvancedNLPResponse(input);
    private getDirectMatchResponse(input);
}
