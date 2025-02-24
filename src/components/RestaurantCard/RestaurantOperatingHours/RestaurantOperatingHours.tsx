export default function RestaurantOperatingHours({
  operating_hours,
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
}) {
  return (
    <div className="flex flex-row gap-2 items-center">
      {Object.entries(operating_hours).map(([key, value]) => (
        <div className="group relative" key={key}>
          <span className="group-hover:hidden border border-gray-300 rounded-md px-1 w-10">
            {key.slice(0, 3)}
          </span>
          <span className="hidden group-hover:block text-xs">{value}</span>
        </div>
      ))}
    </div>
  );
}
