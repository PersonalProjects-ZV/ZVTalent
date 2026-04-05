import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Application from "@/models/Application";

// GET single application
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;
  const application = await Application.findById(id).populate("jobId");
  if (!application)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(application);
}

// DELETE application
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;
  await Application.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}

// PATCH - update status
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;
  const body = await req.json();
  const application = await Application.findByIdAndUpdate(id, body, {
    new: true,
  });
  if (!application)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(application);
}
