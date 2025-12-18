interface Props {
  message: string;
}

const ErrorMessage = ({ message }: Props) => {
  return <p style={{ color: "red" }}>{message}</p>;
};

export default ErrorMessage;
