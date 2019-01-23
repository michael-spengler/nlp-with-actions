# Natural Language Processing With Actions

Simply process text  

This package is e.g. used by the [telegram-interaction-builder](https://www.npmjs.com/package/telegram-interaction-builder)

It leverages e.g. the [nlp-trainer](https://www.npmjs.com/package/nlp-trainer)

----  
# Basic Usage Example
    import { Processor } from "nlp-with-actions"
    import { NLPTrainer } from "nlp-trainer"

    const processor: Processor = new Processor()
    const nlpTrainer: NLPTrainer = new NLPTrainer()

    // you can replace the trainingData with your own data
    const trainingData: any = await nlpTrainer.getTrainingMap("exampleMap")
    await processor.learn(trainingData) 
    
    const answer: IAnswer = await processor.process("hi")
    
    console.log(answer)


# Example Data 
To explore example training data and its structure check the [nlp-trainer](https://www.npmjs.com/package/nlp-trainer) package.


# Advanced Usage Example
    // see also above

    // retrieving details including e.g. results of entity extraction
    const details: IAnswerExtended = 
        await processor.processAndDeliverDetails("Hi. I'm 25.")
    
    console.log(JSON.stringify(answer))
