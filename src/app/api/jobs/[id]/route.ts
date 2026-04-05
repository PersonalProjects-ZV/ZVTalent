import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Job from "@/models/Job";

// GET single job
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;
  const job = await Job.findById(id);
  if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });
  return NextResponse.json(job);
}

// PUT update job
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;
  const body = await req.json();
  const job = await Job.findByIdAndUpdate(id, body, { new: true });
  if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });
  return NextResponse.json(job);
}

// DELETE job
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;
  await Job.findByIdAndDelete(id);
  return NextResponse.json({ message: "Job deleted" });
}
