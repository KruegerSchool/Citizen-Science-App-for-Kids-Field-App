// implements dynamic data renderer for copmleted fields for observation list
// references: https://www.freecodecamp.org/news/build-dynamic-forms-in-react/
//             https://stackoverflow.com/questions/42053237/is-it-possible-to-dynamically-create-components-in-react-native
import React from "react";
import { View } from "react-native";
import { Label, Paragraph, Checkbox } from "tamagui";
import { CompletedField } from "../stores/observation_info";

interface InputProps {
  field: CompletedField;
}

const DynamicDataRender = ({ field }: InputProps) => {
  const renderLabel = () => {
    return <Label style={{ marginTop: 15 }}>{field.field_label}</Label>;
  };

  console.log(field);

  return (
    <View>
      {renderLabel()}
      <Paragraph size="$4">{field.field_value}</Paragraph>
    </View>
  )

  // switch case to handle different field types (pending implementation of field_type in CompletedField)
  // switch (field.field_name) {
  //   case "text":
  //     return (
  //       <View>
  //         {renderLabel()}
  //         <Paragraph size="$4">{field.field_value}</Paragraph>
  //       </View>
  //     );
  //   case "textarea":
  //     return (
  //       <View>
  //         {renderLabel()}
  //         <Paragraph size="$4">{field.field_value}</Paragraph>
  //       </View>
  //     );
  //   case "number":
  //     return (
  //       <View>
  //         {renderLabel()}
  //         <Paragraph size="$4">{field.field_value}</Paragraph>
  //       </View>
  //     );
  //   case "multiselect":
  //     const selectionsArray = JSON.parse(field.field_value);
  //     return (
  //       <View>
  //         {renderLabel()}
  //         {selectionsArray.map((selection: string, index: number) => (
  //           <Checkbox key={index} checked disabled>
  //             {selection}
  //           </Checkbox>
  //         ))}
  //       </View>
  //     );
  //   case "radio":
  //     return <View>{renderLabel()}</View>;
  //   default:
  //     return (
  //       <View>
  //         {renderLabel()}
  //         <Paragraph size="$4">NONE</Paragraph>
  //       </View>
  //     );
  // }
};

export default DynamicDataRender;
