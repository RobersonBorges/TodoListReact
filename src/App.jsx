import "./global.scss";
import Header from "./components/Header/Header";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes";
export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRoutes />
    </BrowserRouter>
  );
}
