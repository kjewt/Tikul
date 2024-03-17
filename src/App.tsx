import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from "./business/ScrollToTop";
import Footer from './components/common/Footer';
import { RouteList } from "./route/RouteList"
import { QueryClient, QueryClientProvider } from 'react-query';
import { NavBar } from './components/common/NavBar';


const queryClient = new QueryClient();

const App = (): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <NavBar />
        <section>
          <RouteList />
        </section>
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
