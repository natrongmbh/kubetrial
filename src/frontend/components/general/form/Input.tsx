import { CodeIcon, DocumentAddIcon } from "@heroicons/react/outline"

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

const FileInput = ({ inputName, onChange }: any) => {
    return (
        <div className="flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 relative">
            <div className="text-sm text-gray-600">
                <label htmlFor={inputName} className="transition-all duration-150 ease-in-out absolute -top-0.5 -right-0.5 bg-gradient-to-tr from-primary to-primary-dark cursor-pointer rounded-lg p-2 hover:px-4 font-medium text-white hover:text-gray-200">
                    <DocumentAddIcon className="h-5 w-5 inline" aria-hidden="true" />
                    <input
                        id={inputName}
                        name={inputName}
                        type="file"
                        className="sr-only"
                        onChange={onChange}
                    />
                </label>
                <p className="">Upload a file</p>
                <p className="text-primary">YAML, YML up to 1MB</p>
            </div>
        </div>
    )
}

export { Input, FileInput }