import Spinner from "../Spinner/Spinner";

export default function LoadingMap() {
  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-900">
      <Spinner />
    </div>
  );
}
