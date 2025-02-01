import { useAppDispatch } from '../../hooks';
import { toggleFavorite } from '../../store/api-actions';

type FavoriteButtonProps = {
  isFavorite: boolean;
  offerId: string;
  favoriteBtnType?: string;
};

export default function FavoriteButton({ isFavorite, offerId, favoriteBtnType = 'place-card' }: FavoriteButtonProps) {
  const dispatch = useAppDispatch();

  const handleFavoriteClick = () => {
    const newStatus = isFavorite ? 0 : 1;
    dispatch(toggleFavorite({ offerId, status: newStatus }));
  };

  const btnText = isFavorite ? 'In bookmarks' : 'To bookmarks';
  const imgWidth = favoriteBtnType === 'place-card' ? 18 : 31;
  const imgHeight = favoriteBtnType === 'place-card' ? 19 : 33;

  return (
    <button
      className={`${favoriteBtnType}__bookmark-button button${isFavorite ? ` ${favoriteBtnType}__bookmark-button--active` : ''}`}
      type="button"
      onClick={handleFavoriteClick}
    >
      <svg className={`${favoriteBtnType}__bookmark-icon`} width={imgWidth} height={imgHeight}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{btnText}</span>
    </button>
  );
}
