import { ButtonProps } from "@/types";

const Button = (props: ButtonProps) => {
  const { children, handleClick } = props;
  return (
    <button onClick={handleClick} className="px-3 py-1 border">
      {children}
    </button>
  );
};

export default Button;
