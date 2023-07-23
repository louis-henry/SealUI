class BaseModel {
    constructor(
        public id: number,
        public cts: Date
    ) {
      this.id = id;
      this.cts = cts;
    }
  }
export default BaseModel;