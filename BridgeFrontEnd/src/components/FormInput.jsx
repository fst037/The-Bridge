export const FormInput = ({ Icon, type, value, placeholder, onChange }) => {
  return (
    <div className="w-full relative flex items-center text-gray-500  focus-within:text-gray-800">
      <Icon className="size-6 absolute ml-2 pointer-events-none" />
      <input
        type={type}
        className="pr-3 pl-10 py-2 w-full border border-gray-400 rounded-md outline-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
