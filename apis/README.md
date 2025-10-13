# Enza REST API - Endpoint Summary

This document summarizes all APIs defined in `generalapi.yaml`, including name, description, input/output parameters, and HTTP 200 responses.

Base URL: `https://uat-api.enza.cloud/TX/v1`

All requests require the header `x-api-key`.

---

## 1) POST `/customers/details` — Get Customer Details
- **Description**: Retrieve comprehensive customer details by National ID or Passport.

- **Inputs**
  - **Headers**
    - `x-api-key` (string) — required
    - `Content-Type` (string, default `application/json`) — required
  - **Body (application/json)**
    - `NationalId` (string) — required (either NationalId or Passport is required)
    - `Passport` (string) — required (either NationalId or Passport is required)

- **200 Output**
  - `code` (string) e.g., `SUCCESS_CUSTOMER_DETAILS_RETRIEVED`
  - `params` (object)
    - `FirstName` (string)
    - `MiddleName` (string)
    - `LastName` (string)
    - `BirthDate` (string, date-time)
    - `Status` (string)
    - `Email` (string, email)
    - `MobilePhone` (string)
    - `HomeAddress` (object)
      - `StreetTitle` (string)
      - `Zip` (string)

- **200 Example**
```json
{
  "code": "SUCCESS_CUSTOMER_DETAILS_RETRIEVED",
  "params": {
    "FirstName": "omnia",
    "MiddleName": "API",
    "LastName": "Testing",
    "BirthDate": "1989-12-31T19:00:00.000",
    "Status": "N",
    "Email": "a@a.com",
    "MobilePhone": "01158900152",
    "HomeAddress": {
      "StreetTitle": "asd",
      "Zip": "11728"
    }
  }
}
```

---

## 2) POST `/instant-issuing` — Instant Issue Card
- **Description**: Instantly issue a card for a new or existing customer. RequestType: `NewAccountNewCustomer` or `NewAccountExistingCustomer`.

- **Inputs**
  - **Headers**: `x-api-key`, `Content-Type`
  - **Body (application/json, `Customer` schema)**
    - Required: `RequestType`, `AccountNum`, `CardRefNum`, `EmbossedName`, `NationalId`, `Passport`, `FirstName`, `LastName`
    - See schema details in Components → `Customer`

- **200 Output** (`SuccessEnvelope`)
  - `code` (string) e.g., `SUCCESS_REQUEST_PROCESSED`
  - `params` (object)
    - `requestType` (string) e.g., `NewAccountNewCustomer`

- **200 Example**
```json
{
  "code": "SUCCESS_REQUEST_PROCESSED",
  "params": {
    "requestType": "NewAccountNewCustomer"
  }
}
```

---

## 3) POST `/cards/tds-enrollment` — Enable or Disable E-Commerce Transactions
- **Description**: Control e-commerce (online) transaction capabilities for a card.

- **Inputs**
  - **Headers**: `x-api-key`, `Content-Type`
  - **Body (application/json)**
    - `CardRefNum` (string) — required
    - `ECstatusEnable` (string) — required, "1" = Enrolled, "0" = Not enrolled

- **200 Output**
  - `code` (string) e.g., `SUCCESS_ECSTATUS_CHANGED`
  - `params` (object)
    - `status` (string) e.g., `Enabled`

- **200 Example**
```json
{
  "code": "SUCCESS_ECSTATUS_CHANGED",
  "params": {
    "status": "Enabled"
  }
}
```

---

## 4) POST `/cards/update-status-by-ref` — Update Card Status by Reference Number
- **Description**: Update card status using the card reference number.

- **Inputs**
  - **Headers**: `x-api-key`, `Content-Type`
  - **Body (application/json)**
    - `CardStatus` (string) — required, enum: `Active`, `Deactivated`
    - `CardRefNum` (string) — required

- **200 Output**
  - `code` (string) e.g., `SUCCESS_CARDSTATUS_CHANGED`
  - `params` (object)
    - `status` (string) e.g., `Active`

- **200 Example**
```json
{
  "code": "SUCCESS_CARDSTATUS_CHANGED",
  "params": {
    "status": "Active"
  }
}
```

- **200 Example**
```json
{
  "code": "SUCCESS_CARDSTATUS_CHANGED",
  "params": {
    "status": "Active"
  }
}
```

---

## 5) POST `/pin/set` — Set PIN for Card
- **Description**: Set a new PIN for a card using the encrypted PIN block.

- **Inputs**
  - **Headers**: `x-api-key`, `Content-Type`
  - **Body (application/json, `PinSetting` schema)**
    - `Pan` (string) — required
    - `PinBlock` (string) — required

- **200 Output**
  - `code` (string) e.g., `SUCCESS_PIN_SET`
  - `params` (object)

- **200 Example**
```json
{
  "code": "SUCCESS_PIN_SET",
  "params": {}
}
```

---

