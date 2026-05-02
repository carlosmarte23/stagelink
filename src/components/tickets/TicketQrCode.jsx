import { useEffect, useRef } from "react";
import QRCode from "qrcode";

export default function TicketQrCode({
  value,
  size = 96,
  label = "Ticket QR Code",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!value || !canvasRef.current) return;

    QRCode.toCanvas(canvasRef.current, value, {
      width: size,
      margin: 1,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    });
  }, [value, size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      aria-label={label}
      role="img"
    />
  );
}
