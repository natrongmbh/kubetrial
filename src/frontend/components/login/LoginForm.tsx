import { useEffect } from "react";
import { useUserContext } from "../../contexts/userContext"
import { GithubIcon } from "../../lib/Icons";
import getConfig from "next/config";
import Image from "next/image";
import env from "@beam-australia/react-env";
import { classNames } from "../../lib/design";

const { publicRuntimeConfig: config } = getConfig();

const LoginForm = () => {

    const { signInWithGithub}: any = useUserContext();

    const handleGithubLogin = () => {
        window.open(
            `https://github.com/login/oauth/authorize?scope=user&client_id=${config.ENV_GITHUB_CLIENT_ID}&redirect_uri=${config.ENV_GITHUB_REDIRECT_URI}`,
            "_self"
        );
    }

    useEffect(() => {
        const url = window.location.href;
        const code = url.split("?code=")[1];

        if (code) {
            signInWithGithub(code);
        }
    }, [signInWithGithub]);

    return (
        <div
            className="absolute top-1/2 sm:left-1/2 sm:-translate-x-1/2 -translate-y-1/2 sm:w-4/6 w-full bg-opacity-90 sm:bg-gray-50 sm:rounded-lg sm:shadow-lg py-10"
        >
            <div
                className="h-32 w-32 relative m-auto mb-5"
            >
                <Image
                    className="pointer-events-none"
                    src="/images/logo/kubetrial_logo_color.png"
                    alt="KubeTrial Logo"
                    objectFit="contain"
                    layout="fill"
                    priority={true}
                />
            </div>
            <h1 className="text-center text-primary sm:text-5xl text-3xl font-GilroyHeavy">KubeTrial</h1>
            <div
                className="bg-primary text-white w-56 py-2 px-4 m-auto cursor-pointer rounded-lg mt-10 hover:scale-105 transition-all duration-150 ease-in-out"
                onClick={handleGithubLogin}
            >
                <span
                    className="inline"
                >
                    <span>
                        <GithubIcon color="white" width={26} height={26} />
                    </span> Continue with Github
                </span>
            </div>
        </div>
    )
}

export default LoginForm;