const IcDurable = (props) => (
  <svg
    {...props}
    width={32}
    height={32}
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g
      clipPath="url(#a)"
      stroke="#000"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M5 14.338V7a1 1 0 0 1 1-1h20a1 1 0 0 1 1 1v7.338c0 10.5-8.913 13.975-10.688 14.562a.9.9 0 0 1-.625 0C13.913 28.313 5 24.837 5 14.338Z" />
      <path d="M25.3 21.512 16 15l-9.3 6.512" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h32v32H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default IcDurable;
