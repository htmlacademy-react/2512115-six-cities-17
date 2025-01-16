import { CITIES } from '../../const';
import { useAppDispatch } from '../../hooks';
import { changeCity } from '../../store/action';

type LocationGroupProps = {
  currentCity: string;
}

export default function LocationGroup({currentCity}: LocationGroupProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((cityName) => (
            <li key={cityName} className="locations__item">
              <a
                className={`locations__item-link tabs__item${currentCity === cityName ? ' tabs__item--active' : ''}`}
                href="#"
                onClick={(evt) => {
                  evt.preventDefault();
                  dispatch(changeCity(cityName));
                }}
              >
                <span>{cityName}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
