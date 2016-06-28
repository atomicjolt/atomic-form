"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _validator = require("validator");

var _validator2 = _interopRequireDefault(_validator);

var AtomicForm = (function (_React$Component) {
  _inherits(AtomicForm, _React$Component);

  function AtomicForm(props, context) {
    _classCallCheck(this, AtomicForm);

    _get(Object.getPrototypeOf(AtomicForm.prototype), "constructor", this).call(this, props, context);
    this.validateForm = this.validateForm.bind(this);
    this.allValid = this.allValid.bind(this);
    this.getFormValue = this.getFormValue.bind(this);
    this.recursiveCloneChildren = this.recursiveCloneChildren.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = this.getState();
  }

  _createClass(AtomicForm, [{
    key: "getState",
    value: function getState() {
      if (this.props.getState) {
        return this.props.getState();
      } else {
        return {
          formData: this.props.initialData || {}
        };
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (_lodash2["default"].isEmpty(this.state.formData) && !_lodash2["default"].isEmpty(nextProps.initialData) || !_lodash2["default"].isEqual(this.props.initialData, nextProps.initialData)) {
        this.setState({ formData: nextProps.initialData });
      }
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      var formData = this.state.formData;
      var formValidation = this.validateForm(formData);
      if (this.allValid(formValidation)) {
        this.props.doSubmit(formData, formValidation);
      } else {
        this.props.afterValidation(formValidation);
        this.setState({ formData: formData });
      }
    }
  }, {
    key: "allValid",
    value: function allValid(formValidation) {
      return _lodash2["default"].every(_lodash2["default"].values(formValidation), function (v) {
        return v.isValid;
      });
    }
  }, {
    key: "validateForm",
    value: function validateForm() {
      var _this = this;

      var result = {};
      _lodash2["default"].each(this.refs, (function (val, ref) {
        var validators = _this.refs[ref].props.validate;
        result[ref] = {};
        result[ref].isValid = true;
        if (validators) {
          if (_lodash2["default"].isArray(validators)) {
            _lodash2["default"].forEach(validators, (function (validator) {
              if (_lodash2["default"].isFunction(validator.validate)) {
                result[ref].isValid = result[ref].isValid && validator.validate(_lodash2["default"].get(_this.state.formData, ref), _this.state.formData);
              } else if (validator.validate == "isPresent") {
                result[ref].isValid = result[ref].isValid && !!_lodash2["default"].get(_this.state.formData, ref);
              } else {
                var args = validator.args || [];
                result[ref].isValid = result[ref].isValid && _validator2["default"][validator.validate].apply(_validator2["default"], [_lodash2["default"].get(_this.state.formData, ref)].concat(_toConsumableArray(args)));
              }
              if (!result[ref].isValid) {
                result[ref].message = result[ref].message || [];
                result[ref].message.push(validator.message || "");
              }
            }).bind(_this));
          } else {
            console.log("Validators must be an Array for form key: " + key);
          }
        }
      }).bind(this));
      return result;
    }
  }, {
    key: "getFormValue",
    value: function getFormValue(ref) {
      return _lodash2["default"].get(this.state.formData, ref);
    }

    // By default React will discard refs from the children. We override the behavior to include the refs
    // See: https://facebook.github.io/react/docs/clone-with-props.html
  }, {
    key: "recursiveCloneChildren",
    value: function recursiveCloneChildren(children) {
      var _this2 = this;

      return _react2["default"].Children.map(children, function (child) {
        if (!_lodash2["default"].isObject(child)) return child;
        var childProps = {};
        if (child.ref) {
          var oldOnChange = child.props.onChange;
          var valKey = child.props.type == "checkbox" || child.props.type == "radio" ? 'checked' : 'value';

          childProps.onChange = function () {
            if (typeof oldOnChange == 'function') {
              oldOnChange.apply(undefined, arguments);
            }
            var formData = _lodash2["default"].cloneDeep(_this2.state.formData);

            if (typeof child.props.__getOnChangeFormValue == 'function') {
              var _child$props;

              _lodash2["default"].set(formData, child.ref, (_child$props = child.props).__getOnChangeFormValue.apply(_child$props, arguments));
            } else {
              _lodash2["default"].set(formData, child.ref, _this2.refs[child.ref][valKey]);
            }

            _this2.setState({ formData: formData });
          };
          childProps.ref = child.ref;
          childProps[valKey] = _lodash2["default"].get(_this2.state.formData, child.ref);
        }
        childProps.children = _this2.recursiveCloneChildren(child.props.children);
        return _react2["default"].cloneElement(child, childProps);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return _react2["default"].createElement(
        "form",
        { onSubmit: function (e) {
            _this3.handleSubmit(e);
          } },
        this.recursiveCloneChildren(this.props.children)
      );
    }
  }]);

  return AtomicForm;
})(_react2["default"].Component);

exports["default"] = AtomicForm;
module.exports = exports["default"];