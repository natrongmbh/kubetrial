import { useEffect, useState } from 'react';
import Api from '../../config/Api';
import { useUserContext } from '../../contexts/userContext';
import AppListItem from './AppListItem';
import { HelmPatchValue } from './CreateAppForm';

export interface App {
    ID: number | undefined;
    name: string;
    description: string;
    helm_chart_repository_url: string;
    helm_chart_name: string;
    helm_chart_version: string;
    helm_chart_patch_values: HelmPatchValue[];
    default_helm_chart_patch_values: string;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
}

export interface DefaultPatchValue {
    ID: number | undefined;
    value: string | undefined;
    helm_chart_patch_value_id: number;
    CreatedAt: string | undefined;
    UpdatedAt: string | undefined;
    DeletedAt: string | undefined;
}

const AppsList = () => {

    const [apps, setApps] = useState<App[]>([]);

    const { reload }: any = useUserContext();

    useEffect(() => {
        (
            async () => {
                try {
                    const { data } = await Api.get('/apps');
                    if (data) {
                        setApps(data);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        )()
    }, [reload]);

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
                {apps.map((app: App) => (
                    <li key={app.ID}>
                        <AppListItem app={app} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AppsList;
