import Main from '../../pages/main/main';
// import Offer from "../../pages/offer/offer";
// import Favorites from "../../pages/favorites/favorites";
// import Login from "../../pages/login/login";

type AppProps = {
  offersCount: number;
}

function App({offersCount}: AppProps): JSX.Element {
  return (
    <Main offersCount={offersCount}/>
  );
}

export default App;
