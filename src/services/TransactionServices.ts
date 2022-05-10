import Cart from '../models/Cart'
import Transactions from '../models/Transactions'

interface ITransactionsControler {
  cartCode: string,
  paymentType: string,
  installments: number,
  customer: {
    name: string,
    email: string,
    mobile: string,
    document: string,
  },
  billing: {
    address: string,
    number: number,
    neighborhood: string,
    city: string,
    state: string,
    zipCode: string
  },
  creditCard: {
    number: string,
    expiration: string,
    holderName: string,
    cvv: string
  }
}
class TransactionsService {
  async process ({
    cartCode,
    paymentType,
    installments,
    customer,
    billing,
    creditCard
  }: ITransactionsControler) {
    const cart: any = await Cart.findOne({ code: cartCode })

    if (!cart) {
      throw new Error(`Cart ${cartCode} was not found.`)
    }

    const transactions = await Transactions.create({
      cartCode: cart.code,
      code: 'abc123',
      total: cart.price,
      paymentType,
      installments,
      status: 'started',
      customerName: customer.name,
      customerEmail: customer.email,
      customerMobile: customer.mobile,
      customerDocument: customer.document,
      billingAddress: billing.address,
      billingNumber: billing.number,
      billingNeighborhood: billing.neighborhood,
      billingCity: billing.city,
      billingState: billing.state,
      billingZipCode: billing.zipCode,
      creditCardNumber: creditCard.number,
      creditCardExpiration: creditCard.expiration,
      creditCardHolderName: creditCard.holderName,
      creditCardCvv: creditCard.cvv
    })

    return transactions
  }
}
export { TransactionsService }
