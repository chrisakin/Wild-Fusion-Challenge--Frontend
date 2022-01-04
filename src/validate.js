import { required, confirmed, email } from "vee-validate/dist/rules";
import { extend } from "vee-validate";

extend("required", {
  ...required,
  message: '{_field_} is required.'
});

extend("email", {
  ...email,
  message: "Invalid email address."
});

extend("confirmed", {
  ...confirmed,
  message: "Passwords do not match."
});