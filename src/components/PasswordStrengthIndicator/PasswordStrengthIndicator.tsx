import { FC } from "react";
import { useWatch } from "react-hook-form";
import { Grid, Typography } from "@mui/material";
import { strengthPasswordIndicator } from "utils/validators/signUpForm";

export const PasswordStrengthIndicator: FC = (): JSX.Element => {
    const password = useWatch({ name: "password" }) || "";

    const indicator = strengthPasswordIndicator(password);

    return (
        <Grid container item alignItems="center" gap={1}>
            <Grid item bgcolor={indicator.color} height="1rem" width={150} borderRadius={2} />
            <Typography variant="subtitle2">{indicator?.label || ""}</Typography>
        </Grid>
    );
};
