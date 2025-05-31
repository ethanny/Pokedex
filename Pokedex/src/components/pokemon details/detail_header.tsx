interface DetailHeaderProps {
  title: string;
  exp?: number;
  themeColor: any;
}

export default function DetailHeader({
  title,
  themeColor,
  exp,
}: DetailHeaderProps) {
  return (
    <div
      style={{
        backgroundColor: `var(${themeColor.shade})`,
      }}
      className="
        flex flex-row
        w-full
        font-[400] text-white text-[18px] text-start
        rounded-[5px]
        gap-1 skew-x-[-10deg] justify-between
      "
    >
      <p
        className="
          p-[5px] pl-[10px]
          justify-start items-center gap-1
        "
      >
        {title}
      </p>

      {exp && (
        <p
          style={{
            backgroundColor: `var(${themeColor.dark})`,
          }}
          className="
            w-fit
            py-[5px] px-[10px]
            rounded-[5px]
          "
        >
          Base Exp: {exp}
        </p>
      )}
    </div>
  );
}
