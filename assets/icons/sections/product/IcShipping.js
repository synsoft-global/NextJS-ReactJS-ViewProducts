const IcShipping = (props) => (
  <svg
    {...props}
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g
      clipPath="url(#a)"
      stroke="#000"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M21 16.622V7.378a.759.759 0 0 0-.384-.656l-8.25-4.64a.73.73 0 0 0-.732 0l-8.25 4.64A.76.76 0 0 0 3 7.378v9.244a.76.76 0 0 0 .384.656l8.25 4.64a.73.73 0 0 0 .732 0l8.25-4.64a.76.76 0 0 0 .384-.656v0Z" />
      <path d="M16.594 14.297V9.422L7.5 4.406" />
      <path d="M20.897 6.994 12.085 12 3.104 6.994M12.084 12 12 22.012" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default IcShipping;
