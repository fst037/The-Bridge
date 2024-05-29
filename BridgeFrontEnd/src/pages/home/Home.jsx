import Imagen1 from '../../assets/Imagen1.svg'
import { Header } from "../../components/Header"

export const Home = () => {
	return (
		<div className="h-screen w-full">
			<Header />
			<article className="flex flex-col h-auto md:flex-row">
				<img src={Imagen1} className="w-[100%] md:w-[45%]" />
				<div className="flex flex-col bg-primary p-4 md:justify-center">
					<h3 className="mb-24 pb-2 text-center text-5xl font-bold text-white">Encuentra tu match universitario</h3>
					<p className="text-black/90 md:text-2xl">Encuentra a tu squad universitario ideal! Nuestra app conecta a estudiantes con perfiles diversos para armar equipos de estudio que brillen en todas las habilidades. Desde liderazgo hasta creatividad, ¡Aquí todos tienen su lugar para triunfar juntos! </p>
				</div>
			</article>
			<footer className="flex flex-col items-center w-full py-4">
				<h2 className="pb-2 text-center font-bold md:text-xl">¿Primera vez en Brigde?</h2>
				<h4 className="text-center font-semibold md:text-xl">¡Regístrate y transforma tu experiencia universitaria hoy!</h4>
				<button className="mt-6 rounded-md bg-button2 px-4 py-2 font-semibold text-white transition-all hover:bg-button2/80">Regístrate</button>
			</footer>
		</div>
	)
}
