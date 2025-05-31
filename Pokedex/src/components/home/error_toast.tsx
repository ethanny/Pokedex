interface ErrorToastProps {
  label: string;
}

export default function ErrorToast({ label }: ErrorToastProps) {
  return (
    <div
      className="
        w-[300px]
        p-[10px]
        text-white font-regular text-md
        bg-red-500
        rounded-lg
      "
    >
      <p>{label}</p>
    </div>
  );
}
