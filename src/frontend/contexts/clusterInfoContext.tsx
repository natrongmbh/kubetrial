import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useState } from "react";

export const ClusterInfoContext = createContext({});

export const useClusterInfoContext = () => {
    return useContext(ClusterInfoContext);
};

type Props = {
    children: ReactNode;
};

export interface ClusterInfoProps {
    clusterApi: "",
    clusterVersion: "",
    totalNamespaces: number,
    totalPods: number,
}

export const ClusterInfoContextProvider = ({ children }: Props) => {
    const [clusterInfo, setClusterInfo] = useState<ClusterInfoProps>();

    const contextValue = {
        clusterInfo,
        setClusterInfo,
    };

    return (
        <ClusterInfoContext.Provider value={contextValue}>
            {children}
        </ClusterInfoContext.Provider>
    )
}