## 6) POST `/pin/change` — Change PIN for Card
- **Description**: Change a card's PIN by providing both the current and new encrypted PIN blocks.

- **Inputs**
  - **Headers**: `x-api-key`, `Content-Type`
  - **Body (application/json, `PinChanging` schema)**
    - `Pan` (string) — required
    - `oldPinBlock` (string) — required
    - `newPinBlock` (string) — required

- **200 Output**
  - `code` (string) e.g., `SUCCESS_PIN_CHANGED`
  - `params` (object)

- **200 Example**
```json
{
  "code": "SUCCESS_PIN_CHANGED",
  "params": {}
}
```

---

## 7) POST `/cards/update-status-by-id` — Update Card Status by Card ID
- **Description**: Update card status using the card ID.

- **Inputs**
  - **Headers**: `x-api-key`, `Content-Type`
  - **Body (application/json)**
    - `CardStatus` (string) — required, enum: `Active`, `Deactivated`, `Blocked`
    - `CardId` (string) — required
    - `Reason` (string) — optional

- **200 Output**
  - `code` (string) e.g., `SUCCESS_CARDSTATUS_CHANGED`
  - `params` (object)
    - `status` (string) e.g., `Active`

- **200 Example**
```json
{
  "code": "SUCCESS_CARDSTATUS_CHANGED",
  "params": {
    "status": "Active"
  }
}
```

---

## 8) GET `/cards/card-details/{card_Id}` — Get Card Details by Card ID
- **Description**: Retrieve comprehensive card information using the card ID.

- **Inputs**
  - **Headers**: `x-api-key`, `Content-Type`
  - **Path Params**
    - `card_Id` (string) — required

- **200 Output**
  - `code` (string) e.g., `SUCCESS_CARD_DETAILS_RETRIEVED`
  - `params` (object)
    - `maskedPan` (string)
    - `status` (string)
    - `expiryDate` (string, date)
    - `availableBalance` (string)
    - `currency` (string)

- **200 Example**
```json
{
  "code": "SUCCESS_CARD_DETAILS_RETRIEVED",
  "params": {
    "maskedPan": "123456******1234",
    "status": "Active",
    "expiryDate": "2025-12-31",
    "availableBalance": "1500.00",
    "currency": "USD"
  }
}
```

---

## 9) POST `/customers/list-of-cards` — List All Customer Cards
- **Description**: Retrieve all cards issued to a customer using their identification document.

- **Inputs**
  - **Headers**: `x-api-key`, `Content-Type`
  - **Body (application/json)**
    - `Passport` (string) — required (either NationalId or Passport is required)
    - `NationalId` (string) — required (either NationalId or Passport is required)

- **200 Output**
  - `code` (string) e.g., `SUCCESS_CARDS_RETRIEVED`
  - `params` (object)
    - `totalCards` (integer)
    - `cards` (array of object)
      - `cardId` (string)
      - `maskedPan` (string)
      - `productName` (string)
      - `status` (string)
      - `expiryDate` (string, date)

- **200 Example**
```json
{
  "code": "SUCCESS_CARDS_RETRIEVED",
  "params": {
    "totalCards": 2,
    "cards": [
      {
        "cardId": "12345",
        "maskedPan": "123456******1234",
        "productName": "Visa Debit Card",
        "status": "Active",
        "expiryDate": "2025-12-31"
      },
      {
        "cardId": "67890",
        "maskedPan": "123456******5678",
        "productName": "Mastercard Debit",
        "status": "Deactivated",
        "expiryDate": "2026-06-30"
      }
    ]
  }
}
```

---

## 10) POST `/cards/list-of-transactions` — Get Transaction History
- **Description**: Retrieve detailed transaction history for a card within a specified date range.

- **Inputs**
  - **Headers**: `x-api-key`, `Content-Type`
  - **Body (application/json)**
    - `cardId` (string) — required
    - `startDate` (string, date `YYYY-MM-DD`) — required
    - `endDate` (string, date `YYYY-MM-DD`) — required

- **200 Output**
  - `code` (string) e.g., `SUCCESS_TRANSACTIONS_RETRIEVED`
  - `params` (object)
    - `cardId` (string)
    - `startDate` (string, date)
    - `endDate` (string, date)
    - `totalTransactions` (integer)
    - `transactions` (array of object)
      - `transactionId` (string)
      - `transactionKind` (string)
      - `transactionLabel` (string)
      - `transactionType` (string)
      - `amount` (number)
      - `currency` (string)
      - `date` (string, date)
      - `timestamp` (string, date-time)
      - `terminalOwnerTitle` (string)
      - `terminalType` (string)

