import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUserContext } from "../contexts/userContext";

const Logout = () => {
    const router = useRouter();
    const { logoutUser }: any = useUserContext();
    useEffect(() => {
        logoutUser();
        router.push("/");
    } , [logoutUser, router]);
    return <></>;
}

export default Logout;
