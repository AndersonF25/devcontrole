import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center animate-spin">
      <AiOutlineLoading3Quarters />
    </div>
  );
}
