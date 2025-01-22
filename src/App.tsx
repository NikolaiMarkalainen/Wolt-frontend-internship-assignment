import "./App.css";
import { UserInputField } from "./components/UserInputField";
import { Header } from "./components/Header";
import { Receipt } from "./components/Receipt";
import { useCalculatePrice } from "./hooks/hooks";
import { setErrorMessage } from "./helpers/helpers";
import { useEffect, useState } from "react";
import { ICalculateResult } from "./types/DeliveryTypes";

function App() {
  const [error, setError] = useState<string>("");
  const [render, setRender] = useState<boolean>(false);
  const [fees, setFees] = useState<ICalculateResult | undefined>();
  const feeHookResult = useCalculatePrice();

  useEffect(() => {
    if (feeHookResult?.error) {
      setErrorMessage(feeHookResult.error, setError);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }, [feeHookResult?.error]);

  useEffect(() => {
    if (feeHookResult?.result && feeHookResult.result.Id !== fees?.result?.Id) {
      setFees(feeHookResult);
    }
  }, [feeHookResult?.result, fees?.result]);

  useEffect(() => {
    if (render) {
      setFees(undefined);
    }
  }, [render]);

  return (
    <>
      <Header />
      <div className="card-parent">
        <UserInputField setRender={setRender} />
        {fees?.result && <Receipt receipt={fees.result} />}
      </div>
      {error && <div className="receipt-error">{error}</div>}
    </>
  );
}

export default App;
