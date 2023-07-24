
/* React, PrimeReact & npm */
import React, { useState, useEffect, useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

/* Services */
import { FileService } from '../services/FileService';
import { LinkService } from '../services/LinkService';
import AlertService from '../services/AlertService';

/* Components */
import Popup from './Popup';
import FileType from '../constants/file-type';

/* Misc */
import SharedDataContext from '../utils/SharedDataContext';

/* CSS */
import "../styles/file.table.css";

const FileTable = () => {
    const { tableFiles, setFiles } = useContext(SharedDataContext);
    const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [buttonPreview, setButtonPreview] = useState(false);
    const [buttonLink, setButtonLink] = useState(false);
    const [docs, setDocs] = useState<any>([]);
    const [downloadLink, setDownloadLink] = useState<string>('');
    const [linkTime, setLinkTime] = useState<string>('');
    const fileService = new FileService();
    const linkService = new LinkService();
    const alertService = new AlertService();

    useEffect(() => {
        reloadFiles();
    }, []);

    const reloadFiles =() => {
        fileService.reloadFiles().then(data => { setFiles(fileService.getMappedFiles(data)); setLoading(false) });
    }

    const formatDate = (value: any) => {
        return value.toLocaleString();
    }

    const dateBodyTemplate = (rowData: any) => {
        return formatDate(rowData.cts);
    }

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between align-items-center function-btns">
                <Button type="button" className={`${selectedFiles && selectedFiles.length > 0 ? "" : "p-disabled"}`} onClick={downloadBtnClicked}><img src={require('../assets/imgs/file/download.png')} width={20}/>
                    <span className="p-button-label p-clickable"></span>
                </Button>
            </div>
        )
    }

    const typeBodyTemplate = (rowData: any) => {
        return (
            <React.Fragment>
                <img src={require('../assets/imgs/file/' + FileType.resolveFileType(rowData.type))} width={40}/>
            </React.Fragment>
        );
    }

    const sizeBodyTemplate = (rowData: any) => {
        const bytes = rowData.size;
        if (bytes < 1000) {
          return <span>{bytes} B</span>;
        } else if (bytes < 1000000) {
          return <span>{(bytes / 1000).toFixed(2)} KB</span>;
        } else if (bytes < 1000000000) {
          return <span>{(bytes / 1000000).toFixed(2)} MB</span>;
        } else {
          return <span>{(bytes / 1000000000).toFixed(2)} GB</span>;
        }
      };

    const actionBodyTemplate = (rowData: any) => {
        return (
            <React.Fragment>
                <div className="function-btns">
                    <Button type="button" onClick={() => previewBtnClicked(rowData)}><img src={require('../assets/imgs/file/magnify.png')} width={20}/></Button>
                    <Button type="button" onClick={() => linkBtnClicked(rowData)}><img src={require('../assets/imgs/file/link.png')} width={20}/></Button>
                </div>
            </React.Fragment>
        );
    }

    async function downloadBtnClicked(rowData: any) {
        await fileService.downloadFiles(selectedFiles);
        reloadFiles();
        alertService.showInfo(`File${(selectedFiles.length > 1 ? 's' : '')} downloading...`);
    }

    async function previewBtnClicked(rowData: any) {
        await fileService.getForPreview(rowData)
        .then(file => {
            if (file.data) {
                let arr: any = [];
                arr.push(file);
                setDocs(arr);
            }
            setButtonPreview(true);
        });
    }

    async function linkBtnClicked(rowData: any) {
        linkService.createDownloadLink(rowData.id).
        then(result => {
            setDownloadLink(linkService.formatDownloadLink(result?.GUID));
            setButtonLink(true);
            setLinkTime(result.ExpiryMins);
        });
    }

    const handleCopyToClipboard = () => {
        
        // Workaround, copy to clipboard
        const textarea = document.createElement('textarea');
        textarea.value = downloadLink;
        document.body.appendChild(textarea);
        textarea.select();
    
        try {
          const success = document.execCommand('copy');
          alertService.showInfo('Copied to clipboard');
        } catch (error) {
          // Do nothing
        } finally {
          // Remove the textarea
          document.body.removeChild(textarea);
        }
    }

    const header = renderHeader();

    return (
        <div className="card table-container">
            <div className="datatable">
                <DataTable value={tableFiles} paginator className="p-datatable-files" header={header} rows={5}
                    paginatorTemplate="PrevPageLink PageLinks NextPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[5,10,20]}
                    dataKey="id" rowHover selection={selectedFiles} onSelectionChange={e => setSelectedFiles(e.value as any)} loading={loading}
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                    <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                    <Column field="type" header="Type" style={{ minWidth: '1em' }} body={typeBodyTemplate} />
                    <Column field="name" header="Name" sortable style={{ maxWidth: '200px', overflow: 'hidden' }} />
                    <Column field="cts" header="Uploaded" sortable dataType="date" style={{ minWidth: '15rem' }} body={dateBodyTemplate}/>
                    <Column field="size" header="Size" sortable style={{ minWidth: '2rem' }} body={sizeBodyTemplate}/>
                    <Column field="downloadCount" header="Downloads" sortable style={{ minWidth: '2rem', textAlign: 'center' }} />
                    <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                </DataTable>
            </div>
            <Popup purpose="preview" trigger={buttonPreview} setTrigger={setButtonPreview}>
                <div className="popup-content-container">
                    <div className="content-container-inner">
                        <DocViewer
                            allow-scripts={true}
                            pluginRenderers={DocViewerRenderers}
                            documents={docs.map((file: any) => ({
                                uri: window.URL.createObjectURL(file.data),
                                fileName: file.name,
                                fileType: FileType.resolveFileType(file.type, false)
                              }))}
                            config={{
                                header: {
                                    disableHeader: false,
                                    disableFileName: false,
                                    retainURLParams: false
                                    }
                                }}
                            style={{ height: '100%' }}
                        />
                    </div>
                </div>
            </Popup>
            <Popup purpose="link" trigger={buttonLink} setTrigger={setButtonLink}>
                <div className="popup-content-container">
                    <div className="inner-link-container">
                        <Button className="copy-btn" onClick={handleCopyToClipboard} type="button">Copy</Button>
                        <InputText className="link-input" value={downloadLink}/>
                        <InputText disabled={true} className="link-time" value={`Expires in ${linkTime} minute${(+linkTime > 1 ? 's' : '')}`}/>
                    </div>
                </div>
            </Popup>
        </div>
    );
}

export default FileTable;
                 