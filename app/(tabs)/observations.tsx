import { useState, useCallback } from "react";
import { useRouter } from "expo-router";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Accordion,
  XStack,
  XGroup,
  Button,
  Separator,
  H2,
  View,
} from "tamagui";
import { useFocusEffect } from "@react-navigation/native";
import { useObservationInfo } from "../stores/observation_info";
import { useStudentID } from "../stores/project_info";
import ObservationList from "../components/ObservationList";
import { Plus, ListFilter } from "@tamagui/lucide-icons";
import fetchObservationList from "@/utility_functions/fetch_observation_list";
import { Toast } from "rn-inkpad";
import { useModalResults } from "../stores/modal_results";
import { appStyles } from "../styles/styles";

// observations list for the project
// displays the list of observations made in the project. observations made by
// the user have an edit button
export default function ObservationsScreen() {
  const router = useRouter();

  // retrieve student ID from persistent storage
  const studentID = useStudentID((state) => state.studentID);

  // on screen focus reload observation list from backend
  useFocusEffect(
    useCallback(() => {
      const loadObservations = async () => {
        try {
          await fetchObservationList();
        } catch (e) {
          console.error("Failed to load observations: ", e);
        }
      };
      loadObservations();
    }, [])
  );

  // pull observation list from zustand store
  const observationList = useObservationInfo((state) => state.observations);

  // filter observations before rendering
  const [filterMine, setFilterMine] = useState(false);
  const filteredObservations = filterMine
    ? observationList.filter((obs) => obs.student_id.toString() === studentID)
    : observationList;

  // state for toast visibility
  const modalResult = useModalResults((state) => state.result);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, minHeight: 0 }}>
        <H2 self="center" mb={10}>
          Project Observations
        </H2>

        <XStack justify="space-between" items="center" mb={2} mt={5} px={10}>
          {/* Filter group */}
          <XStack items="center" gap={8}>
            <ListFilter size={20} color="$color" />
            <XGroup size="$2">
              <XGroup.Item>
                <Button
                  size="$2.5"
                  theme={filterMine ? "blue_accent" : "blue"}
                  onPress={() => setFilterMine(true)}
                >
                  Only Mine
                </Button>
              </XGroup.Item>
              <XGroup.Item>
                <Button
                  size="$2.5"
                  theme={filterMine ? "blue" : "blue_accent"}
                  onPress={() => setFilterMine(false)}
                >
                  All
                </Button>
              </XGroup.Item>
            </XGroup>
          </XStack>

          {/* add obs */}
          <Button
            size="$2.5"
            theme="blue_accent"
            icon={Plus}
            onPress={() => router.push("/add_observation")}
          >
            New
          </Button>
        </XStack>

        <Separator mb={4} />
        <Accordion type="multiple" style={{ flex: 1, marginBottom: -30 }}>
          <FlatList
            style={{ flex: 1 }}
            data={filteredObservations}
            keyExtractor={(item) => item.observation_id.toString()}
            extraData={filteredObservations}
            renderItem={({ item }) => (
              <ObservationList item={item} appUser={studentID} />
            )}
          />
        </Accordion>
        { /* Toast for add and save confirmation messages */ }
        <View
          pointerEvents="box-none"
          style={appStyles.toast}
        >
          <Toast
            visible={modalResult !== null}
            position="bottom"
            text={modalResult as string}
            duration={1000}
            setVisible={() => useModalResults.getState().setResult(null)}
            />
        </View>
      </View>
    </SafeAreaView>
  );
}
