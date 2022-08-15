import { useEffect, useState } from 'react';
import Api from '../../config/Api';
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
}

export interface HelmChartPatchValue {
    name: string;
    value: string;
}

const AppsList = () => {

    const [apps, setApps] = useState<App[]>([]);
    
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
    }, []);

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