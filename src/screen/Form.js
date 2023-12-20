import React, { useRef, useState } from 'react'
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import styles from "./Form.module.css"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded';
import EditIcon from '@mui/icons-material/Edit';
import { useFormik } from "formik";
import { SendEmail } from '../api';
import Alert from '@mui/material/Alert';
import { checkSchema } from "../schemas/index";

// Variable Types
const initialValues = {
	client: '',
	status: '',
	assignee: '',
	tasks: '',
	priority: '',
	file: '',
	duedate: '',
	project: '',
	notes: '',
	taskType: '',
	emailNotes: '',
	createdby: '',
};

const Form = () => {
	const [openAlert, setOpenalert] = useState(false);
	const [dateTime, setDateTime] = useState(null);
	const [selectedFile, SetselectedFile] = useState(null)

	React.useEffect(() => {
		// Disable the Alert Box
		setTimeout(() => {
			setOpenalert(false)
		}, 3000);
	}, [openAlert])


	const { values, errors, touched, handleBlur, handleChange, handleSubmit ,setFieldValue} =
	// Validation and API Call
		useFormik({
			initialValues,
			validationSchema: checkSchema,
			onSubmit: (values, action) => {
				const formData = new FormData();
				const obj = {
					client: values.client,
					status: values.status,
					assignee: values.assignee,
					tasks: values.tasks,
					createdby: values.createdby,
					taskType: values.taskType,
					priority: values.priority,
					duedate: values.duedate,
					project: values.project,
					notes: values.notes,
					emailNotes: values.emailNotes
				};
				formData.append("data", JSON.stringify(obj));
				formData.append("image", selectedFile);
				SendEmail(formData).then((response) => {
					setOpenalert(true)
				}).catch(function (error) {
					setOpenalert(true)
				})
				setDateTime(null)
				action.resetForm();
			},
		});


	const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

	const handleFileUpload = event => {
		SetselectedFile(event.target.files[0])
		setFieldValue('project',event.target.files[0].name)
	}

	return (
		// Form Design
		<form className={styles.mainContainer} onSubmit={handleSubmit}>
			{openAlert &&
				<Alert severity="success" className={styles.successBox}>Your data has been submitted successfully</Alert>}
			<div className={styles.form}>
				<div className={styles.header}>
					<h2>New Task</h2>
					<CloseIcon />
				</div>

				<div>
					<Box
						component="form"
						sx={{
							'& .MuiTextField-root': { m: 1, width: '25ch' },
						}}
						noValidate
						autoComplete="off"
					>
						<div className={styles.firstInput}>
							<LocalizationProvider  dateAdapter={AdapterDayjs}>
								<DemoContainer  components={['DatePicker', 'DatePicker']}>
									<DatePicker  disablePast label="Due Date" name="duedate" value={dateTime} onChange={(e)=>{
										setDateTime(e)
										setFieldValue('duedate',new Date(e).toISOString())
									}} />
								</DemoContainer>
							</LocalizationProvider>

							<Stack direction='row' className='flex justify-center items-center'>
								<Checkbox {...label} />
								<p className={styles.text}>Project Date Filter 30+/-</p>
							</Stack>
							<Stack direction='column'>
								<TextField
									id="outlined-multiline-flexible"
									label="Created By"
									name='createdby'
									value={values.createdby}
									onChange={handleChange}
									onBlur={handleBlur}
									multiline
									maxRows={4}
								/>
								{errors.createdby && touched.createdby ? (
									<p className={styles.errorMsg}>
										{errors.createdby}
									</p>
								) : null}
							</Stack>
						</div>

					</Box>

					<Box
						component="form"
						sx={{
							'& .MuiTextField-root': { m: 1, width: '25ch' },
						}}
						noValidate
						autoComplete="off"
					>
						<div className={styles.secondInput}>
							<Box sx={{ minWidth: 255, ml: 1 }}>
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label">Client</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										label="Client"
										name='client'
										value={values.client}
										onChange={handleChange}
										onBlur={handleBlur}
									>
										<MenuItem value={"Blake"}>Blake</MenuItem>
										<MenuItem value={"Richie"}>Richie</MenuItem>
										<MenuItem value={"John"}>John</MenuItem>
									</Select>
								</FormControl>
							</Box>
						</div>

					</Box>

					<Box
						component="form"
						sx={{
							'& .MuiTextField-root': { m: 1, width: '80ch' },
						}}
						noValidate
						autoComplete="off"
					>
						<div className={styles.secondInput}>
						
								<TextField
									id="outlined-multiline-flexible"
									label="Project"
									multiline
									name='project'
									value={values.project}
									onChange={handleChange}
									onBlur={handleBlur}
									maxRows={4}
								/>
							
					
							<div className={styles.folderBorder}>
								<input
									className='input-field'
									onChange={handleFileUpload}
									type="file"
									style={{ display: "none" }}
								/>
								<FolderOpenRoundedIcon style={{ fill: 'grey' }} onClick={() => document.querySelector(".input-field").click()} />
							</div>
						</div>
					</Box>

					<Box
						component="form"
						sx={{
							'& .MuiTextField-root': { m: 1, width: '80ch' },
						}}
						noValidate
						autoComplete="off"
					>
						<div className={styles.secondInput}>
							<Stack direction='column'>
							<TextField
								id="outlined-multiline-flexible"
								label="Task"
								name='tasks'
								value={values.tasks}
								onChange={handleChange}
								onBlur={handleBlur}
								multiline
								maxRows={4}
							/>
							{errors.tasks && touched.tasks ? (
									<p className={styles.errorMsg}>
										{errors.tasks}
									</p>
								) : null}
								</Stack>
							<div className={styles.folderBorder}>
								<EditIcon style={{ fill: 'grey' }} />
							</div>
						</div>
					</Box>

					<Box
						component="form"
						sx={{
							'& .MuiTextField-root': { m: 1, width: '25ch' },
						}}
						noValidate
						autoComplete="off"
					>

						<div className={styles.ThirdInput} style={{ marginTop: 1 }}>
							<Box sx={{ minWidth: 270, ml: 1 }}>
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label">Status</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										name='status'
										value={values.status}
										onChange={handleChange}
										onBlur={handleBlur}
										label="Status"
									>
										<MenuItem value={"In Progress"}>In Progress</MenuItem>
										<MenuItem value={"Pending"}>Pending</MenuItem>
										<MenuItem value={"Complete"}>Complete</MenuItem>
									</Select>
								</FormControl>
							</Box>
							<Box sx={{ minWidth: 270, ml: 2 }}>
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label">Assignee</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										label="Assignee"
										name='assignee'
										value={values.assignee}
										onChange={handleChange}
										onBlur={handleBlur}
									>
										<MenuItem value={"Real Estate"}>Real Estate</MenuItem>
										<MenuItem value={"Loan"}>Loan</MenuItem>
										<MenuItem value={"Contract"}>Contract</MenuItem>
									</Select>
								</FormControl>
								
							</Box>

							<Stack direction='row' className='flex justify-center items-center'>
								<Checkbox {...label} />
								<p className={styles.text}>Send Email</p>
							</Stack>

						</div>
					</Box>

					<Box
						component="form"
						sx={{
							'& .MuiTextField-root': { m: 1, width: '25ch' },
						}}
						noValidate
						autoComplete="off"
					>

						<div className={styles.fourthInput}>
							<Box sx={{ minWidth: 270, ml: 1 }}>
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label">Task Type</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										label="Task Type"
										name='taskType'
										value={values.taskType}
										onChange={handleChange}
										onBlur={handleBlur}
									>
										<MenuItem value={"In Progress"}>In Progress</MenuItem>
										<MenuItem value={"Pending"}>Pending</MenuItem>
										<MenuItem value={"Complete"}>Complete</MenuItem>
									</Select>
								</FormControl>
							</Box>
							<Box sx={{ minWidth: 270, ml: 2 }}>
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label">Priority</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										label="Priority"
										name='priority'
										value={values.priority}
										onChange={handleChange}
										onBlur={handleBlur}
									>
										<MenuItem value={"Important"}>Important</MenuItem>
										<MenuItem value={"Medium"}>Medium</MenuItem>
										<MenuItem value={"Low"}>Low</MenuItem>
									</Select>
								</FormControl>
							</Box>

						</div>
					</Box>



					<Box
						component="form"
						sx={{
							'& .MuiTextField-root': { m: 1, width: '25ch' },
						}}
						noValidate
						autoComplete="off"
					>
						<div className={styles.textarea}>
							<Stack direction='column'>
							<TextField
								id="outlined-multiline-flexible"
								label="Notes"
								multiline
								minRows={4}
								maxRows={4}
								name='notes'
								value={values.notes}
								onChange={handleChange}
								onBlur={handleBlur}
								style={{ width: 420 }}
							/>
							{errors.notes && touched.notes ? (
            <p className={styles.errorMsg}>
              {errors.notes}
            </p>
          ) : null}
					</Stack>
					<Stack direction='column'>
							<TextField
								id="outlined-multiline-flexible"
								label="Email Notes"
								multiline
								minRows={4}
								maxRows={4}
								name='emailNotes'
								value={values.emailNotes}
								style={{ width: 420 }}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							{errors.emailNotes && touched.emailNotes ? (
            <p className={styles.errorMsg}>
              {errors.emailNotes}
            </p>
          ) : null}
						</Stack>
						</div>
					</Box>


				</div>

				<div className={styles.buttonContainer}>
					<Stack spacing={2} direction="row">
						<Button variant="outlined" className={styles.btn}>Save & Add Task</Button>
						<Button variant="outlined" className={styles.btn}>Save & Add Pitch/Hit</Button>
						<Button variant="outlined" className={styles.btn}>Cancel</Button>
						 {/* Send all form data to the API */}
						<Button type='submit' variant="outlined" className={styles.btn} >Save</Button>
					</Stack>
				</div>

			</div>
		</form>
	)
}

export default Form