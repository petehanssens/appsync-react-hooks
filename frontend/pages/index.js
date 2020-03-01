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
  const [createEvent] = useMutation(mutation,
      {
        onCompleted(data) {
          Router.replace("/create_event", "/event/"+data.createEvent.user_id, { shallow: true });
        }
      });

  let [form, setValues] = useState({
    user_id: 'auth0|sample-user',
    date: '2020-03-01'
  });
  let open = () => setValues({ open: true })
  let close = () => setValues({ open: false })


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
          {/* <Form
            onSubmit={e => {
              e.preventDefault();
              console.log('form: ',form)
              createProject({ variables: { ...form } });
              form = '';
            }}>
            <Form.Input
              fluid
              label='Project Number'
              name="project_number"
              value={form.project_number}
              placeholder="Project Number"
              onChange={updateField}
            />
            <Button>Submit</Button>
          </Form> */}
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
          <Table.Cell>
            <Link href="/event/[id]" as={`/event/${event.category}`}>
              <a>{event.category}</a>
            </Link>
          </Table.Cell>
          <Table.Cell>{event.event}</Table.Cell>
          <Table.Cell>
            <Button 
            onClick={
            open
            // e => {
            //   e.preventDefault();
            //   console.log('project_id: ',project.project_id)
            //   deleteProject({ variables: { ...project } });
            // }
            }>Delete</Button>
            <Confirm
              open={form.open}
              onCancel={close}
              onConfirm={
                e => {
                e.preventDefault();
                console.log('user_id: ',event.user_id);
                deleteEvent({ variables: { ...event } });
              },
              close
              }
            />
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