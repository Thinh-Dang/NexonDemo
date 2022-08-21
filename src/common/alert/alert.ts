import Swal from 'sweetalert2';

const StatusMiddleWare = (status, data) => {
  const { infoMessage, type = 'success' } = data;
  if (!infoMessage) {
    return true;
  }
  switch (status) {
    case true:
      infoMessage && Swal.fire('', infoMessage, type);
      return true;
    case false:
      Swal.fire('Lỗi hệ thống', infoMessage, 'error');
      return false;
    default:
      return false;
  }
};
export { StatusMiddleWare };
