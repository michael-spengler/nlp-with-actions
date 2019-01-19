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
                actions: ["thumbs up", "thumbs down"],
                text: "hey man",
            }],
        intent: "greetings.hello",
        language: "en",
        utterances: ["hello how are you", "hi", "hey", "he", "hihi", "hihihi", "heyhey", "heyyyy how are you"],
    },
    {
        answers: [
            {
                actions: [],
                text: "You're welcome",
            }],
        intent: "say.thanks",
        language: "en",
        utterances: ["Thanks", "thumbs up"],
    },
    {
        answers: [
            {
                actions: [],
                text: "Which answer would you like better?",
            }],
        intent: "improve",
        language: "en",
        utterances: ["thumbs down"],
    },
]
