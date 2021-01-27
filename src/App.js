import React, {useState, useEffect} from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Button, Icon } from '@material-ui/core';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import StarBorderIcon from '@material-ui/icons/StarBorder'
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Fade from '@material-ui/core/Fade';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
  const [favorites, setFavorites] = useState([])
  const [checked, setChecked] = React.useState(false);
  
  useEffect(() => {
    
    loadData()
    getFavorites()
    
  }, [])

  const loadData = async () => {
    const response = await fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
    const data = await response.json()
    console.log(data.quotes)
    setQuotes(data.quotes)
    let randomNumber = Math.floor(Math.random() * data.quotes.length)
    setRandomQuote([data.quotes[randomNumber],randomNumber])
  }

  const getFavorites = async () => {
    let favorites = localStorage.getItem('favoriteQuotes') 
    console.log('line 52: ' +favorites)
    if (favorites) {
      console.log('line 54: ' +favorites)
      let favoritesObject = JSON.parse(favorites)
      setFavorites(favoritesObject)
    }
  }


  const randomQuoteGenerator = () => {
    if (quotes) {
      let randomNumber = Math.floor(Math.random() * quotes.length)
      setRandomQuote([quotes[randomNumber], randomNumber])
    }
    
  }

  const updateFavorites = () => {
    if (favorites) {
      let currentFavorites = favorites
      currentFavorites.push(randomQuote)
      setFavorites(currentFavorites)
      let favoritesString = JSON.stringify(currentFavorites)
      localStorage.setItem('favoriteQuotes', favoritesString)
    }
  }

  const showfavoriteQuotes = () => {

  }

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <div className='main'>
      <Container className="App">
        <h1>Quote Time</h1>
        <Grid container xs={12} justify="center" spacing={3}>
          <Grid item>
            <Card>
              <CardContent>
            {
              randomQuote ?  
                <div>
                  <h2><FormatQuoteIcon />{randomQuote[0].quote}<FormatQuoteIcon /></h2>
                  <p>{randomQuote[0].author}</p>
                </div> : '...loading'
              }
              </CardContent>
               <CardActions>
                
                <IconButton aria-label="add to favorites" onClick={updateFavorites}>
                  <FavoriteIcon />
                </IconButton>

              </CardActions>
            </Card>
          </Grid>

          <Grid container item justify="center" xs={12}>
            
            <Grid item spacing={3} xs={4} md={2}>
              <Button className='newQuoteBtn' variant='contained' onClick={randomQuoteGenerator} color='primary'>New Quote</Button>
            </Grid>
            
            <Grid item spacing={3} xs={4} md={2}>
              <Button className='newQuoteBtn' variant='contained' onClick={showfavoriteQuotes} color='primary'>My Favorites</Button>
            </Grid>

            <Grid item spacing={3} xs={12} md={12} style={{marginTop: 25}}>
              {/* <Fade in={checked}> */}
                <Card justify="center" style={{maxWidth: 750, margin: 'auto'}}>
                  <h2> My Favorite Quotes</h2>
                  {
                    quotes ? 
                      favorites.map( (favorite) => {
                        console.log(JSON.stringify(favorites))
                        {console.log(favorite)}
                        return (
                          <Card>
                            <p>{favorite[0].quote}</p>
                            <p>{favorite[0].author}</p>
                          </Card>
                        )
                      }) 
                      : null
                  }
                </Card>
              {/* </Fade> */}
            </Grid>
            
          </Grid>
          
        </Grid> 
      </Container>
    </div>
  );
}

export default App