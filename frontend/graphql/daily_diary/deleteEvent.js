import gql from 'graphql-tag'

const deleteEvent = gql`
  mutation deleteEvent(
      $user_id: String!
      $date: String!
  ) {
    deleteProject(
      user_id: $user_id
      date: $date
    ) {
      user_id
      date
    }
  }
`

export default deleteEvent;