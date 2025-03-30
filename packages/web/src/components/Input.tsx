import { TextField } from '@mui/material';

export type InputProps = {
  label: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  props?: any;
}

export  function Input(props: InputProps) {
  return (
    <TextField
      label={props.label}
      fullWidth
      type={props.type || 'text'}
      defaultValue={"value" in props ? props.value : ''}
      placeholder={props.placeholder}
      disabled={props.disabled}
      onChange={props.onChange}
      {...props.props}
    />
  );
}
