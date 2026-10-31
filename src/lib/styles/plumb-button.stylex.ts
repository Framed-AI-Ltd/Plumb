import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "inline-flex",
        "alignItems": "center",
        "justifyContent": "center",
        "gap": tokens.space3,
        "blockSize": {
            "default": tokens.controlH,
            ":is([data-size=\"sm\"])": tokens.controlHSm,
            ":is([data-size=\"lg\"])": tokens.controlHLg,
            ":is(.plumb-calendar-head .plumb-button)": tokens.space9,
            ":is(.plumb-selection .plumb-button)": "auto"
        },
        "paddingInline": {
            "default": tokens.space5,
            ":is([data-size=\"sm\"])": tokens.space4,
            ":is([data-size=\"lg\"])": tokens.space6
        },
        "fontWeight": 550,
        "fontSize": {
            default: "0.8125rem",
            ":is([data-size=\"lg\"])": "0.875rem"
        },
        "lineHeight": 1.45,
        "fontFamily": tokens.fontBody,
        "fontStyle": "normal",
        "whiteSpace": {
            "default": "nowrap",
            ":is(.plumb-selection .plumb-button)": "normal"
        },
        "borderRadius": {
            "default": tokens.radiusMd,
            ":is([data-size=\"sm\"])": tokens.radiusSm
        },
        "borderWidth": {
            "default": "1px",
            "@media (forced-colors: active)": "1px"
        },
        "borderStyle": {
            "default": "solid",
            "@media (forced-colors: active)": "solid"
        },
        "borderColor": {
            "default": "transparent",
            "@media (forced-colors: active)": "CanvasText",
            ":is([data-variant=\"secondary\"])": tokens.border,
            ":is([data-variant=\"secondary\"][data-hovered])": tokens.accentSolid,
            ":is([data-variant=\"danger\"])": tokens.errorBorder,
            ":is([data-disabled])": tokens.border,
            ":is([data-plumb-theme=\"dark\"] .plumb-button[data-disabled])": "transparent",
            ":is([data-variant=\"ghost\"][data-disabled])": "transparent"
        },
        "cursor": {
            "default": "pointer",
            ":is([data-pending])": "progress",
            ":is([data-disabled])": "not-allowed"
        },
        "transition": `background ${tokens.durationFast} ${tokens.ease}, border-color ${tokens.durationFast} ${tokens.ease}, color ${tokens.durationFast} ${tokens.ease}`,
        "backgroundColor": {
            "default": null,
            ":is([data-variant=\"primary\"])": tokens.accentSolid,
            ":is([data-variant=\"primary\"][data-hovered])": tokens.accentSolidHover,
            ":is([data-variant=\"secondary\"])": tokens.bgContainer,
            ":is([data-variant=\"secondary\"][data-pressed])": tokens.fillTertiary,
            ":is([data-variant=\"soft\"])": tokens.accentBg,
            ":is([data-variant=\"soft\"][data-hovered])": tokens.accentBgHover,
            ":is([data-variant=\"ghost\"])": "transparent",
            ":is([data-variant=\"ghost\"][data-hovered])": tokens.fillTertiary,
            ":is([data-variant=\"ghost\"][data-pressed])": tokens.fillSecondary,
            ":is([data-variant=\"danger\"])": tokens.bgContainer,
            ":is([data-variant=\"danger\"][data-hovered])": tokens.errorBg,
            ":is([data-disabled])": tokens.fillTertiary,
            ":is([data-plumb-theme=\"dark\"] .plumb-button[data-disabled])": tokens.fillQuaternary,
            ":is([data-variant=\"ghost\"][data-disabled])": "transparent"
        },
        "color": {
            "default": null,
            ":is([data-variant=\"primary\"])": tokens.onAccent,
            ":is([data-variant=\"secondary\"])": tokens.text,
            ":is([data-variant=\"secondary\"][data-hovered])": tokens.accentText,
            ":is([data-variant=\"soft\"])": tokens.accentText,
            ":is([data-variant=\"ghost\"])": tokens.text,
            ":is([data-variant=\"danger\"])": tokens.errorText,
            ":is([data-disabled])": tokens.textDisabled,
            ":is([data-plumb-theme=\"dark\"] .plumb-button[data-disabled])": `color-mix(in srgb, ${tokens.textTertiary} 55%, ${tokens.bgLayout})`,
            ":is(.plumb-lightbox-dialog .plumb-button)": tokens.onMedia
        },
        "boxShadow": {
            "default": null,
            ":is([data-variant=\"primary\"])": tokens.primaryShadow,
            ":is([data-variant=\"primary\"][data-pressed])": "none",
            ":is([data-variant=\"secondary\"])": tokens.controlShadow,
            ":is([data-variant=\"secondary\"][data-pressed])": "none",
            ":is([data-disabled])": "none",
            ":is([data-plumb-theme=\"dark\"] .plumb-button[data-disabled])": "none"
        },
        "transform": {
            "default": null,
            ":is([data-variant=\"primary\"][data-pressed])": "translateY(1px)"
        },
        "transitionProperty": "background, border-color, color, box-shadow, transform",
        "inlineSize": {
            "default": null,
            ":is([data-icon-only])": tokens.controlH,
            ":is([data-icon-only][data-size=\"sm\"])": tokens.controlHSm,
            ":is(.plumb-calendar-head .plumb-button)": tokens.space9
        },
        "padding": {
            "default": null,
            ":is([data-icon-only])": 0
        },
        "flex": {
            "default": null,
            ":is(.plumb-calendar-head .plumb-button)": "none"
        },
        "alignSelf": {
            "default": null,
            ":is(.plumb-grid-wrap > .plumb-button)": "flex-start"
        },
        "position": {
            "default": null,
            ":is(.plumb-board-card > .plumb-button)": "absolute"
        },
        "insetBlockStart": {
            "default": null,
            ":is(.plumb-board-card > .plumb-button)": tokens.space2
        },
        "insetInlineEnd": {
            "default": null,
            ":is(.plumb-board-card > .plumb-button)": tokens.space2
        },
        "gridColumn": {
            "default": null,
            ":is(.plumb-drop > .plumb-button)": {
                "default": null,
                "@media (max-width: 640px)": 2
            }
        },
        "justifySelf": {
            "default": null,
            ":is(.plumb-drop > .plumb-button)": {
                "default": null,
                "@media (max-width: 640px)": "start"
            }
        },
        "minBlockSize": {
            "default": null,
            ":is(.plumb-drop > .plumb-button)": {
                "default": null,
                "@media (max-width: 640px)": tokens.space9
            },
            ":is(.plumb-selection .plumb-button)": tokens.controlHSm
        },
        "marginBlockStart": {
            "default": null,
            ":is(.plumb-drop > .plumb-button)": {
                "default": null,
                "@media (max-width: 640px)": tokens.space2
            }
        },
        "maxInlineSize": {
            "default": null,
            ":is(.plumb-selection .plumb-button)": "100%"
        },
        "overflowWrap": {
            "default": null,
            ":is(.plumb-selection .plumb-button)": "anywhere"
        },
        "textAlign": {
            "default": null,
            ":is(.plumb-selection .plumb-button)": "start"
        }
    }
});
