import React from 'react'
import { navigate } from 'gatsby-link'
import Layout from '../layout'

function encode(data) {
  const formData = new FormData()

  for (const key of Object.keys(data)) {
    formData.append(key, data[key])
  }

  return formData
}

export default function Contact() {
  const [state, setState] = React.useState({})

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleAttachment = (e) => {
    setState({ ...state, [e.target.name]: e.target.files[0] })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    fetch('/.netlify/functions/multipart-file-upload', {
      method: 'POST',
      body: encode({
        'form-name': form.getAttribute('name'),
        ...state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error))
  }

  return (
    <Layout>
      <h1>
        File Upload using <code>multipart/form-data</code>
      </h1>
      <form
        name="cribbage-form"
        method="post"
        action="/thanks/"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
        {/*TODO: wire up handleChanges*/}
        {/*TODO: wire up handleAttachment*/}
        <input type="hidden" name="form-name" value="cribbage-form" />
        <p hidden>
          <label>
            Don’t fill this out: <input name="bot-field" onChange={handleChange} />
          </label>
        </p>
        <p>
          <label htmlFor={"gameDate"}>
            Game Date:
            <input type="date" name={"gameDate"}/>
          </label>
        </p>
        <p>
          <label htmlFor={"player1Name"}>
            Player 1:
            <input type="text" name="player1Name" onChange={handleChange} />
          </label>
          <label htmlFor={"player1Score"}>
            Player 1 Score:
            <input type="number" name="player1Score" min={"0"} max={ "121"} step={"1"}/>
          </label>
        </p>
        <p>
          <label htmlFor={"player2Name"}>
            Player 2:
            <input type="text" name="player1Name" onChange={handleChange} />
          </label>
          <label htmlFor={"player2Score"}>
            Player 2 Score:
            <input type="number" name="player2Score" min={"0"} max={ "121"} step={"1"}/>
          </label>
        </p>
        <p>
          <label htmlFor={"player3Name"}>
            Player 3:
            <input type="text" name="player1Name" onChange={handleChange} />
          </label>
          <label htmlFor={"player3Score"}>
            Player 3 Score:
            <input type="number" name="player3Score" min={"0"} max={ "121"} step={"1"}/>
          </label>
        </p>
        <p>
          <label htmlFor={"player4Name"}>
            Player 4:
            <input type="text" name="player4Name" onChange={handleChange} />
          </label>
          <label htmlFor={"player4Score"}>
            Player 4 Score:
            <input type="number" name="player4Score" min={"0"} max={ "121"} step={"1"}/>
          </label>
        </p>
        <p>
          <label htmlFor="gameNotes">
            Notes
            <br/>
            <input type="textarea" name={"gameNotes"}/>
          </label>
        </p>
        <p>
          <label>
            Photo:
            <input type="file" accept={"image/*, .pdf"} name="attachment" onChange={handleAttachment} />
          </label>
        </p>
        <p>
          <button type="submit">Send</button>
        </p>
        <p>Note: multiple file uploads are not supported by Netlify at this time.</p>
      </form>
    </Layout>
  )
}
