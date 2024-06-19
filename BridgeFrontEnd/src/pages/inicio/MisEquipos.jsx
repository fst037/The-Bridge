import { AddActionButton } from "../../components/AddActionButton";
import { InfoCard } from "../../components/InfoCard";

export const MisEquipos = () => {
  return (
    <section>
      <div className="mt-2">
        <div className="flex space-x-2 my-4">
          <h3 className="text-3xl">Mis Equipos</h3>
          <AddActionButton />
        </div>
        <article className="grid grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] gap-4 my-4">
          <InfoCard />
        </article>
      </div>
    </section>
  );
};
