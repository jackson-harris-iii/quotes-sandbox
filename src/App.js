import React, {useState, useEffect} from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Button, Icon } from '@material-ui/core';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import StarBorderIcon from '@material-ui/icons/StarBorder'
import FavoriteIcon from '@material-ui/icons/Favorite';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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

const App = () => {

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

  const randomQuoteGenerator = () => {
    if (quotes) {
      let randomNumber = Math.floor(Math.random() * quotes.length)
      setRandomQuote(quotes[randomNumber])
    }
    
  }

  const favoriteQuote = () => {
    //this will favorite a users quotes
  }

  return (
    <div className='main'>
      <Container className="App">
        <h1>Quote Time</h1>
        <Grid container xs={12} justify="center" spacing={3}>
          <Grid item>
            <Card>
            {
              randomQuote ?  
                <div>
                  <h2><FormatQuoteIcon />{randomQuote.quote}<FormatQuoteIcon /></h2>
                  <p>{randomQuote.author}</p>
                </div> : '...loading'
              }
            </Card>
          </Grid>
          <Grid container item xs={4}>
            <Grid item spacing={3} xs={6}>
              <Button className='newQuoteBtn' variant='contained' onClick={randomQuoteGenerator} color='primary'>New Quote</Button>
            </Grid>
            
            <Grid item spacing={3} xs={6}>
              <Button className='newQuoteBtn' variant='contained' onClick={favoriteQuote} color='primary'>Favorites</Button>
            </Grid>
            
          </Grid>
          
        </Grid> 
      </Container>
    </div>
  );
}

export default App