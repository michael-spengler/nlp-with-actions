import { IIntent } from "nlp-trainer"

export const exampleMap: IIntent[] = [
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
        language: "en",
        name: "greetings.bye",
        utterances: ["goodbye for now", "bye bye take care", "cu", "bye"],
    },
    {
        answers: [
            {
                actions: ["thumbs up", "thumbs down"],
                text: "hey man",
            }],
        language: "en",
        name: "greetings.hello",
        utterances: ["hello how are you", "hi", "hey", "he", "hihi", "hihihi", "heyhey", "heyyyy how are you"],
    },
    {
        answers: [
            {
                actions: [],
                text: "You're welcome",
            }],
        language: "en",
        name: "say.thanks",
        utterances: ["Thanks", "thumbs up"],
    },
    {
        answers: [
            {
                actions: [],
                text: "Which answer would you like better?",
            }],
        language: "en",
        name: "improve",
        utterances: ["thumbs down"],
    },
]
