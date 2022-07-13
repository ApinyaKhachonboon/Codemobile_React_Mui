import * as React from "react";
import { useNavigate } from "react-router";
import { Formik, FormikProps } from "formik";
import { Alert, Box, Button, Card, CardContent, Stack, SxProps, TextField, Theme, Typography } from "@mui/material";
import { User } from "../../../types/user.type";
import { httpClient } from "../../../../src/utils/httpclient";
import { server } from "../../../Constants";
import * as registerActions from "../../../actions/register.action"
import { useSelector } from "react-redux";
import { RootReducer } from "../../../reducers";
import { useAppDispatch } from "../../..";


type RegisterPageProps = {
  //
};

const RegisterPage: React.FC<any> = () => {
  const registerReducer = useSelector(
    (state: RootReducer) => state.registerReducer
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const classes: any = {
    root: { display: "flex", justifyContent: "center" },
    buttons: { marginTop: 2 },
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
        <button onClick={() => navigate("/login")}>Back</button>
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
        {registerReducer.isError && <Alert severity="error">Register failed</Alert>}
        <Stack direction="row" spacing={2} sx={classes.buttons}>
          <Button onClick={() => navigate("/login")} type="button" fullWidth variant="outlined">
            Cancel
          </Button>
          <Button type="submit" fullWidth variant="contained" color="primary" disabled={registerReducer.isFetching}>
            Create
          </Button>
        </Stack>

      </form>
    )
  }

  const initailValues: User = { username: "lek", password: "xxxx" }
  return (
    <>
      <Box sx={classes.root}>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Register
            </Typography >
            <Formik
              onSubmit={async (values, {}) => {
                dispatch(registerActions.register(values, navigate));
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

export default RegisterPage;

