import { RiLoader4Fill } from "react-icons/ri";

const LoadingButton = () => {
  return (
    <div className="flex justify-center items-center bg-blue w-max rounded-md px-3 py-2 text-white me-4 ">
      <RiLoader4Fill size={27} className="animate-spin " />
    </div>
  )
}

export default LoadingButton
