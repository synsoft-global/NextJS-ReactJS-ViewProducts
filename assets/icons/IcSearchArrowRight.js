const IcSearchArrowRight = ({ strokeColor = "white", ...props }) => {
  return (
    <svg
      {...props}
      width="28"
      height="28"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_464_3134)">
        <path
          d="M4.59766 21.6716L38.0902 21.6716"
          stroke={strokeColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M29.5527 11.8209L39.4035 21.6717L29.5527 31.5224"
          stroke={strokeColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_464_3134">
          <rect width="44" height="44" fill={strokeColor} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IcSearchArrowRight;
