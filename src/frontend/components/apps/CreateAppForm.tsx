import { ArchiveIcon, BookmarkAltIcon, DocumentRemoveIcon, KeyIcon, LinkIcon, PlusIcon, TagIcon, TrashIcon } from "@heroicons/react/outline";
import { useState } from "react";
import Swal from "sweetalert2";
import Api from "../../config/Api";
import { useUserContext } from "../../contexts/userContext";
import { GithubIcon, GitIcon } from "../../lib/Icons";
import { AlertType, DefaultAlert, DefaultAlertMessage } from "../alerts/Alerts";
import Button, { ButtonType } from "../general/Button";
import { Input, FileInput } from "../general/form/Input";
import InputWithLeadingIcon from "../general/form/InputWithLeadingIcon";
import Textarea from "../general/form/Textarea";
import { App } from "./AppsList";

export interface HelmPatchValue {
    [key: string]: string;
}

const CreateAppForm = ({ setIsOpen }: any) => {

    // map of HelmPatchValue
    const [helmPatchValues, setHelmPatchValues] = useState<HelmPatchValue[]>([]);

    const { reload, setReload }: any = useUserContext();

    const [valueName, setValueName] = useState("");
    const [valueString, setValueString] = useState("");

    // get the keys of the map
    const helmPatchValuesKeys = Object.keys(helmPatchValues);

    const [defaultPatchValuesFile, setDefaultPatchValuesFile] = useState<File | null>(null);
    const [defaultPatchValuesString, setDefaultPatchValuesString] = useState("");

    const [additionalKubernetesManifestsFile, setAdditionalKubernetesManifestsFile] = useState<File | null>(null);
    const [additionalKubernetesManifestsString, setAdditionalKubernetesManifestsString] = useState("");

    const [appName, setAppName] = useState("");
    const [appDescription, setAppDescription] = useState("");
    const [appHelmRepositoryUrl, setAppHelmRepositoryUrl] = useState("");
    const [appHelmChartName, setAppHelmChartName] = useState("");
    const [appHelmChartVersion, setAppHelmChartVersion] = useState("");

    const handleSave = () => {
        if (appName === "" || appDescription === "" || appHelmRepositoryUrl === "" || appHelmChartName === "" || appHelmChartVersion === "") {
            DefaultAlert("Please fill in all fields", AlertType.Error);
            return;
        }
        const updatedApp: App = {
            ID: undefined,
            name: appName,
            description: appDescription,
            helm_chart_repository_url: appHelmRepositoryUrl,
            helm_chart_name: appHelmChartName,
            helm_chart_version: appHelmChartVersion,
            helm_chart_patch_values: helmPatchValues,
            default_helm_chart_patch_values: defaultPatchValuesString,
            CreatedAt: "",
            UpdatedAt: "",
            DeletedAt: ""
        }

        Api.post("/apps", updatedApp)
            .then(() => {
                DefaultAlert("App created", AlertType.Success);
                setReload(!reload)
                setIsOpen(false);
            }).catch(() => {
                DefaultAlert("Error creating app", AlertType.Error);
            });
    }

    const handleAddValue = (e: any) => {

        if (valueName.length > 0 && valueString.length > 0) {
            for (let i = 0; i < helmPatchValues.length; i++) {
                if (helmPatchValues[i].name === valueName) {
                    return;
                }
            }
            setHelmPatchValues([...helmPatchValues, { name: valueName, value_string: valueString }]);


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

            <div>
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
            </div>

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
                {
                    Array.isArray(helmPatchValuesKeys) && helmPatchValuesKeys.length > 0 ?
                        helmPatchValuesKeys.map((key: string, index: number) => {
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
                                            {helmPatchValues[index] && helmPatchValues[index].name}
                                        </span>
                                        <br />
                                        <span
                                            className="font-GilroyLight"
                                        >
                                            {helmPatchValues[index] && helmPatchValues[index].value_string}
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
                                                        // remove the value from the array
                                                        const newHelmPatchValues = [...helmPatchValues];
                                                        newHelmPatchValues.splice(index, 1);
                                                        setHelmPatchValues(newHelmPatchValues);
                                                        // remove the key from the array
                                                        const newHelmPatchValuesKeys = [...helmPatchValuesKeys];
                                                        newHelmPatchValuesKeys.splice(index, 1);
                                                        DefaultAlertMessage("Deleted", "Your value has been deleted.", AlertType.Success);
                                                    }
                                                })
                                            }}
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            )

                        }) :
                        <div className="flex justify-center">
                            <p className="text-sm font-GilroyMedium text-gray-500">
                                No values added yet.
                            </p>
                        </div>
                }

            </div>

            <div>
                <h1
                    className="text-xl font-GilroyMedium text-black"
                >
                    Default Patch Values
                </h1>
                <p
                    className="text-sm font-GilroyMedium text-gray-500"
                >
                    These values will owerwrite the values in the chart for each trial.
                </p>



                {
                    defaultPatchValuesString ?
                        // parse string to yaml
                        <div
                            className="bg-gray-200 p-4 rounded-lg shadow-md relative"
                        >
                            <h1 className="text-sm font-GilroyMedium text-primary">
                                Default Patch Values:
                            </h1>
                            <hr className="my-2 border-primary border-dashed rounded full border-2" />
                            <pre
                                className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 bg-gray-200 rounded-lg p-2 overflow-x-scroll"
                            >
                                {defaultPatchValuesString}
                            </pre>
                            <div
                                className="absolute right-3 bottom-1 text-primary "
                            >
                                {defaultPatchValuesFile?.name}
                            </div>
                            <div
                                className="absolute top-0 right-0 bg-red-500 rounded-lg p-2 shadow-lg cursor-pointer hover:px-4 transition-all duration-150 ease-in-out"
                                onClick={() => {
                                    setDefaultPatchValuesString("");
                                    setDefaultPatchValuesFile(null);
                                }}
                            >
                                <DocumentRemoveIcon className="w-5 h-5 text-white" />
                            </div>
                        </div>
                        : (
                            <FileInput
                                inputName="upload-file"
                                onChange={(e: any) => {
                                    const file = e.target.files[0];

                                    // check if the file is a yaml or yml file
                                    if (file.type === "application/x-yaml" || file.type === "text/yaml" || file.type === "text/x-yaml") {
                                        setDefaultPatchValuesFile(file);
                                        const reader = new FileReader();
                                        reader.onload = (e: any) => {
                                            setDefaultPatchValuesString(e.target.result);
                                        }
                                        reader.readAsText(file);

                                        DefaultAlertMessage("Success", "Your file has been parsed.", AlertType.Success);

                                    } else {
                                        DefaultAlertMessage("Error", "Please upload a valid yaml file.", AlertType.Error);
                                        return;
                                    }
                                }}
                            />
                        )
                }


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