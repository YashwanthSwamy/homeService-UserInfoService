import { get } from "env-var";

class EnvironmentVariables{
    PORT !: number;
    DB_URL !: string;
    MQ_URL !: string;

    constructor() {
        this.init();
    }

    private init() {
        this.PORT = get("PORT").default("8080").asIntPositive();
    }
}

const environmentVariables = new EnvironmentVariables();
export { environmentVariables };