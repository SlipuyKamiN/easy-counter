import { colors } from "./vars";

export const getTheme = (mode = "light") => ({
  mode,
  colors: colors[mode],
  accent: colors.accent,
  base: {
    black: colors.classicBlack,
    white: colors.classicWhite,
    error: colors.errorRed,
    success: colors.success,
  },
});
