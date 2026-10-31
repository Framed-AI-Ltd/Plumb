import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "display": "grid",
        "gridTemplateColumns": {
            "default": "232px 1fr",
            "@media (max-width: 960px)": "1fr",
            ":is([data-aside])": "232px minmax(0, 1fr) 380px"
        },
        "minBlockSize": "100vh",
        "backgroundColor": tokens.bgLayout
    }
});
