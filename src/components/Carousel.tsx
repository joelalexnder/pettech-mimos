"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const images = [
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
  "https://images.unsplash.com/photo-1558788353-f76d92427f16",
  "https://images.unsplash.com/photo-1518717758536-85ae29035b6d",
  "https://images.unsplash.com/photo-1560807707-8cc77767d783",
];

export default function Carousel() {
  return (
    <div className="w-full py-16">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 3000 }}
        loop
        className="rounded-3xl overflow-hidden"
      >
        {images.map((src, i) => (
          <SwiperSlide key={i}>
            <div
              className="h-[300px] md:h-[500px] bg-cover bg-center"
              style={{ backgroundImage: `url(${src})` }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}