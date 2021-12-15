import axios from 'axios';

class SearchAPI {
    constructor() {
        this.api_url = process.env.REACT_APP_API_BASE_URL;
    }

    async searchJob(jobName) {
        if (jobName === undefined || jobName === null || jobName === "") {
            throw new Error("Se debe especificar un término para el nombre del cargo.");
        }

        const response = await axios.get(`${this.api_url}/jobs/keyword/${jobName}`);

        return response.data;
    }

    async searchSkill(skills) {
        if (skills === undefined || skills === null || skills.length === 0) {
            throw new Error("Se debe especificar al menos una habilidad para realizar la búsqueda.");
        }

        const response = await axios.get(`${this.api_url}/search`);

        return response.data;
    }

    async getSkillsList() {
        const response = await axios.get(`${this.api_url}/tags`);

        return response.data;
    }

    async getSenioritiesList() {
        return [
            { id: "no_experience", name: "Sin Experiencia"},
            { id: "junior", name: "Junior"},
            { id: "semi_senior", name: "Semi Senior"},
            { id: "senior", name: "Senior"},
            { id: "expert", name: "Experto"},
        ];
    }
}

export default SearchAPI;