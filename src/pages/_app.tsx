import { Provider } from "react-redux";
import { store } from "@/store/store";
import "../styles/index.css";

function MyApp({ Component, pageProps }: any) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
