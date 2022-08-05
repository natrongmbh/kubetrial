import { ArrowSmDownIcon, ArrowSmUpIcon, BeakerIcon, CodeIcon } from '@heroicons/react/solid'
import { CursorClickIcon, MailOpenIcon, UsersIcon } from '@heroicons/react/outline'
import { classNames } from '../../lib/design'

const stats = [
    { id: 1, name: 'Total Trials', stat: '71', icon: BeakerIcon, change: '10', changeType: 'increase' },
    { id: 2, name: 'Total Apps', stat: '2', icon: CodeIcon, change: '1', changeType: 'increase' },
    { id: 3, name: 'Total Sold', stat: '20', icon: CursorClickIcon, change: '2', changeType: 'increase' },
]

const Stats = () => {

    return (
        <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Last 30 days</h3>

            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((item) => (
                    <div
                        key={item.id}
                        className="relative bg-white pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
                    >
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
                                    item.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                                    'ml-2 flex items-baseline text-sm font-semibold'
                                )}
                            >
                                {item.changeType === 'increase' ? (
                                    <ArrowSmUpIcon className="self-center flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                                ) : (
                                    <ArrowSmDownIcon className="self-center flex-shrink-0 h-5 w-5 text-red-500" aria-hidden="true" />
                                )}

                                <span className="sr-only">{item.changeType === 'increase' ? 'Increased' : 'Decreased'} by</span>
                                {item.change}
                            </p>
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    )

}

export default Stats;