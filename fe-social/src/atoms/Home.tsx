export const Home = ({ state = true }: { state: boolean }) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.005 15.545C8.005 14.7501 8.32075 13.9878 8.8828 13.4258C9.44485 12.8638 10.2071 12.548 11.002 12.548C11.3957 12.5479 11.7855 12.6253 12.1492 12.7758C12.5129 12.9264 12.8434 13.1471 13.1218 13.4254C13.4002 13.7038 13.6211 14.0342 13.7718 14.3979C13.9224 14.7615 14 15.1513 14 15.545V21H21V10.543L11 1L1 10.543V21H8.005V15.545Z"
        fill={state ? "black" : "none"}
        stroke={state ? "none" : "black"}
        stroke-width="2"
        stroke-linejoin="round"
      />
    </svg>
  );
};