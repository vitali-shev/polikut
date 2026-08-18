import SliderNextButton from "@/shared/ui/SliderNextButton";
import SliderPrevButton from "@/shared/ui/SliderPrevButton";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import Paper, { PaperProps } from "@mui/material/Paper";
import { useEffect, useState } from "react";

export default function WallSlider({
  images,
  sx,
}: {
  images: string[];
  sx?: PaperProps["sx"];
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handlePrev = () =>
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const handleNext = () =>
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  useEffect(() => {
    if (images.length <= 1 || isHovered) return;

    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <Paper
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        aspectRatio: "26.4 / 9",
        borderRadius: 2,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0, 0, 0, 0.04)",
        ...sx,
      }}
    >
      <Slide key={currentImageIndex} direction="right" in={true} timeout={400}>
        <Box
          component="img"
          src={images[currentImageIndex]}
          sx={{
            display: "block",
            width: "100%",
          }}
        />
      </Slide>
      {images.length > 1 && (
        <>
          <SliderPrevButton onClick={handlePrev} />
          <SliderNextButton onClick={handleNext} />
        </>
      )}
    </Paper>
  );
}
