import { NextPage } from "next"
import ClusterInfo from "../components/overview/CluserInfo";
import Stats from "../components/overview/Stats";
import { User, useUserContext } from "../contexts/userContext"

const Dashboard: NextPage = () => {

    const { user, loading, logoutUser }: any = useUserContext();

    const handleLogout = () => {
        logoutUser();
    }

    return (
        <div
            className="sm:px-20 p-5"
        >

            <div
                className="grid sm:grid-cols-2 gap-4"
            >
                <div
                    className="w-full col-span-2"
                >
                    <Stats />
                </div>
                <div
                    className="w-full col-span-2"
                >
                    <ClusterInfo />
                </div>
            </div>
        </div>
    )
}

export default Dashboard