"use strict";

import React        from 'react';
import TestUtils    from 'react/lib/ReactTestUtils';
import AtomicForm    from './AtomicForm';

describe('Atomic Forms', ()=>{
  var form;

  describe('An Email Form that has one input', ()=>{
    var initialData = {
      "test1": "testing@example.com",
    }

    beforeEach(()=>{
      form = TestUtils.renderIntoDocument(
        <AtomicForm initialData={initialData} doSubmit={function(){}} afterValidation={function(validations){}}>
          <div className="row">
            <input type="text" ref="test1" validate={[
              {
                message: "Must be a valid Email",
                validate: "isEmail",
              }
            ]}/>
          </div>
        </AtomicForm>
      );
    });

    it('Renders the AtomicForm', ()=>{
      expect(form).toExist();
    });

    it('Returns Form Data', ()=>{
      form.updateFormData();
      expect(form.formData()).toEqual(initialData);
    });

    it('Allows the user to set initial data', () => {
      form.updateFormData();
      expect(React.findDOMNode(form.refs.test1).value).toEqual("testing@example.com");
    });

    it('Has a valid email', () => {
      var formData = {
        "test1": "testing@example.com"
      }
      var Errors = form.validateForm(formData);
      expect(Errors.test1.message).toBe(undefined);
      expect(Errors.test1.isValid).toBe(true);
    });

    it('Has an invalid email', () => {
      var formData = {
        "test1": "testing@example"
      }
      var Errors = form.validateForm(formData);
      expect(Errors.test1.message).toEqual(["Must be a valid Email"]);
      expect(Errors.test1.isValid).toBe(false);
    });

    it('Has email validation errors', () => {
      var node = React.findDOMNode(form.refs.test1);
      node.value = "testing@example"

      var Errors = form.validateForm(form.formData());
      expect(Errors.test1.message).toEqual(["Must be a valid Email"]);
      expect(Errors.test1.isValid).toBe(false);
    });

    it('Has no present validation errors', () => {
      var node = React.findDOMNode(form.refs.test1);
      node.value = "testing@example.com"

      var Errors = form.validateForm(form.formData());
      expect(Errors.test1.message).toBe(undefined);
      expect(Errors.test1.isValid).toBe(true);
    });

  });

  describe('A form that has checkboxes', ()=>{
    var initialData = {
      "Bike1": true,
      "Terms": true
    }

    beforeEach(()=>{
      form = TestUtils.renderIntoDocument(
        <AtomicForm initialData={initialData}>
          <div className="row">
              <input type="checkbox" ref="Bike1" value={false}/>
          </div>
          <div className="row">
              <input type="checkbox" ref="Bike2" value={false} validate={[
                {
                  message: "Bike2 should equal Bike1",
                  validate: (val, formData) => {return val == formData.Bike1}
                }
              ]}/>
          </div>
          <div className="row">
              <span>Agree to the Terms and Conditions</span>
              <input type="checkbox" ref="Terms" value={false} validate={[
                {
                  message: "You must agree with the terms and conditions to continue.",
                  validate: (val) => {return !!val}
                }
              ]}/>
          </div>
        </AtomicForm>
      );
    });

    it('Formdata returns with checkbox values', () => {
      expect(form.formData()).toEqual({
        "Bike1": "false",
        "Bike2": "false",
        "Terms": "false",
      });
    });

    it('Allows the user to set initial data', () => {
      form.updateFormData();
      expect(form.formData()).toEqual({
        "Bike1": "true",
        "Bike2": "",
        "Terms": "true",
      });
    });

    it('Can Validate against another field', () => {
      var formData = {
        "Bike1": true,
        "Bike2": true,
        "Terms": true,
      };
      var Errors = form.validateForm(formData);
      expect(Errors).toEqual({
        Bike1: {isValid: true},
        Bike2: {isValid: true},
        Terms: {isValid: true}
      });
    });
  });

  describe('A form that has one input with multiple validators', ()=>{
    beforeEach(()=>{
      form = TestUtils.renderIntoDocument(
        <AtomicForm>
          <div className="row">
              <input type="text" ref="Email" validate={[
                {
                  message: "Is Required",
                  validate: "isPresent"
                },
                {
                  message: "Must be a valid Email",
                  validate: "isEmail",
                },
                {
                  message: "Must be at least 10 characters",
                  validate: (val) => {return val.length > 10}
                }
              ]}/>
          </div>
        </AtomicForm>
      );
    });

    it('Return many error messages', () => {
      var validation = form.validateForm({
        "Email": ""
      });
      expect(validation).toEqual({
        Email: {
          isValid: false,
          message: [ 'Is Required', 'Must be a valid Email', 'Must be at least 10 characters' ]
        }
      });
    });

    it('Passes many validations', () => {
      var validation = form.validateForm({
        "Email": "testing@example.com"
      });
      expect(validation).toEqual({
        Email: {
          isValid: true
        }
      });
    });
  });

  describe('A form that uses validator with many args', ()=>{
    beforeEach(()=>{
      form = TestUtils.renderIntoDocument(
        <AtomicForm>
          <input type="text" ref="Currency" validate={[
            {
              message: "Is Required",
              validate: "isCurrency",
              args: [{symbol: "$", require_symbol: true}]
            }
          ]}/>
        </AtomicForm>
      );
    });

    it('Correctly uses args', () => {
      var withSymbol = form.validateForm({
        "Currency": "$49.95"
      });
      var withoutSymbol = form.validateForm({
        "Currency": "49.95"
      });
      expect(withSymbol).toEqual({
        Currency: {isValid: true}
      });
      expect(withoutSymbol).toEqual({
        Currency: {
          isValid: false,
          message: [ 'Is Required' ]
        }
      });
    });
  });
});