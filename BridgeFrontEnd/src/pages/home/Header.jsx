import LogoBridge from "../../assets/LogoBridge.svg";
import Bridge from "../../assets/Bridge.svg";

export const Header = () => {
  return (
    <header className="flex flex-col md:flex-row md:justify-between items-center p-2 h-auto w-full bg-secondary">
      <div className="flex items-center space-x-4">
        <img src={LogoBridge} className="h-20" alt="The Bridge logo" />
        <img src={Bridge} alt="Bridge" className="w-40" />
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0 items-center text-[#FAFAFA]">
        <a className="text-2xl font-bold hover:underline transition">Inicio</a>
        <a className="text-2xl font-bold hover:underline transition">
          Sobre nosotros
        </a>
        <button className="rounded-md bg-button2 px-4 py-2 hover:bg-button2/80 transition-all">
          Registrate
        </button>
        <button className="rounded-md bg-button1 px-4 py-2 hover:bg-button1/80 transition-all">
          Inicia Sesion
        </button>
      </div>
    </header>
  );
};
