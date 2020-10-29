import React from 'react';
declare type Props = {
    storeName: string;
    description: string;
    amount: number;
    currency: string;
    allowRememberMe: boolean;
    email: string;
    onClose: () => void;
    onPaymentSuccess: (token: string) => void;
};
declare class StripeCheckoutCreditsModal extends React.Component<Props> {
    onClose: () => void;
    onPaymentSuccess: (token: string) => Promise<null>;
    render(): JSX.Element;
}
export default StripeCheckoutCreditsModal;
