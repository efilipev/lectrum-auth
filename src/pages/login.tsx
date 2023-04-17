import { useCallback } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";

import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Typography, TextField } from "@mui/material";

import { Store } from "utils/types";
import { useAppThunkDispatch } from "store";
import { loginUser } from "store/thunks/auth";
import { getIsLoginInProgress } from "store/slices/auth";
import { logInForm } from "utils/validators/logInForm";
import { Password } from "components/Password";

type LoginFormInputs = {
    name: string;
    email: string;
    password: string;
};

export default function Login(): JSX.Element {
    const dispatch = useAppThunkDispatch();
    const route = useRouter();

    const isLoginInProgress = useSelector<Store, boolean>(getIsLoginInProgress);

    const {
        formState: { isSubmitting, errors },
        register,
        handleSubmit
    } = useForm<LoginFormInputs>({
        resolver: yupResolver(logInForm)
    });

    const handleUserLogin: SubmitHandler<LoginFormInputs> = useCallback(async (user): Promise<void> => {
        await dispatch(loginUser(user));
        route.push("/");
    }, []);

    return (
        <form onSubmit={handleSubmit(handleUserLogin)}>
            <Grid className="title">
                <Typography className="mainTitleText" variant="h5">
                    Log in
                </Typography>
                <Typography variant="body2">Enter your details below.</Typography>
            </Grid>
            <Grid item>
                <Typography className="inputLabel" variant="body1">
                    Email address*
                </Typography>
                <Grid item>
                    <TextField
                        size="small"
                        autoFocus
                        disabled={isLoginInProgress}
                        placeholder="Type your email address"
                        fullWidth
                        {...register("email", { required: true })}
                        error={!!errors?.email?.message}
                        helperText={errors?.email?.message}
                    />
                </Grid>
            </Grid>
            <Grid item>
                <Password
                    label="Password*"
                    passwordProps={{
                        placeholder: "Type your password",
                        fullWidth: true,
                        size: "small",
                        ...register("password", { required: true }),
                        error: !!errors?.password?.message,
                        helperText: errors?.password?.message
                    }}
                />
            </Grid>
            <Grid container item justifyContent="flex-end">
                <LoadingButton
                    variant="contained"
                    type="submit"
                    size="large"
                    fullWidth
                    loading={isSubmitting || isLoginInProgress}
                    disabled={isSubmitting || isLoginInProgress}
                >
                    Log In
                </LoadingButton>
            </Grid>
        </form>
    );
}
