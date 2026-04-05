"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import JobCard from "@/components/JobCard";

interface Job {
  _id: string;
  title: string;
  location: string[];
  team: string;
  vacancies: number;
}

function JobCardSkeleton() {
  return (
    <div className="border border-gray-200 rounded-lg p-6 animate-pulse">
      <div className="h-5 bg-gray-200 rounded w-3/4" />
      <div className="mt-3 h-4 bg-gray-100 rounded w-1/2" />
      <div className="mt-4 flex items-center justify-between">
        <div className="h-3 bg-gray-100 rounded w-20" />
        <div className="h-6 bg-gray-200 rounded-full w-16" />
      </div>
    </div>
  );
}

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [teamFilter, setTeamFilter] = useState("All Teams");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const allLocations = [...new Set(jobs.flatMap((j) => j.location))];
  const allTeams = [...new Set(jobs.map((j) => j.team))];

  const filtered = jobs.filter((job) => {
    const matchSearch = job.title.toLowerCase().includes(search.toLowerCase());
    const matchLocation =
      locationFilter === "All Locations" ||
      job.location.includes(locationFilter);
    const matchTeam = teamFilter === "All Teams" || job.team === teamFilter;
    return matchSearch && matchLocation && matchTeam;
  });

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Find Your Next <span className="text-gray-400">Opportunity</span>
          </h1>
          <p className="mt-3 sm:mt-4 text-gray-500 text-base sm:text-lg">
            Browse open positions at ZeroVerticalTalent
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Filters Sidebar */}
          <aside className="lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-24 space-y-4 sm:space-y-6">
              {/* Search */}
              <div>
                <div className="relative">
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Where
                </label>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full mt-2 py-3 border-b border-gray-200 bg-transparent text-sm focus:outline-none focus:border-black cursor-pointer"
                >
                  <option>All Locations</option>
                  {allLocations.map((loc) => (
                    <option key={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Team Filter */}
              <div>
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Team
                </label>
                <select
                  value={teamFilter}
                  onChange={(e) => setTeamFilter(e.target.value)}
                  className="w-full mt-2 py-3 border-b border-gray-200 bg-transparent text-sm focus:outline-none focus:border-black cursor-pointer"
                >
                  <option>All Teams</option>
                  {allTeams.map((team) => (
                    <option key={team}>{team}</option>
                  ))}
                </select>
              </div>
            </div>
          </aside>

          {/* Job Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid md:grid-cols-2 gap-4">
                {[...Array(6)].map((_, i) => (
                  <JobCardSkeleton key={i} />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">No jobs found</p>
                <p className="text-gray-300 text-sm mt-2">
                  Try adjusting your filters
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {filtered.map((job) => (
                  <JobCard key={job._id} {...job} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
