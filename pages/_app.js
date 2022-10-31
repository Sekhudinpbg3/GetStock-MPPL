import axios from "axios";
import { ThemeProvider } from "next-themes";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import { Provider } from "react-redux";
import { store } from "../providers/reducer/store";
import "../styles/globals.css";

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 3000,
  // you can also just use 'scale' or 'fade'
  transition: transitions.FADE,
};

axios.defaults.withCredentials = true;
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider enableSystem={false} attribute="class">
      {/* <AlertProvider template={} {...options}> */}
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      {/* </AlertProvider> */}
    </ThemeProvider>
  );
}

export default MyApp;
