// Native HTML time input for web platforms.
// Drop-in replacement for DateTimePicker's "time" mode when running in a browser.
import React from "react";
import { StyleSheet, View } from "react-native";
import { Label } from "tamagui";

interface WebTimePickerProps {
  /** Current value in "HH:mm" format (24-hour) or "hh:mm AM/PM" (12-hour) */
  value: string;
  /** Called with the new "HH:mm" string when the user picks a time */
  onChange: (time: string) => void;
  /** Optional label displayed above the picker */
  label?: string;
}

const WebTimePicker = ({ value, onChange, label }: WebTimePickerProps) => {
  // Convert 24-hour format to 12-hour format for display
  const to12Hour = (time24: string): string => {
    if (!time24) return "";
    const [hours, minutes] = time24.split(":");
    const h = parseInt(hours, 10);
    const period = h >= 12 ? "PM" : "AM";
    const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return `${h12.toString().padStart(2, "0")}:${minutes} ${period}`;
  };

  // Convert 12-hour format back to 24-hour format
  const to24Hour = (time12: string): string => {
    const match = time12.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) return time12;
    let [, hours, minutes, period] = match;
    let h = parseInt(hours, 10);
    if (period.toUpperCase() === "PM" && h !== 12) h += 12;
    if (period.toUpperCase() === "AM" && h === 12) h = 0;
    return `${h.toString().padStart(2, "0")}:${minutes}`;
  };

  return (
    <View style={styles.container}>
      {label && <Label style={styles.label}>{label}</Label>}
      <input
        type="time"
        value={value ? to24Hour(value) : ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const time24 = e.target.value;
          onChange(to12Hour(time24)); // Returns "hh:mm AM/PM"
        }}
        style={{
          fontSize: 16,
          padding: 10,
          borderRadius: 8,
          border: "1px solid grey",
          outline: "none",
          fontFamily: "inherit",
          width: "100%",
          boxSizing: "border-box",
          maxWidth: 200,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    marginTop: 15,
    marginBottom: 4,
  },
});

export default WebTimePicker;
