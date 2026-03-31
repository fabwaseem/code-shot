import type { Extension } from "@codemirror/state"
import { color as oneDarkPalette, oneDark } from "@codemirror/theme-one-dark"
import { androidstudio, defaultSettingsAndroidstudio } from "@uiw/codemirror-theme-androidstudio"
import { atomone, defaultSettingsAtomone } from "@uiw/codemirror-theme-atomone"
import { aura, defaultSettingsAura } from "@uiw/codemirror-theme-aura"
import { bbedit, defaultSettingsBbedit } from "@uiw/codemirror-theme-bbedit"
import { copilot, defaultSettingsCopilot } from "@uiw/codemirror-theme-copilot"
import { dracula, defaultSettingsDracula } from "@uiw/codemirror-theme-dracula"
import { eclipse, defaultSettingsEclipse } from "@uiw/codemirror-theme-eclipse"
import {
  githubDark,
  defaultSettingsGithubDark,
  githubLight,
  defaultSettingsGithubLight,
} from "@uiw/codemirror-theme-github"
import { kimbie, defaultSettingsKimbie } from "@uiw/codemirror-theme-kimbie"
import {
  material,
  materialLight,
  defaultSettingsMaterial,
  defaultSettingsMaterialLight,
} from "@uiw/codemirror-theme-material"
import { monokai, defaultSettingsMonokai } from "@uiw/codemirror-theme-monokai"
import { nord, defaultSettingsNord } from "@uiw/codemirror-theme-nord"
import { okaidia, defaultSettingsOkaidia } from "@uiw/codemirror-theme-okaidia"
import { quietlight, defaultSettingsQuietlight } from "@uiw/codemirror-theme-quietlight"
import { red, defaultSettingsRed } from "@uiw/codemirror-theme-red"
import {
  solarizedDark,
  defaultSettingsSolarizedDark,
  solarizedLight,
  defaultSettingsSolarizedLight,
} from "@uiw/codemirror-theme-solarized"
import { sublime, defaultSettingsSublime } from "@uiw/codemirror-theme-sublime"
import { tomorrowNightBlue, defaultSettingsTomorrowNightBlue } from "@uiw/codemirror-theme-tomorrow-night-blue"
import { tokyoNight, defaultSettingsTokyoNight } from "@uiw/codemirror-theme-tokyo-night"
import {
  vscodeDark,
  defaultSettingsVscodeDark,
  vscodeLight,
  defaultSettingsVscodeLight,
} from "@uiw/codemirror-theme-vscode"
import {
  xcodeDark,
  defaultSettingsXcodeDark,
  xcodeLight,
  defaultSettingsXcodeLight,
} from "@uiw/codemirror-theme-xcode"

export type CMThemeEntry = {
  id: string
  name: string
  extension: Extension
  background: string
  foreground: string
}

function entry(
  id: string,
  name: string,
  extension: Extension,
  settings: { background?: string; foreground?: string }
): CMThemeEntry {
  return {
    id,
    name,
    extension,
    background: settings.background ?? "#1e1e1e",
    foreground: settings.foreground ?? "#d4d4d4",
  }
}

export const CM_THEMES: CMThemeEntry[] = [
  entry("vscodeDark", "VS Code Dark", vscodeDark, defaultSettingsVscodeDark),
  entry("vscodeLight", "VS Code Light", vscodeLight, defaultSettingsVscodeLight),
  entry("oneDark", "One Dark", oneDark, {
    background: oneDarkPalette.background,
    foreground: oneDarkPalette.ivory,
  }),
  entry("dracula", "Dracula", dracula, defaultSettingsDracula),
  entry("githubDark", "GitHub Dark", githubDark, defaultSettingsGithubDark),
  entry("githubLight", "GitHub Light", githubLight, defaultSettingsGithubLight),
  entry("tokyoNight", "Tokyo Night", tokyoNight, defaultSettingsTokyoNight),
  entry("nord", "Nord", nord, defaultSettingsNord),
  entry("monokai", "Monokai", monokai, defaultSettingsMonokai),
  entry("solarizedDark", "Solarized Dark", solarizedDark, defaultSettingsSolarizedDark),
  entry("solarizedLight", "Solarized Light", solarizedLight, defaultSettingsSolarizedLight),
  entry("material", "Material Dark", material, defaultSettingsMaterial),
  entry("materialLight", "Material Light", materialLight, defaultSettingsMaterialLight),
  entry("okaidia", "Okaidia", okaidia, defaultSettingsOkaidia),
  entry("sublime", "Sublime", sublime, defaultSettingsSublime),
  entry("bbedit", "BBEdit", bbedit, defaultSettingsBbedit),
  entry("aura", "Aura", aura, defaultSettingsAura),
  entry("androidstudio", "Android Studio", androidstudio, defaultSettingsAndroidstudio),
  entry("atomone", "Atom One", atomone, defaultSettingsAtomone),
  entry("eclipse", "Eclipse", eclipse, defaultSettingsEclipse),
  entry("kimbie", "Kimbie", kimbie, defaultSettingsKimbie),
  entry("xcodeDark", "Xcode Dark", xcodeDark, defaultSettingsXcodeDark),
  entry("xcodeLight", "Xcode Light", xcodeLight, defaultSettingsXcodeLight),
  entry("copilot", "Copilot", copilot, defaultSettingsCopilot),
  entry("quietlight", "Quiet Light", quietlight, defaultSettingsQuietlight),
  entry("red", "Red", red, defaultSettingsRed),
  entry("tomorrowNightBlue", "Tomorrow Night Blue", tomorrowNightBlue, defaultSettingsTomorrowNightBlue),
]

export function getCMTheme(id: string): CMThemeEntry {
  return CM_THEMES.find((t) => t.id === id) ?? CM_THEMES[0]
}
