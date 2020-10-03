import React, { useState, useEffect, FormEvent } from 'react'
import NewsTyperApi from '../utils/newstyper_api'
import * as Form from '../components/styled/Form'

type InputEvent = React.ChangeEvent<HTMLInputElement>

const Test : React.FC = () => {
  const [articleId, setArticleId] = useState("")
  const [wpm, setWpm] = useState("")
  const [timeCompleted, setTimeCompleted] = useState("")

  useEffect(() => {
  }, [])

  return (
    <div>
      This is a test page.
      <Form.Container onSubmit={onSubmit}>
        <Form.TextInput 
          placeholder="Article ID"
          value={articleId}
          onChange={(e : InputEvent) => setArticleId(e.currentTarget.value)}
        />
        <Form.TextInput
          placeholder="WPM"
          value={wpm}
          onChange={(e : InputEvent) => setWpm(e.currentTarget.value)} 
        />
        <Form.TextInput
          placeholder="Time Completed"
          value={timeCompleted}
          onChange={(e : InputEvent) => setTimeCompleted(e.currentTarget.value)}
        />
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form.Container>
    </div>
  )

  async function onSubmit(e : React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if(isNaN(Number(wpm)) || isNaN(Number(timeCompleted))) {
      return
    }

    await NewsTyperApi.saveArticleTypingResults({
      articleId,
      wpm : Number(wpm),
      timeCompleted : Number(timeCompleted)
    })
  }
}

export default Test