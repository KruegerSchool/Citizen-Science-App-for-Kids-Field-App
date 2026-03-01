// implements dynamic data renderer for copmleted fields for observation list
// references: https://www.freecodecamp.org/news/build-dynamic-forms-in-react/
//             https://stackoverflow.com/questions/42053237/is-it-possible-to-dynamically-create-components-in-react-native
import React from "react";
import { View } from "react-native";
import { Label, Paragraph, Checkbox } from "tamagui";
import { Check as CheckIcon } from "@tamagui/lucide-icons";
import { CompletedField } from "../stores/observation_info";

interface InputProps {
  field: CompletedField;
}

const DynamicDataRender = ({ field }: InputProps) => {
  const renderLabel = () => {
    return <Label style={{ fontWeight: "bold" }}>{field.field_label}:</Label>;
  };

  const renderFieldValue = () => {
    switch (field.field_type) {
      case "text":
        return (
          <View>
            {renderLabel()}
            <Paragraph size="$4" mb={10}>
              {field.field_value}
            </Paragraph>
          </View>
        );
      case "textarea":
        return (
          <View>
            {renderLabel()}
            <Paragraph size="$4" mb={10}>
              {field.field_value}
            </Paragraph>
          </View>
        );
      case "number":
        return (
          <View>
            {renderLabel()}
            <Paragraph size="$4" mb={10}>
              {field.field_value}
            </Paragraph>
          </View>
        );
      case "multiselect":
        const selectionsArray = JSON.parse(field.field_value);
        return (
          <View>
            {renderLabel()}
            {selectionsArray.map((selection: string, index: number) => (
              <Paragraph key={index} size="$4">
                {selection}
              </Paragraph>
            ))}
          </View>
        );
      case "radio":
        return (
          <View>
            {renderLabel()}
            <Paragraph size="$4" mb={10}>
              {field.field_value}
            </Paragraph>
          </View>
        );
      case "date":
        return (
          <View>
            {renderLabel()}
            <Paragraph size="$4" mb={10}>
              {field.field_value.toString()}
            </Paragraph>
          </View>
        );
      case "time":
        return (
          <View>
            {renderLabel()}
            <Paragraph size="$4" mb={10}>
              {field.field_value}
            </Paragraph>
          </View>
        );
      case "checkbox":
        return (
          <View>
            {renderLabel()}
            <Checkbox checked={field.field_value === "true"} disabled>
              <Checkbox.Indicator>
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox>
          </View>
        );
      default:
        return (
          <View>
            {renderLabel()}
            <Paragraph size="$4" mb={10}>
              Unsupported Field Type: {field.field_type}
            </Paragraph>
          </View>
        );
    }
  };

  return renderFieldValue();
};

export default DynamicDataRender;
