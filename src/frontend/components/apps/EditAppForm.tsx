import { ArchiveIcon, LinkIcon, TagIcon, TrashIcon } from "@heroicons/react/outline";
import { useState } from "react";
import Swal from "sweetalert2";
import { GithubIcon, GitIcon } from "../../lib/Icons";
import { AlertType, DefaultAlertMessage } from "../alerts/Alerts";
import Button, { ButtonType } from "../general/Button";
import Input from "../general/form/Input";
import InputWithLeadingIcon from "../general/form/InputWithLeadingIcon";
import Textarea from "../general/form/Textarea";
import { App } from "./AppsList";

const EditAppForm = ({ app, setIsOpen }: any) => {
    // cast app to App type
    let appData: App
    try {
        appData = app as App
    } catch (error) {
        console.log(error)
        appData = {
            id: -1,
            name: "",
            description: "",
            helmRepositoryUrl: "",
            helmChartName: "",
            helmChartVersion: ""
        }
    }

    const [appName, setAppName] = useState(appData.name);
    const [appDescription, setAppDescription] = useState(appData.description);
    const [appHelmRepositoryUrl, setAppHelmRepositoryUrl] = useState(appData.helmRepositoryUrl);
    const [appHelmChartName, setAppHelmChartName] = useState(appData.helmChartName);
    const [appHelmChartVersion, setAppHelmChartVersion] = useState(appData.helmChartVersion);

    const handleSave = () => {
        console.log("save");
    }

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4285F4',
        }).then((result) => {
            if (result.value) {
                DefaultAlertMessage("Deleted", "Your app has been deleted.", AlertType.Success);
                setIsOpen(false);
            }
        })
    }

    return (
        <div
            className="grid grid-cols-1 gap-4 pb-5"
        >
            <Input
                labelName="App Name"
                inputType="text"
                inputName="app-name"
                placeholder="My App"
                onChange={(e: any) => setAppName(e.target.value)}
                value={appName}
            />
            <Textarea
                labelName="Description"
                textareaName="app-description"
                onChange={(e: any) => setAppDescription(e.target.value)}
                value={appDescription}
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
                value={appHelmRepositoryUrl}
                onChange={(e: any) => setAppHelmRepositoryUrl(e.target.value)}
            />
            <InputWithLeadingIcon
                labelName="Chart Name"
                leadingIcon={<ArchiveIcon className="w-5 h-5" />}
                inputName="helm-chart-name"
                placeholder="postgresql"
                value={appHelmChartName}
                onChange={(e: any) => setAppHelmChartName(e.target.value)}
            />
            <InputWithLeadingIcon
                labelName="Chart Version Tag"
                leadingIcon={<TagIcon className="w-5 h-5" />}
                inputName="helm-chart-version"
                placeholder="14.5.0"
                value={appHelmChartVersion}
                onChange={(e: any) => setAppHelmChartVersion(e.target.value)}
            />

            <hr className="border-gray-300" />

            <div
                className=""
            >
                <Button
                    buttonText="Delete"
                    buttonType={ButtonType.Delete}
                    onClick={handleDelete}
                    widthString="float-left"
                />
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

export default EditAppForm;