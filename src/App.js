import "./App.css";
import Layout from "./components/shared/Layout";
import AllContacts from "./pages/AllContacts";
import { Route, Routes } from "react-router-dom";
import AddContact from "./pages/AddContact";
import UpdateContact from "./pages/UpdateContact";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AllContacts></AllContacts>}></Route>
      </Routes>
      <Routes>
        <Route path="/add-contact" element={<AddContact></AddContact>}></Route>
      </Routes>
      <Routes>
        <Route path="/update-contact/:id" element={<UpdateContact></UpdateContact>}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
