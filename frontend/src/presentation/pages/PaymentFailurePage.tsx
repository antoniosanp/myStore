import { PaymentStatusView } from '../features/payment/PaymentStatusView';

export const PaymentFailurePage = () => {
  return <PaymentStatusView status="failure" />;
};
