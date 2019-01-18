# Natural Language Processing With Actions

Simply process text

----  
# Usage Example
    import { Processor, exampleMap, IAnswer } from "nlp-with-actions"
    
    const processor: Processor = new Processor()
    
    await processor.learn(exampleMap)
    
    const answer: IAnswer = await processor.process("hi")
    
    console.log(answer)


# Example Data 
[{
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
}]
