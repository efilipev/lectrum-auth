import { FC, Fragment } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Button, Grid } from "@mui/material";
import Store from "store";
import { useAppThunkDispatch } from "store";
import { logoutUser } from "store/thunks/auth";
import { getIsAuthenticated } from "store/slices/auth";

export const TopNav: FC = (): JSX.Element => {
    const dispatch = useAppThunkDispatch();
    const router = useRouter();

    const isAuthenticated = useSelector<Store, boolean>(getIsAuthenticated);

    return (
        <Grid container height="60px" alignItems="center" justifyContent="flex-end" gap={1}>
            {!isAuthenticated ? (
                <Fragment>
                    <Button variant="outlined" onClick={() => router.push("/login")}>
                        Log In
                    </Button>
                    <Button variant="outlined" onClick={() => router.push("/signUp")}>
                        Sign Up
                    </Button>
                </Fragment>
            ) : (
                <Button
                    variant="outlined"
                    onClick={() => {
                        dispatch(logoutUser());
                        router.push("/login");
                    }}
                >
                    LogOut
                </Button>
            )}
        </Grid>
    );
};
