const { Login, Client } = require("./octa_login");

const apis = {
    company: require("./lib/company"),
    customfields: require("./lib/custom-fields"),
    forms: require("./lib/forms"),
    groups: require("./lib/groups"),
    helpcenter: require("./lib/help-center"),
    macros: require("./lib/macros"),
    organizations: require("./lib/organizations"),
    persons: require("./lib/persons"),
    products: require("./lib/products"),
    smartforms: require("./lib/smart-forms"),
    subjects: require("./lib/subjects"),
    tags: require("./lib/tags"),
    tickets: require("./lib/tickets"),
    workflow: require("./lib/workflow"),
};

class Octadesk {
    constructor(OCTA_URL, OCTA_TOKEN, OCTA_USER) {
        this.OCTA_URL = OCTA_URL;
        this.OCTA_TOKEN = OCTA_TOKEN;
        this.OCTA_USER = OCTA_USER;
        this.client;
        this.token;
    }

    async GetToken() {
        let loginClient = new Login(
            this.OCTA_URL,
            this.OCTA_TOKEN,
            this.OCTA_USER
        );
        let response = await loginClient.login();
        if (response && response.token) {
            return response.token;
        } else {
            return Error("Credentials invalid");
        }
    }

    async auth() {
        this.token = await this.GetToken();
        if (typeof this.token === "string") {
            this.client = new Client(this.OCTA_URL, this.token);
            this.initializeSubApis();
        }
    }

    async initializeSubApis() {
        for (var name in apis) {
            let api = apis[name];
            this[name] = new api(this.client);
        }
    }
}

module.exports = {
    Octadesk,
};
