import gql from 'graphql-tag'

const getEvents = gql`
query	(
    $user_id: String!, 
    $date: String!
  ){
  getEvents (
    user_id: $user_id,
    date: $date
  ) {
    user_id
    date
    diary_entry {
      category
      event
    } 
  }
}
`

export default getEvents;