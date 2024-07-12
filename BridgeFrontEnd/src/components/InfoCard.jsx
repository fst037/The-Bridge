export const InfoCard = ({
  title = "Nombre",
  information = ["informacion"],
  className
}) => {
  return (
    <div className={`border border-black p-2 rounded-lg ${className}`}>
      <h4 className="font-semibold">{title}</h4>
      <ul className="flex flex-row sm:flex-col justify-between">
        {information.map((info) => (
          <li className="text-gray-600/50" key={info}>
            {info}
          </li>
        ))}
      </ul>
    </div>
  );
};
