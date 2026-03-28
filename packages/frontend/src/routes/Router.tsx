import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Home } from '../pages/Home';
import { ListOverviewPage } from '../pages/ListOverviewPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/lists" element={<ListOverviewPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
