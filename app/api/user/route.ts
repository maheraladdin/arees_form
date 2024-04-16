import {NextRequest, NextResponse} from "next/server";
import {db} from "@/lib/db";

export async function POST(request: NextRequest) {
    const body = await request.json();

    if (!body.email) {
        return NextResponse.json({ message: "Email is required" });
    }

    const user = await db.user.findUnique({
        where: {
            email: body.email
        }
    });

    if(user) return NextResponse.json({user, message: "User already exists"});

    const newUser = await db.user.create({
        data: {
            email: body.email
        }
    });

    return NextResponse.json({user: newUser, message: "User created successfully"});
}