import { createContext, ReactNode, useContext, useState } from "react";

interface LoadingContextType {
    isLoading: boolean,
    setLoading: (state: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children } : { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);
    
    return (
        <LoadingContext.Provider value={{isLoading, setLoading: setIsLoading}}>
            {children}
        </LoadingContext.Provider>
    );
}

export const useLoading = () => {
    const context = useContext(LoadingContext);

    if(!context){
        throw new Error("Context does not exist for useLoading!");
    }

    return context;
}