"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string[];
  team: string;
  vacancies: number;
  workingHours: string;
  requirements: string[];
}

function DetailSkeleton() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="h-4 bg-gray-100 rounded w-24 animate-pulse" />
        <div className="mt-6 sm:mt-8 flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="flex-1 space-y-6 animate-pulse">
            <div className="h-8 sm:h-10 bg-gray-200 rounded w-2/3" />
            <div className="space-y-3 mt-8">
              <div className="h-5 bg-gray-100 rounded w-32" />
              <div className="h-4 bg-gray-100 rounded w-full" />
              <div className="h-4 bg-gray-100 rounded w-full" />
              <div className="h-4 bg-gray-100 rounded w-3/4" />
            </div>
            <div className="space-y-3 mt-8">
              <div className="h-5 bg-gray-100 rounded w-32" />
              <div className="h-4 bg-gray-100 rounded w-2/3" />
              <div className="h-4 bg-gray-100 rounded w-1/2" />
              <div className="h-4 bg-gray-100 rounded w-3/5" />
            </div>
          </div>
          <aside className="lg:w-80 shrink-0 animate-pulse">
            <div className="h-14 bg-gray-200 rounded-lg w-full" />
            <div className="border border-gray-200 rounded-lg p-6 space-y-5 mt-6">
              <div className="h-8 bg-gray-100 rounded w-12" />
              <div className="h-4 bg-gray-100 rounded w-24" />
              <div className="h-4 bg-gray-100 rounded w-20" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/jobs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setJob(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <DetailSkeleton />;

  if (!job) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          Job not found
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          href="/"
          className="text-sm text-gray-400 hover:text-black transition-colors"
        >
          &larr; Back to Jobs
        </Link>

        <div className="mt-6 sm:mt-8 flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Apply Button - Mobile Only */}
          <div className="lg:hidden">
            <Link
              href={`/jobs/${id}/apply`}
              className="block w-full text-center bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Apply Now
            </Link>
          </div>

          {/* Job Info */}
          <div className="flex-1">
            <h1 className="text-2xl sm:text-4xl font-bold">{job.title}</h1>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Job Overview</h2>
              <p className="text-gray-600 leading-relaxed">{job.description}</p>
            </div>

            {job.requirements.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                <ul className="space-y-2">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-black rounded-full shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80 shrink-0">
            <div className="lg:sticky lg:top-24 space-y-6">
              <Link
                href={`/jobs/${id}/apply`}
                className="hidden lg:block w-full text-center bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Apply Now
              </Link>

              <div className="border border-gray-200 rounded-lg p-4 sm:p-6 space-y-4 sm:space-y-5">
                <div>
                  <p className="text-3xl font-bold">{job.vacancies}</p>
                  <p className="text-sm text-gray-400">Number of Vacancies</p>
                </div>
                <div className="border-t border-gray-100 pt-5">
                  <p className="text-lg font-semibold">{job.workingHours}</p>
                  <p className="text-sm text-gray-400">Working Hours</p>
                </div>
                <div className="border-t border-gray-100 pt-5">
                  <p className="text-lg font-semibold">
                    {job.location.join(", ")}
                  </p>
                  <p className="text-sm text-gray-400">Location</p>
                </div>
                <div className="border-t border-gray-100 pt-5">
                  <span className="text-xs font-medium bg-black text-white px-3 py-1 rounded-full">
                    {job.team}
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
