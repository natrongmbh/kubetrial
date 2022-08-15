/* This example requires Tailwind CSS v2.0+ */
import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import { ArchiveIcon, CheckCircleIcon, ChevronRightIcon, LinkIcon, MailIcon, TagIcon } from '@heroicons/react/solid'
import { useState } from 'react';
import SlideOver from '../general/SlideOver';
import AppListItem from './AppListItem';
import CreateAppForm from './CreateAppForm';
import EditAppForm from './EditAppForm';

export interface App {
    id: number;
    name: string;
    description: string;
    helmRepositoryUrl: string;
    helmChartName: string;
    helmChartVersion: string;
}

const apps = [
    {
        id: 1,
        name: 'Postgresql',
        description: 'Postgresql is a relational database management system (RDBMS)',
        helmRepositoryUrl: 'https://charts.bitnami.com/bitnami',
        helmChartName: 'postgresql',
        helmChartVersion: '14.5.0'
    },
    {
        id: 2,
        name: 'Redis',
        description: 'Redis is a key-value store',
        helmRepositoryUrl: 'https://charts.bitnami.com/bitnami',
        helmChartName: 'redis',
        helmChartVersion: '14.5.0'
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