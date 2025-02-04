import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { RatingType } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RequestStatus } from '../../const';
import { setCommentUploadStatus } from '../../store/action';
import { uploadComment } from '../../store/api-actions';

type FormDataType = {
  rating: RatingType;
  review: string;
};

const initialState: FormDataType = {
  rating: 0,
  review: '',
};

type CommentFormProps = {
  offerId: string;
}

function CommentForm({ offerId }: CommentFormProps) {
  const [formData, setFormData] = useState<FormDataType>(initialState);
  const dispatch = useAppDispatch();
  const commentUploadStatus = useAppSelector((state) => state.commentUploadStatus);
  const isFormDisabled = commentUploadStatus === RequestStatus.Uploading;
  const isButtonSubmitDisabled =
    formData.review.length >= 50 && formData.review.length < 300 &&
    formData.rating > 0 && !isFormDisabled;

  useEffect(() => {
    if (commentUploadStatus === RequestStatus.Success) {
      setFormData(initialState);
      dispatch(setCommentUploadStatus(RequestStatus.Idle));
    }
  }, [commentUploadStatus, dispatch]);

  const handleChangeRating = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      rating: Number(e.target.value),
    }));

  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(setCommentUploadStatus(RequestStatus.Uploading));

    dispatch(uploadComment({
      offerId,
      comment: formData.review,
      rating: formData.rating,
    }));
  };

  const handleChangeReview = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      review: e.target.value,
    }));

  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value={5}
          id="5-stars"
          type="radio"
          onChange={handleChangeRating}
          disabled={isFormDisabled}
        />
        <label
          htmlFor="5-stars"
          className="reviews__rating-label form__rating-label"
          title="perfect"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value={4}
          id="4-stars"
          type="radio"
          onChange={handleChangeRating}
          disabled={isFormDisabled}
        />
        <label
          htmlFor="4-stars"
          className="reviews__rating-label form__rating-label"
          title="good"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value={3}
          id="3-stars"
          type="radio"
          onChange={handleChangeRating}
          disabled={isFormDisabled}
        />
        <label
          htmlFor="3-stars"
          className="reviews__rating-label form__rating-label"
          title="not bad"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value={2}
          id="2-stars"
          type="radio"
          onChange={handleChangeRating}
          disabled={isFormDisabled}
        />
        <label
          htmlFor="2-stars"
          className="reviews__rating-label form__rating-label"
          title="badly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value={1}
          id="1-star"
          type="radio"
          onChange={handleChangeRating}
          disabled={isFormDisabled}
        />
        <label
          htmlFor="1-star"
          className="reviews__rating-label form__rating-label"
          title="terribly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleChangeReview}
        value={formData.review}
        disabled={isFormDisabled}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your
          stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isButtonSubmitDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
