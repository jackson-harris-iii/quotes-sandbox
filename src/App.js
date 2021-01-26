import React, {useState, useEffect} from "react";
import "./styles.css";


const Quote = (quote) => {
    return (
      <div>
        <h2>{quote.quote}</h2>
        <br />
        <p>{quote.author}</p>
      </div>
    )
  }

export default function App() {

  const [quotes, setQuotes] = useState()
  const [randomQuote, setRandomQuote] = useState()
  
  useEffect(() => {
    
    loadData()
    
  }, [])

  const loadData = async () => {
    const response = await fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
    const data = await response.json()
    console.log(data.quotes)
    setQuotes(data.quotes)
    let randomNumber = Math.floor(Math.random() * data.quotes.length)
    setRandomQuote(data.quotes[randomNumber])
  }


  return (
    <div className="App">
      <h1>Quote Time</h1>
      <h2>
        {randomQuote ?  <div>
        <h2>{randomQuote.quote}</h2>
        <p>{randomQuote.author}</p>
      </div> : '...loading'}
      </h2>
    </div>
  );
}
