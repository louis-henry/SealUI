// SharedDataContext.ts
import React, { createContext, useState } from 'react';
import FileModel from '../models/FileModel';

// Define the type for the shared data and functions
type SharedData = {
  tableFiles: FileModel[];
  setFiles: React.Dispatch<React.SetStateAction<FileModel[]>>;
};

// Set a default value for the context
const defaultValue: SharedData = {
  tableFiles: [],
  setFiles: () => { },
};

const SharedDataContext = createContext<SharedData>(defaultValue);

type SharedDataProviderProps = {
    children: React.ReactNode;
};

// Create a wrapper component that holds the state and provides the context
export const SharedDataProvider: React.FC<SharedDataProviderProps> = ({ children }) => {
    const [tableFiles, setFiles] = useState<FileModel[]>([]);
  
    // Pass the shared data and functions as the value for the context provider
    const contextValue: SharedData = {
      tableFiles,
      setFiles,
    };
  
    return (
      <SharedDataContext.Provider value={contextValue}>
        {children}
      </SharedDataContext.Provider>
    );
  };

export default SharedDataContext;
