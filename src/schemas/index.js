import * as Yup from "yup";

export const checkSchema = Yup.object({
    // Validation Schema for input field
    tasks: Yup.string().required(),
    createdby: Yup.string().required(),
    duedate: Yup.string(),
    notes: Yup.string().required(),
    emailNotes: Yup.string().required(),
});