- **200 Example**
```json
{
  "code": "SUCCESS_TRANSACTIONS_RETRIEVED",
  "params": {
    "cardId": "3280",
    "startDate": "2025-07-01",
    "endDate": "2025-10-02",
    "totalTransactions": 2,
    "transactions": [
      {
        "transactionId": "251002511421445346",
        "transactionKind": "Goods",
        "transactionLabel": "Purchase",
        "transactionType": "Debit",
        "amount": 45,
        "currency": "USD",
        "date": "2025-10-02",
        "timestamp": "2025-10-02T14:12:22.000",
        "terminalOwnerTitle": "ACQUIRER NAME",
        "terminalType": "Pos"
      },
      {
        "transactionId": "250925476227641819",
        "transactionKind": "Goods",
        "transactionLabel": "Purchase",
        "transactionType": "Debit",
        "amount": 21,
        "currency": "USD",
        "date": "2025-09-25",
        "timestamp": "2025-09-25T13:13:42.000",
        "terminalOwnerTitle": "ACQUIRER NAME",
        "terminalType": "Pos"
      }
    ]
  }
}
```

---

## 11) POST `/cards/create-card` — Create Card
- **Description**: Complete end-to-end card issuance with customer onboarding (card remains inactive). Supports new and existing customers.

- **Inputs**
  - **Headers**: `x-api-key`, `Content-Type`
  - **Body (application/json, `CreateCardStandard` schema)**
    - Required: `FirstName`, `LastName`, `BirthDate`, `Email`, `MobilePhone`, `StreetTitle`, `Zip`, `NotificationStatus`, `NationalId`, `Passport`
    - See schema details in Components → `CreateCardStandard`

- **200 Output**
  - `code` (string) e.g., `SUCCESS_REQUEST_PROCESSED`
  - `params` (object)
    - `customerType` (string, enum: `New`, `Existing`)
    - `personId` (string)
    - `cardId` (string)
    - `cardDetails` (object)
      - `pan` (string)
      - `cvv2` (string)
    - `notificationEnabled` (boolean)
    - `notificationStatus` (string, optional)

- **200 Example**
```json
{
  "code": "SUCCESS_REQUEST_PROCESSED",
  "params": {
    "customerType": "New",
    "personId": "PERS12345",
    "cardId": "12345",
    "cardDetails": {
      "pan": "1234567890123456",
      "cvv2": "123"
    },
    "notificationEnabled": true
  }
}
```

- **200 Example**
```json
{
  "code": "SUCCESS_REQUEST_PROCESSED",
  "params": {
    "customerType": "New",
    "personId": "PERS12345",
    "cardId": "12345",
    "cardDetails": {
      "pan": "1234567890123456",
      "cvv2": "123"
    },
    "notificationEnabled": true
  }
}
```

- **200 Example**
```json
{
  "code": "SUCCESS_REQUEST_PROCESSED",
  "params": {
    "customerType": "New",
    "personId": "PERS12345",
    "cardId": "12345",
    "cardDetails": {
      "pan": "1234567890123456",
      "cvv2": "123"
    },
    "notificationEnabled": true
  }
}
```

- **200 Example**
```json
{
  "code": "SUCCESS_REQUEST_PROCESSED",
  "params": {
    "customerType": "New",
    "personId": "PERS12345",
    "cardId": "12345",
    "cardDetails": {
      "pan": "1234567890123456",
      "cvv2": "123"
    },
    "notificationEnabled": true
  }
}
```

---

## 12) POST `/cards/create-card-with-activation` — Create Card with Activation
- **Description**: Complete end-to-end card issuance with customer onboarding and automatic activation. Supports new and existing customers.

- **Inputs**
  - **Headers**: `x-api-key`, `Content-Type`
  - **Body (application/json, `CreateCardStandard` schema)**
    - Required: `FirstName`, `LastName`, `BirthDate`, `Email`, `MobilePhone`, `StreetTitle`, `Zip`, `NotificationStatus`, `NationalId`, `Passport`

- **200 Output**
  - `code` (string) e.g., `SUCCESS_REQUEST_PROCESSED`
  - `params` (object)
    - `customerType` (string, enum: `New`, `Existing`)
    - `personId` (string)
    - `cardId` (string)
    - `cardDetails` (object)
      - `pan` (string)
      - `cvv2` (string)
    - `notificationEnabled` (boolean)
    - `notificationStatus` (string, optional)

---

## Components: Referenced Schemas (for inputs)
- **`Customer`**
  - Required: `RequestType`, `AccountNum`, `CardRefNum`, `EmbossedName`, `NationalId`, `Passport`, `FirstName`, `LastName`
- **`PinSetting`**
  - Required: `Pan`, `PinBlock`
- **`PinChanging`**
  - Required: `Pan`, `oldPinBlock`, `newPinBlock`
- **`CreateCardStandard`**
  - Required: `FirstName`, `LastName`, `BirthDate`, `Email`, `MobilePhone`, `StreetTitle`, `Zip`, `NotificationStatus`, `NationalId`, `Passport`
- **`SuccessEnvelope`** (200 output for `/instant-issuing`)
  - `code`, `params.requestType`


