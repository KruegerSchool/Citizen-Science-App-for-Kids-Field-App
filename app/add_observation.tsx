// allows for adding new observations to the project that has been joined
// dynamically renders input fields based on project details and field values
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Platform } from "react-native";
import DynamicInput from "./components/DynamicInput";
import { useProjectInfo, Field } from "./stores/project_info";
import {
  Button,
  H2,
  Form,
  YStack,
  Switch,
  XStack,
  Label,
  Separator,
} from "tamagui";
import {
  createObservationHandler,
  FieldData,
  ObservationMetadata,
} from "../utility_functions/create_update_observation";
import { getMissingRequiredFieldLabels } from "../utility_functions/required_fields";
import { ChevronLeft } from "@tamagui/lucide-icons";
import fetchProjectInfo from "../utility_functions/fetch_project";
import { alert } from "react-native-alert-queue";
import { useModalResults } from "./stores/modal_results";
import { getCurrentCoordinates } from "../utility_functions/geolocation_tagging";

export default function AddObservation() {
  const router = useRouter();

  // pulls latest fields when adding an observation
  useEffect(() => {
    // fetch latest project info
    const loadProjectInfo = async () => {
      try {
        await fetchProjectInfo(useProjectInfo.getState().projectCode);
      } catch (e) {
        console.error("Failed to load project info: ", e);
      }
    };
    loadProjectInfo();
  }, []);

  // Track values for each field ref https://react.dev/reference/react/useState
  const [values, setValues] = useState<{ [key: string]: string | string[] }>(
    {},
  );
  const [includeLocation, setIncludeLocation] = useState<boolean>(false);

  const handleChange = (field_id: string, value: string | string[]) => {
    setValues((prev) => ({
      ...prev,
      [field_id]: value,
    }));
  };

  const renderItem = ({ item }: { item: Field }) => (
    <DynamicInput
      field={item}
      value={values[item.field_id] || ""}
      onChange={(value) => handleChange(item.field_id, value)}
    />
  );

  const fields = useProjectInfo((state) => state.fields);

  // default certain fields to make sure they are logged even if they don't get edited
  // when adding observations
  useEffect(() => {
    const checkboxDefaults: { [key: string]: string } = {};
    const timeDefaults: { [key: string]: string } = {};
    const dateDefaults: { [key: string]: string } = {};
    fields.forEach((field) => {
      if (field.field_type === "checkbox") {
        checkboxDefaults[field.field_id] = "false";
      } else if (field.field_type === "time") {
        const hours = (((new Date().getHours() + 11) % 12) + 1)
          .toString()
          .padStart(2, "0");
        const minutes = new Date().getMinutes().toString().padStart(2, "0");
        const am_pm = new Date().getHours() >= 12 ? "PM" : "AM";
        timeDefaults[field.field_id] = `${hours}:${minutes} ${am_pm}`;
      } else if (field.field_type === "date") {
        dateDefaults[field.field_id] = new Date().toISOString().split("T")[0];
      }
    });
    setValues((prev) => ({
      ...checkboxDefaults,
      ...timeDefaults,
      ...dateDefaults,
      ...prev,
    }));
  }, [fields]);

  const mapValuestoFieldData = (
    formValues: Record<string, string | string[]>,
  ): FieldData => {
    const data = Object.entries(formValues).map(([field_id, value]) => ({
      field_id: parseInt(field_id, 10),
      value: Array.isArray(value) ? value.join(",") : value,
    }));
    return { data };
  };

  return (
    <SafeAreaView style={{ margin: 20, flex: 1 }}>
      <YStack flex={1} p="$2">
        {Platform.OS === "web" ? (
          <Button
            mt="$2"
            theme="blue_accent"
            icon={ChevronLeft}
            maxW={100}
            onPress={() => router.back()}
          >
            Go Back
          </Button>
        ) : (
          <></>
        )}
        <H2 self="center" mb={"$4"}>
          Add Observation
        </H2>
        <Form
          flex={1}
          onSubmit={async () => {
            let locationMetadata: ObservationMetadata | undefined;

            if (includeLocation) {
              try {
                const coordinates = await getCurrentCoordinates();
                locationMetadata = {
                  latitude: coordinates.latitude,
                  longitude: coordinates.longitude,
                };
              } catch {
                alert.show({
                  title: "Location unavailable",
                  message:
                    "Unable to get your location. Please check permissions and try again.",
                  buttons: [{ text: "OK" }],
                });
                return;
              }
            }

            const missingRequiredFields = getMissingRequiredFieldLabels(
              fields,
              values,
            );
            if (missingRequiredFields.length > 0) {
              alert.show({
                title: "Required fields missing",
                message: `Please complete: ${missingRequiredFields.join(", ")}`,
                buttons: [{ text: "OK" }],
              });
              return;
            }

            const mappedData = mapValuestoFieldData(values);
            const result = await createObservationHandler(
              mappedData,
              locationMetadata,
            );
            if (result === 1) {
              useModalResults.getState().setResult("Observation recorded!");
              router.back();
            } else {
              // intended to handle unexpected server errors
              alert.show({
                title: "Error",
                message:
                  "There was an error recording your observation. Please try again.",
                buttons: [{ text: "OK" }],
              });
            }
          }}
        >
          <FlatList
            data={fields}
            keyExtractor={(item: Field) => item.field_id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 30 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            automaticallyAdjustKeyboardInsets={true}
            style={{ flex: 1 }}
          />
          <XStack style={{ alignItems: "center" }} mt={"$2"}>
            <Label pr="$0" minW={90} justify="flex-end" size={"$3"}>
              Include Location?
            </Label>
            <Separator vertical mx="$2" />
            <Switch
              transition="300ms"
              size={"$3"}
              checked={includeLocation}
              onCheckedChange={(checked) =>
                setIncludeLocation(Boolean(checked))
              }
              activeStyle={{
                backgroundColor: "$green10",
              }}
            >
              <Switch.Thumb transition="quickest" />
            </Switch>
          </XStack>

          <Form.Trigger asChild>
            <Button mt={"$4"} mb={"$4"} theme="blue_accent">
              Record Observation
            </Button>
          </Form.Trigger>
        </Form>
      </YStack>
    </SafeAreaView>
  );
}
