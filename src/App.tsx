import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormProvider, SubmitButton } from "../lib";
import "./App.css";
import { ComboBox } from "@atomicjolt/atomic-elements";

interface Fields {
  name: string;
  description: string;
  age: number | null;
  ethnicity: {
    choice?: string | null;
    custom?: string | null;
  };
  address?: string;
  number: string | null;
  notifications: boolean;
  notificationFrequency: string | null;
  consent: boolean;
}

const defaultValues: Fields = {
  // name: "",
  // description: "",
  // age: null,
  // ethnicity: {
  //   choice: "",
  //   custom: null,
  // },
  // number: null,
  // notifications: false,
  // notificationFrequency: null,
  // consent: false,
  address: "",
};

function App() {
  const [value, setValue] = useState<any>(null);
  const methods = useForm<Fields>({ defaultValues });

  const desc = methods.watch("description");
  const ethnicity = methods.watch("ethnicity.choice");
  const notifications = methods.watch("notifications");
  const address = methods.watch("address");

  return (
    <div>
      <FormProvider {...methods} onSubmit={(v) => setValue(v)}>
        <Form.TextInput
          name="name"
          label="Name"
          size="large"
          isRequired="Name is Required"
          maxLength={{
            value: 10,
            message: "Name must be less than 10 characters",
          }}
          validate={(v) => (v === "1234" ? "Name cannot be 1234" : undefined)}
          pattern={{
            value: /[a-z]/,
            message: "Name must contain a lowercase letter",
          }}
          defaultValue="1234"
        />
        <Form.TextArea
          name="description"
          label="Description"
          size="auto"
          maxLength={{
            value: 1000,
            message: "Description must be less than 1000 characters",
          }}
          message={`${1000 - (desc?.length || 0)} characters remaining`}
        />
        <Form.NumberInput
          name="age"
          label="Age"
          minValue={{
            value: 13,
            message: "Must be at least 13",
          }}
          isRequired="Age is required"
        />

        <br />

        <Form.Select name="ethnicity.choice" label="Ethnicity">
          <Form.Option value="asian">Asian</Form.Option>
          <Form.Option value="black">Black or African American</Form.Option>
          <Form.Option value="hispanic">Hispanic or Latino</Form.Option>
          <Form.Option value="white">White</Form.Option>
          <Form.Option value="other">Other</Form.Option>
        </Form.Select>

        {ethnicity === "other" && (
          <Form.TextInput
            name="ethnicity.custom"
            label="Please Specify"
            size="large"
            isRequired="Please specify"
            shouldUnregister
          />
        )}

        <Form.CustomSelect
          name="number"
          label="Favorite Number"
          menuSize="medium"
          defaultSelectedKey={"1"}
        >
          <Form.Item key="1">One</Form.Item>
          <Form.Item key="2">Two</Form.Item>
          <Form.Item key="3">Three</Form.Item>
        </Form.CustomSelect>

        {address}

        <br />

        <Form.ComboBox name="address" label="Address">
          <Form.Item key="1234 Main St">1234 Main St</Form.Item>
          <Form.Item key="5678 Elm St">5678 Elm St</Form.Item>
          <Form.Item key="91011 Oak St">91011 Oak St</Form.Item>
        </Form.ComboBox>

        <br />

        {/* <Form.ToggleSwitch name="notifications">
          Receive Notifications
        </Form.ToggleSwitch>

        {notifications && (
          <Form.RadioGroup
            name="notificationFrequency"
            label="Notification Frequencey"
            shouldUnregister
          >
            <Form.Radio value="immediate">Immediatley</Form.Radio>
            <Form.Radio value="daily">Daily</Form.Radio>
            <Form.Radio value="weekly">Weekly</Form.Radio>
          </Form.RadioGroup>
        )}

        <Form.CheckBox
          name="consent"
          isRequired="You must read the terms and conditions to continue"
        >
          I agree to the terms and conditions
        </Form.CheckBox> */}

        <br />
        <br />

        <SubmitButton>Submit</SubmitButton>
      </FormProvider>

      {value && <pre>{JSON.stringify(value, null, 2)}</pre>}
    </div>
  );
}

export default App;
