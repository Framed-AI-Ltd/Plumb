import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "--slide-from": {
            "default": "-24px",
            ":is(:dir(rtl) .plumb-nav-sheet)": "24px"
        },
        "inlineSize": "min(300px, 88vw)"
    }
});
