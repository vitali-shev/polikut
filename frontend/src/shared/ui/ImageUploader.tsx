import { Avatar, Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import defaultImage from "./assets/default-image.svg";

export type ImageUploaderProps = {
  url?: string;
  file: File | null;
  onChange: (file: File) => void;
};

export default function ImageUploader({
  url = "",
  file,
  onChange,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }

    setPreview(url || null);
  }, [file, url]);

  return (
    <Box
      onClick={() => inputRef.current?.click()}
      sx={{
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        borderRadius: 2,
        padding: 0,
        width: 158,
        height: 158,
        border: preview ? "none" : "1px dashed rgb(200, 200, 200)",
        "&:hover [data-overlay]": { opacity: 1 },
      }}
    >
      <Avatar
        src={preview || defaultImage}
        variant="square"
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
        }}
      />
      <Box
        data-overlay
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(0, 0, 0, 0.07)",
          opacity: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          ref={inputRef}
          hidden
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              onChange(file);
            }
            e.target.value = "";
          }}
        />
      </Box>
    </Box>
  );
}
