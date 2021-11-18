import { Box, Container, Grid } from '@material-ui/core';
import CreateForm from 'src/components/pageComponent/ExamsCreateForm';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { create } from 'src/store/actions/examAction';
import Tables from 'src/components/common/Tables';
import swal from 'sweetalert2';
const MonHocEnum = [
  {
    id: 1,
    name: "Lập trình mobile",
    stc: 4,
    trangThai: 'Mở'
  },
  {
    id: 2,
    name: "Lập trình website",
    stc: 4,
    trangThai: 'Mở'
  },
  {
    id: 3,
    name: "Machine Learning",
    stc: 4,
    trangThai: 'Mở'
  },
  {
    id: 4,
    name: "Nhập môn lập trình",
    stc: 4,
    trangThai: 'Mở'
  },
]
const PageCreate = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const isUpdatePage = !!id;
  const [values, setValues] = useState({
    fullName: '',
    hocKy: 1,
    total: 0,
    _id: '',
    monHoc: []
  });
  const handleSubmit = (values) => {
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
    swal
      .fire({
        title: 'Thêm thành công',
        text: 'Thêm thành công',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Có',
        cancelButtonText: 'Không'
      })
  };

  const handleSelectMonHoc = (monHocId) => {
    let monHoc = MonHocEnum.find(e => e.id == monHocId);
    if(monHoc){
      setValues(o => {
        let listMonHoc = values.monHoc;
        listMonHoc.push(monHoc)
        let total = values.total;
        total += monHoc.stc;
        return {
          ...o,
          monHoc: listMonHoc,
          total
        }
      })
    }
  }

  const handleDeleteMonHoc = (monHocId) => {
    let monHoc = values.monHoc.find(e => e.id == monHocId);
    console.log({ monHoc})
    if (monHoc) {
      setValues(o => {
        let listMonHoc = values.monHoc.filter(e => e.id != monHocId)
        console.log(listMonHoc)
        let total = values.total;
        total -= monHoc.stc;
        return {
          ...o,
          monHoc: listMonHoc,
          total
        }
      })
    }else{
      swal
        .fire({
          title: '',
          text: 'Không thể xóa môn học chưa đăng ký',
          icon: 'error',
          showCancelButton: true,
        })
    }
  }
  
  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3} xs={12}>
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
                />
                    <Tables data={MonHocEnum} handleSelectMonHoc={handleSelectMonHoc}
                      handleDeleteMonHoc={handleDeleteMonHoc} listMonHoc={values.monHoc}/>
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
