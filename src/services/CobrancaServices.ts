import Cobranca from '../models/Cobranca'
import Cart from '../models/Cart'
import { randomUUID as v4 } from 'node:crypto'

interface ICobrancaServices {
  cartCode: string,
  description: string,
  amount: {
    value: number,
    currency: number
  },
  payment_method: {
    type: string,
    installments: number,
    capture: boolean,
    soft_descriptor: string,
    card: {
      Id: string,
      number: number,
      network_token: string,
      exp_month: number,
      exp_year: number,
      security_code: string,
      store: boolean,
      holder: {
        name: string
      }
    },
    token_data: {
      requestor_id: string,
      wallet: string,
      cryptogram: string,
      ecommerce_domain: string,
      assurance_level: number
    },
    authentication_method: {
      type: string,
      cavv: string,
      eci: string,
      xid: string,
      version: string,
      dstrans_id: string
    },
    boleto: {
      due_date: string,
      instruction_lines: {
        line_1: string,
        line_2: string
      },
      holder: {
        name: string,
        tax_id: string,
        email: string
      }
    }
  }
}

export class CobrancaServices {
  async process ({
    cartCode,
    amount,
    payment_method,
    description
  }: ICobrancaServices) {
    const cart: any = await Cart.findOne({ code: cartCode })

    if (!cart) {
      throw new Error(`Cart ${cartCode} was not found`)
    }

    const cobranca = await Cobranca.create({
      cartCode: cart.code,
      reference_id: v4(),
      description,
      amountValue: amount.value,
      amountCurrency: amount.currency,
      paymentMethodType: payment_method.type,
      paymentMethodInstallments: payment_method.installments,
      paymentMethodCapture: payment_method.capture,
      paymentMethodSoftDescriptor: payment_method.soft_descriptor,
      paymentMethodCardId: payment_method.card.Id,
      paymentMethodCardNumber: payment_method.card.number,
      paymentMethodCardNetworkToken: payment_method.card.network_token,
      paymentMethodCardExpMonth: payment_method.card.exp_month,
      paymentMethodCardExpYear: payment_method.card.exp_year,
      paymentMethodCardSecurityCode: payment_method.card.security_code,
      paymentMethodCardStore: payment_method.card.store,
      paymentMethodCardHolderName: payment_method.card.holder.name,
      paymentMethodTokenDataRequestorId: payment_method.token_data.requestor_id,
      paymentMethodTokenDataWallet: payment_method.token_data.wallet,
      paymentMethodTokenDataCryptogram: payment_method.token_data.cryptogram,
      paymentMethodTokenDataEcommerceDomain:
        payment_method.token_data.ecommerce_domain,
      paymentMethodTokenDataAssuranceLevel:
        payment_method.token_data.assurance_level,
      paymentMethodAuthenticationMethodType:
        payment_method.authentication_method.type,
      paymentMethodAuthenticationMethodCavv:
        payment_method.authentication_method.cavv,
      paymentMethodAuthenticationMethodEci:
        payment_method.authentication_method.eci,
      paymentMethodAuthenticationMethodXid:
        payment_method.authentication_method.xid,
      paymentMethodAuthenticationMethodVersion:
        payment_method.authentication_method.version,
      paymentMethodAuthenticationMethodDstransId:
        payment_method.authentication_method.dstrans_id,
      paymentMethodBoletoDueDate:
        payment_method.boleto.due_date,
      paymentMethodBoletoInstructionLinesLine1:
        payment_method.boleto.instruction_lines.line_1,
      paymentMethodBoletoInstructionLinesLine2:
        payment_method.boleto.instruction_lines.line_2,
      paymentMethodBoletoHolderName:
        payment_method.boleto.holder.name,
      paymentMethodBoletoHolderTaxId:
        payment_method.boleto.holder.tax_id,
      paymentMethodBoletoHolderEmail:
        payment_method.boleto.holder.email
    })

    return cobranca
  }
}
