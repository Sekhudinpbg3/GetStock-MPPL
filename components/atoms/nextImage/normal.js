/* eslint-disable react/display-name */
import Image from "next/image";
import PropTypes from "prop-types";
import { forwardRef, useState } from "react";
import { NoImage } from "../../../assets";
import { generateRandomBg } from "../../helper";

const Normal = forwardRef((props, refs) => {
  // prettier-ignore
  const { src, imageClass, alt, ...newProps } = props;
  const [showalt, setShowAlt] = useState(false);

  return (
    <>
      {showalt ? alt.charAt(0).toUpperCase() : null}
      <Image
        unoptimized
        itemRef={refs}
        className={imageClass}
        loader={typeof src === "string" ? () => src : null}
        src={src}
        alt={alt}
        quality={80}
        onLoad={() => setShowAlt(false)}
        onError={(e) => {
          e.target.onerror = null;
          e.target.alt = "";
          setShowAlt(true);
          const bgElement = e.currentTarget.parentElement.parentElement;
          const addBg = generateRandomBg();
          bgElement.classList.add(addBg);
        }}
        {...newProps}
      />
    </>
  );
});

// props validators
Normal.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  src: PropTypes.any,
  imageClass: PropTypes.string,
  alt: PropTypes.string,
};

// props deafault value
Normal.defaultProps = {
  src: NoImage,
  imageClass: "",
  alt: "N",
};

export default Normal;
