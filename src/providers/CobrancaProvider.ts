export interface ICobrancaProvider {
  reference_id: string,
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
      id: string,
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
        email: string,
        address: {
          street: string,
          number: string,
          locality: string,
          city: string,
          region: string,
          region_code: string,
          country: string,
          postal_code: string
        }
      }
    }
  }
}

export class CobrancaProvider {
  async process ({
    reference_id,
    amount,
    payment_method,
    description
  }: ICobrancaProvider) {
    const boletoParams = {
      reference_id,
      description,
      amount: {
        value: amount.value * 1000,
        currency: 'BRL'
      },
      payment_method: {
        type: 'BOLETO',
        boleto: payment_method.boleto
      }
    }

    const cardCreditParams = {
      reference_id,
      description,
      amount: {
        value: amount.value * 1000,
        currency: 'BRL'
      },
      payment_method: {
        type: 'CREDIT_CARD',
        installments: payment_method.installments,
        capture: false,
        soft_descriptor: payment_method.soft_descriptor,
        card: payment_method.card
      }
    }

    const cardDebitParams = {
      reference_id,
      description,
      amount: {
        value: amount.value * 1000,
        currency: 'BRL'
      },
      payment_method: {
        type: 'DEBIT_CARD',
        card: payment_method.card
      }
    }

    switch (payment_method.type) {
      case 'CREDIT_CARD':
        return cardCreditParams

      case 'DEBIT_CARD':
        return cardDebitParams

      case 'BOLETO':
        return boletoParams

      default:
        throw new Error(`Tipo de pagamento ${payment_method.type} invalido`)
    }
  }
}
