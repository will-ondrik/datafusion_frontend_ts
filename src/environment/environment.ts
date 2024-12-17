const currentEnvironment = "development";

const environments = {
    development: {
        API_BASE_URL: "http://localhost:8888",
    },
    production: {
        API_BASE_URL: "",
    },
    test: {
        API_BASE_URL: "",
    }
}

export const environment = environments[currentEnvironment];