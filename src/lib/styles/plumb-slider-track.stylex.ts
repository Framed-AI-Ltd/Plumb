import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "position": {
            "default": "relative",
            "::before": "absolute"
        },
        "blockSize": {
            "default": "24px",
            "::before": "4px"
        },
        "inlineSize": "100%",
        "cursor": "pointer",
        "content": {
            "default": null,
            "::before": "\"\""
        },
        "insetInline": {
            "default": null,
            "::before": 0
        },
        "insetBlockStart": {
            "default": null,
            "::before": "50%"
        },
        "translate": {
            "default": null,
            "::before": "0 -50%"
        },
        "borderRadius": {
            "default": null,
            "::before": tokens.radiusPill
        },
        "backgroundColor": {
            "default": null,
            "::before": tokens.fillSecondary
        }
    }
});
