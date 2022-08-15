const Textarea = ({ labelName, textareaName, onChange, value }: any) => {
    return (
        <div>
            <label htmlFor="comment" className="block text-sm font-GilroyMedium text-gray-700">
                {labelName}
            </label>
            <div className="mt-1">
                <textarea
                    rows={4}
                    name={textareaName}
                    id={textareaName}
                    className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                    defaultValue={value}
                    onChange={onChange}
                />
            </div>
        </div>
    )
}

export default Textarea;