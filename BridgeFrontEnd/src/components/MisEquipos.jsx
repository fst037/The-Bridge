import { InfoCard } from "./InfoCard";

export const MisEquipos = () => {
  return (
    <section>
      <div className="mt-2">
        <div className="flex space-x-2 my-4">
          <h3 className="text-3xl">Mis Equipos</h3>
          <button className="bg-[#00BCC6] hover:bg-[#01AAB3] active:bg-[#009CA4] px-4 py-1 rounded-sm text-xl text-white transition">
            Nuevo +
          </button>
        </div>
        <article className="grid grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] gap-4 my-4">
          <InfoCard />
        </article>
      </div>
    </section>
  );
};
