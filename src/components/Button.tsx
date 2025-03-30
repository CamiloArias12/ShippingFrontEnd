import Button from '@mui/material/Button';

export type CustomButtonProps ={
    label: string;
    variant?: 'text' | 'outlined' | 'contained';
    disabled?: boolean;
    href?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
}

export default function CustomButton(props: CustomButtonProps) {
  return (
      <Button  variant={props.variant} disabled={props.disabled} href={props.href} onClick={props.onClick} type={props.type}>
        {props.label}
      </Button>
  );
};

