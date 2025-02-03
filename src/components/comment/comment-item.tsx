import { formatDate } from '../../helpers';
import { CommentType } from '../../types';


type CommentItemProps = {
  comment: CommentType;
};

function CommentItem({ comment }: CommentItemProps): JSX.Element {
  const { formattedDate, dateTime } = formatDate(comment.date);
  return (
    <>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={comment.user.avatarUrl}
            width={54}
            height={54}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{comment.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: '80%' }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment.comment}
        </p>
        <time className="reviews__time" dateTime={dateTime}>
          {formattedDate}
        </time>
      </div>
    </>
  );
}

export default CommentItem;

