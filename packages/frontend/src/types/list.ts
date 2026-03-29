export interface FieldConfig {
  hasCheckbox?: boolean;
  multipleCheckboxes?: boolean;
  checkboxLabels?: string[];
  hasExpiryDate?: boolean;
  hasQuantity?: boolean;
  hasNotes?: boolean;
  hasPriority?: boolean;
}

export interface List {
  id: string;
  name: string;
  itemCount: number;
  icon: string;
  color: string;
  fieldConfig: FieldConfig;
}
