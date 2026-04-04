import {NotificationProvider} from 'src/contexts/NotificationContext';
import {AuthProvider} from 'src/contexts/AuthContext';
import {ToastContainer} from 'src/components/ToastContainer';
import Router from 'src/routes/Router';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router />
        <ToastContainer />
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
