export default function RestaurantOperatingHours({
  operating_hours,
  size,
}: {
  operating_hours: {
    Monday: string;
    Tuesday: string;
    Wednesday: string;
    Thursday: string;
    Friday: string;
    Saturday: string;
    Sunday: string;
  };
  size?: "small" | "large";
}) {
  return (
    <div className="flex flex-row gap-1">
      {size === "small" &&
        Object.entries(operating_hours).map(([key, value]) => (
          <div className="group relative " key={key}>
            <span className="group-hover:hidden border border-gray-300 rounded-md px-1 w-10 text-xs xl:text-sm">
              {key.slice(0, 3)}
            </span>
            <span className="hidden group-hover:block text-xs">{value}</span>
          </div>
        ))}

      {size === "large" &&
        Object.entries(operating_hours).map(([key, value]) => (
          <div key={key} className="mr-5 text-xs xl:text-sm">
            <p className="font-bold">{key}</p>
            <p>{value.split("-")[0]}</p>
            <p>{value.split("-")[1]}</p>
          </div>
        ))}
    </div>
  );
}
