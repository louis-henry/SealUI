import Uploader from "../components/FileUpload";
import { SharedDataProvider } from "../utils/SharedDataContext";
import FileTable from "./FileTable";

export default function Home() {
    return (
        <div className="home">
            <SharedDataProvider>
                <Uploader />
                <div className="break-row"></div>
                <FileTable/>
            </SharedDataProvider>
        </div>
    )
  };