"use client"

import { Settings2 } from "lucide-react"

import { AspectRatioSelector } from "@/components/AspectRatioSelector"
import { BackgroundSelector } from "@/components/BackgroundSelector"
import { CustomInput as Input } from "@/components/CustomInput"
import { CustomSelect as Select } from "@/components/CustomSelect"
import { CustomSlider as Slider } from "@/components/CustomSlider"
import { SwitchGroup } from "@/components/SwitchGroup"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { CM_THEMES } from "@/lib/codemirror-themes"
import { FONTS, LANGUAGES, useAppStore } from "@/store/useStore"

export function SettingsSidebar() {
  const {
    padding,
    setPadding,
    radius: borderRadius,
    setRadius: setBorderRadius,
    background,
    setBackground,
    showBackground,
    setShowBackground,
    backgroundOpacity,
    setBackgroundOpacity,
    aspectRatio,
    setAspectRatio,
    showTitle,
    setShowTitle,
    windowStyle,
    setWindowStyle,
    showReflection,
    setShowReflection,
    showWatermark,
    setShowWatermark,
    watermarkText,
    setWatermarkText,
    watermarkImage,
    setWatermarkImage,
    showShadow,
    setShowShadow,
    shadowX,
    setShadowX,
    shadowY,
    setShadowY,
    shadowBlur,
    setShadowBlur,
    shadowSpread,
    setShadowSpread,
    shadowColor,
    setShadowColor,
    shadowOpacity,
    setShadowOpacity,
    borderStyle,
    setBorderStyle,
    language,
    setLanguage,
    themeId,
    setThemeId,
    showLineNumbers,
    setShowLineNumbers,
    highlightedLinesInput,
    setHighlightedLinesInput,
    fontFamily,
    setFontFamily,
    fontSize,
    setFontSize,
    fontWeight,
    setFontWeight,
    fontLigatures,
    setFontLigatures,
  } = useAppStore()

  return (
    <div className="space-y-8 p-5 md:p-6">
      <div className="space-y-4">
        <h3 className="text-xs font-semibold tracking-wide text-foreground/90 uppercase">
          Frame
        </h3>

        <div className="space-y-4">
          <Slider
            label="Padding"
            value={padding}
            onChange={(e) => setPadding(Number(e.target.value))}
            min={16}
            max={128}
            step={8}
          />

          <Slider
            label="Radius"
            value={borderRadius}
            onChange={(e) => setBorderRadius(Number(e.target.value))}
            min={0}
            max={32}
            step={4}
          />

          <SwitchGroup
            label="Visible"
            options={[
              { label: "Yes", value: true },
              { label: "No", value: false },
            ]}
            value={showBackground}
            onChange={setShowBackground}
          />

          <Slider
            label="Opacity"
            value={backgroundOpacity}
            onChange={(e) => setBackgroundOpacity(Number(e.target.value))}
            min={0}
            max={100}
          />

          <BackgroundSelector background={background} onChange={setBackground} />

          <AspectRatioSelector aspectRatio={aspectRatio} onChange={setAspectRatio} />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-semibold tracking-wide text-foreground/90 uppercase">
          Window
        </h3>

        <div className="space-y-4">
          <SwitchGroup
            label="Header"
            options={[
              { label: "Yes", value: true },
              { label: "No", value: false },
            ]}
            value={showTitle}
            onChange={setShowTitle}
          />

          <Select
            label="Window"
            options={[
              { label: "Mac", value: "mac" },
              { label: "Windows", value: "windows" },
              { label: "Chrome", value: "chrome" },
              { label: "Safari", value: "safari" },
              { label: "None", value: "none" },
            ]}
            value={windowStyle}
            onChange={(e) => setWindowStyle(e.target.value as typeof windowStyle)}
          />

          <SwitchGroup
            label="Reflection"
            options={[
              { label: "Show", value: true },
              { label: "Hide", value: false },
            ]}
            value={showReflection}
            onChange={setShowReflection}
          />

          <div className="flex items-center justify-between">
            <label className="text-xs text-muted-foreground">Watermark</label>
            <div className="flex items-center gap-2">
              <Switch checked={showWatermark} onCheckedChange={setShowWatermark} />
              <Popover>
                <PopoverTrigger className="glass-button inline-flex h-7 items-center justify-center rounded-lg px-2 text-xs font-medium">
                  <Settings2 className="mr-1 h-3 w-3" />
                  Config
                </PopoverTrigger>
                <PopoverContent className="glass-panel w-64 p-4" align="end">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Watermark</h4>

                    <div className="space-y-2">
                      <label className="text-xs text-muted-foreground">Text</label>
                      <Input
                        type="text"
                        value={watermarkText}
                        onChange={(e) => setWatermarkText(e.target.value)}
                        className="h-8 text-xs"
                        placeholder="CodeImage"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-muted-foreground">
                        Image (URL or Base64)
                      </label>
                      <div className="flex gap-2">
                        <Input
                          type="text"
                          value={watermarkImage || ""}
                          onChange={(e) => setWatermarkImage(e.target.value || null)}
                          className="h-8 flex-1 text-xs"
                          placeholder="https://..."
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-2"
                          onClick={() => {
                            const input = document.createElement("input")
                            input.type = "file"
                            input.accept = "image/*"
                            input.onchange = (e) => {
                              const file = (e.target as HTMLInputElement).files?.[0]
                              if (file) {
                                const reader = new FileReader()
                                reader.onload = (ev) => {
                                  setWatermarkImage(ev.target?.result as string)
                                }
                                reader.readAsDataURL(file)
                              }
                            }
                            input.click()
                          }}
                        >
                          File
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-xs text-muted-foreground">Shadow</label>
            <div className="flex items-center gap-2">
              <Switch checked={showShadow} onCheckedChange={setShowShadow} />
              <Popover>
                <PopoverTrigger className="glass-button inline-flex h-7 items-center justify-center rounded-lg px-2 text-xs font-medium">
                  <Settings2 className="mr-1 h-3 w-3" />
                  Config
                </PopoverTrigger>
                <PopoverContent className="glass-panel w-64 p-4" align="end">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Shadow</h4>

                    <Slider
                      label="X Offset"
                      value={shadowX}
                      displayValue={`${shadowX}px`}
                      onChange={(e) => setShadowX(Number(e.target.value))}
                      min={-100}
                      max={100}
                      step={1}
                    />

                    <Slider
                      label="Y Offset"
                      value={shadowY}
                      displayValue={`${shadowY}px`}
                      onChange={(e) => setShadowY(Number(e.target.value))}
                      min={-100}
                      max={100}
                      step={1}
                    />

                    <Slider
                      label="Blur"
                      value={shadowBlur}
                      displayValue={`${shadowBlur}px`}
                      onChange={(e) => setShadowBlur(Number(e.target.value))}
                      min={0}
                      max={100}
                      step={1}
                    />

                    <Slider
                      label="Spread"
                      value={shadowSpread}
                      displayValue={`${shadowSpread}px`}
                      onChange={(e) => setShadowSpread(Number(e.target.value))}
                      min={-50}
                      max={50}
                      step={1}
                    />

                    <Slider
                      label="Opacity"
                      value={shadowOpacity}
                      displayValue={`${shadowOpacity}%`}
                      onChange={(e) => setShadowOpacity(Number(e.target.value))}
                      min={0}
                      max={100}
                      step={1}
                    />

                    <div className="space-y-2">
                      <label className="text-xs text-muted-foreground">Color</label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={shadowColor}
                          onChange={(e) => setShadowColor(e.target.value)}
                          className="h-8 w-8 cursor-pointer overflow-hidden rounded border-0 p-0"
                        />
                        <Input
                          type="text"
                          value={shadowColor}
                          onChange={(e) => setShadowColor(e.target.value)}
                          className="h-8 flex-1 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <Select
            label="Border"
            value={borderStyle}
            onChange={(e) => setBorderStyle(e.target.value as typeof borderStyle)}
            options={[
              { value: "none", label: "None" },
              { value: "solid", label: "Solid" },
              { value: "glass", label: "Glass" },
              { value: "stack", label: "Stack" },
            ]}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-semibold tracking-wide text-foreground/90 uppercase">
          Editor
        </h3>

        <div className="space-y-4">
          <Select
            label="Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            options={LANGUAGES.map((lang) => ({
              value: lang.id,
              label: lang.name,
            }))}
          />

          <Select
            label="Theme"
            value={themeId}
            onChange={(e) => setThemeId(e.target.value)}
            options={CM_THEMES.map((t) => ({
              value: t.id,
              label: t.name,
            }))}
          />

          <Select
            label="Formatter"
            value="prettier"
            onChange={() => {}}
            options={[{ value: "prettier", label: "Prettier" }]}
            disabled
          />

          <SwitchGroup
            label="Line number"
            options={[
              { label: "Show", value: true },
              { label: "Hide", value: false },
            ]}
            value={showLineNumbers}
            onChange={setShowLineNumbers}
          />

          <Input
            label="Highlight lines"
            value={highlightedLinesInput}
            onChange={(e) => setHighlightedLinesInput(e.target.value)}
            placeholder="e.g. 1, 3-5"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-semibold tracking-wide text-foreground/90 uppercase">
          Font
        </h3>

        <div className="space-y-4">
          <Select
            label="Font"
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            options={FONTS.map((f) => ({
              value: f.family,
              label: f.name,
            }))}
          />

          <Select
            label="Font weight"
            value={fontWeight.toString()}
            onChange={(e) => setFontWeight(parseInt(e.target.value))}
            options={[
              { value: "400", label: "Regular" },
              { value: "500", label: "Medium" },
              { value: "600", label: "Semi Bold" },
              { value: "700", label: "Bold" },
            ]}
          />

          <SwitchGroup
            label="Ligatures"
            options={[
              { label: "Yes", value: true },
              { label: "No", value: false },
            ]}
            value={fontLigatures}
            onChange={setFontLigatures}
          />

          <Slider
            label="Size"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            min={10}
            max={32}
            step={1}
          />
        </div>
      </div>
    </div>
  )
}
