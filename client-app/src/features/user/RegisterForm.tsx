import React, { useContext } from 'react'
import {Form as FinalForm, Field } from 'react-final-form';
import { Form, Button, Header } from 'semantic-ui-react';
import TextInput from '../../app/common/form/TextInput';
import {ErrorMessage} from '../../app/common/form/ErrorMessage'
import { RootStoreContext } from '../../app/stores/rootStore';
import { IUserFormValues } from '../../app/models/user';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired } from 'revalidate';

const validate = combineValidators({
    email: isRequired('email'),
    password: isRequired('password'),
    username: isRequired('user name'),
    displayName: isRequired('display name')
})

const RegisterForm = () => {
    const rootStore = useContext(RootStoreContext)
    const { register } = rootStore.userStore;
    
    return (
        <FinalForm
            onSubmit={(values: IUserFormValues) => register(values).catch(error => ({
                [FORM_ERROR]: error
            }))}
            validate={validate}
            render={({handleSubmit, submitting, submitError, invalid, pristine, dirtySinceLastSubmit}) => (
                <Form onSubmit={handleSubmit} error>
                    <Header 
                        as='h2'
                        content='Sign Up to Reactivities'
                        color='teal'
                        textAlign='center'/>
                    <Field
                        name='email'
                        component={TextInput}
                        placeholder='Email'
                    />
                    <Field
                        name='username'
                        component={TextInput}
                        placeholder='Username'
                    />
                    <Field
                        name='displayName'
                        component={TextInput}
                        placeholder='Display Name'
                    />
                    <Field
                        name='password'
                        component={TextInput}
                        placeholder='password'
                        type='password'
                    />
                    {submitError && !dirtySinceLastSubmit && (
                        <ErrorMessage 
                            error={submitError}
                            />)}
                    <Button 
                        fluid
                        disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                        loading={submitting}
                        color='teal'
                        content='Login'/>
                </Form>
            )}>
        </FinalForm>
    )
}
export default RegisterForm;
