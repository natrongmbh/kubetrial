import { useState } from "react";
import { App } from "../apps/AppsList";
import { TrialPatchValue } from "./TrialsList";

const CreateTrialsFormValues = ({ app }: any) => {

    const [trialPatchValues, setTrialPatchValues] = useState<TrialPatchValue[]>([]);

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

    return (
        <div>
            <div className="mt-10">
                <h1 className="text-lg text-gray-900">
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
                                            let newTrialPatchValues: TrialPatchValue[] = [...trialPatchValues];
                                            let newTrialPatchValue: TrialPatchValue = {
                                                ID: undefined,
                                                value: e.target.value,
                                                helm_chart_patch_value_id: helm_chart_patch_value.ID,
                                                CreatedAt: undefined,
                                                UpdatedAt: undefined,
                                                DeletedAt: undefined
                                            };

                                            // find the matching TrialPatchValue in the array and update it
                                            for (let i = 0; i < newTrialPatchValues.length; i++) {
                                                if (newTrialPatchValues[i].helm_chart_patch_value_id === helm_chart_patch_value.ID) {
                                                    newTrialPatchValues[i] = newTrialPatchValue;
                                                    break;
                                                }
                                            }
                                            setTrialPatchValues(newTrialPatchValues);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CreateTrialsFormValues;