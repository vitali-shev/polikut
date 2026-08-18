import { useGetProductOptionsQuery } from "@/entities/product/api";
import { ProductOption } from "@/entities/product/model";
import AppAutocomplete from "@/shared/ui/AppAutocomplete";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { routes } from "@/app/router/routes";
import { SxProps, Theme } from "@mui/material/styles";

export default function HeaderProductSearch({ sx }: { sx?: SxProps<Theme> }) {
  const { data: options = [] } = useGetProductOptionsQuery();
  const [option, setOption] = useState<ProductOption | null>(null);
  return (
    <AppAutocomplete
      sx={sx}
      options={options}
      getOptionLabel={(option) => option.title}
      onChange={(_, newValue) => setOption(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Пошук товарів..."
          slotProps={{
            ...params.slotProps,
            input: {
              ...params.slotProps?.input,
              startAdornment: <SearchIcon />,
              endAdornment: (
                <Button
                  component={Link}
                  to={
                    option !== null
                      ? routes.PRODUCTS.DETAILS.getPath(option.id)
                      : "#"
                  }
                  variant="contained"
                  sx={{
                    borderRadius: 0,
                    height: 42,
                    ml: 0.8,
                    bgcolor: "black",
                  }}
                >
                  Знайти
                </Button>
              ),
              sx: {
                pr: "0 !important",
              },
            },
          }}
          sx={{
            overflow: "hidden",
            borderRadius: 2,
            backgroundColor: "white",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiOutlinedInput-root": {
              height: 42,
            },
          }}
        />
      )}
    />
  );
}
