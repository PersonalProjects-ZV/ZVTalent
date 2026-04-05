import Link from "next/link";

interface JobCardProps {
  _id: string;
  title: string;
  location: string[];
  team: string;
  vacancies: number;
}

export default function JobCard({ _id, title, location, team, vacancies }: JobCardProps) {
  return (
    <Link href={`/jobs/${_id}`}>
      <div className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:border-black transition-all duration-200 cursor-pointer group bg-white h-full">
        <h3 className="text-base sm:text-lg font-semibold group-hover:underline line-clamp-2">{title}</h3>
        <div className="mt-2 sm:mt-3 flex items-center gap-2 text-sm text-gray-500">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate">{location.join(", ")}</span>
        </div>
        <div className="mt-3 sm:mt-4 flex items-center justify-between gap-2">
          <span className="text-xs text-gray-400 shrink-0">{vacancies} vacancies</span>
          <span className="text-xs font-medium bg-black text-white px-3 py-1 rounded-full whitespace-nowrap">
            {team}
          </span>
        </div>
      </div>
    </Link>
  );
}
