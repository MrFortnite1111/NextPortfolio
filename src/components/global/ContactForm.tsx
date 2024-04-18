"use client"
import { useState } from "react";
import styles from "../../../styles/contact.module.css";
import { Alert, Box, Button, TextField, TextareaAutosize, styled, } from "@mui/material";


const ContactForm = () => {
    const defaultSubmission = {
        status: null,
        message: null,
    }

    const [submission, setSubmission] = useState(defaultSubmission);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData: any = {};
        const elements = e.currentTarget.elements as unknown as Array<
            HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement
        >;

        Array.from(elements).forEach((field) => {
            if (!field.name) return;
            formData[field.name] = field.value;
        });
        console.log(formData);
        await fetch('/contact/send', {
            method: 'POST',
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log("MY SUPER AWESOME RESPONSE", res);
                setSubmission(res);
            });
    }

    return (
        <div>
            {submission?.status ? (
                <Alert variant="filled" severity={submission.status}>
                    {submission.message}
                </Alert>
            ) : null}

            <form className={styles.contactform} onSubmit={handleSubmit}>
                <Box sx={{ pb: { xs: 1, md: 1 } }}>
                    <StyledTextField name="name" id="name-basic" label="Name" variant="outlined" type="text" />
                </Box>
                <Box sx={{ pb: { xs: 1, md: 1 } }}>
                    <StyledTextField name="email" id="email-basic" label="Email" variant="outlined" type="email" />
                </Box>
                <Box sx={{ pb: { xs: 1, md: 1 } }}>
                    <StyledTextArea name="message" id="message" placeholder="Write your message here!" minRows={6} />
                </Box>
                <StyledButton type="submit" variant="contained">Submit</StyledButton>
            </form>
        </div>
    );
}

export default ContactForm;

const StyledTextField = styled(TextField)`
    width: 350px;
    color: white;
    background-color: #e3d5f7;
    border-radius: 5px;

    field-set {
        border-color: white;
    }
`
const StyledTextArea = styled(TextareaAutosize)`
    border-color: #161033;
    background-color: #e3d5f7;
    border-radius: 5px;
    width: 350px;
`

const StyledButton = styled(Button)`
    background-color: #E9B820;
    border-radius: 5px;
    width: 200px;
    height: 50px;
    color: black;

`