import "./App.css";
import { UserInputField } from "./components/UserInputField";
import { Header } from "./components/Header";
import { Receipt } from "./components/Receipt";
import { useCalculatePrice } from "./hooks/hooks";
function App() {
  const fees = useCalculatePrice();
  console.log("FEEEEES", fees);

  return (
    <>
      <Header />
      <div className="card-parent">
        <UserInputField />
        {fees?.error && <></>}
        <Receipt />
      </div>
    </>
  );
}

export default App;
