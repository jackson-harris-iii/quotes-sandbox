import React, {useState, useEffect} from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Button, Icon } from '@material-ui/core';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import StarBorderIcon from '@material-ui/icons/StarBorder'
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Fade from '@material-ui/core/Fade';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import "./styles.css";
import { DeleteForever } from "@material-ui/icons";


const App = () => {

  const [quotes, setQuotes] = useState()
  const [randomQuote, setRandomQuote] = useState()
  const [favorites, setFavorites] = useState([])
  const [checked, setChecked] = useState(false);
  
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
    // console.log('line 52: ' +favorites)
    if (favorites) {
      // console.log('line 54: ' +favorites)
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
      let currentFavorites = [...favorites]
      currentFavorites.push(randomQuote)
      setFavorites(currentFavorites)
      let favoritesString = JSON.stringify(currentFavorites)
      localStorage.setItem('favoriteQuotes', favoritesString)
    }
  }

  const deleteFavorite = (favorite) => {
    
    let deleteMe = JSON.stringify(favorite)
    console.log('delete: ' + deleteMe)
    let oldFavorites = favorites
    
    for (let [index, item] of favorites.entries()) {
      console.log(index)
      if (favorite[1] === item[1] ) {
        // console.log('match!: ' + deleteMe, item)
        console.log(oldFavorites)
        oldFavorites.splice(index, 1)
        console.log(oldFavorites)
        let newFavorites =[...oldFavorites]
        setFavorites(newFavorites)
        let newFavoriteString = JSON.stringify(newFavorites) 
        localStorage.setItem('favoriteQuotes', newFavoriteString)
      }
    }
  }

  const toggleFavorites = () => {
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
            
            <Grid item spacing={3} xs={4} md={3}>
              <Button className='newQuoteBtn' variant='contained' onClick={randomQuoteGenerator} color='primary'>New Quote</Button>
            </Grid>
            
            <Grid item spacing={3} xs={6} md={3}>
              <Button className='newQuoteBtn' variant='contained' onClick={toggleFavorites} color='primary'>
                {checked ? 'Hide My Favorites' : 'Show My Favorites' }
                </Button>
            </Grid>

            <Grid item spacing={3} xs={12} md={12} style={{marginTop: 25}}>
              <Fade in={checked}>
                <Card justify="center" style={{maxWidth: 750, margin: 'auto', backgroundColor: '#262323', paddingRight: 15, paddingLeft: 15, maxHeight: '50vh', overflowY: 'scroll'}}>
                  <h2 style={{color: 'white'}}> My Favorite Quotes</h2>
                  {
                    quotes ? 
                      favorites.slice(0).reverse().map( (favorite) => {
                        // console.log(JSON.stringify(favorites))
                        // {console.log(favorite)}
                        return (
                          <Card style={{marginTop: 5, marginBottom: 5}}>
                            <Grid container>
                              <Grid item xs={11} style={{paddingLeft: 35, paddingRight: 5}}>
                                <p>{favorite[0].quote}</p>
                                <p>{favorite[0].author}</p>
                              </Grid>
                              <Grid item xs={1} style={{marginTop: 25}}>
                                <IconButton aria-label="add to favorites" onClick={() => deleteFavorite(favorite)}>
                                  <DeleteForeverIcon color={'error'}/>
                                </IconButton>
                              </Grid>
                            </Grid>
                            
                          </Card>
                        )
                      }) 
                      : null
                  }
                </Card>
              </Fade>
            </Grid>
            
          </Grid>
          
        </Grid> 
      </Container>
    </div>
  );
}

export default App