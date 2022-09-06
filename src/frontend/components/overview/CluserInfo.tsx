import { useEffect, useState } from "react";
import { useClusterInfoContext } from "../../contexts/clusterInfoContext";
import Skeleton from 'react-loading-skeleton';
import { useUserContext } from "../../contexts/userContext";
import { AlertType, DefaultAlertMessage } from "../alerts/Alerts";
import Api from "../../config/Api";

const ClusterInfo = () => {

    const { clusterInfo, setClusterInfo }: any = useClusterInfoContext();
    const [loadingClusterInfo, setLoadingClusterInfo] = useState(true);
    const { loading, user }: any = useUserContext();

    useEffect(() => {
        (
            async () => {
                if (!loading && user) {
                    try {
                        const { data } = await Api.get("/clusterinfo");
                        if (data) {
                            setClusterInfo(data);
                        }
                        setLoadingClusterInfo(false);
                    } catch (error) {
                        console.log(error);
                        DefaultAlertMessage("Error", "Could not get Clusterinfo", AlertType.Error);
                    }
                }
            }
        )()
    }, [loading, user, setClusterInfo]);

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Cluster Information</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Some details about the Kubernetes Cluster where KubeTrial is deployed in</p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                    {clusterInfo && !loadingClusterInfo
                        ? Object.keys(clusterInfo).map((key: string) => {
                            return (
                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" key={key}>
                                    <dt className="text-sm leading-5 font-medium text-gray-500">{key}</dt>
                                    <dd className="mt-1 text-sm leading-5 text-gray-900">{clusterInfo[key]}</dd>
                                </div>
                            )
                        })
                        : null
                    }
                    {
                        loadingClusterInfo ?
                        <Skeleton />
                        : null
                    }
                </dl>
            </div>
        </div>
    )



}

export default ClusterInfo;