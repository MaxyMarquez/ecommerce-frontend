import React, { useState } from 'react'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import style from './style.module.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';;
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const Header = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <>

            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                loop={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                modules={[Autoplay, FreeMode, Navigation, Thumbs]}
                className={style.carrousel}
            >
                <SwiperSlide className={style.image}>
                    <img src="https://img.freepik.com/vector-premium/banner-sitio-web-venta-etiqueta-venta-ilustracion-vector-material-promocional-venta_1223-998.jpg?w=826" />
                </SwiperSlide>
                <SwiperSlide className={style.image}>
                    <img src="https://img.freepik.com/vector-gratis/plantilla-banner-venta-horizontal_23-2148897328.jpg?w=826&t=st=1699869507~exp=1699870107~hmac=87d99d042f3afed4218ece6ef6d297b13664fd758a82eff77b889a7382a6f07b" />
                </SwiperSlide>
                <SwiperSlide className={style.image}>
                    <img src="https://img.freepik.com/psd-premium/mockup-banner-black-friday-imagen_23-2147982243.jpg" />
                </SwiperSlide>
                <SwiperSlide className={style.image}>
                    <img src="https://img.freepik.com/vector-gratis/plantilla-banner-rebajas-verano-dibujado-mano-foto_23-2148961157.jpg?w=740&t=st=1699870119~exp=1699870719~hmac=7b28a3c217737ed005d4ebc67b103f664e56ddb1dbf82881ef1e46f5026de192" />
                </SwiperSlide>
                <SwiperSlide className={style.image}>
                    <img src="https://img.freepik.com/psd-gratis/banner-redes-sociales-moda-o-plantilla-web_237398-223.jpg?w=826&t=st=1699870152~exp=1699870752~hmac=f276dd3a259bf17c298e7cd1cd7893dcf27e94846f94155d890bfab1e817380d" />
                </SwiperSlide>
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                loop={true}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className={style.carrousel_down}
            >
                <SwiperSlide className={style.image}>
                    <img src="https://img.freepik.com/vector-premium/banner-sitio-web-venta-etiqueta-venta-ilustracion-vector-material-promocional-venta_1223-998.jpg?w=826" />
                </SwiperSlide>
                <SwiperSlide className={style.image}>
                    <img src="https://img.freepik.com/vector-gratis/plantilla-banner-venta-horizontal_23-2148897328.jpg?w=826&t=st=1699869507~exp=1699870107~hmac=87d99d042f3afed4218ece6ef6d297b13664fd758a82eff77b889a7382a6f07b" />
                </SwiperSlide>
                <SwiperSlide className={style.image}>
                    <img src="https://img.freepik.com/psd-premium/mockup-banner-black-friday-imagen_23-2147982243.jpg" />
                </SwiperSlide>
                <SwiperSlide className={style.image}>
                    <img src="https://img.freepik.com/vector-gratis/plantilla-banner-rebajas-verano-dibujado-mano-foto_23-2148961157.jpg?w=740&t=st=1699870119~exp=1699870719~hmac=7b28a3c217737ed005d4ebc67b103f664e56ddb1dbf82881ef1e46f5026de192" />
                </SwiperSlide>
                <SwiperSlide className={style.image}>
                    <img src="https://img.freepik.com/psd-gratis/banner-redes-sociales-moda-o-plantilla-web_237398-223.jpg?w=826&t=st=1699870152~exp=1699870752~hmac=f276dd3a259bf17c298e7cd1cd7893dcf27e94846f94155d890bfab1e817380d" />
                </SwiperSlide>

            </Swiper>

        </>
    )
}

export default Header