# Natural Language Processing With Actions

Simply process text

----  
# Basic Usage Example
    import { Processor, exampleMap, IAnswer } from "nlp-with-actions"
    
    const processor: Processor = new Processor()
    
    // you can replace exampleMap with your own data
    await processor.learn(exampleMap) 
    
    const answer: IAnswer = await processor.process("hi")
    
    console.log(answer)


# Example Data 
To explore example data check the **"example-data.ts"** file in the **src** folder of the node module at hand (nlp-with-actions).  


# Advanced Usage Example
    // see also above

    // retrieving details including e.g. results of entity extraction
    const details: IAnswerExtended = await processor.processAndDeliverDetails("Hi. I'm 25.")
    
    console.log(JSON.stringify(answer))
