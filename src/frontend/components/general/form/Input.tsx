import { CodeIcon } from "@heroicons/react/outline"

const Input = ({ labelName, inputType, inputName, placeholder, onChange, value }: any) => {
    return (
        <div>
            <label htmlFor="email" className="block text-sm font-GilroyMedium text-gray-700">
                {labelName}
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <input
                    type={inputType || "text"}
                    name={inputName}
                    id={inputName}
                    className="focus:ring-primary focus:border-primary block w-full pl-3 sm:text-sm border-gray-300 rounded-md"
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                />
            </div>
        </div>
    )
}

const FileInput = ({ inputName, onChange, value }: any) => {
    return (
        <div className="sm:items-start sm:gap-4 sm:pt-5">
            <div className="mt-1 sm:col-span-2 sm:mt-0">
                <div className="flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                    <div className="space-y-1 text-center">
                        <CodeIcon className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
                        <div className="flex text-sm text-gray-600">
                            <label htmlFor={inputName} className="relative cursor-pointer rounded-md bg-white font-medium text-primary hover:text-primary-dark">
                                <span>Upload a file</span>
                                <input
                                    id={inputName}
                                    name={inputName}
                                    type="file"
                                    className="sr-only"
                                    onChange={onChange}
                                />
                            </label>
                        </div>
                        <p className="text-xs text-gray-500">YAML, YML up to 1MB</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Input, FileInput }