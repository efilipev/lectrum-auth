import { FC, useMemo } from "react";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { createTheme, CssBaseline, StyledEngineProvider } from "@mui/material";
import { TextField } from "./components/TextField";

export const ThemeProvider: FC = ({ children }): JSX.Element => {
    const themeOptions = useMemo(
        () => ({
            spacing: (unit: number) => `${unit}rem`,
            breakpoints: {
                values: {
                    xs: 900,
                    sm: 1280,
                    md: 1366,
                    lg: 1440,
                    xl: 1920
                }
            },
            alette: {
                primary: {
                    main: "#fcba03"
                }
            }
        }),
        []
    );

    const themes = createTheme(themeOptions);
    themes.components = {
        ...TextField(themes)
    };

    return (
        <StyledEngineProvider injectFirst>
            <MUIThemeProvider theme={themes}>
                <CssBaseline />
                {children}
            </MUIThemeProvider>
        </StyledEngineProvider>
    );
};
