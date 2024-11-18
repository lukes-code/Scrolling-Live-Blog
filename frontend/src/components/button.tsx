import { ButtonType } from "../types";
import Link from "next/link";

type ButtonProps = {
  buttonType?: ButtonType;
  children?: React.ReactNode;
  handleClick?: () => void;
};

const Button = (props: ButtonProps) => {
  const { children, handleClick, buttonType = ButtonType.Primary } = props;

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  switch (buttonType) {
    case ButtonType.Primary:
      return (
        <button
          onClick={!!handleClick ? handleClick : () => {}}
          className="px-3 py-1 border"
        >
          {children && children}
        </button>
      );
    case ButtonType.ScrollToTop:
      return (
        <button
          onClick={scrollToTop}
          className="w-[50px] h-[50px] fixed bottom-10 left-10 p-2 bg-gray-900 text-white rounded-full shadow-md hover:bg-gray-700 transition-colors duration-300"
        >
          &uarr;
        </button>
      );
    case ButtonType.AddNew:
      return (
        <button
          onClick={!!handleClick ? handleClick : () => {}}
          className="w-[50px] h-[50px] fixed bottom-10 right-10 p-2 bg-gray-900 text-white rounded-full shadow-md hover:bg-gray-700 transition-colors duration-300"
        >
          &#x002B;
        </button>
      );
    case ButtonType.Back:
      return (
        <Link href="/">
          <button className="w-[50px] h-[50px] fixed top-[50%] left-10 p-2 bg-gray-900 text-white rounded-full shadow-md hover:bg-gray-700 transition-colors duration-300">
            &larr;
          </button>
        </Link>
      );
  }
};

export default Button;
