import { BeakerIcon, MailIcon, QrcodeIcon } from "@heroicons/react/outline";
import { NextPage } from "next";
import Button, { ButtonType } from "../components/general/Button";
import InputWithLeadingIcon from "../components/general/form/InputWithLeadingIcon";
import Image from 'next/image'
import { useState } from "react";
import { AlertType, DefaultAlert, DefaultAlertMessage } from "../components/alerts/Alerts";
import Api from "../config/Api";

const TrialCode: NextPage = () => {

    const [code, setCode] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (code.length === 6) {
            Api.post('/trialcode', { code })
                .then((res) => {
                    DefaultAlertMessage('Success', 'Trial code successfully created', AlertType.Success);
                })
                .catch((error: any) => {
                    if (error.response.data !== undefined) {
                        DefaultAlertMessage('Error', error.response.data, AlertType.Error);
                    }
                })
        } else {
            DefaultAlertMessage('Error', 'Please enter a valid code', AlertType.Error)
        }
    }

    return (
        <div
            className="h-screen"
        >
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div
                    className="max-w-lg space-y-5 bg-primary rounded-lg shadow-lg p-8 flex justify-center flex-col"
                >
                    <div
                        className=""
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
                        <h2 className="mt-6 text-center text-3xl font-GilroyBold text-white inline">
                            Enter Your Trial Code
                        </h2>
                    </div>
                    <InputWithLeadingIcon
                        leadingIcon={<BeakerIcon className="h-5 w-5 text-gray-400" />}
                        inputType="email"
                        inputName="email"
                        placeholder="A2b3C4 (6 characters)"
                        onChange={(e: any) => setCode(e.target.value)}
                        pattern="[A-Za-z0-9]{6}"
                        min="6"
                        max="6"
                    />
                    <div
                        className="mt-6"
                    >
                        <Button
                            buttonText="Continue"
                            buttonType={ButtonType.Secondary}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    )

}

export default TrialCode
