// implements component for creating necessary radio button fields
// reference: https://tamagui.dev/ui/radio-group
import { Label, RadioGroup, XStack } from "tamagui";

interface RadioItemProp {
  option: string;
}

export default function RadioItem({ option }: RadioItemProp) {
  const id = `radio-${option}`;
  return (
    <XStack gap="$2" items="center">
      <RadioGroup.Item value={option} id={id}>
        <RadioGroup.Indicator />
      </RadioGroup.Item>
      <Label htmlFor={id}>{option}</Label>
    </XStack>
  );
}
