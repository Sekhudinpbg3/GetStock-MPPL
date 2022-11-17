/* eslint-disable react/display-name */
import Image from "next/image";
import { forwardRef } from "react";
import { NoImage } from "../../../assets";

const NextImage = forwardRef((props, ref) => {
  return (
    <Image
      className={props.className || "object-cover"}
      src={props.src || NoImage}
      alt={props.alt || "no image"}
      loader={typeof props.src === "string" ? () => src : null}
      quality={props.quality || 80}
      {...props}
    />
  );
});

export default NextImage;
