import { ArchiveIcon, BookmarkAltIcon, DocumentRemoveIcon, DocumentTextIcon, KeyIcon, LinkIcon, PlusIcon, TagIcon, TrashIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Api from "../../config/Api";
import { useUserContext } from "../../contexts/userContext";
import { GithubIcon, GitIcon } from "../../lib/Icons";
import { AlertType, DefaultAlert, DefaultAlertMessage } from "../alerts/Alerts";
import Button, { ButtonType } from "../general/Button";
import { FileInput, Input } from "../general/form/Input";
import InputWithLeadingIcon from "../general/form/InputWithLeadingIcon";
import Textarea from "../general/form/Textarea";
import { App } from "./AppsList";
import { HelmPatchValue } from "./CreateAppForm";

const EditAppForm = ({ app, setIsOpen }: any) => {
    // cast app to App type
    let appData: App
    try {
        appData = app as App
    } catch (error) {
        console.log(error)
        appData = {
            ID: -1,
            name: "",
            description: "",
            helm_chart_repository_url: "",
            helm_chart_name: "",
            helm_chart_version: "",
            helm_chart_patch_values: [],
            default_helm_chart_patch_values: "",
            CreatedAt: "",
            UpdatedAt: "",
            DeletedAt: ""
        }
    }

    // only safe name and value for helm patch values
    const safeHelmPatchValues: Array<HelmPatchValue> = Array.from(appData.helm_chart_patch_values).map((helmPatchValue: HelmPatchValue) => {
        return {
            name: helmPatchValue.name,
            value_string: helmPatchValue.value_string,
        }
    }).filter((helmPatchValue: HelmPatchValue) => {
        return helmPatchValue.name !== "" && helmPatchValue.value !== ""
    }).sort((helmPatchValueA: HelmPatchValue, helmPatchValueB: HelmPatchValue) => {
        return helmPatchValueA.name.localeCompare(helmPatchValueB.name)
    })

    const { user, reload, setReload }: any = useUserContext();

    const [helmPatchValues, setHelmPatchValues] = useState(safeHelmPatchValues);

    const [valueName, setValueName] = useState("");
    const [valueString, setValueString] = useState("");

    const [defaultPatchValuesFile, setDefaultPatchValuesFile] = useState<File | null>(null);
    const [defaultPatchValuesString, setDefaultPatchValuesString] = useState(appData.default_helm_chart_patch_values);

    // get the keys of the map
    const helmPatchValuesKeys = Object.keys(helmPatchValues);

    const [appName, setAppName] = useState(appData.name);
    const [appDescription, setAppDescription] = useState(appData.description);
    const [appHelmRepositoryUrl, setAppHelmRepositoryUrl] = useState(appData.helm_chart_repository_url);
    const [appHelmChartName, setAppHelmChartName] = useState(appData.helm_chart_name);
    const [appHelmChartVersion, setAppHelmChartVersion] = useState(appData.helm_chart_version);

    const handleSave = () => {
        if (appName === "" || appDescription === "" || appHelmRepositoryUrl === "" || appHelmChartName === "" || appHelmChartVersion === "") {
            DefaultAlert("Please fill out all fields", AlertType.Error)
        } else {
            const updatedApp: App = {
                ID: appData.ID,
                name: appName,
                description: appDescription,
                helm_chart_repository_url: appHelmRepositoryUrl,
                helm_chart_name: appHelmChartName,
                helm_chart_version: appHelmChartVersion,
                helm_chart_patch_values: helmPatchValues,
                default_helm_chart_patch_values: defaultPatchValuesString,
                CreatedAt: appData.CreatedAt,
                UpdatedAt: appData.UpdatedAt,
                DeletedAt: appData.DeletedAt,
            }

            Api.put(`/apps/${appData.ID}`, updatedApp)
                .then(() => {
                    DefaultAlert("App updated successfully", AlertType.Success)
                    setReload(!reload)
                    setIsOpen(false)
                }).catch(() => {
                    DefaultAlert("Error updating app", AlertType.Error)
                })

        }
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

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4285F4',
        }).then((result) => {
            if (result.value) {

                Api.delete(`/apps/${appData.ID}`)
                    .then(() => {
                        DefaultAlert("App deleted successfully", AlertType.Success)
                        setReload(!reload)
                        setIsOpen(false)
                    }).catch(() => {
                        DefaultAlert("Error deleting app", AlertType.Error)
                    }).finally(() => {
                        setIsOpen(false)
                    })
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

                <div
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 "
                >
                    <InputWithLeadingIcon
                        labelName="Value Name"
                        inputType="text"
                        inputName="value-name"
                        leadingIcon={<DocumentTextIcon className="w-5 h-5" />}
                        placeholder="App Password"
                        onChange={(e: any) => setValueName(e.target.value)}
                        value={valueName}
                    />
                    <InputWithLeadingIcon
                        labelName="Value String"
                        inputType="text"
                        inputName="value-string"
                        leadingIcon={<KeyIcon className="w-5 h-5" />}
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
                            className="bg-gray-200 p-4 rounded-lg shadow-md relative mt-2 "
                        >
                            <h1 className="text-sm font-GilroyMedium text-primary">
                                Default Patch Values:
                            </h1>
                            <hr className="my-2 border-primary border-dashed rounded full border-2" />
                            <pre
                                className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 bg-gray-200 rounded-lg p-2 overflow-x-scroll scrollbar-hide"
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