import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@atomicjolt/atomic-elements";
import { Form, FormProvider } from "../lib";
import "./App.css";

function App() {
  const [value, setValue] = useState<any>(null);
  const methods = useForm();

  const ethnicity = methods.watch("ethnicity.choice");
  const notifications = methods.watch("notifications");

  return (
    <div>
      <FormProvider {...methods} onSubmit={(v) => setValue(v)}>
        <Form.TextInput
          name="name"
          label="Name"
          size="large"
          required="Name is Required"
        />
        <Form.Textarea name="description" label="Description" size="small" />
        <Form.NumberInput
          name="age"
          label="Age"
          min={{
            value: 13,
            message: "Must be at least 13",
          }}
          required="Age is required"
        />

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
          />
        )}

        <Form.ToggleSwitch name="notifications" label="Recieve Notifications" />

        {notifications && (
          <Form.RadioGroup
            name="notification_frequency"
            label="Notification Frequencey"
          >
            <Form.Radio value="immediate">Immediatley</Form.Radio>
            <Form.Radio value="daily">Daily</Form.Radio>
            <Form.Radio value="weekly">Weekly</Form.Radio>
          </Form.RadioGroup>
        )}

        <Form.Checkbox
          name="consent"
          label="I have read the terms and conditions"
          required="You must read th terms and conditions to continue"
        />

        <Button type="submit">Submit</Button>
      </FormProvider>

      {value && <pre>{JSON.stringify(value, null, 2)}</pre>}
    </div>
  );
}

export default App;
