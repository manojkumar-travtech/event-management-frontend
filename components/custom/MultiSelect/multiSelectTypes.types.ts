import { FormFieldOption } from "../newForm/Formtypes.types";

export interface MultiSelectDropdownProps {
  options: FormFieldOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}
