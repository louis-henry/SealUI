import { FileUploadHandlerEvent } from "primereact/fileupload";
import FileModel from "../models/FileModel";
import FileType, { FileTypeEnum } from "../constants/file-type";
import { ApiService } from "./ApiService";

export class FileService extends ApiService<FileModel> {
    private endpoint: string = "Files";

    getFiles() {
      this.reloadFiles().then(files => {
        return files;
      });
    }

    getMappedFiles(data: any) {
      return [...data || []].map(d => {
          d.cts = new Date(d.cts);
          return d;
      });
    }

    async reloadFiles() {
      return await this._get(this.endpoint).then(files => { 
        return files;
      });
    }
 
    async uploadFiles(event: FileUploadHandlerEvent) {
      if (event?.files) {
        let files = await this.convertForUpload(event.files);
        if (files) {
          const promises = files.map(async (f) => {
            await this._post(this.endpoint, f);
          });

          await Promise.all(promises);
          return [];
        }
      }
    }

    async downloadFiles(files: FileModel[]) {
      if (files?.length > 0) {
        const promises = files.map(async (f) => {
          await this._get(`${this.endpoint}/Download/${f.id}`)
            .then(async (response: any) => { 
              this.triggerDownload(response, f.name);
              f.downloadCount++;
              await this.updateFile(f);
          });
        });
        
        await Promise.all(promises);
        return [];
      }
    }

    async getForPreview(file: FileModel) {
      return this._get(`${this.endpoint}/Preview/${file.id}`).then(response => {
        if (response.length > 0) {
          // Convert data to Blob format as we will pass this to our renderer
          file.data = this.dataURItoBlob(response);
        }
        return file;
      });
    }

    async downloadViaLink(guid: string) {
      return await this._get<any>(`Links/Download/${guid}`)
            .then(response => {
              return response;
          });
    }

    async updateFile(file: FileModel) {
      return await this._put(this.endpoint, file);
    }

    triggerDownload(response: any, name: string) {
      try {
        // Extract the file type
        const type = (response.split(',')[0] as string).replace('data:', '').replace('base64', '');

        // Trigger a download stream via the browser
        const url = window.URL.createObjectURL(new Blob([this.base64ToBinary(response)], { type: type }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', name);
        document.body.appendChild(link);
        link.click();
        return true;
      }
      catch {
        console.log('download error');
      }
      return false;
    }

    // #region Conversions
    base64ToBinary(response: any) {
      // Remove prefix from data string
      const base64Data = response.split(',')[1]; 

      // Decode the base64 data into a binary string
      const binaryString = atob(base64Data);
      
      // Convert the binary string to a Uint8Array (typed array)
      const uint8Array = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
      }
      return uint8Array;
    }

    dataURItoBlob(dataURI: string) {
      // Create Blob from array buffer
      return new Blob([this.base64ToBinary(dataURI)], { type: dataURI.split(',')[0] });
    }

    async convertObjectURLToDataString(objectURL: string): Promise<string | null> {
      try {
        // Fetch the content from the Object URL
        const response = await fetch(objectURL);
        if (!response.ok) {
          throw new Error(`Error fetching the content from the Object URL. Status: ${response.status}`);
        }
    
        // Convert the fetched content to a Blob
        const blob = await response.blob();
    
        // Use FileReader API to read the Blob as a data string (Base64)
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const dataString = reader.result as string;
            resolve(dataString);
          };
          reader.readAsDataURL(blob);
        });
      } catch (error) {
          console.error('Error converting Object URL to data string:', error);
        return null;
      }
    }
    
    async getDataAsString(file: File) {
      const objectURL = URL.createObjectURL(file);
      const data = await this.convertObjectURLToDataString(objectURL);
      const jsonString = JSON.stringify(data);
      return btoa(jsonString);
    }

    async convertForUpload(files: File[]) {
      const filesToUpload: FileModel[] = [];
      const promises = files.map(async (file) => {
        const data = await this.getDataAsString(file);
        filesToUpload.push(new FileModel(0, new Date(), file.name, FileType.resolveFileTypeForUpload(file.name), file.size, 0, data));
      });

      // Wait for all promises to resolve
      await Promise.all(promises);
      return filesToUpload;
    }

    // #endregion
}