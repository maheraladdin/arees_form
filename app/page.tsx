"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RoomType } from '@prisma/client';


const RoomSchema = z.object({
    name: z.string().min(0),
    listing_url: z.string().min(0),
    xl_picture_url: z.string().min(0),
    medium_url: z.string().min(0),
    room_type: z.nativeEnum(RoomType),
    smart_location: z.string().min(0),
    guests_included: z.number().int().positive(),
    bedrooms: z.number().int().positive(),
    beds: z.number().int().positive(),
    bathrooms: z.number().int().positive(),
    review_scores_rating: z.number().int().positive(),
    number_of_reviews: z.number().int().positive(),
    host_picture_url: z.string().min(0),
    host_name: z.string().min(0),
    host_since: z.string().min(0),
    description: z.string().min(0),
    price: z.number().int().positive(),
    latitude: z.string().min(0),
    longitude: z.string().min(0),
});

const RoomForm = () => {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(RoomSchema),
      defaultValues: {
            name: "",
            listing_url: "",
            xl_picture_url: "",
            medium_url: "",
            room_type: RoomType.Private_room,
            smart_location: "",
            guests_included: 0,
            bedrooms: 0,
            beds: 0,
            bathrooms: 0,
            review_scores_rating: 0,
            number_of_reviews: 0,
            host_picture_url: "",
            host_name: "",
            host_since: "",
            description: "",
            price: 0,
            latitude: "",
            longitude: "",
      },
      mode: "onBlur",
  });

  const onSubmit = (data: any) => {
      const formData = data as z.infer<typeof RoomSchema>;
      console.log(formData)
  };

  // rest of your form code

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 container mx-auto py-4">
            <input {...register("name")} placeholder="Name" className="w-full p-2 border border-gray-300 rounded" />
            <input {...register("listing_url")} placeholder="Listing URL" className="w-full p-2 border border-gray-300 rounded" />
            <input {...register("xl_picture_url")} placeholder="XL Picture URL" className="w-full p-2 border border-gray-300 rounded" />
            <input {...register("medium_url")} placeholder="Medium URL" className="w-full p-2 border border-gray-300 rounded" />
            <select {...register("room_type")} className="w-full p-2 border border-gray-300 rounded">
                <option value="" disabled>Room Type</option>
                <option value="Private_room">Private Room</option>
                <option value="Entire_home">Entire Home</option>
                <option value="Shared_room">Shared Room</option>
            </select>
            <input {...register("smart_location")} placeholder="Smart Location" className="w-full p-2 border border-gray-300 rounded" />
            <input {...register("guests_included")} placeholder="Guests Included" className="w-full p-2 border border-gray-300 rounded" />
            <input {...register("bedrooms")} placeholder="Bedrooms" className="w-full p-2 border border-gray-300 rounded" />
            <input {...register("beds")} placeholder="Beds" className="w-full p-2 border border-gray-300 rounded" />
            <input {...register("bathrooms")} placeholder="Bathrooms" className="w-full p-2 border border-gray-300 rounded" />
            <input {...register("review_scores_rating")} placeholder="Review Scores Rating" className="w-full p-2 border border-gray-300 rounded" />
            <input {...register("number_of_reviews")} placeholder="Number of Reviews" className="w-full p-2 border border-gray-300 rounded" />
            <input {...register("host_picture_url")} placeholder="Host Picture URL" className="w-full p-2 border border-gray-300 rounded" />
            <input {...register("host_name")} placeholder="Host Name" className="w-full p-2 border border-gray-300 rounded" />
            <input {...register("host_since")} placeholder="Host Since" className="w-full p-2 border border-gray-300 rounded" />
            <textarea {...register("description")} placeholder="Description" className="w-full p-2 border border-gray-300 rounded" />
            <input {...register("price")} placeholder="Price" className="w-full p-2 border border-gray-300 rounded" />
            <input {...register("latitude")} placeholder="Latitude" className="w-full p-2 border border-gray-300 rounded" />
            <input {...register("longitude")} placeholder="Longitude" className="w-full p-2 border border-gray-300 rounded" />
            <input type="submit" className="w-full p-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600" />
        </form>
    );

};

export default RoomForm;