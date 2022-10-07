import styled from 'styled-components';

interface IButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  disabled?: boolean;
}

const Button = (props: IButtonProps) => {
  return <StyledButton {...props} />;
};

const StyledButton = styled.button``;

export default Button;
