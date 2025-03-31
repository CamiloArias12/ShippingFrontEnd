import { Menu, MenuItem, PopoverOrigin } from '@mui/material';

// Define the menu item interface
export interface StatusMenuItem<T = string> {
  value: any;
  label: string;
  color?: string;
}

interface StatusMenuProps<T = string> {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  items: StatusMenuItem<T>[];
  onSelect: (value: T) => void | Promise<void>;
  transformOrigin?: PopoverOrigin;
  anchorOrigin?: PopoverOrigin;
}


export function StatusMenu<T = string>({
  anchorEl,
  open,
  onClose,
  items,
  onSelect,
  transformOrigin = { horizontal: 'right', vertical: 'top' },
  anchorOrigin = { horizontal: 'right', vertical: 'bottom' }
}: StatusMenuProps<T>) {
  
  const handleSelect = (value: T) => {
    onSelect(value);
    onClose();
  };
  
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      transformOrigin={transformOrigin}
      anchorOrigin={anchorOrigin}
    >
      {items.map((item) => (
        <MenuItem
          key={item.value.toString()}
          onClick={() => handleSelect(item.value)}
          sx={{ color: item.color ? `${item.color}.main` : undefined }}
        >
          {item.label}
        </MenuItem>
      ))}
    </Menu>
  );
}

