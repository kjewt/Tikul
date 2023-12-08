import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from "./business/ScrollToTop";
import Footer from './components/common/Footer';
import { RouteList } from "./route/RouteList"
const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <section>
        <RouteList />
      </section>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
