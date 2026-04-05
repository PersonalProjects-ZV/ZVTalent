import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Job from "@/models/Job";

// GET all jobs
export async function GET() {
  await dbConnect();
  const jobs = await Job.find({ status: "active" }).sort({ createdAt: -1 });
  return NextResponse.json(jobs);
}

// POST create job
export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  const job = await Job.create(body);
  return NextResponse.json(job, { status: 201 });
}
