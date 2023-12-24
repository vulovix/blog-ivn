import "./style.scss";

export default function Button(props: any): JSX.Element {
  const { children, kind = "primary", ...rest } = props;
  return (
    <button className={`oasis-button ${kind}`} {...rest}>
      {children}
    </button>
  );
}
