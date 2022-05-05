import 'dotenv/config'

export default {
  url: String(process.env.MONGODB_URI)
}
