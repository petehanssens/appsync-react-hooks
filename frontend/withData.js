import { withAppSyncData } from 'next-apollo-appsync'
import AppSyncConfig from './AppSync'

const config = {
  url: process.env.APPSYNC_GRAPHQL_ENDPOINT,
  region: process.env.APPSYNC_AWS_REGION,
  auth: {
    type: process.env.APPSYNC_AUTHENTICATION_TYPE,
    apiKey: process.env.APPSYNC_API_KEY,
  },
}

export default withAppSyncData(config)