import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Card } from "./Card/Card"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

type words = {
  words: {
    word: string
    translate: string
  }[]
}

export const CardsList = ({ words }: words) => {

  return (
      <Swiper
        modules={[Navigation, Scrollbar]}
        navigation
        scrollbar={{ draggable: true }}
        spaceBetween={30}
        slidesPerView={2}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        breakpoints={{
          640: {
            width: 640,
            slidesPerView: 1,
          },
          768: {
            width: 768,
            slidesPerView: 2,
          },
        }}
      >
      
        {words.map((el, index) => (
          <SwiperSlide key={index}>
            <Card 
              word={el.word}
              translate={el.translate}
            />
          </SwiperSlide>
        ))}
      </Swiper>
  )
}
