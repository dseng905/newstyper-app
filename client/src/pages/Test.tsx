import React, { useState, useEffect } from 'react'
import NewsTyperApi from '../utils/newstyper_api'

const Test : React.FC = () => {

  useEffect(() => {
    async function printUserStatistics() {
      const stats = await NewsTyperApi.getUserStatistics()
      console.log(stats)
    }
    printUserStatistics()
  }, [])

  return (
    <div>
      This is a test page.
    </div>
  )
}

export default Test