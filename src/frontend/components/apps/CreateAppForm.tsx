import { ArchiveIcon, LinkIcon, TagIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { GithubIcon, GitIcon } from "../../lib/Icons";
import { AlertType, DefaultAlertMessage } from "../alerts/Alerts";
import Button, { ButtonType } from "../general/Button";
import Input from "../general/form/Input";
import InputWithLeadingIcon from "../general/form/InputWithLeadingIcon";
import Textarea from "../general/form/Textarea";

const CreateAppForm = ({ setIsOpen }: any) => {

    const [appName, setAppName] = useState("");
    const [appDescription, setAppDescription] = useState("");
    const [appHelmRepositoryUrl, setAppHelmRepositoryUrl] = useState("");
    const [appHelmChartName, setAppHelmChartName] = useState("");
    const [appHelmChartVersion, setAppHelmChartVersion] = useState("");

    const handleSave = () => {
        DefaultAlertMessage("Saved", "Your app has been saved.", AlertType.Success);
        setIsOpen(false);
    }

    return (
        <div
            className="grid grid-cols-1 gap-4 pb-5"
        >
            <Input
                labelName="App Name"
                inputType="text"
                inputName="app-name"
                placeholder="My Test App"
                onChange={(e: any) => setAppName(e.target.value)}
            />
            <Textarea
                labelName="Description"
                textareaName="app-description"
                onChange={(e: any) => setAppDescription(e.target.value)}
            />
            <hr className="border-gray-300" />
            <h1
                className="text-2xl font-GilroyMedium text-gray-700"
            >
                HELM
            </h1>
            <InputWithLeadingIcon
                labelName="Repository URL"
                leadingIcon={<LinkIcon className="w-5 h-5" />}
                inputName="helm-chart-url"
                placeholder="https://charts.bitnami.com/bitnami"
                onChange={(e: any) => setAppHelmRepositoryUrl(e.target.value)}
            />
            <InputWithLeadingIcon
                labelName="Chart Name"
                leadingIcon={<ArchiveIcon className="w-5 h-5" />}
                inputName="helm-chart-name"
                placeholder="postgresql"
                onChange={(e: any) => setAppHelmChartName(e.target.value)}
            />
            <InputWithLeadingIcon
                labelName="Chart Version Tag"
                leadingIcon={<TagIcon className="w-5 h-5" />}
                inputName="helm-chart-version"
                placeholder="14.5.0"
                onChange={(e: any) => setAppHelmChartVersion(e.target.value)}
            />

            <hr className="border-gray-300" />

            <div
                className=""
            >
                <Button
                    buttonText="Save"
                    buttonType={ButtonType.Primary}
                    onClick={handleSave}
                    widthString="float-right"
                />
            </div>
        </div>
    );
}

export default CreateAppForm;