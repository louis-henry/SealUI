import { useEffect, useState } from "react";
import { FileService } from "../services/FileService";

export default function ExternalDownload() {
    const [guid, setGuid] = useState('');
    const [msg, setMsg] = useState('Fetching...');
    const fileService = new FileService();

    useEffect(() => {
        const url = window.location.href;
        const guid = url.substring(url.lastIndexOf('/')).replace('/', '');
        if (guid) {
            setGuid(guid);
        }

        fileService.downloadViaLink(guid).then(response => {
            if (response.length <= 0) {
                setMsg('This link does not exist (or has expired)');
                return;
            }
            setMsg('Downloading...');
            if (!fileService.triggerDownload(response, guid)) {
                throw new Error();
            }
            setTimeout(()=> setMsg('Done'), 3000);
        }).catch((error) => {
            setMsg('Error: could not download file');
        });
      }, []);
       
    return (
        <div className="external-download">
            <div className="text-box">
                <h2>{msg}</h2>
            </div>
        </div>
    )
  };