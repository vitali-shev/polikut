import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";

export default function AppAutocomplete<
  T,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  ChipComponent extends React.ElementType = "div",
>(
  props: AutocompleteProps<
    T,
    Multiple,
    DisableClearable,
    FreeSolo,
    ChipComponent
  >,
) {
  return (
    <Autocomplete size="small" noOptionsText="Немає варіантів" {...props} />
  );
}
