

---

# Payment Encryption & Decryption Utility Package

This package provides utilities for encrypting and decrypting payment information, initiating payments, and checking the status of payments using the Pesepay .

## Features

- **EncryptPayment**: Encrypts the payment details.
- **DecryptPayment**: Decrypts the encrypted payment response.
- **MakePayment**: Makes an encrypted payment request to Pesepay API.
- **CheckPayment**: Checks the payment status by reference number.

## Installation

Install the package via npm:

```bash
npm install your-package-name
```



## Usage

### In React

1. **Import the functions:**

   ```javascript
   import { MakePayment, CheckPayment, EncryptPayment, DecriptPayment } from 'your-package-name';
   ```

2. **Example of Making a Payment:**

   ```javascript
   import React, { useState } from 'react';
   import { MakePayment } from 'your-package-name';

   const PaymentComponent = () => {
     const [paymentResult, setPaymentResult] = useState(null);

     const handlePayment = async () => {
       const paymentBody = {
         amountDetails: { amount: 100, currencyCode: "USD" },
         reasonForPayment: "Order Payment",
         resultUrl: "https://yourapp.com/payment-result",
         returnUrl: "https://yourapp.com/return"
       };

       const encryptionKey = "your-encryption-key";
       const integrationKey = "your-integration-key";

       const result = await MakePayment(paymentBody, encryptionKey, integrationKey);
       setPaymentResult(result);
     };

     return (
       <div>
         <button onClick={handlePayment}>Make Payment</button>
         {paymentResult && <div>Payment Result: {JSON.stringify(paymentResult)}</div>}
       </div>
     );
   };

   export default PaymentComponent;
   ```

3. **Example of Checking Payment Status:**

   ```javascript
   import React, { useState } from 'react';
   import { CheckPayment } from 'your-package-name';

   const CheckPaymentComponent = () => {
     const [paymentStatus, setPaymentStatus] = useState(null);

     const checkPaymentStatus = async () => {
       const referenceNumber = "your-reference-number";
       const encryptionKey = "your-encryption-key";
       const integrationKey = "your-integration-key";

       const status = await CheckPayment(referenceNumber, encryptionKey, integrationKey);
       setPaymentStatus(status);
     };

     return (
       <div>
         <button onClick={checkPaymentStatus}>Check Payment Status</button>
         {paymentStatus && <div>Payment Status: {JSON.stringify(paymentStatus)}</div>}
       </div>
     );
   };

   export default CheckPaymentComponent;
   ```

### In Angular

1. **Import the package:**

   First, ensure that you have installed the package:

   ```bash
   npm install your-package-name axios crypto-js
   ```

2. **Create a service for the payment functions:**

   ```typescript
   // payment.service.ts

   import { Injectable } from '@angular/core';
   import { MakePayment, CheckPayment } from 'your-package-name';

   @Injectable({
     providedIn: 'root',
   })
   export class PaymentService {

     async makePayment() {
       const paymentBody = {
         amountDetails: { amount: 100, currencyCode: "USD" },
         reasonForPayment: "Order Payment",
         resultUrl: "https://yourapp.com/payment-result",
         returnUrl: "https://yourapp.com/return"
       };

       const encryptionKey = 'your-encryption-key';
       const integrationKey = 'your-integration-key';

       return await MakePayment(paymentBody, encryptionKey, integrationKey);
     }

     async checkPayment(referenceNumber: string) {
       const encryptionKey = 'your-encryption-key';
       const integrationKey = 'your-integration-key';

       return await CheckPayment(referenceNumber, encryptionKey, integrationKey);
     }
   }
   ```

3. **Use the payment service in a component:**

   ```typescript
   // payment.component.ts
   import { Component } from '@angular/core';
   import { PaymentService } from './payment.service';

   @Component({
     selector: 'app-payment',
     templateUrl: './payment.component.html'
   })
   export class PaymentComponent {

     paymentResult: any;
     paymentStatus: any;

     constructor(private paymentService: PaymentService) {}

     makePayment() {
       this.paymentService.makePayment().then(result => {
         this.paymentResult = result;
       }).catch(error => console.error("Payment Error:", error));
     }

     checkPaymentStatus() {
       const referenceNumber = 'your-reference-number';
       this.paymentService.checkPayment(referenceNumber).then(status => {
         this.paymentStatus = status;
       }).catch(error => console.error("Payment Status Error:", error));
     }
   }
   ```

4. **Component Template Example:**

   ```html
   <!-- payment.component.html -->
   <button (click)="makePayment()">Make Payment</button>
   <div *ngIf="paymentResult">Payment Result: {{ paymentResult | json }}</div>

   <button (click)="checkPaymentStatus()">Check Payment Status</button>
   <div *ngIf="paymentStatus">Payment Status: {{ paymentStatus | json }}</div>
   ```

## API Reference

### `EncryptPayment(paymentBody: PaymentBody, encryptionKey: string): string`

- **Parameters:**
  - `paymentBody`: The body of the payment.
  - `encryptionKey`: The encryption key used for encrypting the payment details.
  
- **Returns**: A string representing the encrypted payment body.

### `DecriptPayment(encryptedString: string, encryptionKey: string): TransactionDetails | null`

- **Parameters:**
  - `encryptedString`: The encrypted string to decrypt.
  - `encryptionKey`: The key used for decryption.
  
- **Returns**: The decrypted payment details or `null` if decryption fails.

### `MakePayment(paymentBody: PaymentBody, encryptionKey: string, integrationKey: string): Promise<TransactionDetails | null>`

- **Parameters:**
  - `paymentBody`: The payment details to be sent to the API.
  - `encryptionKey`: The encryption key used for encrypting the payment.
  - `integrationKey`: The integration key used for authenticating with the API.
  
- **Returns**: The payment response as `TransactionDetails`.

### `CheckPayment(referenceNumber: string, encryptionKey: string, integrationKey: string): Promise<TransactionDetails | null>`

- **Parameters:**
  - `referenceNumber`: The reference number of the payment.
  - `encryptionKey`: The encryption key used for decrypting the response.
  - `integrationKey`: The integration key used for authenticating with the API.
  
- **Returns**: The payment status as `TransactionDetails`.

### `TransactionDetails` Structure

```typescript
interface TransactionDetails {
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
  chargeType: "NO_CHARGE" | string;
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
  paymentMetadata: Record<string, any>;
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
```

## License

This project is licensed under the MIT License.

---
