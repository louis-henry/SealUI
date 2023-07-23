import axios from "axios";
import { Config } from "../constants/Config";

export class ApiService<T> { 

    async _get<T>(endpoint: string) {
        return await axios.get(`${Config.API_URL}/${endpoint}`)
            .then((response) => {
                console.info(`Successfully fetched ${endpoint.toLowerCase()}`);
                return response.data ?? [];
            }).catch((error) => {
                console.error(`Error fetching ${endpoint.toLowerCase()}`, error);
                return [];
            });
    }

    async _put<T>(endpoint: string, data: T) {
        await axios.put(`${Config.API_URL}/${endpoint}`, data)
            .then((response) => {
                console.info(`Successfully updated ${endpoint.toLowerCase()}`);
                return response.data;
            }).catch((error) => {
                console.error(`Error: could not update ${endpoint.toLowerCase().slice(0, -1)}`, error);
                return [];
            });
    }

    async _post<T>(endpoint: string, data: T) {
        return await axios.post(`${Config.API_URL}/${endpoint}`, data)
            .then((response) => {
                console.info(`Successfully added ${endpoint.toLowerCase()}`);
                return response.data ?? null;
            }).catch((error) => {
                console.error(`Error: could not add ${endpoint.toLowerCase().slice(0, -1)}`, error);
                return null;
            });
    }
}
