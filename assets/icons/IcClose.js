import * as React from "react"

const IcCircleClose = (props) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      clipPath="url(#a)"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m18.75 5.25-13.5 13.5" strokeWidth={2} />
      <path d="M18.75 18.75 5.25 5.25" strokeWidth={3} />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default IcCircleClose