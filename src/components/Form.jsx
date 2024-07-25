import { useEffect, useState } from "react";
import BackButton from "./BackButton";
import { submitForm } from "../util/submitForm";
import { IoIosCheckmarkCircle } from "react-icons/io";
import CryptoSelect from "./CryptoSelect";
import { ColorButton } from "./ColorButton";
import { InputElement } from "./CustomInput";
import WithdrawMenu from "./WithdrawMenu";
import Loading from "./Loading";

export default function Form({ onError }) {
  const [id, setId] = useState();
  const [email, setEmail] = useState();
  const [isLoading, setIsLoading] = useState();
  const [balance, setBalance] = useState();
  const [amount, setAmount] = useState(0);
  const [crypto, setCrypto] = useState();
  const [adress, setAdress] = useState();
  const [description, setDescription] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState([]);
  const [mode, setMode] = useState("deposit");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const modeParam = queryParams.get("mode");
    const idParam = queryParams.get("data");

    const balanceParam = queryParams.get("balance");

    setBalance(+balanceParam);
    setMode(modeParam);
    setId(idParam);
  }, []);

  const submittingForm = async (e) => {
    e.preventDefault();

    const errors = [];

    if (!email || email.trim() === "") {
      errors.push("email");
    }
    if (!amount || amount < 12) {
      errors.push("amount");
    }
    if (amount > balance && mode == "withdraw") {
      errors.push("amount");
    }
    if (!crypto) {
      errors.push("crypto");
    }
    if (!adress && mode == "withdraw") {
      errors.push("adress");
    }

    setError(errors);

    if (errors.length == 0) {
      let data;
      mode !== "withdraw"
        ? (data = {
            login: id,
            email: email,
            transactionAmount: amount,
            currencyCode: crypto.toUpperCase(),
          })
        : (data = {
            login: id,
            email: email,
            transactionAmount: amount,
            currency: crypto.toUpperCase(),
            cryptoAddress: adress,
            description: description,
          });
      setIsLoading(true);
      const url = await submitForm(data, mode ? mode : "deposit", id);
      const submiting = () => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
        setIsSubmitting(true);
      };

      if (url) {
        mode !== "withdraw" ? (window.location.href = url) : submiting();
      } else {
        onError(true);
      }
    }
  };
  return (
    <>
      {" "}
      {isLoading ? (
        <Loading />
      ) : (
        <form
          className="relative shadow-xl w-full min-h-screen rounded-xl px-4 py-6 flex items-center justify-between flex-col lg:h-2/3 lg:w-[740px] lg:mt-4"
          onSubmit={submittingForm}
        >
          <div className="w-full flex flex-col gap-2 mb-20">
            <BackButton />
            <div className="font-semibold text-xl text-center border-b-2 p-2 mb-4">
              Pay via preferable crypto
              <div className="text-sm text-[#9c27b0]">
                ~from whale project devs~
              </div>
            </div>
            {isSubmitting ? (
              <div className="w-full flex items-center text-center pt-4 px-2 font-semibold text-xl flex-col gap-4">
                Everything has been successfully completed. Now you can return
                to the whales. Your withdrawal request is currently being
                processed and should be completed shortly.
                <IoIosCheckmarkCircle className="text-[400%] text-[#9c27b0]" />
              </div>
            ) : (
              <>
                <h3
                  className={`font-semibold p-1 ${error.includes("email") ? "text-red-600" : "text-gray-700 "}`}
                >
                  Enter a valid email
                </h3>
                <InputElement
                  required
                  placeholder="Email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <h3
                  className={`font-semibold p-1 ${error.includes("amount") ? "text-red-600" : "text-gray-700 "}`}
                >
                  Enter an amount{" "}
                  <span className="text-[13px] text-gray-500">(min - 12$)</span>
                </h3>
                <InputElement
                  required
                  type="number"
                  max={balance ? balance : 9999}
                  step="0.0001"
                  min={12}
                  placeholder="Amount in USD"
                  onChange={(e) => setAmount(e.target.value)}
                />
                {mode == "withdraw" && (
                  <div className="text-gray-500 text-[11px] ml-2 font-semibold">
                    Balance: {balance ? balance.toFixed(2) : 0} $
                  </div>
                )}

                {/* WITHDRAW */}
                {mode == "withdraw" && (
                  <WithdrawMenu
                    error={error}
                    onSetAdress={(adress) => setAdress(adress)}
                    onSetAmount={(amount) => setAmount(amount)}
                    onSetDescription={(description) =>
                      setDescription(description)
                    }
                  />
                )}

                <h3
                  className={`font-semibold p-1 ${error.includes("crypto") ? "text-red-600" : "text-gray-700 "}`}
                >
                  Select a crypto
                </h3>
                <CryptoSelect changeCrypto={(crypto) => setCrypto(crypto)} />
              </>
            )}
          </div>

          {!isSubmitting && (
            <div className="w-full fixed left-[5%] bottom-4 lg:w-1/2 lg:left-[27.5%]">
              {" "}
              <ColorButton
                sx={{ fontSize: "20px", width: "90%" }}
                type="submit"
              >
                Continue
              </ColorButton>
            </div>
          )}
        </form>
      )}
    </>
  );
}
