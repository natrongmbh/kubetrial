const InputWithLeadingIcon = ({ leadingIcon, labelName, inputType, inputName, placeholder, onChange, value }: any) => {
    return (
        <div>
            <label htmlFor="email" className="block text-sm font-GilroyMedium text-gray-700">
                {labelName}
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {leadingIcon}
                </div>
                <input
                    type={inputType || "text"}
                    name={inputName}
                    id={inputName}
                    className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                />
            </div>
        </div>
    )
}

export default InputWithLeadingIcon;
