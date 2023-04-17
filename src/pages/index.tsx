import { Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { Contact } from "utils/types";
import { verifyToken } from "store/thunks/auth";
import Store, { useAppThunkDispatch } from "store";
import { getIsAuthenticated, setLoggedInUser } from "store/slices/auth";
import { getCurrentContact, setContact } from "store/slices/currentUser";

export default function Home(): JSX.Element {
    const dispatch = useAppThunkDispatch();
    const router = useRouter();
    const contact = useSelector<Store, Contact | undefined>(getCurrentContact);

    const isAuthenticated = useSelector<Store, boolean>(getIsAuthenticated);

    useEffect(() => {
        const auth = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : undefined;
        if (auth?.token) {
            dispatch(verifyToken({ token: auth.token })).then((response) => {
                if (response.payload?.valid) {
                    dispatch(setLoggedInUser({ token: auth.token }));
                    dispatch(setContact(auth.user));
                } else {
                    router.push("/login");
                }
            });
        } else {
            router.push("/login");
        }
    }, []);

    return (
        <Fragment>{isAuthenticated && <Typography variant="h5">Welcome, {contact?.name || ""}</Typography>}</Fragment>
    );
}
