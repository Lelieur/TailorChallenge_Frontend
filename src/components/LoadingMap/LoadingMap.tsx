import Spinner from "../Spinner/Spinner";

interface LoadingMapProps {
  isError: boolean;
}

export default function LoadingMap({ isError }: LoadingMapProps) {
  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-900">
      {!isError ? (
        <Spinner />
      ) : (
        <p>Error al cargar el mapa, refresca la página</p>
      )}
    </div>
  );
}
