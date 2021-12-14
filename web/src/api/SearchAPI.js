import axios from 'axios';
import mock_job_search from './mock-job-search';
import mock_skills from "./mock-skills";
import mock_skill_search from './mock-skill-search';

class SearchAPI {
    constructor() {
        this.api_url = process.env.REACT_APP_API_BASE_URL;
    }

    async searchJob(jobName, seniority = null) {
        if (jobName === undefined || jobName === null || jobName === "") {
            throw new Error("Se debe especificar un término para el nombre del cargo.");
        }

        let queryParams = { job: jobName };
        if (seniority !== undefined && seniority !== null) {
            queryParams["seniority"] = seniority;
        }
        
        /*
        const response = await axios.get(`${this.api_url}/search`, { params: queryParams });

        return response.data;
        */

        return mock_job_search;
    }

    async searchSkill(skills, seniority) {
        if (skills === undefined || skills === null || skills.length === 0) {
            throw new Error("Se debe especificar al menos una habilidad para realizar la búsqueda.");
        }

        /*
        const response = await axios.get(`${this.api_url}/search`);

        return response.data;
        */

        return mock_skill_search;
    }

    async getSkillsList() {
        return mock_skills;
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