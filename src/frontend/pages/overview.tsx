import { NextPage } from "next"
import Title from "../components/general/Title";
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

            <Title>
                Dashboard
            </Title>
            <div
                className="grid sm:grid-cols-2 gap-4"
            >
                <div
                    className="sm:max-w-3xl w-full mx-auto col-span-2"
                >
                    <Stats />
                </div>
                <div
                    className="sm:max-w-3xl w-full mx-auto col-span-2"
                >
                    <ClusterInfo />
                </div>
            </div>
        </div>
    )
}

export default Dashboard