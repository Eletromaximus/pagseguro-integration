import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    cartCode: {
      type: String,
      required: true
    },
    reference_id: {
      type: String,
      unique: true
    },
    description: {
      type: String
    },
    amountValue: {
      type: Number,
      required: true
    },
    amountCurrency: {
      type: String
    },
    paymentMethodType: {
      type: String,
      enum: ['BOLETO', 'CREDIT_CARD', 'DEBIT_CARD'],
      required: true
    },
    paymentMethodInstallments: {
      type: Number
    },
    paymentMethodCapture: {
      type: Boolean
    },
    paymentMethodSoftDescriptor: {
      type: String
    },
    paymentMethodCardId: {
      type: String
    },
    paymentMethodCardNumber: {
      type: String
    },
    paymentMethodCardNetworkToken: {
      type: String
    },
    paymentMethodCardExpMonth: {
      type: Number
    },
    paymentMethodCardExpYear: {
      type: Number
    },
    paymentMethodCardSecurityCode: {
      type: String
    },
    paymentMethodCardStore: {
      type: String
    },
    paymentMethodCardHolderName: {
      type: String
    },
    paymentMethodTokenDataRequestorId: {
      type: String
    },
    paymentMethodTokenDataWallet: {
      type: String
    },
    paymentMethodTokenDataCryptogram: {
      type: String
    },
    paymentMethodTokenDataEcommerceDomain: {
      type: String
    },
    paymentMethodTokenDataAssuranceLevel: {
      type: Number
    },
    paymentMethodAuthenticationMethodType: {
      type: String,
      enum: ['THREEDS', 'INAPP']
    },
    paymentMethodAuthenticationMethodCavv: {
      type: String
    },
    paymentMethodAuthenticationMethodEci: {
      type: String
    },
    paymentMethodAuthenticationMethodXid: {
      type: String
    },
    paymentMethodAuthenticationMethodVersion: {
      type: String
    },
    paymentMethodAuthenticationMethodDstransId: {
      type: String
    },
    paymentMethodBoletoDueDate: {
      type: String
    },
    paymentMethodBoletoInstructionLinesLine1: {
      type: String
    },
    paymentMethodBoletoInstructionLinesLine2: {
      type: String
    },
    paymentMethodBoletoHolderName: {
      type: String
    },
    paymentMethodBoletoHolderTaxId: {
      type: String
    },
    paymentMethodBoletoHolderEmail: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('Cobranca', schema)
