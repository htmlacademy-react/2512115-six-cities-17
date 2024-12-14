import Footer from '../../components/footer/footer';
import { Link } from 'react-router-dom';

function Error(): JSX.Element {
  return (
    <>
      <section className="error404">
        <div className="error404-page" style={{ textAlign: 'center' }}>
          <span>Страница не найдена</span><br/>
          <Link className="error404-home-link" to="/">
            <span>Перейти на главную</span>
          </Link>
        </div>
      </section>
      <Footer/>
    </>
  );
}

export default Error;
