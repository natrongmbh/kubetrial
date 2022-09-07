import { ArchiveIcon, CalendarIcon, CheckCircleIcon, CodeIcon, DocumentIcon, DocumentTextIcon, ExternalLinkIcon, InformationCircleIcon, LinkIcon, XCircleIcon } from "@heroicons/react/outline";
import { DotsVerticalIcon } from "@heroicons/react/solid"
import { useState } from "react";
import { classNames } from "../../lib/design"
import SlideOver from "../general/SlideOver";
import TrialListItemDetails from "./TrialListItemDetails";

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

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <SlideOver
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title={trial.name}
            >
                <TrialListItemDetails trial={trial} setIsOpen={setIsOpen} />
            </SlideOver>
            <div
                className={classNames(
                    trial.bg_color,
                    'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md'
                )}
            >
                <div
                    className="bg-white rounded-full flex items-center justify-center w-10 h-10 text-gray-400 relative group cursor-pointer"
                >

                    <div
                        className={classNames(
                            trial.status === 'deployed' ? 'bg-green-500' : 'bg-red-500',
                            "text-sm font-medium font-GilroyMedium text-white rounded-md px-2 absolute py-1 z-20 ",
                            "opacity-0 group-hover:opacity-100",
                            "transition-all duration-300 ease-in-out",
                            "translate-y-0 group-hover:-translate-y-10",
                        )}
                    >
                        <div
                            className={classNames(
                                trial.status === 'deployed' ? 'border-t-green-500' : 'border-t-red-500',
                                "absolute w-0 h-0 translate-x-1/2 translate-y-5 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[15px]"
                            )}
                        />

                        {trial.status}
                    </div>
                    {
                        trial.status === 'deployed' ? (
                            <CheckCircleIcon className="h-5 w-5 text-green-400 inline" aria-hidden="true" />
                        ) : (
                            <XCircleIcon className="h-5 w-5 text-red-400 inline" aria-hidden="true" />
                        )
                    }
                </div>
            </div>
            <div className="flex flex-1 relative items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white">
                <div className="flex-1 truncate px-4 py-2 text-sm">
                    <a href={trial.href} className="font-GilroyMedium text-gray-900 hover:text-gray-600">
                        {trial.name}
                    </a>
                    <p className="text-gray-500">{trial.description}</p>
                    <p className="text-gray-500">{parseDate(trial.CreatedAt)}</p>
                    <p className="text-gray-500 font-GilroyMedium">{trial.app.name}:{trial.app.helm_chart_version}</p>
                    <p className="text-primary">
                        <ExternalLinkIcon className="h-5 w-5 inline" aria-hidden="true" />&nbsp;
                        {Array.from(trial.trial_patch_values).map((patchValue: any, index: number) => (
                            // if patchValue.value contains one or more dots and more than 6 chars it's a url
                            patchValue.value && patchValue.value.includes('.') && patchValue.value.length > 5 ? (
                                // add , but not on last element
                                <a key={index} className="" href={"https://" + patchValue.value} target="_blanc">{patchValue.value}{index < trial.trial_patch_values.length - 1 ? ', ' : ''}</a>
                            ) : null
                        ))}
                    </p>
                </div>
                <div className="flex-shrink-0 pr-2 relative">
                    <button
                        type="button"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white bg-transparent text-primary hover:text-primary-dark"
                        onClick={() => { setIsOpen(true) }}
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