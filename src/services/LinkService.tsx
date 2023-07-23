import { Config } from "../constants/Config";
import LinkModel from "../models/LinkModel";
import { ApiService } from "./ApiService";

export class LinkService extends ApiService<LinkModel> {

    private endpoint: string = "Links";

    async createDownloadLink(id: number) {
        return this._post(this.endpoint, new LinkModel(0, new Date(), '', id, 0));
    }

    formatDownloadLink(guid: string = "") {
        return `${Config.UI_URL}/temp-link/${guid}`;
    }

}