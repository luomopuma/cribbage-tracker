import React from 'react'
import Layout from '../layout'
import {Link} from 'gatsby'

export default () => (
  <Layout>
    <h1>Thank you!</h1>
    <p>This is a custom thank you page for form submissions</p>
    <Link to={"/multipart-file-upload/"}>Home</Link>
  </Layout>
)
