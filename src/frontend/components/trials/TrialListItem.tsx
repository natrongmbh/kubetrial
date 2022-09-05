import { InformationCircleIcon } from "@heroicons/react/outline";
import { DotsVerticalIcon } from "@heroicons/react/solid"
import { classNames } from "../../lib/design"

const TrialListItem = ({ trial }: any) => {

    const getInitials = (name: string) => {
        const names = name.split(" ");
        let initials = names[0].substring(0, 2).toUpperCase();
        return initials;
    }

    const parseDate = (date: string) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        const day = d.getDate();
        return `${day}/${month}/${year}`;
    }

    return (
        <>
            <div
                className={classNames(
                    trial.bg_color,
                    'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md'
                )}
            >
                {getInitials(trial.name)}
            </div>
            <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white">
                <div className="flex-1 truncate px-4 py-2 text-sm">
                    <a href={trial.href} className="font-GilroyMedium text-gray-900 hover:text-gray-600">
                        {trial.name}
                    </a>
                    <p className="text-gray-500">{trial.description}</p>
                    <p className="text-primary">{parseDate(trial.CreatedAt)}</p>
                </div>
                <div className="flex-shrink-0 pr-2">
                    <button
                        type="button"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white bg-transparent text-gray-400 hover:text-gray-500"
                    >
                        <span className="sr-only">Open options</span>
                        <InformationCircleIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </>
    )
}

export default TrialListItem