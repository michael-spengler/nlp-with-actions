import { ISpenglersNLPMapEntry } from "./types"

export const exampleMap: ISpenglersNLPMapEntry[] = [
    {
        answers: [{ actions: [], text: "Till next time" }, { actions: [], text: "see you soon!" }],
        intent: "greetings.bye",
        language: "en",
        utterances: ["goodbye for now", "bye bye take care", "cu"],
    },
    {
        answers: [{ actions: [], text: "hey man" }],
        intent: "greetings.hello",
        language: "en",
        utterances: ["hello how are you", "hi", "hey", "he", "hihi", "hihihi", "heyhey", "heyyyy how are you"],
    },
]
