import React, { useEffect, useState, useRef } from 'react'
import styled, {keyframes} from 'styled-components'

const testString = "Over the course of their photo shoots, the photographers have watched the women’s ambitions grow from simple domestic goals to having a career and family. “A lot of our work deals with the idea of empowerment,” said Cooper. “We tend to work with a classical gaze of the woman gazing back at the viewer. We like the idea of women being Amazonian, it feels almost like they could crush you with their gaze.”"
const testString2 = "Over the course of their photo shoots, the photographers have watched the women’s ambitions grow from simple domestic goals to having a career and family."
const placeholderText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic fugit ullam labore ab itaque voluptates amet fuga quidem, maiores, nobis voluptas voluptatum voluptatem. Nisi debitis eveniet modi quaerat, incidunt nam quam in, ex quisquam eligendi numquam libero molestias saepe, nihil expedita velit cupiditate totam error a vel corrupti sequi repellat. Ratione debitis beatae."
const testArticle = ["Hello world!", "Hello World!", testString2, testString2, placeholderText]

const TestPage : React.FC = () => {
  const [paragraphs, setParagraphs] = useState<string[]>(testArticle)
  const [paragraphIndex, setParagraphIndex] = useState(0)
  const [wordList, setWordList] = useState<string[]>(testArticle[0].split(" "))
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentWord, setCurrentWord] = useState(testArticle[0].split(" ")[0])

  const [unhighlighted, setUnhighlighted] = useState(testArticle[0])
  const [highlighted, setHighlighted] = useState("")
  const [currentText, setCurrentText] = useState("")
  const [inputText, setInputText] = useState("")
  const [errorText, setErrorText] = useState("")

  const paragraphRef = useRef<HTMLDivElement>(null)

  return (
    <div style={{ margin: "0 25%"}}>
      {
        paragraphs.slice(0, paragraphIndex).map((paragraph) => (
          <PreviousParagraph>{paragraph}</PreviousParagraph>
        ))
      }
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
      {
        paragraphs.slice(paragraphIndex+1, paragraphs.length).map((paragraph) => {
          return (
            <NextParagraph>{paragraph}</NextParagraph>
          )
        })
      }
      <div style={{height: '100vh'}}></div>
    </div>
  )

  function onInputChange(e : React.ChangeEvent<HTMLInputElement>) {
    const input = e.currentTarget.value
    checkForWordInputErrors(input)
    //highlightText(input)
  }

  function checkForWordInputErrors(input : string) {
    const parsedWord = currentWord
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')

    if(input === parsedWord + " ") {
      const text = highlighted + parsedWord + " "
      if(text.length > paragraphs[paragraphIndex].length) {
        setParagraphIndex((prev) => prev + 1)
        setHighlighted("")
        setCurrentText("")
        setInputText("")
        setWordList(paragraphs[paragraphIndex+1].split(" "))
        setCurrentWord(paragraphs[paragraphIndex+1].split(" ")[0])
        setCurrentWordIndex(0)
        setUnhighlighted(paragraphs[paragraphIndex+1])

        const ref = paragraphRef!.current!
        window.scrollTo(0, ref.offsetTop + ref.offsetHeight - 50)
        return
      }

      setCurrentWord(wordList[currentWordIndex+1])
      setCurrentWordIndex((prev) => prev + 1)
      setCurrentText("")
      setInputText("")
      setHighlighted((prev) => prev + input)

      return
    } 
    
    
    if (input.length > parsedWord.length + 1) {
      return
    } 

    const paragraph = paragraphs[paragraphIndex]
    for(let i = 0; i < input.length; i++) {
      if(input.charAt(i) !== parsedWord.charAt(i)) {
        const endOfCorrectInput = highlighted.length + i
        const endOfEntireInput = highlighted.length + input.length

        setCurrentText(paragraph.substring(highlighted.length, endOfCorrectInput))
        setErrorText(paragraph.substring(endOfCorrectInput, endOfEntireInput))
        setUnhighlighted(paragraph.substring(endOfEntireInput))
        setInputText(input)
        return
      }
    }
  
    const endOfEntireInput = highlighted.length + input.length
    setCurrentText(paragraph.substring(highlighted.length, endOfEntireInput))
    setUnhighlighted(paragraph.substring(endOfEntireInput))
    setErrorText("")
    setInputText(input)
  }
}

const HighlightedText = styled.span`
  color: black;
  font-size: 25px;
`

const UnhighlightedText = styled.span`
  color: lightgray;
  font-size: 25px;
`

const CurrentText = styled.span`
  color: 'black';
  font-weight: bold;
  font-size: 25px;
`

const ErrorText = styled.span`
  color: red;
  font-weight: bold;
  font-size: 25px;
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

const NextParagraph = styled.p`
  color: lightgray;
  font-size: 25px;
`
const PreviousParagraph = styled.p`
  color: black;
  font-size: 25px;
`



export default TestPage