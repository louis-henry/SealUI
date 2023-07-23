import BaseModel from "./BaseModel";

class FileModel extends BaseModel {
    constructor(
        public id: number,
        public cts: Date,
        public name: string,
        public type: number,
        public size: number,
        public downloadCount: number,
        public data?: any
    ) {
      super(id, cts);
      this.name = name;
      this.type = type;
      this.size = size;
      this.downloadCount = downloadCount;
      this.data = data;
    }
  }
export default FileModel;