import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const { id, name, email, image } = await req.json();

    if (!id || !name || !email || !image) {
      return Response.json({
        success: false,
        message: "Required parameter not provided",
      });
    }

    const newUser = await prisma.user.create({
      data: { id, name, email, image },
    });

    if (!newUser) {
      return Response.json({
        success: false,
        message: "User was not created",
      });
    }

    return Response.json({
      message: "User created successfully",
      success: true,
      newUser,
    });
  } catch (error) {
    console.error("Prisma error:", error);
    return Response.json({
      success: false,
      message: "Database error occurred",
    });
  }
}
