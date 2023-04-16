import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./Components/Layout";
import { NotFound } from "./Components/NotFound";
import { Countries } from "./Components/Countries";
import { Details } from "./Components/Details";
import { Header } from "./Components/Header";

function App() {
  return (
    <BrowserRouter>
      <Layout header={<Header />}>
        <Routes>
          <Route path="/country/:country" element={<Details />} />
          <Route path="/" element={<Countries />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
export default App;
