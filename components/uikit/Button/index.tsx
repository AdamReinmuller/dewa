import { FC } from "react";

import BaseButton from "./BaseButton";
import { ButtonProps } from "./types";

const Primary: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <BaseButton bg="primary.700" _hover={{ bg: "primary.800" }} {...props}>
      {children}
    </BaseButton>
  );
};

const Secondary: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <BaseButton
      pl={[0, 0, 0, 0]}
      pb={[2, 2, 2, 2]}
      bg="transparent"
      color="secondary.500"
      borderRadius="none"
      borderBottomColor="secondary.500"
      _hover={{ bg: "transparent", color: "secondary.700" }}
      _active={{ bg: "transparent", color: "secondary.900" }}
      {...props}
    >
      {children}
    </BaseButton>
  );
};

const Button: FC<ButtonProps> = ({ side, ...props }) => {
  const { variant } = props;

  switch (variant) {
    case "secondary":
      return <Secondary side={side} {...props} />;

    default:
      return <Primary side={side} {...props} />;
  }
};

export default Button;

export { BaseButton };
