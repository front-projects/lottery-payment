import { IoIosCloseCircle } from "react-icons/io";
import BackButton from "./components/BackButton";
import Form from "./components/Form";
import { useState } from "react";

function App() {
  const [isError, setIsError] = useState(false);

  if (isError) {
    return (
      <div className="w-screen h-screen flex items-center justify-center flex-col text-2xl font-semibold px-10 text-center gap-4">
        <BackButton />
        Something went wrong, please try again later
        <IoIosCloseCircle className="text-[300%] text-red-600" />
      </div>
    );
  }

  return (
    <div className="w-screen flex items-center justify-center">
      <Form onError={(err) => setIsError(err)} />
    </div>
  );
}

export default App;
