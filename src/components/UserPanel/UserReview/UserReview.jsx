import {React,  useEffect, useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import style from './style.module.css'
import axios, { Axios } from 'axios';
import Swal from 'sweetalert2';

const UserReview = () => {
    const [rating, setRating] = useState(1);
    const [message, setMessage] = useState('');
    const [review, setReview] = useState({});

    const handleRating = (rate) => {
        setRating(rate);
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const { data } = await axios.post('/reviews', {
                userId: localStorage.getItem('id'),
                contenido: message,
                puntuacion: rating,
            })
            if (!data.error) {
                Swal.fire({
                    title: data.message,
                    icon: 'success'
                })
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const { data } = await axios.get(`/reviews/${localStorage.getItem('id')}`)
                setReview(data.data)
            } catch (error) {
                console.error(error);
            }
        }
        fetchReview();
    }, [])


    return (
        <>
            {
                review
                    ? <div className={style.review_edit_container}>
                        <div className={style.review}>
                            <div
                                style={{
                                    direction: 'ltr',
                                    fontFamily: 'sans-serif',
                                    touchAction: 'none',
                                    width: 'auto',
                                    display: 'inline'
                                }}
                            >
                                <Rating
                                    allowFraction
                                    initialValue={review.puntuacion}
                                    onClick={handleRating}
                                    readonly={true}
                                />
                            </div>
                            <textarea value={review.contenido} disabled={true} />
                        </div>
                    </div>
                    : <div className={style.review_container}>
                        <h3>Danos tu opinion</h3>
                        <div
                            style={{
                                direction: 'ltr',
                                fontFamily: 'sans-serif',
                                touchAction: 'none',
                                textAlign: 'center',

                            }}
                        >
                            <Rating
                                allowFraction
                                initialValue={0.5}
                                onClick={handleRating}
                            />
                        </div>
                        <form className={style.form_container} onSubmit={handleSubmit}>
                            <textarea name="" id="" cols="45" rows="8" onChange={(event) => setMessage(event.target.value)}></textarea>
                            <button type='submit' >Crear</button>
                        </form>
                    </div >
            }
        </>
    )
}

export default UserReview