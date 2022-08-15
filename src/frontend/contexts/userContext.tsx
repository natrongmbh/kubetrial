import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { AlertType, DefaultAlert, DefaultAlertMessage } from "../components/alerts/Alerts";
import Cookies from 'js-cookie';
import Api from "../config/Api";

export const UserContext = createContext({});

export interface User {
    ID: number;
    Username: string;
    Name: string;
}

export const useUserContext = () => {
    return useContext(UserContext);
};

type Props = {
    children: ReactNode;
};

export const UserContextProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        async function loadUserFromCookie() {
            const token = Cookies.get('token');
            if (token) {
                try {
                    // @ts-ignore
                    Api.defaults.headers.Authorization = 'Bearer ' + token;
                    const { data: user } = await Api.get('/auth');
                    if (user) {
                        setUser(user);
                    }
                } catch (error) {
                    logoutUser(true);
                    console.log(error);
                }
            } else {
                console.log("No token in cookie");
            }
            setLoading(false);
        }
        loadUserFromCookie();
    }, []);

    const loginUser = async (username: string, password: string, remember: boolean) => {
        const { data: data } = await Api.post('/auth', {
            username,
            password,
        });
        if (data) {
            // @ts-ignore
            Api.defaults.headers.Authorization = 'Bearer ' + data["token"];
            const { data: user} = await Api.get('/auth');
            if (user) {
                setUser(user);
                console.log("Logged in as " + user.username);
            }
        }
        Cookies.set('token', data["token"], { secure: true });
        if (remember) {
            Cookies.set('username', username, { secure: true });
        }
        DefaultAlert("Logged in", AlertType.Success);
    }

    const logoutUser = (noalert: boolean | null) => {
        Cookies.remove('token');
        setUser(null);
        // @ts-ignore
        delete Api.defaults.headers.Authorization;
        setUser(null);
        setError(null);
        if (!noalert) {
            DefaultAlert("Logged out", AlertType.Success);
        }
        router.push("/");
    }

    const contextValue = {
        user,
        loading,
        error,
        loginUser,
        logoutUser
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}