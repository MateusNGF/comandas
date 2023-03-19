import { ClientSession, MongoClient } from "mongodb";
import { iSession, iTransaction } from "../contracts";

export class MongoSession implements iSession {
    private mongoSession: ClientSession

    constructor(
        private readonly mongoClient: MongoClient
    ) { }

    startSession(): iSession {
        if (!this.mongoSession) {
            this.mongoSession = this.mongoClient.startSession()
            return this
        }
    }

    async endSession(): Promise<void> {
        if (this.mongoSession) {
            this.mongoSession.endSession()
            this.mongoSession = null
        }
    }

    async initTransaction(): Promise<iTransaction> {
        this.hasInstanceOfClient();
        this.mongoSession.startTransaction();
        return this
    }

    async commitTransaction(): Promise<void> {
        this.hasInstanceOfClient();
        this.mongoSession.commitTransaction();
    }

    async rollbackTransaction(): Promise<void> {
        this.hasInstanceOfClient();
        this.mongoSession.abortTransaction();
    }

    private hasInstanceOfClient() {
        if (!this.mongoSession) throw Error('Session not implements.')
    }

    get() {
        return this.mongoSession
    }
}