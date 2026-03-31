import {NotificationProvider} from 'src/contexts/NotificationContext';
import {ToastContainer} from 'src/components/ToastContainer';
import Router from 'src/routes/Router';

function App() {
  return (
    <NotificationProvider>
      <Router />
      <ToastContainer />
    </NotificationProvider>
  );
}

export default App;
