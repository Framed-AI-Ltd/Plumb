import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "grid",
        "gridTemplateColumns": "auto 1fr",
        "rowGap": tokens.space1,
        "columnGap": tokens.space4,
        "paddingBlock": tokens.space4,
        "paddingInline": tokens.space5,
        "borderRadius": tokens.radiusMd,
        "borderWidth": "1px",
        "borderStyle": "solid",
        "borderColor": {
            default: "transparent",
            ":is([data-tone=\"danger\"])": tokens.errorBorder,
            ":is([data-tone=\"neutral\"])": "transparent"
        },
        "backgroundColor": {
            "default": null,
            ":is([data-tone=\"info\"])": tokens.infoBg,
            ":is([data-tone=\"success\"])": tokens.successBg,
            ":is([data-tone=\"warning\"])": tokens.warningBg,
            ":is([data-tone=\"danger\"])": tokens.errorBg,
            ":is([data-tone=\"neutral\"])": tokens.fillLayout
        },
        "gridColumn": {
            "default": null,
            ":is(.plumb-access-invite > .plumb-callout)": "1 / -1"
        }
    }
});
