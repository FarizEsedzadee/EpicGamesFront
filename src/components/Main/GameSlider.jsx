import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Card from "@/components/ui/Card";

export default function GameSlider() {
  const games = [
    {
      image:
        "https://cdn1.epicgames.com/.../darkfairy.jpg",
      title: "Dark Fairy Tale: Dreamland Survivors",
      price: "67",
    },
    {
      image:
        "https://cdn1.epicgames.com/.../windsmeet.jpg",
      title: "Where Winds Meet",
      price: "Ücretsiz",
    },
    {
      image:
        "https://cdn1.epicgames.com/.../retrace.jpg",
      title: "Retrace the Light",
      price: "249",
    },
    {
      image:
        "https://cdn1.epicgames.com/.../shrine.jpg",
      title: "Shrine's Legacy",
      price: "33",
    },
    {
      image:
        "https://cdn1.epicgames.com/.../gigasword.jpg",
      title: "GIGASWORD",
      price: "206",
    },
    {
      image:
        "https://cdn1.epicgames.com/.../anno.jpg",
      title: "Anno 117: Pax Romana",
      price: "1.749",
    },
  ];

  return (
    <div className="w-full mt-10 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Yeni Şeyler Keşfet</h2>

        <div className="flex gap-3">
          <button className="swiper-prev p-2 bg-neutral-800 rounded-full hover:bg-neutral-700 transition">
            <span className="text-white">❮</span>
          </button>

          <button className="swiper-next p-2 bg-neutral-800 rounded-full hover:bg-neutral-700 transition">
            <span className="text-white">❯</span>
          </button>
        </div>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Navigation]}
        slidesPerView={5}
        spaceBetween={20}
        navigation={{
          nextEl: ".swiper-next",
          prevEl: ".swiper-prev",
        }}
        className="pb-5"
      >
        {games.map((game, i) => (
          <SwiperSlide
            key={i}
            className="bg-neutral-900 rounded-xl p-3 cursor-pointer hover:bg-neutral-800 transition"
          >
            <Card title={game.title} price={game.price} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
