import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./carousel.module.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import { Navigation, Pagination, History, Autoplay } from "swiper/modules";

export default function Carousel() {
  const arrayImg = [
    { id: 1, img: "/images/wallpaper/macos-big-sur.jpg" },
    { id: 2, img: "/images/wallpaper/are.jpg" },
    { id: 3, img: "/images/wallpaper/wall3.jpg" },
    { id: 4, img: "/images/wallpaper/wall5.jpg" },
  ];

  return (
    <article className={styles.content_corousel}>
      <Swiper
        className={styles.div_img}
        spaceBetween={50}
        slidesPerView={1}
        navigation={true}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Autoplay, Pagination, History]}
      >
        {arrayImg.map((li, index) => {
          return (
            <SwiperSlide key={index} className={styles.item_img}>
              <div
                style={{ backgroundImage: `url(${li.img} )` }}
                className={styles.img_cover}
              ></div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </article>
  );
}
