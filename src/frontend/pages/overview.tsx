import { NextPage } from "next"
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
                    className="w-full"
                >
                </div>
            </div>
        </div>
    )
}

export default Dashboard