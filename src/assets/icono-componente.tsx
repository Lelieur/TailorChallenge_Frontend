interface IconoProps {
  width?: string;
  height?: string;
  fill?: string;
}

const Icono: React.FC<IconoProps> = ({
  width = "45",
  height = "40",
  fill = "#264BEB",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 45 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M44.4259 40V33.3332H34.4999C33.4628 33.3332 32.2777 32.7406 31.3888 31.7036L27.0925 26.6666H44.4259V19.9999H32.2777L40.8704 9.77774L35.6851 5.48146L25.7592 17.1851V0H19.0925V17.1851L9.31479 5.48146L4.12964 9.77774L12.7222 19.9999H0.574097V26.6666H17.9074L13.6111 31.7036C12.7222 32.7406 11.537 33.3332 10.5 33.3332H0.574097V40H10.9444C13.6111 40 16.2777 38.9629 17.7592 37.185L22.4999 31.5554L27.2407 37.185C28.7222 38.8147 31.3888 40 34.0555 40H44.4259Z"
        fill={fill}
      />
    </svg>
  );
};

export default Icono;
