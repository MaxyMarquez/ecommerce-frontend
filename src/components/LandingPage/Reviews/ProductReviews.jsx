import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Rating } from 'react-simple-star-rating';
import { useParams } from 'react-router-dom';
import { getAllProductReviews, createProductReview } from '../../../redux/actions.js';
import style from './style.module.css';

const ProductReviewsAndForm = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const productReviews = useSelector((state) => state.productReviews);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const userId = localStorage.getItem('id');

  useEffect(() => {
    if (productId) {
      dispatch(getAllProductReviews(productId));
    }
  }, [dispatch, productId]);

  const handleRatingChange = (newRating) => {
    console.log('New Rating:', newRating); // Agrega este log para verificar el nuevo valor de rating
    setRating(newRating);
  };
  const handleChangeContent = (e) => {
    console.log('Content:', e.target.value); // Agrega este log para verificar el contenido
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (productId && content.trim() !== '') {
      try {
        dispatch(createProductReview({ productId, userId, puntuacion: rating, contenido: content }));
        console.log('Review creada exitosamente');
      } catch (error) {
        console.error('Error al crear la revisión del producto:', error);
      }
    } else {
      console.error('El contenido de la revisión no puede estar vacío');
    }
    setRating(0);
    setContent('');
  };
  return (
    <div className='container'>
      <div className={style.review_container}>
        <h3>¿Te gusto? Dejanos tu opinión!</h3>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.rating_container}>
            <Rating
              onClick={handleRatingChange}
              ratingValue={rating}
              size={40}
              style={{ verticalAlign: 'initial' }}
            />
          </div>
          <div>
            <textarea
              value={content}
              onChange={handleChangeContent}
              required
              placeholder='Dejanos tu opinón'
            />
          </div>
          <button className={style.btn_submit} type="submit">Submit Review</button>
        </form>
      </div>
      {
        productReviews.data?.map(review => (
          <div>

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
          </div>

        ))
      }

    </div>
  );
};

export default ProductReviewsAndForm;
