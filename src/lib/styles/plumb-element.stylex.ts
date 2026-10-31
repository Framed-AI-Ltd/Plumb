import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "--c-bg": {
            "default": null,
            ":is([data-color])": "var(--c1)"
        },
        "--c-bg-strong": {
            "default": null,
            ":is([data-color])": "var(--c2)"
        },
        "--c-border": {
            "default": null,
            ":is([data-color])": "var(--c3)"
        },
        "--c-icon": {
            "default": null,
            ":is([data-color])": "var(--c7)"
        },
        "--c-text": {
            "default": null,
            ":is([data-color])": "var(--c8)"
        },
        "--c1": {
            "default": null,
            ":is([data-color=\"rose\"])": tokens.rose1,
            ":is([data-color=\"clay\"])": tokens.clay1,
            ":is([data-color=\"honey\"])": tokens.honey1,
            ":is([data-color=\"sage\"])": tokens.sage1,
            ":is([data-color=\"lake\"])": tokens.lake1,
            ":is([data-color=\"spruce\"])": tokens.spruce1,
            ":is([data-color=\"brand\"])": tokens.accentBg,
            ":is([data-color=\"gray\"])": tokens.fillTertiary
        },
        "--c2": {
            "default": null,
            ":is([data-color=\"rose\"])": tokens.rose2,
            ":is([data-color=\"clay\"])": tokens.clay2,
            ":is([data-color=\"honey\"])": tokens.honey2,
            ":is([data-color=\"sage\"])": tokens.sage2,
            ":is([data-color=\"lake\"])": tokens.lake2,
            ":is([data-color=\"spruce\"])": tokens.spruce2,
            ":is([data-color=\"brand\"])": tokens.accentBgHover,
            ":is([data-color=\"gray\"])": tokens.fillSecondary
        },
        "--c3": {
            "default": null,
            ":is([data-color=\"rose\"])": tokens.rose3,
            ":is([data-color=\"clay\"])": tokens.clay3,
            ":is([data-color=\"honey\"])": tokens.honey3,
            ":is([data-color=\"sage\"])": tokens.sage3,
            ":is([data-color=\"lake\"])": tokens.lake3,
            ":is([data-color=\"spruce\"])": tokens.spruce3,
            ":is([data-color=\"brand\"])": tokens.accentBorder,
            ":is([data-color=\"gray\"])": tokens.border
        },
        "--c7": {
            "default": null,
            ":is([data-color=\"rose\"])": tokens.rose7,
            ":is([data-color=\"clay\"])": tokens.clay7,
            ":is([data-color=\"honey\"])": tokens.honey7,
            ":is([data-color=\"sage\"])": tokens.sage7,
            ":is([data-color=\"lake\"])": tokens.lake7,
            ":is([data-color=\"spruce\"])": tokens.spruce7,
            ":is([data-color=\"brand\"])": tokens.accentSolid,
            ":is([data-color=\"gray\"])": tokens.textSecondary
        },
        "--c8": {
            "default": null,
            ":is([data-color=\"rose\"])": tokens.rose8,
            ":is([data-color=\"clay\"])": tokens.clay8,
            ":is([data-color=\"honey\"])": tokens.honey8,
            ":is([data-color=\"sage\"])": tokens.sage8,
            ":is([data-color=\"lake\"])": tokens.lake8,
            ":is([data-color=\"spruce\"])": tokens.spruce8,
            ":is([data-color=\"brand\"])": tokens.accentText,
            ":is([data-color=\"gray\"])": tokens.textSecondary
        },
        "borderWidth": {
            "default": null,
            ":is(:is(.plumb-input, .plumb-field-group))": {
                "default": null,
                "@media (prefers-contrast: more)": "1px"
            }
        },
        "borderStyle": {
            "default": null,
            ":is(:is(.plumb-input, .plumb-field-group))": {
                "default": null,
                "@media (prefers-contrast: more)": "solid"
            }
        },
        "borderColor": {
            "default": null,
            ":is(:is(.plumb-input, .plumb-field-group))": {
                "default": null,
                "@media (prefers-contrast: more)": tokens.controlBorder
            }
        },
        "paddingInlineStart": {
            "default": null,
            ":is(.plumb-table :is(.plumb-column, .plumb-cell):first-child)": tokens.cardInset,
            ":is(.plumb-formatted :is(ul, ol))": tokens.space6
        },
        "paddingInlineEnd": {
            "default": null,
            ":is(.plumb-table :is(.plumb-column, .plumb-cell):last-child)": tokens.cardInset
        },
        "textAlign": {
            "default": null,
            ":is(.plumb-table [data-align=\"end\"])": "end",
            ":is(.plumb-proposal-row > :not(:first-child))": "end",
            ":is(.plumb-proposal-row > :nth-child(2))": {
                "default": null,
                "@media (max-width: 640px)": "start"
            },
            ":is(.plumb-schedule-labels > :nth-child(6))": "end",
            ":is(.plumb-budget-row > :not(:first-child))": "end"
        },
        "justifyContent": {
            "default": null,
            ":is(.plumb-table [data-align=\"end\"])": "flex-end"
        },
        "paddingBlock": {
            "default": null,
            ":is(.plumb-breakdown-row > *)": tokens.space3
        },
        "borderBlockEndWidth": {
            "default": null,
            ":is(.plumb-breakdown-row > *)": "1px"
        },
        "borderBlockEndStyle": {
            "default": null,
            ":is(.plumb-breakdown-row > *)": "solid"
        },
        "borderBlockEndColor": {
            "default": null,
            ":is(.plumb-breakdown-row > *)": tokens.borderSecondary
        },
        "fontWeight": {
            "default": null,
            "@media (max-width: 640px)": null,
            ":is(.plumb-breakdown-row > *)": 400,
            ":is(.plumb-breakdown-total > :first-child)": 600,
            ":is(.plumb-proposal-row > :nth-child(2))": {
                "default": null,
                "@media (max-width: 640px)": 400
            },
            ":is(.plumb-budget-row [data-over])": 550
        },
        "fontSize": {
            "default": null,
            "@media (max-width: 640px)": null,
            ":is(.plumb-breakdown-row > *)": "0.875rem",
            ":is(.plumb-breakdown-total > :first-child)": "0.8125rem",
            ":is(.plumb-proposal-row > :nth-child(2))": {
                "default": null,
                "@media (max-width: 640px)": "0.75rem"
            }
        },
        "lineHeight": {
            "default": null,
            "@media (max-width: 640px)": null,
            ":is(.plumb-breakdown-row > *)": 1.57,
            ":is(.plumb-breakdown-total > :first-child)": 1.45,
            ":is(.plumb-proposal-row > :nth-child(2))": {
                "default": null,
                "@media (max-width: 640px)": 1.5
            }
        },
        "fontFamily": {
            "default": null,
            "@media (max-width: 640px)": null,
            ":is(.plumb-breakdown-row > *)": tokens.fontBody,
            ":is(.plumb-breakdown-total > :first-child)": tokens.fontBody,
            ":is(.plumb-proposal-row > :nth-child(2))": {
                "default": null,
                "@media (max-width: 640px)": tokens.fontBody
            }
        },
        "fontStyle": {
            "default": null,
            "@media (max-width: 640px)": null,
            ":is(.plumb-breakdown-row > *)": "normal",
            ":is(.plumb-breakdown-total > :first-child)": "normal",
            ":is(.plumb-proposal-row > :nth-child(2))": {
                "default": null,
                "@media (max-width: 640px)": "normal"
            }
        },
        "alignSelf": {
            "default": null,
            ":is(.plumb-breakdown-row > *)": "stretch"
        },
        "display": {
            "default": null,
            ":is(.plumb-breakdown-row > *)": "flex",
            ":is(.plumb-breakdown-total > *)": "flex",
            ":is(.plumb-breakdown-total > :first-child)": "block",
            ":is(.plumb-compare [role=\"row\"])": {
                "default": null,
                "@media (max-width: 640px)": "contents"
            },
            ":is(.plumb-drop > [role=\"status\"]:empty)": {
                "default": null,
                "@media (max-width: 640px)": "none"
            },
            ":is([data-overdue])": "inline-flex",
            ":is(.plumb-budget-row [data-over])": "inline-flex"
        },
        "alignItems": {
            "default": null,
            ":is(.plumb-breakdown-row > *)": "flex-start",
            ":is(.plumb-breakdown-total > *)": "baseline",
            ":is([data-overdue])": "center",
            ":is(.plumb-budget-row [data-over])": "center"
        },
        "paddingBlockStart": {
            "default": null,
            ":is(.plumb-breakdown-total > *)": tokens.space4
        },
        "gridColumn": {
            "default": null,
            ":is(.plumb-breakdown-total > :first-child)": "1 / 3",
            ":is(.plumb-table[data-layout=\"auto\"] .plumb-cell > *)": {
                "default": null,
                "@media (max-width: 640px)": "1 / -1"
            },
            ":is(.plumb-table[data-layout=\"auto\"] .plumb-cell[data-label]:not(:first-child) > *)": {
                "default": null,
                "@media (max-width: 640px)": 2
            },
            ":is(.plumb-proposal-row > :nth-child(2))": {
                "default": null,
                "@media (max-width: 640px)": 1
            },
            ":is(.plumb-schedule-row > :nth-child(n + 3))": {
                "default": null,
                "@media (max-width: 640px)": "2 / -1"
            },
            ":is(.plumb-schedule-row:not(:has(.plumb-schedule-edit)) > :nth-child(n + 3))": {
                "default": null,
                "@media (max-width: 640px)": "auto"
            },
            ":is(.plumb-schedule-list[data-editing] .plumb-schedule-row > :not(.plumb-schedule-step))": {
                "default": null,
                "@media (max-width: 640px)": "span 1"
            },
            ":is(.plumb-drop > [role=\"status\"])": {
                "default": null,
                "@media (max-width: 640px)": "1 / -1"
            },
            ":is(.plumb-file > [role=\"status\"])": {
                "default": null,
                "@media (max-width: 640px)": 2
            }
        },
        "marginBlockStart": {
            "default": null,
            ":is(.plumb-grid > *)": {
                "default": null,
                "@media (max-width: 960px)": 0
            }
        },
        "justifySelf": {
            "default": null,
            ":is(.plumb-table[data-layout=\"auto\"] .plumb-cell[data-label]:not(:first-child) > *)": {
                "default": null,
                "@media (max-width: 640px)": "end"
            },
            ":is(.plumb-file > [role=\"status\"])": {
                "default": null,
                "@media (max-width: 640px)": "start"
            },
            ":is(.plumb-budget-row > :not(:first-child))": "end",
            ":is(.plumb-timesheet-row > :last-child)": "end"
        },
        "color": {
            "default": null,
            ":is(.plumb-proposal-row > :nth-child(2))": {
                "default": null,
                "@media (max-width: 640px)": tokens.textSecondary
            },
            ":is([data-overdue])": tokens.warningText,
            ":is(.plumb-budget-row [data-over])": tokens.warningText
        },
        "transform": {
            "default": null,
            ":is(:dir(rtl) :is(.plumb-disclosure-chevron, .plumb-breadcrumb svg, .plumb-tree-chevron svg, .plumb-calendar-head svg, .plumb-back-link svg, .plumb-open-next svg))": "scaleX(-1)"
        },
        "flex": {
            "default": null,
            ":is(.plumb-import-target > *)": "1 1 140px",
            ":is(.plumb-file > [role=\"status\"])": "none"
        },
        "gap": {
            "default": null,
            ":is([data-overdue])": "4px",
            ":is(.plumb-budget-row [data-over])": "4px"
        },
        "fontVariantNumeric": {
            "default": null,
            ":is(.plumb-budget-row > :not(:first-child))": "tabular-nums"
        },
        "margin": {
            "default": null,
            ":is(.plumb-formatted :is(ul, ol))": 0
        },
        "strokeDasharray": {
            "default": null,
            ":is(.plumb-takeoff-shape[data-draft] :is(polyline, polygon))": "6 4"
        },
        "blockSize": {
            "default": null,
            ":is(.plumb-letterhead-logo > :is(img, svg))": "40px"
        },
        "inlineSize": {
            "default": null,
            ":is(.plumb-letterhead-logo > :is(img, svg))": "auto"
        }
    }
});
