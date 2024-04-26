"use client";
import React from 'react';
import {Room} from "@prisma/client";

const RoomCard = ({ room }: { room: Room }) => {
  return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
          <img className="w-full" src={room.xl_picture_url as string} alt="Room"/>
          <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{room.name}</div>
              <p className="text-gray-700 text-base">{room.description}</p>
          </div>
          <div className="px-6 pt-4 pb-2">
              <img className="w-fit" src={room.host_picture_url as string} alt={room.host_name as string}/>
              <span
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Host: {room.host_name}</span>
              <span
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Since: {room.host_since}</span>
          </div>
          <div className="px-6 pt-4 pb-2">
              <span
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Type: {room.room_type}</span>
              <span
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Location: {room.smart_location}</span>
              <span
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Guests: {room.guests_included}</span>
              <span
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Bedrooms: {room.bedrooms}</span>
              <span
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Beds: {room.beds}</span>
              <span
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Bathrooms: {room.bathrooms}</span>
              <span
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Rating: {room.review_scores_rating}</span>
              <span
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Reviews: {room.number_of_reviews}</span>
              <span
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Price: {room.price}</span>
          </div>
      </div>
  );
};

export default RoomCard;