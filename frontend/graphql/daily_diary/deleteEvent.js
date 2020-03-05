import gql from 'graphql-tag'

const deleteEvent = gql`
  mutation deleteEvent(
      $user_id: String!
      $date: String!
      $element: Int!
  ) {
    deleteEvent(
      user_id: $user_id
      date: $date
      element: $element
    ) {
      created_at
      created_epoch
    }
  }
`

export default deleteEvent;