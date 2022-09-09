import { AcademicCapIcon, PaperClipIcon, TrashIcon, UsersIcon } from "@heroicons/react/outline"
import { BadgeCheckIcon, CashIcon, ClockIcon, ReceiptRefundIcon } from "@heroicons/react/solid"
import Swal from "sweetalert2"
import Api from "../../config/Api"
import { useUserContext } from "../../contexts/userContext"
import { classNames } from "../../lib/design"
import { AlertType, DefaultAlertMessage } from "../alerts/Alerts"
import Button, { ButtonType } from "../general/Button"

const TrialListItemDetails = ({ trial, setIsOpen }: any) => {

    const parseDate = (date: string) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        const day = d.getDate();
        return `${day}/${month}/${year}`;
    }

    const { setReload, reload }: any = useUserContext();

    const deleteTrial = (trialId: string) => {
        Api.delete("/trials/" + trialId)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    DefaultAlertMessage("success", "Trial deleted successfully", AlertType.Success);
                    if (res.data.error != "") {
                        DefaultAlertMessage("Trial deleted!", res.data.error, AlertType.Warning);
                    }
                }
                setReload(!reload);
                setIsOpen(false);
            })
            .catch((err) => {
                DefaultAlertMessage("error", "Cannot delete trial", AlertType.Error);
                console.log(err);
            })
    }

    return (
        <div className="">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Trial Details</h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Name</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{trial.name}</dd>
                    </div>
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Description</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{trial.description}</dd>
                    </div>
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Creation Date</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{parseDate(trial.CreatedAt)}</dd>
                    </div>
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Status</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{trial.status}</dd>
                    </div>
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Potential URL Values</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {Array.from(trial.trial_patch_values).map((patchValue: any, index: number) => (
                                // if patchValue.value contains one or more dots and more than 6 chars it's a url
                                patchValue.value && patchValue.value.includes('.') && patchValue.value.length > 5 ? (
                                    // add , but not on last element
                                    <span key={index} className="">{patchValue.value}{index < trial.trial_patch_values.length - 1 ? ', ' : ''}</span>
                                ) : (
                                    <span className="italic">*No potential URL found</span>
                                )

                            ))}
                        </dd>
                    </div>
                </dl>
            </div>
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">App Details</h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Name</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{trial.app.name}</dd>
                    </div>
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Description</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{trial.app.description}</dd>
                    </div>
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Helm Chart Name</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{trial.app.helm_chart_name}</dd>
                    </div>
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Helm Chart Repository URL</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{trial.app.helm_chart_repository_url}</dd>
                    </div>
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Helm Chart Version</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{trial.app.helm_chart_version}</dd>
                    </div>
                    {trial.app.default_helm_chart_patch_values ? (
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Default Helm Chart Values</dt>
                            {/* parse default_helm_chart_patch_values to yaml */}
                            <pre className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 bg-gray-200 rounded-lg p-2 overflow-x-scroll scrollbar-hide">
                                {trial.app.default_helm_chart_patch_values}
                            </pre>
                        </div>
                    ) : null
                    }
                </dl>
            </div>
            <hr className="my-4 " />
            <div
                className="px-4 py-5 sm:px-6"
            >
                <Button
                    buttonType={ButtonType.PrimaryOutline}
                    buttonText="Delete Trial"
                    onClick={() => {
                        Swal.fire({
                            title: 'Are you sure?',
                            text: 'You will not be able to recover this trial!',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes, delete it!'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                deleteTrial(trial.ID);
                            }
                        })

                    }}
                    buttonIcon={<TrashIcon className="h-5 w-5" aria-hidden="true" />}
                />
            </div>
        </div>
    )
}

export default TrialListItemDetails