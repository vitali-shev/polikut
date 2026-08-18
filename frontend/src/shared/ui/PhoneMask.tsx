import { IMaskInput } from "react-imask";

export default function PhoneMask({
  ref,
  onChange,
  value,
  name,
  ...other
}: any) {
  return (
    <IMaskInput
      {...other}
      mask="+{38\0} (00) 000 00 00"
      value={value}
      inputRef={ref}
      overwrite
      lazy={false}
      onAccept={(value: string) =>
        onChange({
          target: {
            name,
            value,
          },
        })
      }
    />
  );
}
