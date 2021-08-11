import React from 'react'
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
import {FormikHelpers, useFormik} from "formik";
import {useSelector} from "react-redux";
import {login} from "./auth-reducer";
import {StateType, useAppDispatch} from "../../App/store";
import { Redirect } from 'react-router-dom';

type ErrorsDataType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

type FormValuesType = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {
    const dispatch = useAppDispatch();
    const isLoginIn = useSelector<StateType, boolean>(state => state.auth.isLoginIn)

    // @ts-ignore
    const formik = useFormik({
        validate: (values) => {
            let errors: ErrorsDataType = {};

            if (!values.email) {
                errors.email = "Required"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }

            if (!values.password) {
                errors.password = "Required"
            } else if (values.password.length > 15) {
                errors.password = 'Must be 15 characters or less'
            } else if (values.password.length < 5) {
                errors.password = 'Must be at least 5 characters.'
            }

            return errors;
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },

        onSubmit: async (values: FormValuesType, formikHelpers: FormikHelpers<FormValuesType>) => {
            const action = await dispatch(login(values));

            if (login.rejected.match(action)) {
                if (action.payload?.fieldsErrors?.length) {
                    const error = action.payload.fieldsErrors[0];
                    formikHelpers.setFieldError(error.field, error.error)
                }
            }
        },
    });

    if (isLoginIn) {
        return <Redirect to={"/"}/>
    }

    return <Grid container justify="center">
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}>here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.errors.email ? (<div style={{color: "red"}}>{formik.errors.email}</div>) : null}
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.errors.password ? (<div style={{color: "red"}}>{formik.errors.password}</div>) : null}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox {...formik.getFieldProps('rememberMe')}
                                               checked={formik.values.rememberMe}/>}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}
