import { Theme } from "@mui/material";

export const TextField = (theme: Theme) => {
    return {
        MuiTextField: {
            styleOverrides: {
                root: {
                    height: theme.spacing(3)
                }
            }
        }
    };
};
