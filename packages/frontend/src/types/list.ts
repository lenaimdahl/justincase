export interface FieldConfig {
  hasCheckbox?: boolean;
  multipleCheckboxes?: boolean;
  checkboxLabels?: string[];
  hasExpiryDate?: boolean;
  hasQuantity?: boolean;
  hasUnit?: boolean;
  hasNotes?: boolean;
  hasPriority?: boolean;
}

export interface List {
  id: string;
  name: string;
  itemCount?: number;
  items?: any[];
  icon: string;
  color: string;
  fieldConfig: FieldConfig;
}
