import { Request, Response } from 'express'
import * as Yup from 'yup'
import Cart from '../models/Cart'
import { CobrancaServices } from '../services/CobrancaServices'
export class CobrancaController {
  async create (req: Request, res: Response) {
    const {
      cartCode,
      description,
      amountValue,
      amountCurrency,
      paymentMethodType,
      paymentMethodInstallments,
      paymentMethodCapture,
      paymentMethodSoftDescriptor,
      paymentMethodCardId,
      paymentMethodCardNumber,
      paymentMethodCardNetworkToken,
      paymentMethodCardExpMonth,
      paymentMethodCardExpYear,
      paymentMethodCardSecurityCode,
      paymentMethodCardHolderName,
      paymentMethodTokenDataRequestorId,
      paymentMethodTokenDataWallet,
      paymentMethodTokenDataCryptogram,
      paymentMethodTokenDataEcommerceDomain,
      paymentMethodTokenDataAssuranceLevel,
      paymentMethodAuthenticationMethodType,
      paymentMethodAuthenticationMethodCavv,
      paymentMethodAuthenticationMethodEci,
      paymentMethodAuthenticationMethodXid,
      paymentMethodAuthenticationMethodVersion,
      paymentMethodAuthenticationMethodDstransId,
      paymentMethodBoletoDueDate,
      paymentMethodBoletoInstructionLinesLine1,
      paymentMethodBoletoInstructionLinesLine2,
      paymentMethodBoletoHolderName,
      paymentMethodBoletoHolderTaxId,
      paymentMethodBoletoHolderEmail,
      paymentMethodBoletoHolderAddressStreet,
      paymentMethodBoletoHolderAddressNumber,
      paymentMethodBoletoHolderAddressLocality,
      paymentMethodBoletoHolderAddressCity,
      paymentMethodBoletoHolderAddressRegionCode,
      paymentMethodBoletoHolderAddressRegion,
      paymentMethodBoletoHolderAddressCountry,
      paymentMethodBoletoHolderAddressPostalCode
    } = req.body

    try {
      const schema = Yup.object({
        cartCode: Yup.string().required(),
        description: Yup.string(),
        amountValue: Yup.number().required(),
        amountCurrency: Yup.string().required(),
        paymentMethodType: Yup.mixed().oneOf(
          ['BOLETO', 'CREDIT_CARD', 'DEBIT_CARD']
        ).required(),
        paymentMethodInstallments: Yup.number()
          .min(1)
          .when('paymentMethodType', (paymentMethodType, schema) =>
            paymentMethodType === 'CREDIT_CARD'
              ? schema.max(12).min(1).required()
              : schema
          ),
        paymentMethodCapture: Yup.boolean().when(
          'paymentMethodType', (paymentMethodType, schema) =>
            paymentMethodType === 'CREDIT_CARD'
              ? schema.required()
              : schema
        ),
        paymentMethodSoftDescriptor: Yup.string(),
        paymentMethodCardId: Yup.string(),
        paymentMethodCardNumber: Yup.string().when(
          'paymentMethodType', (paymentMethodType, schema) =>
            paymentMethodType === ('CREDIT_CARD' || 'DEBIT_CARD')
              ? schema.required()
              : schema
        ),
        paymentMethodCardNetworkToken: Yup.string(),
        paymentMethodCardExpMonth: Yup.string().when(
          'paymentMethodType', (paymentMethodType, schema) =>
            paymentMethodType === ('CREDIT_CARD' || 'DEBIT_CARD')
              ? schema.required()
              : schema
        ),
        paymentMethodCardExpYear: Yup.string().when(
          'paymentMethodType', (paymentMethodType, schema) =>
            paymentMethodType === ('CREDIT_CARD' || 'DEBIT_CARD')
              ? schema.required()
              : schema
        ),
        paymentMethodCardSecurityCode: Yup.string().when(
          'paymentMethodType', (paymentMethodType, schema) =>
            paymentMethodType === ('CREDIT_CARD' || 'DEBIT_CARD')
              ? schema.required()
              : schema
        ),
        paymentMethodCardHolderName: Yup.string().when(
          'paymentMethodType', (paymentMethodType, schema) =>
            paymentMethodType === ('CREDIT_CARD' || 'DEBIT_CARD')
              ? schema.required()
              : schema
        ),
        paymentMethodTokenDataRequestorId: Yup.string(),
        paymentMethodTokenDataWallet: Yup.string(),
        paymentMethodTokenDataCryptogram: Yup.string().when(
          'paymentMethodCapture', (paymentMethodCapture, schema) =>
            paymentMethodCapture === ('VISA' || 'MASTERCARD')
              ? schema.required()
              : schema
        ),
        paymentMethodTokenDataEcommerceDomain: Yup.string(),
        paymentMethodTokenDataAssuranceLevel: Yup.number(),
        paymentMethodAuthenticationMethodType: Yup.mixed().oneOf(
          ['THREEDS', 'INAPP']
        ).when('paymentMethodType', (paymentMethodType, schema) =>
          paymentMethodType === 'DEBIT_CARD'
            ? schema.required()
            : schema
        ),
        paymentMethodAuthenticationMethodCavv: Yup.string().when(
          'paymentMethodType', (paymentMethodType, schema) =>
            paymentMethodType === 'DEBIT_CARD'
              ? schema.required()
              : schema
        ),
        paymentMethodAuthenticationMethodEci: Yup.string().when(
          'paymentMethodType', (paymentMethodType, schema) =>
            paymentMethodType === 'DEBIT_CARD'
              ? schema.required()
              : schema
        ),
        paymentMethodAuthenticationMethodXid: Yup.string(),
        paymentMethodAuthenticationMethodVersion: Yup.string(),
        paymentMethodAuthenticationMethodDstransId: Yup.string(),
        paymentMethodBoletoDueDate: Yup.string().when(
          'paymentMethodType', (paymentMethodType, schema) =>
            paymentMethodType === 'BOLETO'
              ? schema.required()
              : schema
        ),
        paymentMethodBoletoInstructionLinesLine1: Yup.string(),
        paymentMethodBoletoInstructionLinesLine2: Yup.string(),
        paymentMethodBoletoHolderName: Yup.string().when('paymentMethodType',
          (paymentMethodType, schema) =>
            paymentMethodType === 'BOLETO'
              ? schema.required()
              : schema
        ),
        paymentMethodBoletoHolderTaxId: Yup.string().when('paymentMethodType',
          (paymentMethodType, schema) =>
            paymentMethodType === 'BOLETO'
              ? schema.required()
              : schema
        ),
        paymentMethodBoletoHolderEmail: Yup.string().when('paymentMethodType',
          (paymentMethodType, schema) =>
            paymentMethodType === 'BOLETO'
              ? schema.required()
              : schema
        ),
        paymentMethodBoletoHolderAddressCity: Yup.string().when('paymentMethodType',
          (paymentMethodType, schema) =>
            paymentMethodType === 'BOLETO'
              ? schema.required()
              : schema
        ),
        paymentMethodBoletoHolderAddressCountry: Yup.string().when('paymentMethodType',
          (paymentMethodType, schema) =>
            paymentMethodType === 'BOLETO'
              ? schema.required()
              : schema
        ),
        paymentMethodBoletoHolderAddressLocality: Yup.string().when('paymentMethodType',
          (paymentMethodType, schema) =>
            paymentMethodType === 'BOLETO'
              ? schema.required()
              : schema
        ),
        paymentMethodBoletoHolderAddressNumber: Yup.string().when('paymentMethodType',
          (paymentMethodType, schema) =>
            paymentMethodType === 'BOLETO'
              ? schema.required()
              : schema
        ),
        paymentMethodBoletoHolderAddressPostalCode: Yup.string().when('paymentMethodType',
          (paymentMethodType, schema) =>
            paymentMethodType === 'BOLETO'
              ? schema.required()
              : schema
        ),
        paymentMethodBoletoHolderAddressRegionCode: Yup.string().when('paymentMethodType',
          (paymentMethodType, schema) =>
            paymentMethodType === 'BOLETO'
              ? schema.required()
              : schema
        ),
        paymentMethodBoletoHolderAddressRegion: Yup.string().when('paymentMethodType',
          (paymentMethodType, schema) =>
            paymentMethodType === 'BOLETO'
              ? schema.required()
              : schema
        ),
        paymentMethodBoletoHolderAddressStreet: Yup.string().when('paymentMethodType',
          (paymentMethodType, schema) =>
            paymentMethodType === 'BOLETO'
              ? schema.required()
              : schema
        )
      })

      const validate = (schema: any, data: any) => {
        return schema
          .validate(data, { abortEarly: false })
          .catch((err: any) => {
            if (err.length > 0) {
              const erro = err.inner.map((item: any) => {
                return {
                  path: item.path,
                  message: item.message,
                  label: item.params.label
                }
              })
              console.log(erro)
            } return err
          })
      }

      await validate(schema, req.body)

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({
          error: 'Error on validate schema.'
        })
      }

      const cart = await Cart.findOne({ code: cartCode })

      if (!cart) {
        return res.status(404).json({
          error: 'Error on validate schema.'
        })
      }

      const service = new CobrancaServices()

      const response = await service.process({
        cartCode,
        description,
        amount: {
          currency: amountCurrency,
          value: amountValue
        },
        payment_method: {
          type: paymentMethodType,
          installments: paymentMethodInstallments,
          capture: paymentMethodCapture,
          soft_descriptor: paymentMethodSoftDescriptor,
          card: {
            id: paymentMethodCardId,
            number: paymentMethodCardNumber,
            network_token: paymentMethodCardNetworkToken,
            exp_month: paymentMethodCardExpMonth,
            store: false,
            exp_year: paymentMethodCardExpYear,
            security_code: paymentMethodCardSecurityCode,
            holder: {
              name: paymentMethodCardHolderName
            }
          },
          token_data: {
            requestor_id: paymentMethodTokenDataRequestorId,
            wallet: paymentMethodTokenDataWallet,
            cryptogram: paymentMethodTokenDataCryptogram,
            ecommerce_domain: paymentMethodTokenDataEcommerceDomain,
            assurance_level: paymentMethodTokenDataAssuranceLevel
          },
          authentication_method: {
            type: paymentMethodAuthenticationMethodType,
            cavv: paymentMethodAuthenticationMethodCavv,
            eci: paymentMethodAuthenticationMethodEci,
            xid: paymentMethodAuthenticationMethodXid,
            version: paymentMethodAuthenticationMethodVersion,
            dstrans_id: paymentMethodAuthenticationMethodDstransId
          },
          boleto: {
            due_date: paymentMethodBoletoDueDate,
            instruction_lines: {
              line_1: paymentMethodBoletoInstructionLinesLine1,
              line_2: paymentMethodBoletoInstructionLinesLine2
            },
            holder: {
              name: paymentMethodBoletoHolderName,
              email: paymentMethodBoletoHolderEmail,
              tax_id: paymentMethodBoletoHolderTaxId,
              address: {
                street: paymentMethodBoletoHolderAddressStreet,
                number: paymentMethodBoletoHolderAddressNumber,
                locality: paymentMethodBoletoHolderAddressLocality,
                city: paymentMethodBoletoHolderAddressCity,
                region_code: paymentMethodBoletoHolderAddressRegionCode,
                region: paymentMethodBoletoHolderAddressRegion,
                country: paymentMethodBoletoHolderAddressCountry,
                postal_code: paymentMethodBoletoHolderAddressPostalCode
              }
            }
          }
        }
      })

      return res.status(200).json(response)
    } catch (err) {
      console.log(err)

      res.status(500).json({
        error: 'Internal server error'
      })
    }
  }
}
