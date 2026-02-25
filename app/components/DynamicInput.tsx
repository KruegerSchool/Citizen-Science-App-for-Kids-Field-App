// implements dynamic input fields for use on the add observation page
// references: https://www.freecodecamp.org/news/build-dynamic-forms-in-react/
//             https://stackoverflow.com/questions/42053237/is-it-possible-to-dynamically-create-components-in-react-native 
import React from "react";
import { View } from "react-native";
import { Label, Input, TextArea, Separator } from "tamagui";
import { MultiCheckboxField } from "./GroupCheckbox";
import { Option } from "./GroupCheckbox";
import { Field } from "../stores/project_info";

interface InputProps {
  field: Field;
  value: string | string[];
  onChange: (value: string | string[]) => void;
}

// state tracking
const DynamicInput = ({ field, value, onChange }: InputProps) => {
  const renderLabel = () => {
    return (
        <Label style={{marginTop: 15}}>{field.field_label}</Label>
    );
  };

  // helps to map array of strings to label/value options in checkbox group
  function mapOptions(options: string[]): Option[] {
    if (!Array.isArray(options)) {
      return [];
    }
    return options.map(opt => ({
      label: opt,
      value: opt.toLowerCase()
    }));
  }

  // switch case to handle different field types
  switch (field.field_type) {
    case "text":
      return (
        <View>
          {renderLabel()}
          <Input 
            size="$4"
            value={value}
            onChangeText={onChange}
          />
        </View>
      )
    case "textarea":
      return (
        <View>
          {renderLabel()}
          <TextArea
            size="$4"
            value={value}
            onChangeText={onChange}
          />
        </View>
      )
    case "number":
      return (
        <View>
          {renderLabel()}
          <Input
            size="$4"
            value={value}
            onChangeText={onChange}
            keyboardType="numeric"
          />
        </View>
      )
    case "multiselect":
      const optionsArray = JSON.parse(field.field_options);
      return (
        <View>
          {renderLabel()}
          <MultiCheckboxField
            options={mapOptions(optionsArray)}
            value={Array.isArray(value) ? value : []}
            onChange={onChange}
          />
        </View>
      )
    case "radio":
      return (
        <View>
          {renderLabel()}
        </View>
      )
    }
}

export default DynamicInput;