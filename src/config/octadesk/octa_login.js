const axios = require("axios");

class Login {
    constructor(OCTA_URL, OCTA_TOKEN, OCTA_USER) {
        this.OCTA_URL = OCTA_URL;
        this.OCTA_TOKEN = OCTA_TOKEN;
        this.OCTA_USER = OCTA_USER;
    }

    async login() {
        const options = {
            baseURL: this.OCTA_URL,
            headers: {
                apiToken: this.OCTA_TOKEN,
                username: this.OCTA_USER,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        };
        try {
            let response = await axios
                .create(options)
                .post("/login/apiToken", {});

            return response.data;
        } catch (error) {
            if (error.response.status === 405) {
                throw new Error(error.response.status, error.response.data);
            }
        }
    }
}

class Client {
    constructor(baseURL, token) {
        let options = {
            baseURL,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };

        this._http = axios.create(options);
    }

    async get(resource) {
        return await this._http.get(resource);
    }

    async post(resource, data) {
        return await this._http.post(resource, data);
    }

    async put(resource, data) {
        return await this._http.put(resource, data);
    }

    async delete(resource) {
        return await this._http.delete(resource);
    }
}

module.exports = {
    Login,
    Client,
};
