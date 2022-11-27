export const MessageQEvent = {
    UserCreated : "event.user.created" 
};

export enum MessageQQueues {
    USER_INFO_SERVICE_QUEUE = "UserInfoServiceQueue",
}


export enum MessageQChannelVariables {
    CONNECT = "connect",
    CLOSE = "close",
    ERROR = "error",
    CANCEL = "cancel",
    DISCONNECT = "disconnect",
    EVENTS = "events",
    TOPIC = "topic",
    DIRECT = "direct",
    FANOUT = "fanout",
    CREATE = "create",
    BLOCKED = "blocked",
    UNBLOCKED = "unblocked",
    COLLECTED = "collected"
}

export enum MessageQueueConnectionType {
    PUBLISHER = "Publisher",
    CONSUMER = "Consumer"
}
