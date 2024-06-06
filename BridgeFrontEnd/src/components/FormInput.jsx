export const FormInput = ({ Icon, type, value, placeholder, onChange }) => {
  return (
    <div className="w-full relative flex items-center text-gray-500 focus-within:text-gray-950">
      <Icon className="size-6 absolute ml-2 pointer-events-none" />
      <input
        type={type}
        className="rounded-md outline-none pr-3 pl-10 py-2 w-full ring-gray-300 focus:ring-gray-800 focus:ring-2"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
