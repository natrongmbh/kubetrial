import { ArrowSmDownIcon, ArrowSmRightIcon, ArrowSmUpIcon, BeakerIcon, CodeIcon, CubeIcon, CubeTransparentIcon, TagIcon } from '@heroicons/react/outline'
import { classNames } from '../../lib/design'
import { useEffect, useState } from 'react'
import { useUserContext } from '../../contexts/userContext'
import Api from '../../config/Api'

export interface Stat {
    total_app_count: number;
    app_count_last_30_days: number;
    total_trial_count: number;
    trial_count_last_30_days: number;
}

export interface Stats {
    id: number;
    name: string;
    stat: string;
    icon: any;
    link: string;
    change: string;
    changeType: ChangeType;
}

enum ChangeType {
    Increase = 'increase',
    Decrease = 'decrease',
    None = 'none'
}

const Stats = () => {

    const [statsResponse, setStatsResponse] = useState<Stat>({
        total_app_count: 0,
        app_count_last_30_days: 0,
        total_trial_count: 0,
        trial_count_last_30_days: 0
    })
    const [stats, setStats] = useState<Stats[]>([])
    const [clusterStats, setClusterStats] = useState<Stats[]>([])

    const { reload }: any = useUserContext();

    useEffect(() => {
        (
            async () => {
                try {
                    const { data } = await Api.get('/stats');
                    if (data) {
                        setStatsResponse(data);
                        setStats([
                            {
                                id: 1,
                                name: 'Total Trials (inkl. deleted)',
                                stat: data.total_trial_count.toString(),
                                icon: BeakerIcon,
                                link: '/trials',
                                change: (data.trial_count_last_30_days).toString(),
                                changeType: data.trial_count_last_30_days === 0 ? ChangeType.None : data.trial_count_last_30_days > 0 ? ChangeType.Increase : ChangeType.Decrease
                            },
                            {
                                id: 2,
                                name: 'Total Apps (inkl. deleted)',
                                stat: data.total_app_count.toString(),
                                icon: CodeIcon,
                                link: '/apps',
                                change: (data.app_count_last_30_days).toString(),
                                changeType: data.app_count_last_30_days === 0 ? ChangeType.None : data.app_count_last_30_days > 0 ? ChangeType.Increase : ChangeType.Decrease
                            },
                        ])
                        setClusterStats([
                            {
                                id: 3,
                                name: 'Trial Namespaces',
                                stat: data.trial_namespaces.toString(),
                                icon: CubeTransparentIcon,
                                link: '/trials',
                                change: '0',
                                changeType: ChangeType.None
                            },
                            {
                                id: 4,
                                name: 'Trial Pods',
                                stat: data.trial_pods.toString(),
                                icon: CubeIcon,
                                link: '/trials',
                                change: '0',
                                changeType: ChangeType.None
                            },
                            {
                                id: 5,
                                name: 'Cluster Version',
                                stat: data.cluster_version.toString(),
                                icon: TagIcon,
                                link: '/trials',
                                change: '0',
                                changeType: ChangeType.None
                            }
                        ])
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        )()
    }, [reload]);

    return (
        <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Last 30 days</h3>

            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
                {stats.map((item) => (
                    <a href={item.link} key={item.id} className="relative bg-white hover:bg-gray-50 transition-all duration-150 ease-in-out pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                        <dt>
                            <div className="absolute bg-primary rounded-md p-3">
                                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                            </div>
                            <p className="ml-16 text-sm font-medium text-gray-500 truncate">{item.name}</p>
                        </dt>
                        <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                            <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
                            <p
                                className={classNames(
                                    item.changeType === 'increase' ? 'text-green-600' : item.changeType === 'decrease' ? 'text-red-600' : 'text-gray-500',
                                    'ml-2 flex items-baseline text-sm font-semibold'
                                )}
                            >
                                {item.changeType === 'increase' ? (
                                    <ArrowSmUpIcon className="self-center flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                                ) :
                                    item.changeType === 'decrease' ?
                                        (
                                            <ArrowSmDownIcon className="self-center flex-shrink-0 h-5 w-5 text-red-500" aria-hidden="true" />
                                        ) : (
                                            <ArrowSmRightIcon className="self-center flex-shrink-0 h-5 w-5 text-gray-500" aria-hidden="true" />
                                        )
                                }

                                <span className="sr-only">{item.changeType === 'increase' ? 'Increased' : 'Decreased'} by</span>
                                {item.change}
                            </p>
                        </dd>
                    </a>
                ))}
            </dl>

            <h3 className="text-lg leading-6 mt-5 font-medium text-gray-900">Kubernetes Cluster</h3>

            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-3">
                {clusterStats.map((item) => (
                    <div key={item.id} className="relative bg-white sm:hover:-translate-y-2 transition-all duration-150 ease-in-out pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                        <dt>
                            <div className="absolute bg-primary rounded-md p-3">
                                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                            </div>
                            <p className="ml-16 text-sm font-medium text-gray-500 truncate">{item.name}</p>
                        </dt>
                        <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                            <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
                            <p
                                className={classNames(
                                    item.changeType === 'increase' ? 'text-green-600' : item.changeType === 'decrease' ? 'text-red-600' : 'text-gray-500',
                                    'ml-2 flex items-baseline text-sm font-semibold'
                                )}
                            >
                            </p>
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    )

}

export default Stats;
