import { LoaderIcon } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full h-full justify-center items-center flex flex-col">
      <LoaderIcon className="size-5 animate-spin" />
    </div>
  );
}
