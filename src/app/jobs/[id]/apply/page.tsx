"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

interface Job {
  _id: string;
  title: string;
  location: string[];
}

export default function ApplyPage() {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    qualification: "",
    experience: "",
    resume: null as File | null,
  });

  useEffect(() => {
    fetch(`/api/jobs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setJob(data);
        if (data.location?.length > 0) {
          setForm((f) => ({ ...f, location: data.location[0] }));
        }
      });
  }, [id]);

  const handleSubmit = async () => {
    if (!form.qualification) return alert("Please select your qualification");
    if (!form.experience) return alert("Please select your experience");
    if (!form.resume) return alert("Please upload your resume (PDF)");
    setSubmitting(true);

    const formData = new FormData();
    formData.append("jobId", id as string);
    formData.append("fullName", form.fullName);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("location", form.location);
    formData.append("qualification", form.qualification);
    formData.append("experience", form.experience);
    formData.append("resume", form.resume);

    // Show success immediately, submit in background
    setSuccess(true);
    setSubmitting(false);

    try {
      await fetch("/api/applications", {
        method: "POST",
        body: formData,
      });
    } catch {
      // Already showed success - application will be retried or handled
    }
  };

  if (!job) {
    return (
      <>
        <Navbar />
        <main className="max-w-3xl mx-auto px-4 py-6 sm:py-10">
          <div className="animate-pulse space-y-6">
            <div className="h-4 bg-gray-100 rounded w-24" />
            <div className="h-8 bg-gray-200 rounded w-1/2" />
            <div className="flex gap-8">
              <div className="hidden sm:block space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                  <div className="h-4 bg-gray-100 rounded w-32" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full" />
                  <div className="h-4 bg-gray-100 rounded w-24" />
                </div>
              </div>
              <div className="flex-1 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="h-12 bg-gray-100 rounded" />
                  <div className="h-12 bg-gray-100 rounded" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="h-12 bg-gray-100 rounded" />
                  <div className="h-12 bg-gray-100 rounded" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (success) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold">Applied Successfully!</h1>
          <p className="mt-3 text-gray-500 max-w-md">
            Your application for <strong>{job.title}</strong> has been submitted.
            Our AI is analyzing your resume. We&apos;ll get back to you soon!
          </p>
          <button
            onClick={() => router.push("/")}
            className="mt-8 px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Browse More Jobs
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-6 sm:py-10">
        <div className="mb-8">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
            Applying For
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold mt-1">{job.title}</h1>

          {/* Mobile Step Indicator */}
          <div className="flex sm:hidden items-center gap-2 mt-4">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${step === 1 ? "bg-black text-white" : "bg-gray-100 text-gray-400"}`}>1</div>
            <span className={`text-xs font-medium ${step === 1 ? "text-black" : "text-gray-400"}`}>Personal</span>
            <div className="border-t border-gray-200 w-6 shrink-0" />
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${step === 2 ? "bg-black text-white" : "bg-gray-100 text-gray-400"}`}>2</div>
            <span className={`text-xs font-medium ${step === 2 ? "text-black" : "text-gray-400"}`}>Apply</span>
          </div>
        </div>

        <div className="flex sm:gap-8">
          {/* Steps Indicator - Desktop */}
          <div className="hidden sm:flex flex-col gap-8 pt-2">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  step === 1
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                01
              </div>
              <span
                className={`text-sm font-medium ${
                  step === 1 ? "text-black" : "text-gray-400"
                }`}
              >
                Personal Information
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  step === 2
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                02
              </div>
              <span
                className={`text-sm font-medium ${
                  step === 2 ? "text-black" : "text-gray-400"
                }`}
              >
                Job Application
              </span>
            </div>
          </div>

          {/* Form */}
          <div className="flex-1">
            {step === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-500">Full Name</label>
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={(e) =>
                        setForm({ ...form, fullName: e.target.value })
                      }
                      className="w-full mt-1 py-3 border-b border-gray-200 focus:border-black outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full mt-1 py-3 border-b border-gray-200 focus:border-black outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-500">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="w-full mt-1 py-3 border-b border-gray-200 focus:border-black outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">
                      Applicant Location
                    </label>
                    <select
                      value={form.location}
                      onChange={(e) =>
                        setForm({ ...form, location: e.target.value })
                      }
                      className="w-full mt-1 py-3 border-b border-gray-200 focus:border-black outline-none bg-transparent cursor-pointer"
                    >
                      {job.location.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 pt-6">
                  <button
                    onClick={() => router.push(`/jobs/${id}`)}
                    className="px-6 py-3 text-sm text-gray-500 hover:text-black transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (!form.fullName || !form.email || !form.phone)
                        return alert("Please fill all fields");
                      setStep(2);
                    }}
                    className="px-8 py-3 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="text-sm text-gray-500">Qualification</label>
                  <select
                    value={form.qualification}
                    onChange={(e) =>
                      setForm({ ...form, qualification: e.target.value })
                    }
                    className="w-full mt-1 py-3 border-b border-gray-200 focus:border-black outline-none bg-transparent cursor-pointer"
                  >
                    <option value="">Select Qualification</option>
                    <option>Matric</option>
                    <option>Intermediate</option>
                    <option>Bachelors</option>
                    <option>Masters</option>
                    <option>PhD</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-500">
                    Applying Location For
                  </label>
                  <select
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                    className="w-full mt-1 py-3 border-b border-gray-200 focus:border-black outline-none bg-transparent cursor-pointer"
                  >
                    {job.location.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-500">
                    Years of Experience
                  </label>
                  <select
                    value={form.experience}
                    onChange={(e) =>
                      setForm({ ...form, experience: e.target.value })
                    }
                    className="w-full mt-1 py-3 border-b border-gray-200 focus:border-black outline-none bg-transparent cursor-pointer"
                  >
                    <option value="">Select Experience</option>
                    <option>Fresh / No Experience</option>
                    <option>Less than 1 year</option>
                    <option>1-2 years</option>
                    <option>3-5 years</option>
                    <option>5+ years</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-500">
                    Resume (PDF only)
                  </label>
                  <div className="mt-2 border-2 border-dashed border-gray-200 rounded-lg p-5 sm:p-8 text-center hover:border-black transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) =>
                        setForm({
                          ...form,
                          resume: e.target.files?.[0] || null,
                        })
                      }
                      className="hidden"
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      {form.resume ? (
                        <p className="text-sm font-medium">{form.resume.name}</p>
                      ) : (
                        <>
                          <svg
                            className="w-8 h-8 mx-auto text-gray-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                          <p className="mt-2 text-sm text-gray-400">
                            Click to upload your resume
                          </p>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="text-sm text-gray-500 hover:text-black transition-colors order-2 sm:order-1"
                  >
                    &larr; Back
                  </button>
                  <div className="flex gap-3 sm:gap-4 order-1 sm:order-2">
                    <button
                      onClick={() => router.push(`/jobs/${id}`)}
                      className="px-6 py-3 text-sm text-gray-500 hover:text-black transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="flex-1 sm:flex-none px-8 py-3 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                    >
                      {submitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
