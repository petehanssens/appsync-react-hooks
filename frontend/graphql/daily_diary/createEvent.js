import gql from 'graphql-tag'

const createEvent = gql`
mutation createEvent (
    $user_id: String!,
    $date: String!,
    $category: String!,
    $event: String!,
  ) {
    createEvent(
      user_id: $user_id,
      date: $date,
      category: $category,
      event: $event,
    ) {
      user_id
    }
}
`

export default createEvent;