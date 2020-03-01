const fetch = require("node-fetch");
var events = require('../events.json');
require('dotenv').config()
let user_id;
let date;
let category;
let event;
const query = `
mutation createEvent(
    $user_id: String!,
    $date: String!,
    $category: String!,
    $event: String!
) {
    createEvent(
    user_id: $user_id,
    date: $date,
    category: $category,
    event: $event
  ) {
    user_id
  }
}`

function load_events() {
    for (i in events) {
        console.log('i: ',events[i].event)
        user_id = events[i].user_id
        date = events[i].date
        category = events[i].category
        event = events[i].event
        fetch(process.env.APPSYNC_GRAPHQL_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-api-key': process.env.APPSYNC_API_KEY
            },
            body: JSON.stringify({
                query,
                variables: { user_id, date, category, event },})
            })
            .then(r => r.json())
            .then(data => {
                console.log('data returned:', data);
            });
    }
}

load_events();

