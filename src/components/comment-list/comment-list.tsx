import { CommentType } from '../../types';
import CommentItem from '../comment/comment-item';

type CommentListProps = {
  comments: CommentType[];
};

function CommentList({ comments }: CommentListProps): JSX.Element {
  return (
    <>
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{comments.length}</span>
      </h2>
      <ul className="reviews__list">
        {comments.map((comment) => (
          <li key={comment.id} className="reviews__item">
            <CommentItem comment={comment} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default CommentList;
