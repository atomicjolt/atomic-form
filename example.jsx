import AtomicForm from 'atomic-form';
import UserAction from './actions/user';

export default class RegisterForm extends React.createClass({

  constructor(props, context){
    super(props, context);
    this.state = this.getState();
  }

  getState() {
    //Optional - Set form initial data.
    return {
      initialData: {
        email: "test@example.com",
        password: "example",
        confirmPassword: "example"
      }
    }
  }

  afterValidation(formValidations) {
    //Callback after validation fails.
    this.setState({validations: formValidations});
  }

  doSubmit(formData) {
    //Callback after a user hits submit and the formdata is all valid.
    UserAction.register({
      User: {
        email: formData.email,
        password: formData.password
      }
    });
  }

  componentWillUnmount() {
    //Optional - We can get the formData from our form anytime.
    var formData = this.refs.MainForm.formData();
  }

  onInputChange() {
    //Optional - If we want to validate the form from an onChange callback.
    var formData = this.refs.MainForm.formData();
    var formValidations = this.refs.MainForm.validate(formData);
    this.setState(validations: formValidations);
  }

  validationMessage(field) {
    if (this.state.valid && this.state.valid[field]) {
      if (!this.state.valid[field].isValid) {
        return _.map(this.state.valid[field].message, (message) => {
          return <span>message</span>;
        });
      }
    }
    return <div/>;
  }

  render() {
    return <div>
      <AtomicForm ref="MainForm" initialData={this.state.initialData} doSubmit={this.doSubmit} afterValidation={this.afterValidation}>
        <div className="row">
          <input type="text" ref="email" validate={[
            {
              message: "Must be a valid Email.",
              validate: "isEmail",
            }
          ]} onChange={(e) => {this.onInputChange}}/>
          {validationMessage("email")}
          <input type="text" ref="password" validate={[
            {
              message: "Password must be at least 5 characters long.",
              validate: "isLength",
              args: [5]
            }
          ]}/>
          {validationMessage("password")}
          <input type="text" ref="confirmPassword" validate={[
            {
              message: "Passwords must match",
              validate: (val, formData) => {val == formData.password},
            }
          ]}/>
          {validationMessage("confirmPassword")}
          <input type="submit" value="Submit"/>
        </div>
      </AtomicForm>
    </div>
  }
});