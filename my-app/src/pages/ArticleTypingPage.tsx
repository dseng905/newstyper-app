import React, { useEffect, useState, useRef } from 'react'
import styled, {keyframes} from 'styled-components'


interface TestInput {
  title : string
  image : string
  description : string 
  date : Date
  paragraphs : string[]
}

const ArticleTypingPage : React.FC<TestInput> = (props) => {
  const [paragraphs, setParagraphs] = useState<string[]>(props.paragraphs)
  const [paragraphIndex, setParagraphIndex] = useState(0)
  const [wordList, setWordList] = useState<string[]>(props.paragraphs[0].split(" "))
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentWord, setCurrentWord] = useState(props.paragraphs[0].split(" ")[0])

  const [unhighlighted, setUnhighlighted] = useState(props.paragraphs[0])
  const [highlighted, setHighlighted] = useState("")
  const [currentText, setCurrentText] = useState("")
  const [inputText, setInputText] = useState("")
  const [errorText, setErrorText] = useState("")

  const [charCountCompleted, setCharCountCompleted] = useState(0)
  const [timerSeconds, setTimerSeconds] = useState(0)

  const [hasStarted, setHasStarted] = useState(false)

  const paragraphRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateTime = setInterval(() => {
      setTimerSeconds((seconds) => seconds + 1)
    }, 1000)
    

    const ref = paragraphRef!.current!
    window.scrollTo(0, ref.offsetTop - 50)

  }, [])

  return (
    <div style={{ margin: "0 25%"}}>
      <h1>{props.title}</h1>
      <h3>{props.date.toString()}</h3>
      <ImageContainer>
        <img src={props.image}/>
      </ImageContainer>
      <h2>{props.description}</h2>
      { //Display paragraphs completed
        paragraphs.slice(0, paragraphIndex).map((paragraph) => (
          <PreviousParagraph>{paragraph}</PreviousParagraph>
        ))
      }
      
      {/* Article Text */}
      <p ref={paragraphRef}>
        <HighlightedText>{highlighted}</HighlightedText>
        <CurrentText>{currentText}</CurrentText>
        <ErrorText>{errorText}</ErrorText>
        <UnhighlightedText >{unhighlighted}</UnhighlightedText>
      </p>
      <UserInput 
        placeholder="Type text here..."
        onChange={onInputChange}
        value={inputText}
        autoFocus
      />
      <ProgressInfo>
        <div>{calculateWPM() + " WPM"}</div>
        <div>{getTimerString()}</div>
        <div>{`Paragraph ${paragraphIndex+1}/${paragraphs.length}`}</div>        
      </ProgressInfo>
      { //Show remaining paragraphs
        paragraphs.slice(paragraphIndex+1, paragraphs.length).map((paragraph) => (
          <NextParagraph>{paragraph}</NextParagraph>
        ))
      }
      <div style={{height: '100vh'}}></div>
    </div>
  )


  function calculateWPM() : number {
    if(timerSeconds === 0) return 0

    const numCharTyped = charCountCompleted + highlighted.length
    const minutes = timerSeconds / 60.0
    return Math.floor((numCharTyped / 5) / minutes)
  }

  function getTimerString() : string {
    const minutes = Math.floor(timerSeconds / 60)
    const seconds = timerSeconds - (minutes*60)
    const addZero = seconds < 10 ? "0" : ""
    return `${minutes}:${addZero}${seconds}`
  }

  function onInputChange(e : React.ChangeEvent<HTMLInputElement>) {
    const input = e.currentTarget.value
    const parsedWord = parseQuotationMarks(currentWord)

    //Check if the input completed the entire word correctly
    if(input === parsedWord + " ") {
      const text = highlighted + parsedWord + " "
      const endOfParagraph = (text.length > paragraphs[paragraphIndex].length)
      if(endOfParagraph) goToNextParagraph()
      else goToNextWord(input)
    } 
    else {
      highlightAndCheckForErrors(input, parsedWord)
    }
  }

  /* Helper Functions */
  function parseQuotationMarks(text : string) : string {
    return text
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
  }

  function goToNextParagraph() {
    const nextParagraph = paragraphs[paragraphIndex+1]
    const newWordList = nextParagraph.split(" ")

    //Clear state variables and set to new paragraph
    setParagraphIndex((prev) => prev + 1)
    setHighlighted("")
    setCurrentText("")
    setInputText("")
    setWordList(newWordList)
    setCurrentWord(newWordList[0])
    setCurrentWordIndex(0)
    setUnhighlighted(nextParagraph)
    setCharCountCompleted((count) => count + highlighted.length)

    //Scroll to the new paragraph
    const ref = paragraphRef!.current!
    window.scrollTo(0, ref.offsetTop + ref.offsetHeight)
  }

  function highlightAndCheckForErrors(input : string, word : string) {
    //Prevent more input if input is longer than current word
    if (input.length > word.length + 1) {
      return
    } 

    //Highlight text and check for any errors in the input
    const paragraph = paragraphs[paragraphIndex]
    const endOfEntireInput = highlighted.length + input.length
    let endOfCorrectInput = endOfEntireInput
    for(let i = 0; i < input.length; i++) {
      if(input.charAt(i) !== word.charAt(i)) {
        endOfCorrectInput = highlighted.length + i
        break
      }
    }

    setCurrentText(paragraph.substring(highlighted.length, endOfCorrectInput))
    setErrorText(paragraph.substring(endOfCorrectInput, endOfEntireInput))
    setUnhighlighted(paragraph.substring(endOfEntireInput))
    setInputText(input)
  }

  function goToNextWord(input : string) {
    setCurrentWord(wordList[currentWordIndex+1])
    setCurrentWordIndex((prev) => prev + 1)
    setCurrentText("")
    setInputText("")
    setHighlighted((prev) => prev + input)
  }
}


/* 
  Styled Components
  -HighlightedText
  -UnhighlightedText
  -CurrentText
  -ErrorText
  -UserInput
  -NextParagraph,
  -PreviousParagraph,
*/

const Text = styled.span`
  font-size: 25px;
  color: black;
`
const HighlightedText = styled(Text)``

const UnhighlightedText = styled(Text)`
  color: lightgray;
`
const CurrentText = styled(Text)`
  font-weight: bold;
`
const ErrorText = styled(Text)`
  color: red;
  font-weight: bold;
  text-decoration: line-through;
`

const UserInput = styled.input.attrs({type: 'text'})`
  font-family: 'Bitter', serif;
  font-size: 25px;
  width: 100%;
  border-left: none;
  border-right: none;
  border-top: none;

  &:focus {
    outline: none;
  }
`

const ProgressInfo = styled.p`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Paragraph = styled.p`
  font-size: 25px;
`

const NextParagraph = styled(Paragraph)`
  color: lightgray;
`
const PreviousParagraph = styled(Paragraph)`
  color: black;
`

const ImageContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 0 5%;
  box-sizing: border-box;

  & img {
    width: 100%;
    height: auto;
  }
`



export default ArticleTypingPage