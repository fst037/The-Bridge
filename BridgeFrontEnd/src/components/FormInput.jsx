export const FormInput = ({
  Icon,
  type = "text",
  value,
  placeholder,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="w-full relative flex items-center text-gray-500 focus-within:text-gray-800">
      <Icon className="size-6 absolute ml-2 pointer-events-none" />
      <input
        type={type}
        className="pr-3 pl-10 py-2 w-full border border-gray-400  text-gray-800 focus:border-gray-600 rounded-md outline-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};
