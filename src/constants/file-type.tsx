export enum FileTypeEnum {
    UNKNOWN = -1,
    PDF,
    XLS,
    XLSX,
    DOC,
    DOCX,
    TXT,
    PNG,
    JPEG,
    JPG
  }

export class FileType {
  static resolveFileType(type: number, isForIcon: boolean  = true) : string {
    switch(type) {
      case FileTypeEnum.PDF:
        return isForIcon ? 'pdf.png' : 'application/pdf';
      case FileTypeEnum.XLS:
        return isForIcon ? 'xls.png' : 'application/vnd.ms-excel';
      case FileTypeEnum.XLSX:
        return isForIcon ? 'xls.png' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      case FileTypeEnum.DOC:
        return isForIcon ? 'doc.png' : 'application/msword';
      case FileTypeEnum.DOCX:
        return isForIcon ? 'doc.png' : 'application/pdf';
      case FileTypeEnum.TXT:
        return isForIcon ? 'txt.png' : 'text/plain';
      case FileTypeEnum.PNG:
        return isForIcon ? 'img.png' : 'image/png';
      case FileTypeEnum.JPEG:
      case FileTypeEnum.JPG:
        return isForIcon ? 'img.png' : 'image/jpeg';
      default:
        return isForIcon ? 'unknown.png' : 'application/octet-stream';
    }
  }

  static resolveFileTypeForUpload(fileName: string) : FileTypeEnum {
    let extIndex = fileName.indexOf('.');
    if (extIndex > 0)
    {
      const extStr = fileName.substring(extIndex);
      switch(extStr) {
        case '.pdf':
          return FileTypeEnum.PDF;
        case '.xls':
          return FileTypeEnum.XLS;
        case '.xlsx':
          return FileTypeEnum.XLSX;
        case '.doc':
          return FileTypeEnum.DOC;
        case '.docx':
          return FileTypeEnum.DOCX;
        case '.txt':
          return FileTypeEnum.TXT;
        case '.png':
          return FileTypeEnum.PNG;
        case '.jpeg':
          return FileTypeEnum.JPEG;
        case '.jpg':
          return FileTypeEnum.JPEG;
        default:
          return FileTypeEnum.UNKNOWN;
      }
    }
    return FileTypeEnum.UNKNOWN;
  }
}
export default FileType;