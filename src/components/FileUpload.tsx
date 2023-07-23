import { FileUpload, FileUploadHandlerEvent } from 'primereact/fileupload';
import "../styles/file.upload.css";
import { FileService } from '../services/FileService';
import AlertService from '../services/AlertService';
import { useContext } from 'react';
import SharedDataContext from '../utils/SharedDataContext';

export default function Uploader() {
    const { tableFiles, setFiles } = useContext(SharedDataContext);
    const fileService = new FileService();
    const alertService = new AlertService();

    async function handleUpload(event: FileUploadHandlerEvent) {
        await fileService.uploadFiles(event);
        event.options.clear();
        alertService.showSuccess(`File${(event?.files.length > 1 ? 's' : '')} uploaded`);
        fileService.reloadFiles().then(data => { setFiles(fileService.getMappedFiles(data)) });
    };

    return (
        <div className="card upload-container">
            <FileUpload customUpload={true} uploadHandler={handleUpload} name="uploader[]" multiple 
              accept="image/png, image/jpeg, .pdf, .txt, .doc, .docx, .xls, .xlsx," maxFileSize={5000000} 
              emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
        </div>
    )
}