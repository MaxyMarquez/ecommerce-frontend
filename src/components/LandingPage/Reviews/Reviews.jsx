import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTestimonials } from '../../../redux/actions.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Rating } from 'react-simple-star-rating';
import style from './style.module.css'

const Reviews = () => {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.reviews)


    useEffect(() => {
        dispatch(getTestimonials());

    }, [dispatch]);


    return (
        <>
            <div className='container'>
                <h2 className='text-center'>Reviews</h2>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {
                        reviews.data?.map(review => (
                            <SwiperSlide className={style.card}>
                                <h4>{review.usuario?.persona?.nombre} {review.usuario?.persona?.apellido}</h4>
                                <div
                                    style={{
                                        direction: 'ltr',
                                        fontFamily: 'sans-serif',
                                        touchAction: 'none'
                                    }}
                                >
                                    <Rating
                                        initialValue={review.puntuacion}
                                        onClick={function noRefCheck() { }}
                                        readonly
                                        allowFraction
                                    />
                                </div>
                                {review.contenido}
                            </SwiperSlide>
                        ))
                    }

                </Swiper>
            </div>
        </>
    );
}

export default Reviews