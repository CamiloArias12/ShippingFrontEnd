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

export default function Input(props: InputProps) {
  console.log('asdfasd Input', props.props);
  return (
    <TextField
      label={props.label}
      type={props.type || 'text'}
      defaultValue={"value" in props ? props.value : ''}
      placeholder={props.placeholder}
      disabled={props.disabled}
      onChange={props.onChange}
      {...props.props}
    />
  );
}
