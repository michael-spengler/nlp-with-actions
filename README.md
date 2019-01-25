# Natural Language Processing With Actions

Simply process text  

This package is e.g. used by [homo-digitalis](https://www.npmjs.com/package/homo-digitalis) and by the [telegram-interaction-builder](https://www.npmjs.com/package/telegram-interaction-builder)

It leverages e.g. the [nlp-trainer](https://www.npmjs.com/package/nlp-trainer)

----  
## Basic Usage Example
    import { Processor, IAnswer, IAnswerExtended } from "nlp-with-actions"
    import { NLPTrainer } from "nlp-trainer"

    const processor: Processor = new Processor()
    const nlpTrainer: NLPTrainer = new NLPTrainer()

    // you can replace the trainingData with your own data
    const trainingData: any = await nlpTrainer.getIntents("exampleMap")
    await processor.learn(trainingData) 
    
    const answer: IAnswer = await processor.process("hi")
    
    console.log(answer)


## Example Data 
To explore example training data and its structure check the [nlp-trainer](https://www.npmjs.com/package/nlp-trainer) package.


## Advanced Usage Example
    // see also above

    // retrieving details including e.g. results of entity extraction
    const detailedAnswer: IAnswerExtended = 
        await processor.processAndDeliverDetails("Hi. I'm 25.")
    
    console.log(JSON.stringify(detailedAnswer))

## Feedback
If you find any issues or want to share improvement proposals in general feel free to open an issue [here](https://github.com/michael-spengler/nlp-with-actions/issues).


## Contribute
I am interested in save and useful enhancements. Feel free to create [Pull Requests](https://github.com/michael-spengler/nlp-with-actions/pulls) on my Repository.