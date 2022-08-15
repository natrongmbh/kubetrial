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

export default Input;