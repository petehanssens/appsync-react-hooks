import React, { useState } from 'react'
import Link from 'next/link'
import { Image, Table, Button, Confirm, Checkbox, Form, Segment } from 'semantic-ui-react'

import Layout from '../components/layout'
import Loading from '../components/loading'
import Error from '../components/error'
import { useFetchUser } from '../lib/user'
import { useQuery, useMutation } from '@apollo/react-hooks';
import query from '../graphql/daily_diary/getEvents'
import Delete from '../graphql/daily_diary/deleteEvent';
import mutation from '../graphql/daily_diary/createEvent';


function ViewProjects() {
  const { loading, error, data } = useQuery(query, { variables: { user_id: 'auth0|sample-user', date: '2020-03-01' }});
  const { user, user_loading } = useFetchUser();
  const [deleteEvent] = useMutation(Delete, {
    refetchQueries: ["getEvents"],
  });
  const [createEvent] = useMutation(mutation, {
    refetchQueries: ["getEvents"],
  });

  let [form, setValues] = useState({
    user_id: 'auth0|sample-user',
    date: '2020-03-01'
  });


  let updateField = e => {
    console.log('e: ',e)
    setValues({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  let mutationData = ''

  if (loading) return <Loading />;
  if (error) return  <Error />;
  return (
    <Layout user={user} user_loading={user_loading}>
      <h1>Daily Diary</h1>
        <Form
          onSubmit={e => {
            e.preventDefault();
            console.log('form: ',form)
            createEvent({ variables: { ...form } });
            form = '';
          }}>
          <Form.Input
            fluid
            label='Category'
            name="category"
            value={form.category}
            placeholder="Category"
            onChange={updateField}
          />
          <Form.Input
            fluid
            label='Event'
            name="event"
            value={form.event}
            placeholder="Event"
            onChange={updateField}
          />
          <Button>Add event</Button>
        </Form>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>Event</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            data.getEvents.diary_entry.map((event, index) => (

          <Table.Row key={index}>
          <Table.Cell>{event.category}</Table.Cell>
          <Table.Cell>{event.event}</Table.Cell>
          <Table.Cell>
            <Button 
            onClick={
            e => {
              e.preventDefault();
              console.log('event: ',index)
              deleteEvent({ variables: { user_id: "auth0|sample-user", date: "2020-03-01", element: index }});
            }
            }>Delete</Button>
          </Table.Cell>
        </Table.Row>
            ))
          }
        </Table.Body>
      </Table>
    </Layout>
  );
}

export default ViewProjects;