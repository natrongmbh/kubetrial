import { DocumentTextIcon, IdentificationIcon } from "@heroicons/react/outline";
import { useState } from "react";
import Api from "../../config/Api";
import { useUserContext } from "../../contexts/userContext";
import { AlertType, DefaultAlertMessage } from "../alerts/Alerts";
import { App } from "../apps/AppsList";
import Button, { ButtonType } from "../general/Button";
import InputWithLeadingIcon from "../general/form/InputWithLeadingIcon";
import Loading from "../Loading";
import { TrialPatchValue } from "./TrialsList";

const CreateTrialsFormValues = ({ app, setIsOpen }: any) => {

    interface smallTrialPatchValue {
        value: string
        helm_chart_patch_value_id: number
    }

    const [trialPatchValues, setTrialPatchValues] = useState<smallTrialPatchValue[]>([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const { setReload, reload, componentLoading, setComponentLoading }: any = useUserContext();

    const [loading, setLoading] = useState(false);

    // parse app.helm_chart_patch_values to array of HelmPatchValue objects
    let helm_chart_patch_values: any[] = [];
    for (let i = 0; i < app.helm_chart_patch_values.length; i++) {
        helm_chart_patch_values.push({
            ID: app.helm_chart_patch_values[i].ID,
            name: app.helm_chart_patch_values[i].name,
            value: app.helm_chart_patch_values[i].value,
            AppID: app.helm_chart_patch_values[i].AppID,
            CreatedAt: app.helm_chart_patch_values[i].CreatedAt,
            UpdatedAt: app.helm_chart_patch_values[i].UpdatedAt,
            DeletedAt: app.helm_chart_patch_values[i].DeletedAt
        });
    }

    const randomColor = () => {
        const colors = ["bg-red-500", "bg-yellow-500", "bg-green-500", "bg-blue-500", "bg-indigo-500", "bg-purple-500", "bg-pink-500"];
        const random = Math.floor(Math.random() * colors.length);
        return colors[random];
    }

    const handleSave = () => {
        setComponentLoading(true);

        if (name === "" || description === "" || trialPatchValues.length === 0) {
            DefaultAlertMessage("Error", "Please fill out all fields", AlertType.Error);
            setComponentLoading(false);
            return;
        }

        const trial: any = {
            name: name,
            description: description,
            app_id: app.ID,
            trial_patch_values: trialPatchValues,
            bg_color: randomColor()
        }

        Api.post('/trials', trial)
            .then((response) => {
                DefaultAlertMessage("Success", "Trial created successfully", AlertType.Success);
                console.log(response);
            })
            .catch((error) => {
                DefaultAlertMessage("Error", error.response.data.error, AlertType.Error);
                console.log(error);
            }).finally(() => {
                setComponentLoading(false);
                setReload(!reload);
                setIsOpen(false);
            });

    }

    return (
        <div>
            <div className="mt-10">

                <h1 className="text-lg text-gray-900">
                    New Trial
                </h1>

                <InputWithLeadingIcon
                    leadingIcon={<IdentificationIcon className="h-5 w-5" aria-hidden="true" />}
                    labelName="Name"
                    inputName="name"
                    placeholder="Customer Web App Trial"
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                />

                <InputWithLeadingIcon
                    leadingIcon={<DocumentTextIcon className="h-5 w-5" aria-hidden="true" />}
                    labelName="Description"
                    inputName="description"
                    placeholder="Trial for customer web app"
                    value={description}
                    onChange={(e: any) => setDescription(e.target.value)}
                />


                <h1 className="text-lg text-gray-900 mt-5">
                    Set Values
                </h1>

                {
                    helm_chart_patch_values.map((helm_chart_patch_value: any) => (
                        <div key={helm_chart_patch_value.ID}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-GilroyMedium text-gray-700">
                                    {helm_chart_patch_value.name}
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name={helm_chart_patch_value.name}
                                        id={helm_chart_patch_value.name}
                                        className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                                        placeholder={helm_chart_patch_value.value}
                                        onChange={(e: any) => {

                                            // update trialPatchValues array with new value for the app_id
                                            let newTrialPatchValues: smallTrialPatchValue[] = [...trialPatchValues];
                                            let newTrialPatchValue: smallTrialPatchValue = {
                                                value: e.target.value,
                                                helm_chart_patch_value_id: helm_chart_patch_value.ID,
                                            };

                                            // find the matching TrialPatchValue in the array and update it
                                            let index = newTrialPatchValues.findIndex((trialPatchValue: smallTrialPatchValue) => trialPatchValue.helm_chart_patch_value_id === helm_chart_patch_value.ID);
                                            if (index !== -1) {
                                                newTrialPatchValues[index] = newTrialPatchValue;
                                            } else {
                                                newTrialPatchValues.push(newTrialPatchValue)
                                            }
                                            setTrialPatchValues(newTrialPatchValues);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                }

                <hr className="my-5 border-gray-300" />

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
        </div>
    )
}

export default CreateTrialsFormValues;
