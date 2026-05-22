import arrow from "@/public/assets/NewCollection/arrow.svg"
import Image from "next/image";

type PrimaryButtonProps = {
  title: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

function PrimaryButton({ className, title, onClick, type = "button" }: PrimaryButtonProps) {
  return (
    <button type={type} onClick={onClick} className={`checkout-button ${className}`}>
      <span>{title}</span>

      <Image src={arrow} alt="arrow" width={35} height={35} />
    </button>
  );
}

export default PrimaryButton;