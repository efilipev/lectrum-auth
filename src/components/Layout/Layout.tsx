import { FC } from "react";
import { Grid } from "@mui/material";
import { TopNav } from "components/TopNav";

export const Layout: FC = ({ children }): JSX.Element => {
    return (
        <Grid height="100vh" padding="0 2rem">
            <TopNav />
            <Grid container alignItems="center" justifyContent="center" height="calc(100% - 60px)">
                {children}
            </Grid>
        </Grid>
    );
};
