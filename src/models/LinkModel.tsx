import BaseModel from "./BaseModel";

class LinkModel extends BaseModel {
    constructor(
        public id: number,
        public cts: Date,
        public GUID: string,
        public fileId: number,
        public expiryMins: number
    ) {
      super(id, cts);
      this.GUID = GUID;
      this.fileId = fileId;
      this.expiryMins = expiryMins;
    }
  }
export default LinkModel;