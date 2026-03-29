import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Layout} from 'src/components/Layout';
import {Home} from 'src/pages/Home';
import {ListOverviewPage} from 'src/pages/ListOverviewPage';
import {ListDetailPage} from 'src/pages/ListDetailPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/lists" element={<ListOverviewPage />} />
          <Route path="/lists/:listId" element={<ListDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
