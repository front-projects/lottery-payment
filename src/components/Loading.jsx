import { TailSpin } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color="purple"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
