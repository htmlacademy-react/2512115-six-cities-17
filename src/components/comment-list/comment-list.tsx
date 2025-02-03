import { CommentType } from '../../types';
import CommentItem from '../comment/comment-item';

type CommentListProps = {
  comments: CommentType[];
};

function CommentList({ comments }: CommentListProps): JSX.Element {
  const displayedComments = [...comments]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);
  return (
    <>
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{comments.length}</span>
      </h2>
      <ul className="reviews__list">
        {displayedComments.map((comment) => (
          <li key={comment.id} className="reviews__item">
            <CommentItem comment={comment} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default CommentList;
