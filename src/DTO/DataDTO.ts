export class DataDTO {
    accountId: string;
    sessionId: number;
    events: object[]
    constructor(accountId: string, sessionId: number, events: object[]) {
        this.accountId = accountId
        this.sessionId = sessionId
        this.events = events
    }
}
