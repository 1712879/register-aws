import { Box, Button, Container, Grid } from '@material-ui/core';
import CreateForm from 'src/components/pageComponent/ExamsCreateForm';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMonHoc } from 'src/store/actions/dkhpAction';
import Tables from 'src/components/common/Tables';
import swal from 'sweetalert2';
import API from 'src/api';
import { useHistory } from 'react-router-dom';
import RoutesString from 'src/routes/routesString';

const PageCreate = () => {
  const { push } = useHistory();
  const {user } = useSelector((state) => state.auth);
  console.log({ user})
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const isUpdatePage = !!id;
  const [listMonHoc, setListMonHoc] = useState([])
  const [values, setValues] = useState({
    fullName: `${user.firstName || ''} ${user.lastName || ''}`,
    hocKy: 1,
    total: 0,
    // _id: '',
    monHoc: []
  });
  const handleSubmit = async (values) => {
    console.log(values)
    if (!values.fullName || values.monHoc.length < 1){
      swal
        .fire({
          title: 'Thiếu thông tin',
          text: 'Thiếu thông tin',
          icon: 'warning',
          showCancelButton: true,
        })
        return;
      }
    try {
      const response = await API({
        url: '/dkhp',
        method: 'POST',
        data: values
      });
      console.log(response.code)
      if (response.code != 200) {
        throw new Error(response.message)
      }
      swal.fire({
        title: 'Message',
        text: 'Đăng ký thành công',
        icon: 'success'
      }).then((result) => {
        push(RoutesString.DashboardLayout)
      });
      return {};
    } catch (error) {
      swal.fire({
        title: 'Message',
        text: 'Sai thông tin, vui lòng nhập lại',
        icon: 'error'
      });
      return {
        error: error
      };
    }
  };

  useEffect(async () => {
    try {
      const response = await API({
        url: '/mon-hoc',
        method: 'GET'
      });
      console.log(response)
      if (response.code != 200) {
        throw new Error(response.message)
      }
      setListMonHoc(response.data || [])
    } catch (error) {
      Swal.fire({
        title: 'Message',
        text: error.message,
        icon: 'error'
      });
      return {
        error: error
      };
    }
  }, [])

  const logOut = () => {
    localStorage.clear()
    push(RoutesString.LOGIN)
  }
  
  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 1
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3} xs={12}>
            <Grid item xs={12}>
              <Box sx={{ display:"flex", justifyContent: 'flex-end' }}>
                <Button
                  color="primary"
                  size="large"
                  variant="contained"
                  onClick={logOut}
                >
                  Đăng Xuất
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12}>
              {isLoading ? (
                <div className="cover">
                  <Loader type="Puff" color="#000" />
                </div>
              ) : (
                <>
                <CreateForm
                  isUpdatePage={isUpdatePage}
                  initialValues={values}
                  handleSubmit={handleSubmit}
                      MonHocArray={listMonHoc}
                />
                    
                </>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default PageCreate;
