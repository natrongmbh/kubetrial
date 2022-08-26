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
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
}

export interface HelmChartPatchValue {
    ID: number | undefined;
    name: string;
    value_string: string;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
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