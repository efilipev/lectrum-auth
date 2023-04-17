import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Typography, TextField } from "@mui/material";
import { Store } from "utils/types";
import { signUpSchemaValidator } from "utils/validators/signUpForm";
import { signUpUser } from "store/thunks/auth";
import { getIsSignUpInProgress } from "store/slices/auth";
import { Password } from "components/Password";
import { PasswordStrengthIndicator } from "components/PasswordStrengthIndicator";

type SignUpFormInputs = {
    name: string;
    email: string;
    password: string;
};

export default function SignUp(): JSX.Element {
    const dispatch = useDispatch();

    const isSignUpInProgress = useSelector<Store, boolean>(getIsSignUpInProgress);

    const form = useForm<SignUpFormInputs>({
        resolver: yupResolver(signUpSchemaValidator)
    });

    const {
        formState: { isSubmitting, errors },
        register,
        handleSubmit
    } = form;

    const handleSignUpForm: SubmitHandler<SignUpFormInputs> = useCallback(async (user) => {
        dispatch(signUpUser(user));
    }, []);

    return (
        <FormProvider {...form}>
            <form onSubmit={handleSubmit(handleSignUpForm)}>
                <Grid item>
                    <Grid item>
                        <Typography variant="h4">Sign up</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h5">Enter your details below</Typography>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant="body1">Display name*</Typography>
                    <Grid item>
                        <TextField
                            size="small"
                            autoFocus
                            fullWidth
                            placeholder="Type your name"
                            {...register("name", { required: true })}
                            error={!!errors?.name?.message}
                            helperText={errors?.name?.message}
                        />
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant="body1">Email address*</Typography>
                    <Grid item>
                        <TextField
                            size="small"
                            autoFocus
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
                            onChange: (event) => {
                                form.setValue("password", event.target.value, {
                                    shouldTouch: true,
                                    shouldValidate: true,
                                    shouldDirty: true
                                });
                            },
                            error: !!errors?.password?.message,
                            helperText: errors?.password?.message
                        }}
                    />
                </Grid>
                <PasswordStrengthIndicator />
                <Grid container item justifyContent="flex-end">
                    <LoadingButton
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting || isSignUpInProgress}
                        loading={isSubmitting || isSignUpInProgress}
                    >
                        Submit
                    </LoadingButton>
                </Grid>
            </form>
        </FormProvider>
    );
}
