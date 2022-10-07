import styled from 'styled-components';

interface IButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  disabled?: boolean;
}

const Button = (props: IButtonProps) => {
  return <StyledButton {...props} />;
};

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  padding: 0.25rem 1rem;
  outline: none;
  cursor: pointer;
  // default background color
  background: ${props => props.theme.buttonColor};
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    font-size: 24px;
    color: ${props => props.theme.buttonIconColor};
  }
`;

export default Button;
