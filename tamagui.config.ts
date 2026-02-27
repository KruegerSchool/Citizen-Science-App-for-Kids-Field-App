// directly from tamagui docs, enables animations
// references: https://tamagui.dev/docs/core/configuration
//             https://tamagui.dev/docs/core/animations
import { defaultConfig } from "@tamagui/config/v5";
import { animations } from "@tamagui/config/v5-css"; // or v5-motion, v5-rn, v5-reanimated
import { createTamagui } from "tamagui";

export const config = createTamagui({
  ...defaultConfig,
  animations,
});

type OurConfig = typeof config;

declare module "tamagui" {
  interface TamaguiCustomConfig extends OurConfig {}
}
