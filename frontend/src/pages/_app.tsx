import { Provider } from "react-redux";
import { store } from "../store/store";
import { ToastContainer } from "react-toastify";
import Nav from "../components/nav";

import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/index.css";

function MyApp({ Component, pageProps }: any) {
  return (
    <Provider store={store}>
      <ToastContainer className="toast-position" />
      <Nav />
      <div className="absolute top-0 left-0 w-full h-1/2 bg-[#c1e0f7] z-[-1]" />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
