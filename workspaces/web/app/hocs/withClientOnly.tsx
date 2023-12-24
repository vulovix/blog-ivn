import { useEffect, useState } from "react";

const withClientOnly = (Component: React.FC<any>) => (props: any) => {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    if (document && window) {
      setIsBrowser(true);
    }
  }, []);

  return <>{isBrowser ? <Component {...props} /> : null}</>;
};

export default withClientOnly;
