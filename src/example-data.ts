import { ISpenglersIntent } from "./types"

export const exampleMap: ISpenglersIntent[] = [
    {
        answers: [
            {
                actions: ["thumbs up", "thumbs down"],
                text: "Till next time",
            },
            {
                actions: [],
                text: "see you soon!",
            }],
        intent: "greetings.bye",
        language: "en",
        utterances: ["goodbye for now", "bye bye take care", "cu", "bye"],
    },
    {
        answers: [
            {
                actions: ["I like your response", "I do not like your response"],
                text: "hey man",
            }],
        intent: "greetings.hello",
        language: "en",
        utterances: ["hello how are you", "hi", "hey", "he", "hihi", "hihihi", "heyhey", "heyyyy how are you"],
    },
]
