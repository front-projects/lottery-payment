import { InputElement } from "./CustomInput";

export default function WithdrawMenu({
  error,

  onSetAdress,
  onSetDescription,
}) {
  return (
    <>
      <h3
        className={`font-semibold p-1 ${error.includes("adress") ? "text-red-600" : "text-gray-700 "}`}
      >
        Enter a crypto adress
      </h3>
      <InputElement
        required
        type="text"
        placeholder="Crypto adress"
        onChange={(e) => onSetAdress(e.target.value)}
      />
      <h3
        className={`font-semibold p-1 ${error.includes("description") ? "text-red-600" : "text-gray-700 "}`}
      >
        Description
      </h3>
      <InputElement
        type="text"
        placeholder="Description"
        onChange={(e) => onSetDescription(e.target.value)}
      />
    </>
  );
}
