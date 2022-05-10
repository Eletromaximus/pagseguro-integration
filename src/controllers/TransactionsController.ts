import { Request, Response } from 'express'
import * as Yup from 'yup'
import { parsePhoneNumber } from 'libphonenumber-js'
import { cpf, cnpj } from 'cpf-cnpj-validator'

import Cart from '../models/Cart'
import { TransactionsService } from '../services/TransactionServices'
class TransactionsController {
  async create (req: Request, res: Response) {
    try {
      const {
        cartCode,
        paymentType,
        installments,
        customerName,
        customerEmail,
        customerMobile,
        customerDocument,
        billingAddress,
        billingNumber,
        billingNeighborhood,
        billingCity,
        billingState,
        billingZipCode,
        creditCardNumber,
        creditCardExpiration,
        creditCardHolderName,
        creditCardCvv
      } = req.body

      const schema = Yup.object({
        cartCode: Yup.string().required(),
        paymentType: Yup.mixed().oneOf(['credit_card', 'billet']).required(),
        installments: Yup.number()
          .min(1)
          .when('paymentType', (paymentType, schema) =>
            paymentType === 'credit_card'
              ? schema.max(12)
              : schema.min(1)
          ),
        customerName: Yup.string().required('name').min(3),
        customerEmail: Yup.string().required('email').email(),
        customerMobile: Yup.string().required('mobile').test(
          'is-valid-mobile',
          // eslint-disable-next-line no-template-curly-in-string
          '${path} is not a mobile number',
          (value: string | undefined) => {
            if (value) {
              return parsePhoneNumber(value, 'BR').isValid()
            } else {
              console.log('o erro foi com number')
              return false
            }
          }
        ),
        customerDocument: Yup.string().required().test(
          'is-valid-document',
          // eslint-disable-next-line no-template-curly-in-string
          '${path} is not a valid CPF / CNPJ',
          (value: string | undefined) => {
            if (value) {
              return cpf.isValid(value) || cnpj.isValid(value)
            } else {
              console.log('o erro foi com cpf')
              return false
            }
          }
        ),
        billingAddress: Yup.string().required(),
        billingNumber: Yup.string().required(),
        billingNeighborhood: Yup.string().required(),
        billingCity: Yup.string().required(),
        billingState: Yup.string().required(),
        billingZipCode: Yup.string().required(),
        creditCardNumber: Yup.string().when(
          'paymentType', (paymentType, schema) =>
            paymentType === 'credit_card'
              ? schema.required()
              : schema
        ),
        creditCardExpiration: Yup.string().when(
          'paymentType',
          (paymentType, schema) =>
            paymentType === 'credit_card'
              ? schema.required()
              : schema
        ),
        creditCardHolderName: Yup.string().when(
          'paymentType',
          (paymentType, schema) =>
            paymentType === 'credit_card'
              ? schema.required()
              : schema
        ),
        creditCardCvv: Yup.string().when(
          'paymentType',
          (paymentType, schema) =>
            paymentType === 'credit_card'
              ? schema.required()
              : schema
        )
      })

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

      const service = new TransactionsService()
      const response = await service.process({
        cartCode,
        paymentType,
        installments,
        customer: {
          name: customerName,
          email: customerEmail,
          mobile: customerMobile,
          document: customerDocument
        },
        billing: {
          address: billingAddress,
          number: billingNumber,
          neighborhood: billingNeighborhood,
          city: billingCity,
          state: billingState,
          zipCode: billingZipCode
        },
        creditCard: {
          number: creditCardNumber,
          expiration: creditCardExpiration,
          holderName: creditCardHolderName,
          cvv: creditCardCvv
        }
      })

      return res.status(200).json(response)
    } catch (err) {
      console.error(err)

      return res.status(500).json({
        error: 'Internal server error'
      })
    }
  }
}

export { TransactionsController }
