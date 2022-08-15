import AppListItem from './AppListItem';
import { HelmPatchValue } from './CreateAppForm';

export interface App {
    id: number;
    name: string;
    description: string;
    helmRepositoryUrl: string;
    helmChartName: string;
    helmChartVersion: string;
    helmPatchValues: any;
}

const apps = [
    {
        id: 1,
        name: 'Postgresql',
        description: 'Postgresql is a relational database management system (RDBMS)',
        helmRepositoryUrl: 'https://charts.bitnami.com/bitnami',
        helmChartName: 'postgresql',
        helmChartVersion: '14.5.0',
        helmPatchValues: {
            'Postgres Password': 'global.postgresql.auth.postgresPassword',
            'Postgres User': 'global.postgresql.auth.postgresUser',
            'Postgres Database': 'global.postgresql.auth.postgresDatabase',
        }
    },
    {
        id: 2,
        name: 'Redis',
        description: 'Redis is a key-value store',
        helmRepositoryUrl: 'https://charts.bitnami.com/bitnami',
        helmChartName: 'redis',
        helmChartVersion: '7.0.4',
        helmPatchValues: {
            'Redis Password': 'global.redis.auth.redisPassword',
        }
    },
]

const AppsList = () => {

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
                {apps.map((app: App) => (
                    <li key={app.id}>
                        <AppListItem app={app} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AppsList;