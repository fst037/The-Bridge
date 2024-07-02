import { Comentarios } from "./Comentarios";
import { Companeros } from "./Companeros";
import { InformacionGeneral } from "./InformacionGeneral";
import { MiPerfil } from "./MiPerfil";
import { SinRatings } from "./SinRatings";

export const Perfil = () => {
  return (
    <div className="flex flex-col gap-4 p-8">
      <h2 className="text-4xl text-gray-400/80">Perfil</h2>
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 pb-12">
        <MiPerfil />
        <SinRatings />
        <InformacionGeneral />
        <Companeros />
        <Comentarios />
      </main>
    </div>
  );
};
