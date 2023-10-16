![Atomic Form Logo](./AtomicForm.png)

# @atomicjolt/forms
`@atomicjolt/forms` is a collection of React components for building forms, built on top of [react-hook-form](https://react-hook-form.com/) and [atomic-elements](https://atomicjolt.github.io/atomic-elements).

## Installation

```sh
npm install --save @atomicjolt/forms
```

```sh
yarn add @atomicjolt/forms
```

## Usage

This library is essentially a wrapper around `react-hook-form` so it's probably a good idea to read it's docs to be at least somewhat familiar with it.

### Basic Example
You must pass the `name` prop to each component in your form. This is the name that will be used to reference the value of the input in the `onSubmit` callback.
If an input element does not have the `name` prop, it will not be included in the data in the `onSubmit` callback.

```jsx
import { Form, SubmitButton } from '@atomicjolt/forms';

const MyForm = () => {
   const onSubmit = (data) => {
     console.log(data);
     // { firstName: "John", lastName: "Doe", age: 21 }
   }

   return (
      <Form onSubmit={onSubmit}>
         <Form.TextInput name="firstName" label="First Name" />
         <Form.TextInput name="lastName" label="Last Name" />
         <Form.NumberInput name="age" label="Age" />
         <SubmitButton>Submit</SubmitButton>
      </Form>
   )
};
```


### Default Values
```jsx
import { Form, SubmitButton } from '@atomicjolt/forms';

const MyForm = () => {
   const onSubmit = (data) => {
     console.log(data);
     // { firstName: "John", lastName: "Doe", age: 21 }
   }

   return (
      <Form onSubmit={onSubmit} defaultValues={{ age: 20 }}>
         <Form.TextInput name="firstName" label="First Name" />
         <Form.TextInput name="lastName" label="Last Name" />
         <Form.NumberInput name="age" label="Age" />
         <SubmitButton>Submit</SubmitButton>
      </Form>
   )
};
```

Note that is you're using TypeScript, the data passed to the `onSubmit` callback's type will be inferred on the `defaultValues` prop passed to the `Form` component. Thus, you may want to provide empty default values for any that don't have a default value.

```tsx
import { Form, SubmitButton } from '@atomicjolt/forms';

type FormData = {
   firstName: string;
   lastName: string;
   age: number;
}

const MyForm = () => {
   const onSubmit = (data: FormData) => {
     console.log(data);
     // { firstName: "John", lastName: "Doe", age: 21 }
   }

   const defaults: FormData = {
      firstName: "",
      lastName: "",
      age: 20
   }

   return (
      <Form onSubmit={onSubmit} defaultValues={defaults}>
         <Form.TextInput name="firstName" label="First Name" />
         <Form.TextInput name="lastName" label="Last Name" />
         <Form.NumberInput name="age" label="Age" />
         <SubmitButton>Submit</SubmitButton>
      </Form>
   )
};
```



### Validations
Each component supports a set of pre-defined validations that can be passed in as props. These props essentially
match the api of the [`react-hook-form` register() function](https://react-hook-form.com/docs/useform/register),
but they're only exposed on the components that make sense. For example, the `Form.TextInput` component supports
the `minLength` and `maxLength` props, and the `Form.NumberInput` component supports the `min` and `max` props, but not vice versa.

```jsx
import { Form, SubmitButton } from '@atomicjolt/forms';

const MyForm = () => {
   const onSubmit = (data) => {
     console.log(data);
   }

   return (
      <Form onSubmit={onSubmit}>
         <Form.TextInput
            name="firstName"
            label="First Name"
            minLength={{ value: 3, message: "Name must be 3 characters or longer" }}
            required="First names is required"
         />
         <Form.TextInput
            name="lastName"
            label="Last Name"
            required="Last name is Required"
         />
         <Form.NumberInput
            name="age"
            label="Age"
            min={{ value: 13, message: "You must be 13 or older to sign up" }}
         />

         <SubmitButton>Submit</SubmitButton>
      </Form>
   )
};
```
Attempting to submit the above form without valid data will result in the related error
messages being displayed below each input & the form will not submit.

### Custom Validations
```jsx
import { Form, SubmitButton } from '@atomicjolt/forms';

const MyForm = () => {
   const onSubmit = (data) => {
     console.log(data);
   }

   return (
      <Form onSubmit={onSubmit}>
         <Form.TextInput name="firstName" label="First Name" />
         <Form.TextInput name="lastName" label="Last Name" />
         <Form.TextInput name="email" label="Email" validate={{
            isEmail: (value) => {
               if (!value) {
                  return "Email is required";
               }
               if (!value.includes("@")) {
                  return "Email must be valid";
               }
               return true;
            }
         }}
         />
         <SubmitButton>Submit</SubmitButton>
      </Form>
   )
};
```

### Custom Components
If you want to build your own custom form components, you can use the `useFormContext` hook to get access to the `react-hook-form` api.

```jsx
import { useFormContext } from 'react-hook-form';

const MyForm = () => {
   const onSubmit = (data) => {
     console.log(data);
   }

   return (
      <Form onSubmit={onSubmit}>
         <Form.TextInput name="firstName" label="First Name" />
         <Form.TextInput name="lastName" label="Last Name" />
         <CustomInput />
      </Form>
   )
}

const CustomInput = () => {
   const methods = useFormContext();

   return (
      <input {...methods.register("nestedInput")} />
   )
}
```


### FormProvider

You're also free to call the `useForm()` hook yourself if you want. This gives you access to the API at the root of your form as well

```jsx
import { FormProvider, Form, SubmitButton } from '@atomicjolt/forms';

const MyForm = () => {
   const methods = useForm();

   const onSubmit = (data) => {
     console.log(data);
   }

   return (
      <FormProvider onSubmit={onSubmit} {...methods}>
         <Form.TextInput name="firstName" label="First Name" />
         <Form.TextInput name="lastName" label="Last Name" />
         <Form.NumberInput name="age" label="Age" />
         <SubmitButton>Submit</SubmitButton>
      </FormProvider>
   )
};
```

### Submitting the Form

Note that the `SubmitButton` component is not required. You can use any button you want to submit the form.
The `SubmitButton` component is just a convenience wrapper around atomic-element's Button component with the `type="submit"` prop set.


```jsx
import { Form } from '@atomicjolt/forms';

const MyForm = () => {
   const onSubmit = (data) => {
     console.log(data);
     // { firstName: "John", lastName: "Doe", age: 21 }
   }

   // Will work just as well :)
   return (
      <Form onSubmit={onSubmit}>
         <Form.TextInput name="firstName" label="First Name" />
         <Form.TextInput name="lastName" label="Last Name" />
         <Form.NumberInput name="age" label="Age" />
         <button type="submit">Submit</button>
      </Form>
   )
};
```

## Developing

Start up the Vite dev server:

```sh
yarn dev
```
The dev server code lives in `src` while the actual library code lives in `lib`.

## Building

```sh
yarn build
```

The built code will be output to the `dist` directory.
