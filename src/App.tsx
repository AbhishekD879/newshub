import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import TestScreen from "./layout/TestScreen";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Provider } from "react-redux";
import { store } from "./lib/store/store";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <div className="bg-gray-100">
      <Provider store={store}>
        <Header />
        <QueryClientProvider client={queryClient}>
          <TestScreen />
        </QueryClientProvider>
        <Footer />
      </Provider>
    </div>
  );
}

export default App;
