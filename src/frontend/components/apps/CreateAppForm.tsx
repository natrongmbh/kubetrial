import { ArchiveIcon, BookmarkAltIcon, KeyIcon, LinkIcon, PlusIcon, TagIcon, TrashIcon } from "@heroicons/react/outline";
import { useState } from "react";
import Swal from "sweetalert2";
import { GithubIcon, GitIcon } from "../../lib/Icons";
import { AlertType, DefaultAlertMessage } from "../alerts/Alerts";
import Button, { ButtonType } from "../general/Button";
import Input from "../general/form/Input";
import InputWithLeadingIcon from "../general/form/InputWithLeadingIcon";
import Textarea from "../general/form/Textarea";

export interface HelmPatchValue {
    [key: string]: string;
}

const CreateAppForm = ({ setIsOpen }: any) => {

    // map of HelmPatchValue
    const [helmPatchValues, setHelmPatchValues] = useState<HelmPatchValue>({});

    const [valueName, setValueName] = useState("");
    const [valueString, setValueString] = useState("");

    // get the keys of the map
    const helmPatchValuesKeys = Object.keys(helmPatchValues);

    const [appName, setAppName] = useState("");
    const [appDescription, setAppDescription] = useState("");
    const [appHelmRepositoryUrl, setAppHelmRepositoryUrl] = useState("");
    const [appHelmChartName, setAppHelmChartName] = useState("");
    const [appHelmChartVersion, setAppHelmChartVersion] = useState("");

    const handleSave = () => {
        DefaultAlertMessage("Saved", "Your app has been saved.", AlertType.Success);
        setIsOpen(false);
    }

    const handleAddValue = (e: any) => {

        if (valueName.length > 0 && valueString.length > 0) {
            setHelmPatchValues({
                ...helmPatchValues,
                [valueName]: valueString,
            });
            setValueName("");
            setValueString("");

            // focus the input field
            document.getElementById("value-name")?.focus();

            DefaultAlertMessage("Added", "Your value has been added.", AlertType.Success);
        } else {
            DefaultAlertMessage("Error", "Please fill in both fields.", AlertType.Error);
        }
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
                className="text-2xl font-GilroyMedium text-black"
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

            <h1
                className="text-xl font-GilroyMedium text-black"
            >
                Patch Values
            </h1>

            <p
                className="text-sm font-GilroyMedium text-gray-500"
            >
                These values will be shown when creating a new trial of this app.
            </p>

            <div
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 "
            >
                <InputWithLeadingIcon
                    labelName="Value Name"
                    inputType="text"
                    inputName="value-name"
                    leadingIcon={<KeyIcon className="w-5 h-5" />}
                    placeholder="App Password"
                    onChange={(e: any) => setValueName(e.target.value)}
                    value={valueName}
                />
                <InputWithLeadingIcon
                    labelName="Value String"
                    inputType="text"
                    inputName="value-string"
                    leadingIcon={<BookmarkAltIcon className="w-5 h-5" />}
                    placeholder="global.auth.password"
                    onChange={(e: any) => setValueString(e.target.value)}
                    value={valueString}
                />
                <div
                    className="flex justify-center"
                >
                    <button
                        className="text-primary hover:text-primary-dark block"
                        onClick={handleAddValue}
                    >
                        <PlusIcon className="w-5 h-5 inline-block" /> Add Value
                    </button>
                </div>
            </div>

            <div
                className="flex sm:flex-wrap sm:flex-row flex-col  gap-4"
            >
                {helmPatchValuesKeys.map((key: string, index: number) => {
                    return (
                        <div
                            key={index}
                            className="relative flex bg-gray-200 w-auto py-2 pl-4 pr-12 rounded-lg shadow-md"
                        >
                            <div
                                className="text-sm"
                            >
                                <span
                                    className="font-GilroyBold"
                                >
                                    {key}
                                </span>
                                <br/>
                                <span
                                    className="font-GilroyLight"
                                >
                                    {helmPatchValues[key]}
                                </span>
                            </div>
                            <div
                                className="absolute right-3"
                            >
                                <button
                                    className="text-red-500 hover:text-red-600"
                                    onClick={() => {

                                        Swal.fire({
                                            title: 'Are you sure?',
                                            text: "You won't be able to revert this!",
                                            icon: 'warning',
                                            showCancelButton: true,
                                            confirmButtonColor: '#4285F4',
                                        }).then((result) => {
                                            if (result.value) {
                                                const newHelmPatchValues = { ...helmPatchValues };
                                                delete newHelmPatchValues[key];
                                                setHelmPatchValues(newHelmPatchValues);
                                                DefaultAlertMessage("Deleted", "Your value has been deleted.", AlertType.Success);
                                            }
                                        })
                                    }}
                                >
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    );
                }
                )}

            </div>

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