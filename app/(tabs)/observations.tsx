import { useState } from "react";
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
import { useObservationInfo } from "../stores/observation_info";
import { useStudentID } from "../stores/project_info";
import ObservationList from "../components/ObservationList";
import { Plus, ListFilter } from "@tamagui/lucide-icons";

// observations list for the project
// displays the list of observations made in the project. observations made by
// the user have an edit button
export default function ObservationsScreen() {
  const router = useRouter();

  // retrieve student ID from persistent storage
  const studentID = useStudentID((state) => state.studentID);

  // pull observation list from zustand store
  const observationList = useObservationInfo((state) => state.observations);

  // filter logic
  const [filterMine, setFilterMine] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
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
        <Accordion type="multiple" mb={60}>
          <FlatList
            data={observationList}
            renderItem={({ item }) =>
              filterMine && item.student_id.toString() !== studentID ? (
                <></>
              ) : (
                <ObservationList item={item} appUser={studentID} />
              )
            }
          />
        </Accordion>
      </View>
    </SafeAreaView>
  );
}
