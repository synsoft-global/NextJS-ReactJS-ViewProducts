
const IcHeart = (props) => (
  <svg
    {...props}
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#a)">
      <path
        d="M12 20.25S2.625 15 2.625 8.625A4.875 4.875 0 0 1 12 6.75a4.875 4.875 0 0 1 9.375 1.875C21.375 15 12 20.25 12 20.25Z"
        stroke="#000"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default IcHeart;
