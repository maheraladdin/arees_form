"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RoomType } from '@prisma/client';
import axios from "axios";
import toast from "react-hot-toast";
import {UploadDropzone} from "@/components/uploadthing";
import { ErrorMessage } from '@hookform/error-message';


const RoomSchema = z.object({
    name: z.string().min(1, "required field"),
    listing_url: z.string().min(1, "required field"),
    xl_picture_url: z.string().min(1, "required field"),
    medium_url: z.string().min(1, "required field"),
    room_type: z.nativeEnum(RoomType),
    smart_location: z.string().min(1, "required field"),
    guests_included: z.string().min(1, "required field"),
    bedrooms: z.string().min(1, "required field"),
    beds: z.string().min(1, "required field"),
    bathrooms: z.string().min(1, "required field"),
    review_scores_rating: z.string().min(1, "required field"),
    number_of_reviews: z.string().min(1, "required field"),
    host_picture_url: z.string().min(1, "required field"),
    host_name: z.string().min(1, "required field"),
    host_since: z.string().min(1, "required field"),
    description: z.string().min(1, "required field"),
    price: z.string().min(1, "required field"),
    latitude: z.string().min(1, "required field"),
    longitude: z.string().min(1, "required field"),
});

const RoomForm = () => {
  const { register, handleSubmit, setValue, formState: {errors} } = useForm({
    resolver: zodResolver(RoomSchema),
      defaultValues: {
            name: "",
            listing_url: "",
            xl_picture_url: "",
            medium_url: "",
            room_type: RoomType.Private_room,
            smart_location: "",
            guests_included: "",
            bedrooms: "",
            beds: "",
            bathrooms: "",
            review_scores_rating: "",
            number_of_reviews: "",
            host_picture_url: "",
            host_name: "",
            host_since: "",
            description: "",
            price: "",
            latitude: "",
            longitude: "",
      },
      mode: "onBlur",
  });

  const onSubmit = async (formData: z.infer<typeof RoomSchema>) => {
          await toast.promise(axios.post("/api/rooms", {
              name: formData.name,
              listing_url: formData.listing_url,
              xl_picture_url: formData.xl_picture_url,
              medium_url: formData.medium_url,
              room_type: formData.room_type,
              smart_location: formData.smart_location,
              guests_included: parseInt(formData.guests_included),
              bedrooms: parseInt(formData.bedrooms),
              beds: parseInt(formData.beds),
              bathrooms: parseInt(formData.bathrooms),
              review_scores_rating: parseInt(formData.review_scores_rating),
              number_of_reviews: parseInt(formData.number_of_reviews),
              host_picture_url: formData.host_picture_url,
              host_name: formData.host_name,
              host_since: formData.host_since,
              description: formData.description,
              price: parseInt(formData.price),
              latitude: formData.latitude,
              longitude: formData.longitude
          }), {
              loading: "adding new room...",
              success: "room was added successfully",
              error: "Error: room wasn't added"
          });
  };

  // rest of your form code

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mx-auto p-4 w-full max-w-[400px]">
            <h1 className="text-4xl font-bold text-center">Add Room</h1>
            <fieldset className={"space-y-2"}>
                <label htmlFor={"image"}>Name</label>
                <input {...register("name")} placeholder="Name" className="w-full p-2 border border-gray-300 rounded"/>
                <ErrorMessage errors={errors} name={"name"} render={({ message }) => (
                    <p className={"text-red-500"}>{message}</p>
                )} />
            </fieldset>
            <fieldset>
                <label htmlFor={"image"} className={"mb-2"}>Room URL</label>
                <input {...register("listing_url")} placeholder="URL for the room"
                       className="w-full p-2 border border-gray-300 rounded"/>
                <ErrorMessage errors={errors} name={"listing_url"} render={({ message }) => (
                    <p className={"text-red-500"}>{message}</p>
                )} />
            </fieldset>
            <fieldset>
                <label htmlFor={"image"} className={"mb-2"}>add room image</label>
                <UploadDropzone
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                        const file = res[0].url;
                        setValue("medium_url", file);
                        setValue("xl_picture_url", file);
                    }}
                    onUploadError={(error: Error) => {
                        // Do something with the error.
                        toast.error(`ERROR! ${error.message}`);
                    }}
                />
                <ErrorMessage errors={errors} name={"medium_url"} render={({ message }) => (
                    <p className={"text-red-500"}>{message}</p>
                )} />
            </fieldset>
            <fieldset>
                <label htmlFor={"room_type"} className={"mb-2"}>Room type</label>
                <select id={"room_type"} {...register("room_type")}
                        className="w-full p-2 py-4 border border-gray-300 rounded">
                    <option value="" disabled>Room Type</option>
                    <option value="Private_room">Private Room</option>
                    <option value="Entire_home">Entire Home</option>
                    <option value="Shared_room">Shared Room</option>
                </select>
                <ErrorMessage errors={errors} name={"room_type"} render={({ message }) => (
                    <p className={"text-red-500"}>{message}</p>
                )} />
            </fieldset>
            <fieldset>
                <label htmlFor="location">Location</label>
                <input id={"location"} {...register("smart_location")} placeholder="Location"
                       className="w-full p-2 border border-gray-300 rounded"/>
                <ErrorMessage errors={errors} name={"smart_location"} render={({ message }) => (
                    <p className={"text-red-500"}>{message}</p>
                )} />
            </fieldset>
            <fieldset>
                <label htmlFor={"Guests"} className={"mb-2"}>Guests Included</label>
                <input type={"number"} id={"Guests"} {...register("guests_included")} placeholder="Guests Included"
                       className="w-full p-2 border border-gray-300 rounded"/>
                <ErrorMessage errors={errors} name={"guests_included"} render={({ message }) => (
                    <p className={"text-red-500"}>{message}</p>
                )} />
            </fieldset>
            <fieldset>
                <label htmlFor={"bedrooms"} className={"mb-2"}>Bedrooms</label>
                <input type={"number"} id={"bedrooms"} {...register("bedrooms")} placeholder="Bedrooms"
                       className="w-full p-2 border border-gray-300 rounded"/>
                <ErrorMessage errors={errors} name={"bedrooms"} render={({ message }) => (
                    <p className={"text-red-500"}>{message}</p>
                )} />
            </fieldset>
            <fieldset>
                <label htmlFor={"beds"} className={"mb-2"}>Beds</label>
                <input type={"number"} id={"beds"} {...register("beds")} placeholder="Beds"
                       className="w-full p-2 border border-gray-300 rounded"/>
                <ErrorMessage errors={errors} name={"beds"} render={({ message }) => (
                    <p className={"text-red-500"}>{message}</p>
                )} />
            </fieldset>
            <fieldset>
                <label htmlFor={"bathrooms"} className={"mb-2"}>Bathrooms</label>
                <input type={"number"} id={"bathrooms"} {...register("bathrooms")} placeholder="Bathrooms"
                       className="w-full p-2 border border-gray-300 rounded"/>
                <ErrorMessage errors={errors} name={"bathrooms"} render={({ message }) => (
                    <p className={"text-red-500"}>{message}</p>
                )} />
            </fieldset>
            <fieldset>
                <label htmlFor={"review_scores_rating"} className={"mb-2"}>review scores rating</label>
                <input type={"number"} id={"review_scores_rating"} {...register("review_scores_rating")}
                       placeholder="Review Scores Rating"
                       className="w-full p-2 border border-gray-300 rounded"/>
                <ErrorMessage errors={errors} name={"review_scores_rating"} render={({ message }) => (
                    <p className={"text-red-500"}>{message}</p>
                )} />
            </fieldset>
            <fieldset>
                <label htmlFor={"number_of_reviews"} className={"mb-2"}>number of reviews</label>
                <input type={"number"} id={"number_of_reviews"} {...register("number_of_reviews")} placeholder="Number of Reviews"
                       className="w-full p-2 border border-gray-300 rounded"/>
                <ErrorMessage errors={errors} name={"number_of_reviews"} render={({ message }) => (
                    <p className={"text-red-500"}>{message}</p>
                )} />
            </fieldset>
            <fieldset>
                <label htmlFor={"image_host"} className={"mb-2"}>add host image</label>
                <UploadDropzone
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                        const file = res[0].url;
                        setValue("host_picture_url", file);
                    }}
                    onUploadError={(error: Error) => {
                        // Do something with the error.
                        toast.error(`ERROR! ${error.message}`);
                    }}
                />
                <ErrorMessage errors={errors} name={"host_picture_url"} render={({ message }) => (
                    <p className={"text-red-500"}>{message}</p>
                )} />
            </fieldset>
            <fieldset>
                <label htmlFor={"host_name"} className={"mb-2"}>host name</label>
                <input id={"host_name"} {...register("host_name")} placeholder="Host Name"
                       className="w-full p-2 border border-gray-300 rounded"/>
                <ErrorMessage errors={errors} name={"host_name"} render={({ message }) => (
                    <p className={"text-red-500"}>{message}</p>
                )} />
            </fieldset>
            <fieldset>
                <label htmlFor={"host_since"} className={"mb-2"}>host since</label>
                <input id={"host_since"} type={"date"} {...register("host_since")} placeholder="Host Since"
                       className="w-full p-2 border border-gray-300 rounded"/>
                <ErrorMessage errors={errors} name={"host_since"} render={({ message }) => (
                    <p className={"text-red-500"}>{message}</p>
                )} />
            </fieldset>
            <fieldset>
                <label htmlFor={"description"} className={"mb-2"}>description</label>
                <textarea rows={5} id={"description"} {...register("description")} placeholder="Description"
                          className="w-full p-2 border border-gray-300 rounded"/>
                <ErrorMessage errors={errors} name={"description"} render={({ message }) => (
                    <p className={"text-red-500"}>{message}</p>
                )} />
            </fieldset>
            <fieldset>
                <label htmlFor={"price"} className={"mb-2"}>price</label>
                <input id={"price"} {...register("price")} type={"number"} placeholder="Price"
                       className="w-full p-2 border border-gray-300 rounded"/>
                <ErrorMessage errors={errors} name={"price"} render={({ message }) => (
                    <p className={"text-red-500"}>{message}</p>
                )} />
            </fieldset>
            <fieldset>
                <label htmlFor={"latitude"} className={"mb-2"}>latitude</label>
                <input id={"latitude"} {...register("latitude")} placeholder="Latitude"
                       className="w-full p-2 border border-gray-300 rounded"/>
                <ErrorMessage errors={errors} name={"latitude"} render={({ message }) => (
                    <p className={"text-red-500"}>{message}</p>
                )} />
            </fieldset>
            <fieldset>
                <label htmlFor={"longitude"} className={"mb-2"}>longitude</label>
                <input {...register("longitude")} placeholder="Longitude"
                       className="w-full p-2 border border-gray-300 rounded"/>
                <ErrorMessage errors={errors} name={"longitude"} render={({ message }) => (
                    <p className={"text-red-500"}>{message}</p>
                )} />
            </fieldset>
                <input type="submit"
                       className="w-full p-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"/>
        </form>
);

};

export default RoomForm;