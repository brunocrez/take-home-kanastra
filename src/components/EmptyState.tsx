import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col gap-8 bg-slate-700 rounded-md p-8 w-full items-center">
      <DocumentMagnifyingGlassIcon className="w-24 h-24 text-gray-400" />
      <h2 className="text-center text-gray-200">{message}</h2>
    </div>
  );
}
