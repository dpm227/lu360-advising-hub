import { NextResponse } from "next/server";
import {
  AdvisorForbiddenError,
  assertAdvisorCanViewStudent,
  getAdvisorApiAccess,
} from "@/lib/advisor-access";

type RouteContext = {
  params: Promise<{ studentId: string }>;
};

export async function GET(
  _request: Request,
  context: RouteContext,
) {
  const access = await getAdvisorApiAccess();

  if (!access) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
    );
  }

  const { studentId } = await context.params;

  try {
    await assertAdvisorCanViewStudent(access, studentId);

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof AdvisorForbiddenError) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 },
      );
    }

    throw error;
  }
}