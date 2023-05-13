export class DataDTO {
    userId: string;
    sessionId: number;
    events: object[]
    constructor(userId: string, sessionId: number, events: object[]) {
        this.userId = userId
        this.sessionId = sessionId
        this.events = events
    }
}
