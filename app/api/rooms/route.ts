import { NextRequest, NextResponse } from 'next/server';
import {db} from "@/lib/db";
import {Room, RoomType, Wishlist} from "@prisma/client";
import {z} from "zod";

type RoomWithLove = Room & {
    love?: boolean;
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") as RoomType;
    const email = searchParams.get("email");

    const isCategoryExists = z.nativeEnum(RoomType).safeParse(category);

    let rooms: Room[];
    if(isCategoryExists.success) {
        rooms = await db.room.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: search,
                            mode: "insensitive"
                        }
                    },
                    {
                        description: {
                            contains: search,
                            mode: "insensitive"
                        }
                    }
                ],
                room_type: {
                    equals: category
                }
            },
        });
    } else {
        rooms = await db.room.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: search,
                            mode: "insensitive"
                        }
                    },
                    {
                        description: {
                            contains: search,
                            mode: "insensitive"
                        }
                    }
                ]
            }
        });
    }

    let wishlist: Wishlist[] = [];
    if(!!email) {
        wishlist = await db.wishlist.findMany({
            where: {
                user: {
                    email
                }
            }
        });
    }

    let roomsWithLove: RoomWithLove[] = rooms.map(room => {
        const isLoved = wishlist.some(wish => wish.roomId === room.id);
        return {
            ...room,
            love: isLoved
        }
    });

    return NextResponse.json(roomsWithLove);
}

export async function POST(request: NextRequest) {
    const data = await request.json();
    const { name, listing_url, xl_picture_url, medium_url, room_type, smart_location, guests_included, bedrooms, beds, bathrooms, review_scores_rating, number_of_reviews, host_picture_url, host_name, host_since, description, price, latitude, longitude } = data;

    const room = await db.room.create({
        data: {
            name,
            listing_url,
            xl_picture_url,
            medium_url,
            room_type,
            smart_location,
            guests_included,
            bedrooms,
            beds,
            bathrooms,
            review_scores_rating,
            number_of_reviews,
            host_picture_url,
            host_name,
            host_since,
            description,
            price,
            latitude,
            longitude
        }
    });

    return NextResponse.json({
        message: "Room created successfully",
        room
    });
}
