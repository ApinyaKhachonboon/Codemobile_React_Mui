import * as React from "react";
import { useNavigate } from "react-router";
import { Formik, FormikProps } from "formik";
import { Box, Button, Card, CardContent, Stack, SxProps, TextField, Theme, Typography } from "@mui/material";
import { User } from "../../../types/user.type";

type LoginPageProps = {
  //
};

const LoginPage: React.FC<any> = () => {
  const navigate = useNavigate();
  const classes: any = {
    root: { display: "flex", justifyContent: "center" },
    buttons: {marginTop: 2},
  }
  const [account, setAccount] = React.useState({ username: "", password: "" })

  const showFormV1 = ({
    handleSubmit,
    handleChange,
    values,
    isSubmitting
  }: FormikProps<any>) => {
    return (
      <form onSubmit={(handleSubmit)}>
        <label>Username: </label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
          value={values.username} />
        <br />
        <label>Password: </label>
        <input
          type="text"
          name="password"
          id="password"
          onChange={handleChange}
          value={values.password} />

        <br />
        {/* <span>Debug {JSON.stringify(account)}</span> */}

        <br />
        {/* protect submit >= 1 */}
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
        <button onClick={() => navigate("/register")}>Register</button>
      </form>
    )
  }

  const showFormV2 = ({
    handleSubmit,
    handleChange,
    values,
    isSubmitting
  }: FormikProps<User>) => {
    return (
      <form onSubmit={(handleSubmit)}>
        <TextField
          id="username"
          label="Username"
          margin="normal"
          required
          fullWidth
          onChange={handleChange}
          value={values.username}
          autoComplete="email"
          autoFocus
          variant="outlined"
        />
        <TextField
          id="password"
          label="Password"
          margin="normal"
          required
          fullWidth
          onChange={handleChange}
          value={values.password}
          type="password"
          variant="outlined"
        />
        {/* <span>Debug {JSON.stringify(account)}</span> */}
        <Stack direction="row" spacing={2} sx={classes.buttons}>
          <Button onClick={() => navigate("/register")} type="button" fullWidth variant="outlined">
            Register
          </Button>
          <Button type="submit" fullWidth variant="contained" color="primary" disabled={isSubmitting}>
            Create
          </Button>
        </Stack>

      </form>
    )
  }

  const initailValues: User = { username: "lek", password : "xxxx"};
  return (
    <>
      <Box sx={classes.root}>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Login
            </Typography >
            <Formik
              onSubmit={(values, { setSubmitting }) => {
                alert(JSON.stringify(values));
                setTimeout(() => {
                  setSubmitting(false);
                }, 2000)
              }}
              initialValues={initailValues} >
              {(props) => showFormV2(props)}
            </Formik>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default LoginPage;
