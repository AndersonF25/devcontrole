import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
  return (
    <div className="w-max-screen h-max-screen flex items-center justify-center animate-spin">
      <div>
        <AiOutlineLoading3Quarters />
      </div>
    </div>
  );
}
