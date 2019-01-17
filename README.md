# Natural Language Processing With Actions

Simply process text

----  
# Usage Example
    import { Processor, exampleMap, IAnswer } from "nlp-with-actions"
    
    const processor: Processor = new Processor()
    
    await processor.learn(exampleMap)
    
    const answer: IAnswer = await processor.process("hi")
    
    console.log(answer)