"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var processor_1 = require("./processor");
var processor = new processor_1.Processor();
console.log(processor.process());
// test("basic slack message", () => {
//     const slackInteractionBuilder: SlackInteractionBuilder = new SlackInteractionBuilder()
//     const message: ISlackOriginalMessage = slackInteractionBuilder.getMessage("Hello World")
//     expect(message.text)
//         .toBe("Hello World")
//     expect(message.attachments)
//         .toEqual([])
// })
