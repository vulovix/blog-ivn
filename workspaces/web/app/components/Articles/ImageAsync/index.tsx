import { useEffect, useState } from "react";
import { rawRequest } from "~/utils/request-lib/request";
import Image from "../Image";
import { Loader as DefaultLoader } from "ui";
import "./style.scss";

export default function ImageAsync({
  src,
  Loader = DefaultLoader,
}: {
  src: string;
  Loader?: React.FC;
}): JSX.Element {
  const [source, setSource] = useState("/images/no-photo");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      // @ts-ignore
      const data = await rawRequest(src).then((res) => res.text());
      if (data) {
        setSource(data);
        setLoading(false);
      }
    };

    fetchImage();
  }, [src]);

  if (loading) {
    return (
      <div className="image-async img">
        <Loader />
      </div>
    );
  }
  return <Image src={source} />;
}
