import { get } from "env-var";

class EnvironmentVariables{
    PORT !: number;
    DB_URL !: string;
    MQ_URL !: string;
    INSTANCE_INDEX !: string | undefined;

    constructor() {
        this.init();
    }

    private init() {
        this.PORT = get("PORT").default("8080").asIntPositive();
        this.INSTANCE_INDEX = get("INSTANCE_INDEX").asString();
        this.DB_URL = get("SQL_DB_URI").default("postgres://postgres:postgres@0.0.0.0:32768/postgres").asString();
        this.MQ_URL = get("MESSAGEQ_URL").default("amqp://guest:guest@0.0.0.0:5672").asString();
    }
}

const environmentVariables = new EnvironmentVariables();
export { environmentVariables };