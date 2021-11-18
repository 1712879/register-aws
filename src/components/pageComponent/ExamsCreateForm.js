import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core';
import { useFormik } from 'formik';
import Loader from 'react-loader-spinner';
import {useHistory} from "react-router-dom";
const HocKyEnum = [
  {label: "HK I", value: 1},
  {label: "HK II", value: 2},
]
const CreateForm = ({
  isUpdatePage,
  initialValues,
  handleSubmit,
  loading,}) => {
  const history = useHistory();
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      handleSubmit(values);
    },
    enableReinitialize: true
  });
  return (
    <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader
          title={'Đăng Ký Môn Học'}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Họ Tên"
                name="fullName"
                onChange={formik.handleChange}
                required
                value={formik.values.fullName}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Học kỳ ({(new Date()).getFullYear()})
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="hocKy"
                  value={formik.values.hocKy}
                  label="hocKy"
                  onChange={formik.handleChange}
                >
                  {HocKyEnum.map((item) => (
                    <MenuItem value={item.value}>{item.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Tổng số tín chỉ"
                name="total"
                disabled
                type="number"
                onChange={formik.handleChange}
                value={formik.values.total}
                variant="outlined"
              />
            </Grid>
            
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button color="secondary" variant="outlined" onClick={() => history.goBack()} style={{marginRight:"10px"}}>
            Trở lại
          </Button>
          <Button color="primary" variant="contained" type="submit">
          
            {loading ? (
              <Loader height={15} type="Puff" color="#fff" />
            ) : (
              'Submit'
            )}
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default CreateForm;
