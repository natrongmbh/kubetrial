import { useEffect, useState } from "react";
import Api from "../../config/Api";
import { useUserContext } from "../../contexts/userContext";
import { App } from "../apps/AppsList";
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { classNames } from "../../lib/design";
import CreateTrialsFormValues from "./CreateTrialsFormValues";
import Loading from "../Loading";

const CreateTrialsForm = ({ setIsOpen }: any) => {

    const [apps, setApps] = useState<App[]>([]);
    const [selectedApp, setSelectedApp] = useState<App | undefined>(undefined);

    const { reload, componentLoading }: any = useUserContext();

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
        <div>

            {componentLoading ? <Loading /> : null}

            <h1>Create Trials</h1>
            <Listbox value={selectedApp} onChange={setSelectedApp}>
                {({ open }) => (
                    <>
                        <Listbox.Label className="block text-sm font-GilroyMedium text-gray-700">From App</Listbox.Label>
                        <div className="mt-1 relative">
                            <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm">
                                <span className="block truncate">
                                    {
                                        selectedApp ?
                                        selectedApp.name + " <" + selectedApp.helm_chart_name + ":" + selectedApp.helm_chart_version + ">" :
                                        'Select an app'
                                    }
                                </span>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                            </Listbox.Button>

                            <Transition
                                show={open}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                    {apps.map((app) => (
                                        <Listbox.Option
                                            key={app.ID}
                                            className={({ active }) =>
                                                classNames(
                                                    active ? 'text-white bg-primary' : 'text-gray-900',
                                                    'cursor-pointer select-none relative py-2 pl-3 pr-9'
                                                )
                                            }
                                            value={app}
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <span className={classNames(selectedApp ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                        {app.name + " <" + app.helm_chart_name + ":" + app.helm_chart_version + ">"}
                                                    </span>

                                                    {selected ? (
                                                        <span
                                                            className={classNames(
                                                                active ? 'text-white' : 'text-primary',
                                                                'absolute inset-y-0 right-0 flex items-center pr-4'
                                                            )}
                                                        >
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </>
                )}
            </Listbox>

            {
                selectedApp ? (
                    <CreateTrialsFormValues app={selectedApp} setIsOpen={setIsOpen} />
                ) : null
            }
        </div>
    )
}

export default CreateTrialsForm;
