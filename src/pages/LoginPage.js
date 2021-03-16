import { Button, Form, FormGroup, TextInput } from "carbon-components-react";
import { ArrowRight16 } from "@carbon/icons-react";

function LoginPage() {
  return (
    <Form className="login-form">
      <h1>Log in</h1>
      <FormGroup legendText="Login with username and password">
        <TextInput placeholder="Username" />
      </FormGroup>
      <Button renderIcon={ArrowRight16} iconDescription="Continue">
        Continue
      </Button>
    </Form>
  );
}

export default LoginPage;
