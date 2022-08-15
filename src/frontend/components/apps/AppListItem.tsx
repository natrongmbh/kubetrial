import { ArchiveIcon, LinkIcon, PencilAltIcon, PencilIcon, TagIcon, TrashIcon } from "@heroicons/react/solid";
import { useState } from "react";
import SlideOver from "../general/SlideOver";
import { App } from "./AppsList";
import EditAppForm from "./EditAppForm";

const AppListItem = ({ app }: any) => {

    const [isOpen, setIsOpen] = useState(false);

    // cast app to App type
    let appData: App
    try {
        appData = app as App
    } catch (error) {
        console.log(error)
        appData = {
            ID: -1,
            name: "",
            description: "",
            helm_chart_repository_url: "",
            helm_chart_version: "",
            helm_chart_name: "",
            helm_chart_patch_values: [],
        }
    }

    return (
        <div>
            <SlideOver
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title="Edit App"
                description="Change the specs of your app."
            >
                <EditAppForm
                    app={appData}
                    setIsOpen={setIsOpen}
                />
            </SlideOver>
            <div
                className="block hover:bg-gray-50 group transition-all duration-150 ease-in-out cursor-pointer"
                onClick={() => {
                    setIsOpen(true);
                }}
            >
                <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="min-w-0 flex-1 flex items-center">
                        <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 grid-cols-1 md:gap-4">
                            <div>
                                <p className="text-sm font-GilroyMedium text-primary truncate group-hover:text-gray-500 transition-all duration-150 ease-in-out">{appData.name}</p>
                                <p className="mt-2 flex items-center text-sm text-gray-500 group-hover:text-gray-500 transition-all duration-150 ease-in-out">
                                    <LinkIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-black group-hover:text-gray-500 transition-all duration-150 ease-in-out" aria-hidden="true" />
                                    <span className="truncate">{appData.helm_chart_repository_url}</span>
                                </p>
                            </div>
                            <div className="">
                                <div>
                                    <p className="sm:mt-0 mt-2 flex items-center text-sm text-gray-500 group-hover:text-gray-500 transition-all duration-150 ease-in-out">
                                        <ArchiveIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-black group-hover:text-gray-500 transition-all duration-150 ease-in-out" aria-hidden="true" />
                                        {appData.helm_chart_name}
                                    </p>
                                    <p className="mt-2 flex items-center text-sm text-gray-500 group-hover:text-gray-500 transition-all duration-150 ease-in-out">
                                        <TagIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-black group-hover:text-gray-500 transition-all duration-150 ease-in-out" aria-hidden="true" />
                                        {appData.helm_chart_version}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <PencilIcon
                            className="h-5 w-5 text-gray-400 group-hover:text-gray-500 transition-all duration-150 ease-in-out" aria-hidden="true"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppListItem;