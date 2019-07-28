import React, {useEffect, useState} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import GameListItem from './GameListItem';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const GameList = ({ match, location, classes }) => {
    const { listType, listOption } = match.params;
    const queryString = location.search;
    const [gameList, setGameList] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

    const getGameList = () => {
        setGameList([]);
        setLoaded(false);
        axios.get(`/bgg/list/${listType}/${listOption}${queryString}`)
          .then((response) => {
            setGameList([...response.data]);
            setLoaded(true);
          }).catch(() => {
            setLoaded(true);
          });
      };

      useEffect(() => {
        getGameList();
      }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
         <div>
              <h2>List of Compatible Games</h2>
             <List>
            {
                gameList.map(
                    (game, index) => 
                    game
                    ? <GameListItem key={index} game={game}/>
                    : isLoaded
                        ? <Typography variant="h3" className={classes.failed}>Sorry! Failed to find game</Typography>
                        : <CircularProgress className={classes.progress} size={200} />
                )
            }
            </List>
        </div>
    );
};

GameList.propTypes = {
    classes: PropTypes.shape({
        progress: PropTypes.string,
        failed: PropTypes.string,
    }),
    match: PropTypes.shape({
        params: PropTypes.shape({
          listType: PropTypes.string,
          listOption: PropTypes.string,
          minPlayers: PropTypes.number,
        }),
      }),
    location: PropTypes.shape({
        search: PropTypes.string,
    }),
};

export default GameList;