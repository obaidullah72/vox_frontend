import AppRoutes from "./Routes.jsx";
import { Provider } from "react-redux";
import { store } from "./redux";
import AuthGate from "./auth/AuthGate.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import usePageReady from './hooks/usePageReady.js'
import DotsLoader from './components/DotsLoader.jsx'

export default function App() {
  const ready = usePageReady()

  return (
    <Provider store={store}>
      <AuthGate>
        {ready ? <AppRoutes /> : <DotsLoader />}
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthGate>
    </Provider>
  );
}
