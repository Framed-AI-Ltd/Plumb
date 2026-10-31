import { tokens } from "../theme/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
    "root": {
        "inlineSize": "100%",
        "maxBlockSize": "75vh",
        "objectFit": "contain",
        "borderRadius": tokens.radiusMd
    }
});
