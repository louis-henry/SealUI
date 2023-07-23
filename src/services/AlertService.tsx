import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class ToastService {

  showToast(message: string, options?: ToastOptions) {
    toast(message, options ?? { autoClose: 2000 });
  }

  showSuccess(message: string, options?: ToastOptions) {
    toast.success(message, options ?? { autoClose: 2000 });
  }

  showInfo(message: string, options?: ToastOptions) {
    toast.info(message, options ?? { autoClose: 2000 });
  }

  showWarning(message: string, options?: ToastOptions) {
    toast.warn(message, options ?? { autoClose: 4000 });
  }

  showError(message: string, options?: ToastOptions) {
    toast.error(message, options ?? { autoClose: 5000 });
  }
}
