enum FileTypeEnum {
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
  static resolveFileTypeForTable(type: number) : string {
    switch(type) {
      case FileTypeEnum.PDF:
        return 'pdf.png';
      case FileTypeEnum.XLS:
      case FileTypeEnum.XLSX:
        return 'xls.png';
      case FileTypeEnum.DOC:
      case FileTypeEnum.DOCX:
        return 'doc.png';
      case FileTypeEnum.TXT:
        return 'txt.png';
      case FileTypeEnum.PNG:
      case FileTypeEnum.JPEG:
      case FileTypeEnum.JPG:
        return 'img.png';
      default:
        return 'unknown.png';
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