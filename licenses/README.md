# Third-party font notices

`nunito-sans.txt` is the unmodified [official Nunito Sans notice](https://github.com/google/fonts/blob/main/ofl/nunitosans/OFL.txt). Its copyright statement matches the fonts bundled with Storybook.

The Storybook build copies this notice and the installed Inter and Plus Jakarta Sans packages' LICENSE files into its `licenses/` directory. `pnpm verify:storybook` checks those notices and rejects unrecognized bundled font families. These fonts retain their own licences.
