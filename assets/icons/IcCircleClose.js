const IcCircleClose = ({ ...props }) => {
  return (
    <svg
      {...props}
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <circle cx="21" cy="21" r="21" fill="white" />
      <g clipPath="url(#clip0_729_10766)">
        <path
          d="M27.75 14.25L14.25 27.75"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M27.75 27.75L14.25 14.25"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_729_10766">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(9 9)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IcCircleClose;
