import { useEffect, useState } from "react";
import Api from "../../config/Api";
import { useUserContext } from "../../contexts/userContext";
import { App } from "../apps/AppsList";
import TrialListItem from "./TrialListItem";

export interface Trial {
    ID: number | undefined;
    name: string;
    description: string;
    app: App;
    trial_patch_values: TrialPatchValue[];
    bg_color: string;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
}

export interface TrialPatchValue {
    ID: number | undefined;
    value: string | undefined;
    helm_chart_patch_value_id: number;
    CreatedAt: string | undefined;
    UpdatedAt: string | undefined;
    DeletedAt: string | undefined;
}

const TrialsList = () => {
    const [trials, setTrials] = useState<Trial[]>([]);

    const { reload }: any = useUserContext();

    useEffect(() => {
        (
            async () => {
                try {
                    const { data } = await Api.get('/trials');
                    if (data) {
                        setTrials(data);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        )()
    }, [reload]);

    return (
        <div>
            <h2 className="text-sm font-medium text-gray-500">Active Trials ({trials.length})</h2>
            <ul role="list" className="mt-3 flex sm:flex-wrap sm:flex-row flex-col  gap-4">
                {trials.map((trial: Trial) => (
                    <li key={trial.ID} className="col-span-1 flex rounded-md shadow-sm">
                        <TrialListItem trial={trial} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TrialsList;