import * as amqp from "amqp-connection-manager";
import { ConfirmChannel, Message } from "amqplib";
import { CreateUserModel } from "../../features/user/model/createUserModel";
import { UpdateUserModel } from "../../features/user/model/updateUserModel";
import channelInitializer from "./configuration/channelInitialiser";

import { MessageQConnector } from "./Connector/MessageConnector";
import eventHandler from "./handlers/eventHandler";
import { IEventHandlerResponse } from "./models/eventHandlerResponse";
import { ActionEvents } from "./types/actionEvents";
import { MessageQChannelVariables, MessageQEvent, MessageQQueues } from "./types/messageQEnums";

class MessageQ extends MessageQConnector {
    MessageQChannelTX!: amqp.ChannelWrapper;
    MessageQChannelRX!: amqp.ChannelWrapper;

    constructor() {
        super();
      }

      async init() {
       this.setUpReceivingChannel();
        this.setUpTransmissionChannel();
      }

      private parseData(eventData: Message) {
        try {
          return JSON.parse(eventData.content.toString());
        } catch (error) {
          return undefined;
        }
      }

      private setUpReceivingChannel() {
        this.MessageQChannelRX = this.MessageQRXConnector.createChannel({
          json: true,
          setup: async (channel: ConfirmChannel) => {
            Promise.all([
              await channelInitializer.init(channel),
              await channel.consume(
                MessageQQueues.USER_INFO_SERVICE_QUEUE,
                this.onMessageReceived
              ),
            ]);
            channel.on(MessageQChannelVariables.CANCEL, () => {
              console.error("[RQ] Received channelRX cancel event");
              channel.close();
            });
            channel.on(MessageQChannelVariables.CONNECT, () =>
              console.log("[RQ] ChannelRX connected")
            );
            channel.on(MessageQChannelVariables.CLOSE, () =>
              console.error("[RQ] ChannelRX closed")
            );
            channel.on(MessageQChannelVariables.ERROR, (error: Error) => {
              console.error("[RQ] ChannelRX disconnected", { error: error });
            });
          }
        });
      }

      private setUpTransmissionChannel() {
        this.MessageQChannelTX = this.MessageQTXConnector.createChannel({
          json: false,
          setup: async (channel: ConfirmChannel) => {
            Promise.all([
              await channel.assertExchange(
                MessageQChannelVariables.EVENTS,
                MessageQChannelVariables.TOPIC,
                { durable: true }
              ),
            ]);
            channel.on(MessageQChannelVariables.CANCEL, () => {
              console.error("[RQ] Received channelTX cancel event");
              channel.close();
              this.setUpTransmissionChannel();
            });
          }
        });
    
        this.MessageQChannelTX.on(MessageQChannelVariables.CONNECT, () =>
          console.log("[RQ] ChannelTX connected")
        );
        this.MessageQChannelTX.on(MessageQChannelVariables.CLOSE, () =>
          console.error("[RQ] ChannelTX closed")
        );
        this.MessageQChannelTX.on(MessageQChannelVariables.ERROR, (error: Error) =>
          console.error("[RQ] ChannelTX disconnected", { error: error })
        );
      }

      private readonly onMessageReceived = async (eventData: Message | null) => {
        if (!eventData) {
          console.error("[RQ] Undefined payload");
          return;
        }
        const parsedData = this.parseData(eventData);
        const { routingKey: eventName } = eventData.fields;
    
        if (!parsedData) {
          console.error("[RQ] Parsing failed", { event: eventName, inputData: parsedData });
          this.handleResponse(eventData, ActionEvents.Reject);
          return;
        }
    
        const headerData = eventData.properties.headers;
        console.log("[RQ] Message received", { event: eventName, inputData: parsedData });
    
        try {
          const eventResponse: IEventHandlerResponse = await eventHandler.handle(
            parsedData,
            eventName,
            headerData
          );
          this.handleResponse(eventData, eventResponse.action);
        } catch (error: any) {
          this.handleResponse(eventData, error.action);
        }
      };

      public async handleResponse(eventData: Message, actionEvent: ActionEvents) {
        const { routingKey: eventName } = eventData.fields;

        if(actionEvent === ActionEvents.Acknowledge){
            this.MessageQChannelRX.ack(eventData);
        }
        else {
            console.error("[RQ] Rejecting", { event: eventName, inputData: JSON.parse(eventData.content.toString()) });
            this.MessageQChannelRX.nack(eventData, undefined, false);
        }
      }


      async publishCreatedCustomer(customerData: CreateUserModel): Promise<void> {
        if (this.MessageQChannelTX === undefined) {
          return;
        }
        console.log("[RQ] Publishing Create Customer Message");
        this.MessageQChannelTX.publish(
          "events",
          MessageQEvent.CustomerCreated,
          Buffer.from(
            JSON.stringify(customerData)
          ),
          { persistent: true }
        );
      }

      async publishUpdatedCustomer(customerData: UpdateUserModel): Promise<void> {
        if (this.MessageQChannelTX === undefined) {
          return;
        }
        console.log("[RQ] Publishing Update Customer Message", {msg: customerData});
        this.MessageQChannelTX.publish(
          "events",
          MessageQEvent.CustomerUpdated,
          Buffer.from(
            JSON.stringify(customerData)
          ),
          { persistent: true }
        );
      }
}

const messageQ: MessageQ = new MessageQ();
export default messageQ;