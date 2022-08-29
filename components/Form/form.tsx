import { FormControl, FormLabel, Input, FormErrorMessage, Button, ButtonGroup } from "@chakra-ui/react"
import { Formik, Form, Field } from "formik"


type form = {
  type: 'login' | 'signon'
  onSubmit: (values: any) => void 
}

export const FormikExample = ({ type, onSubmit }: form) => {

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={(values, actions) => {
        onSubmit(values)
        actions.setSubmitting(false)
      }}
    >
      {(props) => (
        <Form style={{width: '100%'}}>
          <Field name='username' validate={(value: any) => validateName(value, type)}>
            {({ field, form }: { field: any, form: any }) => (
              <FormControl isInvalid={form.errors.username && form.touched.username}>
                <FormLabel>Username</FormLabel>
                <Input {...field} placeholder='Input username'/>
                <FormErrorMessage>{form.errors.username}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name='password' validate={validatePassword}>
            {({ field, form }: { field: any, form: any }) => (
              <FormControl isInvalid={form.errors.password && form.touched.password}>
                <FormLabel>Password</FormLabel>
                <Input type='password' {...field} placeholder='Input password'/>
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
            <Button
              mt={4}
              colorScheme={type === 'login' ? 'green' : 'red'}
              isLoading={props.isSubmitting}
              type='submit'
            >
              {type === 'login' ? 'Log in' : 'Sign on'}
            </Button>
        </Form>
      )}
    </Formik>
  )
}


async function validateName(value: string, type: 'login' | 'signon') {
  let error
  if (!value) {
    error = 'Username is required'
  } else if (value.length < 2) {
    error = "Username must be longer"
  } else {
    if (type === "signon") {
      const res = await fetch(`http://localhost:3000/api/auth?username=${value}`)
      const { log } = await res.json()
      
      if (log === 'username is passed') {
        error = log
      }
    }
  }
  return error
}

function validatePassword(value: string) {
  let error
  if (!value) {
    error = 'Password is required'
  } else if (value.length < 4) {
    error = "Password must be longer"
  }
  return error
}

