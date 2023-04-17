import { Fragment, FC, useState } from "react";
import { VisibilityRounded, VisibilityOffRounded } from "@mui/icons-material";
import { IconButton, TextField, Typography, TextFieldProps, TypographyProps, Tooltip } from "@mui/material";

interface PasswordProps {
    label?: string;
    passwordProps?: TextFieldProps;
    typographyProps?: TypographyProps;
}

export const Password: FC<PasswordProps> = ({ label, typographyProps, passwordProps }): JSX.Element => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Fragment>
            {label && (
                <Typography className="inputLabel" {...typographyProps}>
                    {label}
                </Typography>
            )}
            <TextField
                type={`${showPassword ? "text" : "password"}`}
                InputProps={{
                    endAdornment: (
                        <Tooltip title="Show password" placement="top">
                            <IconButton
                                sx={{ color: "#d2d3d9", padding: "0px 12px", marginRight: "-13px" }}
                                aria-label="Toggle password visibility"
                                onClick={toggleShowPassword}
                                disableRipple={true}
                            >
                                {showPassword ? (
                                    <VisibilityOffRounded fontSize="small" />
                                ) : (
                                    <VisibilityRounded fontSize="small" />
                                )}
                            </IconButton>
                        </Tooltip>
                    )
                }}
                {...passwordProps}
            />
        </Fragment>
    );
};
