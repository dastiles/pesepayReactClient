export interface TransactionDetails {
  amountDetails: {
    amount: number;
    currencyCode: string;
    customerPayableAmount: number;
    defaultCurrencyAmount: number;
    defaultCurrencyCode: string;
    formattedMerchantAmount: string;
    merchantAmount: number;
    totalTransactionAmount: number;
    transactionServiceFee: number;
  };
  applicationCode: string;
  applicationName: string;
  chargeType: "NO_CHARGE" | string; // Enum-like string literal for specific values
  customer: {
    contactNumbers: string[];
    email: string;
    name: string;
  };
  customerAmountPaid: {
    amountPaid: number;
    currencyCode: string;
  };
  dateOfTransaction: string;
  id: number;
  internalReference: string;
  liquidationStatus: "COMPLETED" | string;
  liquidationTransactionReference: string;
  localDateTimeOfTransaction: string;
  merchantReference: string;
  paymentMetadata: Record<string, any>; // Object with unknown key-value pairs
  paymentMethodDetails: {
    paymentMethodCode: string;
    paymentMethodId: number;
    paymentMethodMessage: string;
    paymentMethodName: string;
    paymentMethodReference: string;
    paymentMethodStatus: string;
  };
  pollUrl: string;
  reasonForPayment: string;
  redirectRequired: boolean;
  redirectUrl: string;
  referenceNumber: string;
  resultUrl: string;
  returnUrl: string;
  settlementMode: "DIRECTLY_SETTLED" | string;
  timeOfTransaction: string;
  transactionDate: string;
  transactionStatus: "AUTHORIZATION_FAILED" | string;
  transactionStatusCode: number;
  transactionStatusDescription: string;
  transactionType: "BASIC" | string;
}
