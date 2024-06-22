import { AddActionButton } from "../components/AddActionButton";

export const Equipos = () => {
  return (
    <div className="p-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-4xl text-gray-400/80">Equipos</h2>
        <AddActionButton text={"Nuevo +"} className="w-max" />
      </div>
      <main className="flex flex-col gap-2"></main>
    </div>
  );
};
