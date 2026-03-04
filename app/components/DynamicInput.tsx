// implements dynamic input fields for use on the add observation page
// references: https://www.freecodecamp.org/news/build-dynamic-forms-in-react/
//             https://stackoverflow.com/questions/42053237/is-it-possible-to-dynamically-create-components-in-react-native
import React from "react";
import { Platform, View } from "react-native";
import {
  Label,
  Input,
  TextArea,
  Checkbox,
  RadioGroup,
  Paragraph,
} from "tamagui";
import { Calendar } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MultiCheckboxField, Option } from "./GroupCheckbox";
import { Field } from "../stores/project_info";
import RadioItem from "./RadioItem";
import { Check as CheckIcon } from "@tamagui/lucide-icons";
import WebTimePicker from "./WebTimePicker";
import {
  parseTimeString,
  formatTimeString,
} from "../../utility_functions/time_functions";

interface InputProps {
  field: Field;
  value: string | string[];
  onChange: (value: string | string[]) => void;
}

// state tracking
const DynamicInput = ({ field, value, onChange }: InputProps) => {
  const renderLabel = () => {
    return <Label style={{ marginTop: 15 }}>{field.field_label}</Label>;
  };

  // helps to map array of strings to label/value options in checkbox group
  function mapOptions(options: string[]): Option[] {
    if (!Array.isArray(options)) {
      return [];
    }
    return options.map((opt) => ({
      label: opt,
      value: opt,
    }));
  }

  // switch case to handle different field types
  // TODO: implement required field logic
  switch (field.field_type) {
    case "text":
      return (
        <View>
          {renderLabel()}
          <Input size="$4" value={value} onChangeText={onChange} />
        </View>
      );
    case "textarea":
      return (
        <View>
          {renderLabel()}
          <TextArea size="$4" value={value} onChangeText={onChange} />
        </View>
      );
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
      );
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
      );
    case "radio":
      return (
        <View>
          {renderLabel()}
          <RadioGroup
            gap={"$2"}
            value={value as string}
            onValueChange={(value) => onChange(value)}
          >
            {JSON.parse(field.field_options).map((option: string) => (
              <RadioItem key={option} option={option} />
            ))}
          </RadioGroup>
        </View>
      );
    case "checkbox":
      return (
        <View>
          {renderLabel()}
          <Checkbox
            onCheckedChange={(checked) => {
              onChange(checked.toString());
            }}
          >
            <Checkbox.Indicator>
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox>
        </View>
      );
    case "date":
      return (
        <View>
          {renderLabel()}
          <Calendar
            style={{ borderColor: "grey", borderRadius: 8, borderWidth: 1 }}
            onDayPress={(day) => {
              onChange(day.dateString);
            }}
            markedDates={{
              [value as string]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: "#0B507D",
              },
            }}
          />
        </View>
      );
    case "time":
      if (Platform.OS === "web") {
        return (
          <View>
            <WebTimePicker
              value={value as string}
              onChange={onChange}
              label={field.field_label}
            />
          </View>
        );
      } else {
        return (
          <View>
            {renderLabel()}
            <DateTimePicker
              value={parseTimeString(value)}
              mode="time"
              display="default"
              onChange={(event, selectedDate) => {
                if (event.type === "set" && selectedDate) {
                  onChange(formatTimeString(selectedDate));
                }
              }}
            />
          </View>
        );
      }

    default:
      return (
        <View>
          <Paragraph>Invalid field type.</Paragraph>
        </View>
      );
  }
};

export default DynamicInput;
