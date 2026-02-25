// component for rendering a group of checkboxes
// generated using GPT-4.1 and providing the docs for the Tamagui UI library
// being used for the rest of the app along with other component code
import { YStack, XStack, Checkbox, Label } from "tamagui";
import { Check } from "@tamagui/lucide-icons";

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  value: string[];
  onChange: (vals: string[]) => void;
};

function MultiCheckboxField({ options, value, onChange }: Props) {
  const toggle = (val: string) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  return (
    <YStack gap="$1">
      {options.map((option) => {
        const checked = value.includes(option.value);

        return (
          <XStack key={option.value} gap="$2" style={{ alignItems: "center" }}>
            <Checkbox
              id={option.value}
              checked={checked}
              onCheckedChange={() => toggle(option.value)}
            >
              <Checkbox.Indicator>
                <Check />
              </Checkbox.Indicator>
            </Checkbox>

            <Label htmlFor={option.value}>{option.label}</Label>
          </XStack>
        );
      })}
    </YStack>
  );
}

export { MultiCheckboxField, Option };
