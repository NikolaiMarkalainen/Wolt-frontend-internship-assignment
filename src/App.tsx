import "./App.css";
import { UserInputField } from "./components/UserInputField";
import { Header } from "./components/Header";
import { Receipt } from "./components/Receipt";
function App() {
  return (
    <>
      <Header />
      <div className="card-parent">
        <UserInputField />
        <Receipt />
      </div>
    </>
  );
}

export default App;
