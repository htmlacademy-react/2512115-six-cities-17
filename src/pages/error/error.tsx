import Footer from '../../components/footer/footer';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function Error(): JSX.Element {
  return (
    <div className="page">
      <Helmet>
        <title>6 cities - error</title>
      </Helmet>
      <section className="error404">
        <div className="error404-page" style={{ textAlign: 'center' }}>
          <span>Страница не найдена</span><br/>
          <Link className="error404-home-link" to="/">
            <span>Перейти на главную</span>
          </Link>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default Error;
