import axios, { AxiosResponse } from "axios";
import CryptoJS from "crypto-js";
import { TransactionDetails } from "./type";

interface PaymentBody {
  amountDetails: {
    amount: number;
    currencyCode: string;
  };
  reasonForPayment: string;
  resultUrl: string;
  returnUrl: string;
}

interface PaymentResponse {
  payload: string;
}

const paymentUrl = "https://api.pesepay.com/api/payments-engine/v1/payments/initiate"; 
const checkPaymentUrl =
  "https://api.pesepay.com/api/payments-engine/v1/payments/check-payment?referenceNumber=";



 const EncryptPayment = (paymentBody: PaymentBody, encriptionKey:string): string => {
  const encryptedJson = CryptoJS.AES.encrypt(
    JSON.stringify(paymentBody),
    CryptoJS.enc.Utf8.parse(encriptionKey),
    {
      iv: CryptoJS.enc.Utf8.parse(encriptionKey.substring(0, 16)),
    }
  ).toString();

  return encryptedJson;
};

 const DecriptPayment = (encryptedString:string,encriptionKey:string): TransactionDetails | null => {
  const decryptedBytes = CryptoJS.AES.decrypt(
    encryptedString,
    CryptoJS.enc.Utf8.parse(encriptionKey),
    {
      iv: CryptoJS.enc.Utf8.parse(encriptionKey.substring(0, 16)),
    }
  );
  const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
  try {
    return JSON.parse(decryptedData);
  } catch (error) {
    console.error("Error parsing decrypted data:", error);
    return null;
  }
};

 const MakePayment = async (paymentBody: PaymentBody,encriptionKey:string,integrationKey:string): Promise<TransactionDetails | null> => {
    try {
      const encryptedPayment = EncryptPayment(paymentBody,encriptionKey);
      const payload = { payload: encryptedPayment };

      const response: AxiosResponse<PaymentResponse> = await axios.post(
        paymentUrl,
        payload,
        {
          headers: {
            authorization: integrationKey,
            "Content-Type": "application/json",
          },
        }
      );

      const decryptedData = DecriptPayment(response.data.payload,encriptionKey);
      return decryptedData;
    } catch (error) {
      console.error("Error making payment:", error);
      return null
    }
}
  
 const CheckPayment = async (referenceNumber: string, encriptionKey:string,integrationKey:string): Promise<TransactionDetails | null> => {
    try {
      const payload = { referenceNumber };

      const response: AxiosResponse<PaymentResponse> = await axios.get(
        `${checkPaymentUrl}${referenceNumber}`,
        {
          headers: {
            authorization: integrationKey,
            "Content-Type": "application/json",
          },
        }
      );

      const decryptedData = DecriptPayment(response.data.payload, encriptionKey);
     
      return decryptedData;
    } catch (error) {
      console.error("Error checking payment status:", error);
      throw error;
    }
  }


  export { MakePayment, CheckPayment, EncryptPayment, DecriptPayment };
