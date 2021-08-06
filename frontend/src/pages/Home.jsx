import React from 'react';
import { StoreContext } from '../utils/store';
import Navigation from '../components/Navigation';
import { Redirect } from 'react-router-dom';
import {
  makeStyles,
  Box,
  Container,
  Typography,
  CircularProgress,
} from '@material-ui/core';
// import axios from 'axios';
// import { toast } from 'react-toastify';
import ReactDOM from "react-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'gray',
    minHeight: '100vh',
    width: '100%',
    backgroundColor: '#F0F0F0',
  },
  containerDiv: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'flex-start',
    width: '100%',
  },
  titleDiv: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin: theme.spacing(2),
  },
}));

const Home = () => {
  const context = React.useContext(StoreContext);
  const token = context.token[0];
  const storedUser = JSON.parse(localStorage.getItem('user'));
  // const [token, setToken] = React.useState(storedUser.token);
  const [username, setUsername] = React.useState(storedUser.username);

  React.useEffect(() => {
    if (token === null) {
      return <Redirect to={{ pathname: '/login' }} />;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const setPage = context.pageState[1];
  const [loadingState, setLoadingState] = React.useState('load');

  // const data =[{"name":"test1"},{"name":"test2"}];
  // {
  //   "data": [
  //     {
  //       "followee_username": "emily",
  //       "followee_last_name": "Tong",
  //       "followee_first_name": "Emily",
  //       "text_titles": []
  //     }
  //   ]
  // }
  const viewText = (id) => {
    console.log('View Text', id);
  };

 
    const data = 
      [
      {
        name: "Jude",
        position: "Developer",
        experiences: [
          {
            id: 0,
            job: "React UI Developer",
            period: "2017-2018",
            description:
              "I love Creating beautiful Smart UI with React js and styled components"
          },
          {
            id: 1,
            job: "React/ Redux UI Developer",
            period: "2017-2018",
            description:
              "I love Creating beautiful Smart UI with React js and styled components"
          }
        ]
      }
    ]
    
    class RenderItems extends React.Component {
      state = {
        data: []
      };
      componentDidMount=() => {
        console.log(data);
        this.setState({ data });
      };
     
      render() {
        const { data } = this.state;
        const resume = data.map(dataIn => {
          return (
            <div key={dataIn.name}>
              {dataIn.name}
              <ul>
                {dataIn.experiences.map(experience => (
                  <li key={experience.id}>{experience.job}</li>
                ))}
              </ul>
              {dataIn.position}
            </div>
          );
        });
    
        return <div>{<React.Fragment>{resume}</React.Fragment>}</div>;
      }
    }
    
  
    
    
    
  //   const state = {
  //     userData: [
  //       {
  //         followee_username: 'emily',
  //         followee_last_name: 'Tong',
  //         followee_first_name: 'Emily',
  //         text_titles: [
  //           {
  //             text_title:
  //               'Late unexpected complete fracture of a right ventricular lead still capturing the myocardium',
  //             text_id: 'afe1b2ab-10b2-44e5-a395-cf1d98131311',
  //           },
  //           {
  //             text_title:
  //               "Complement-mediated autoimmune haemolytic anaemia as an initial presentation of Legionnaires' disease",
  //             text_id: '9a61bc5e-784c-4081-b98f-6099966f1ecf',
  //           },
  //         ],
  //       },
  //     ],
  //   };

  //   // return mapTitles;

  //   const data = state.userData;
  //   // setLoadingState('done');
  //   const mapRows = data.map((item, index) => (
  //     <React.Fragment key={item.followee_username}>
  //       <li>
  //         <span>
  //           Name : {item.followee_first_name} {item.followee_last_name}
  //         </span>
  //         <br>{mapTitles(item.text_titles)} </br>
  //       </li>
  //     </React.Fragment>
  //   ));
  //   const mapTitles = data.map((text_titles, index) => (
  //     <React.Fragment key={text_titles.text_id}>
  //       <span>Titles: {text_titles.text_title}</span>
  //       <button onClick={() => viewText(text_titles.text_id)}>
  //         View Article
  //       </button>
  //     </React.Fragment>
  //   ));


  //   return mapRows;
  // };
  const rootElement = document.getElementById("root");
  // React.useEffect(() => {
    // ReactDOM.render(<RenderItems />, rootElement);
  // }, []);

  // React.useEffect(() => {
  //   setPage('/home');
  //   async function setupHome () {
  //     setLoadingState('loading');
  //     setLoadingState('done');
  //   }
  //   setupHome();
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const classes = useStyles();
  return (
    <Container>
      <Navigation />
      <Container className={classes.container}>
        {/* {loadingState !== 'done' && (
          <div>
            <CircularProgress color="primary" />
          </div>
        )}
        {loadingState === 'done' && ( */}
        <Box className={classes.containerDiv}>
          <Box className={classes.titleDiv}>
            <Box>
              <Typography paragraph align="left" variant="h4">
                Home
              </Typography>
              <ul><RenderItems/></ul>
            </Box>
          </Box>
          <br />
          <br />
        </Box>
        {/* )} */}
      </Container>
    </Container>
  );
};

export default Home;
