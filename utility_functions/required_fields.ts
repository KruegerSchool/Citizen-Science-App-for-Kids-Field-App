type FieldValue = string | string[] | undefined;

type RequiredValidatableField = {
  field_id: string;
  field_label: string;
  field_required: boolean;
  field_type: string;
};

const isFieldMissingRequiredValue = (
  field: RequiredValidatableField,
  fieldValue: FieldValue,
): boolean => {
  if (!field.field_required) {
    return false;
  }

  if (field.field_type === "checkbox") {
    return fieldValue !== "true" && fieldValue !== "false";
  }

  if (Array.isArray(fieldValue)) {
    return fieldValue.length === 0;
  }

  return !fieldValue || fieldValue.trim() === "";
};

const getMissingRequiredFieldLabels = (
  fields: RequiredValidatableField[],
  values: Record<string, string | string[]>,
): string[] => {
  return fields
    .filter((field) =>
      isFieldMissingRequiredValue(field, values[field.field_id]),
    )
    .map((field) => field.field_label);
};

export { isFieldMissingRequiredValue, getMissingRequiredFieldLabels };
