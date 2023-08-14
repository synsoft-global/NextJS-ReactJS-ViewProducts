import * as React from "react"
const IcSpin = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
  >
    <circle cx={4.39} cy={4.203} r={1.5} fill="#000" />
    <circle cx={2.25} cy={8.538} r={1.5} fill="#000" />
    <circle cx={4.006} cy={13.092} r={1.5} fill="#000" />
    <circle
      cx={1.5}
      cy={1.5}
      r={1.5}
      fill="#000"
      opacity={0.2}
      transform="matrix(-1 0 0 1 14.561 2.703)"
    />
    <circle
      cx={1.5}
      cy={1.5}
      r={1.5}
      fill="#000"
      opacity={0.4}
      transform="matrix(-1 0 0 1 16.701 7.038)"
    />
    <circle
      cx={1.5}
      cy={1.5}
      r={1.5}
      fill="#000"
      opacity={0.6}
      transform="matrix(-1 0 0 1 14.945 11.592)"
    />
    <circle cx={8.726} cy={2.25} r={1.5} fill="#000" />
    <circle cx={8.726} cy={15.044} r={1.5} fill="#000" opacity={0.8} />
  </svg>
)
export default IcSpin