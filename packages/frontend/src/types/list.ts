export interface FieldConfig {
  checkboxLabels?: string[];
  hasCheckbox?: boolean;
  hasExpiryDate?: boolean;
  hasNotes?: boolean;
  hasPriority?: boolean;
  hasQuantity?: boolean;
  hasUnit?: boolean;
  multipleCheckboxes?: boolean;
}

export interface List {
  color: string;
  fieldConfig: FieldConfig;
  icon: string;
  id: string;
  itemCount?: number;
  items?: any[];
  name: string;
}
