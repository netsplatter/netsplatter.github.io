import { toast } from 'react-toastify';

export function errorHandler(opts, res) {
  const {showToast, fn, stopLoading, message} = opts;
  if (showToast && res && res.body && res.body.message && !res.abort) {
    toast.info(message || res.body.message);
  }
  if (stopLoading) {
    this.loading = false;
  }
  return fn && fn(res);
}
