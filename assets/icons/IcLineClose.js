const IcLineClose = ({ ...props }) => {
  return (
    <svg 
      { ...props }
      width="24" 
      height="24" viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2619_7876)">
      <path d="M18.75 5.25L5.25 18.75" stroke="black" stroke-width="2" stroke-linecap="round" strokeLinejoin="round"/>
      <path d="M18.75 18.75L5.25 5.25" stroke="black" stroke-width="2" stroke-linecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
      <clipPath id="clip0_2619_7876">
      <rect width="24" height="24" fill="white"/>
      </clipPath>
      </defs>
    </svg>
  );
};

export default IcLineClose;