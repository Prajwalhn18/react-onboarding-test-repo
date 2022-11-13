import React, {useState} from 'react';
import './App.css';
import { Button, Drawer } from '@mui/material';
import {steps} from './components/AppTour/steps';
import AppTour from './components/AppTour';

function App() {
  const [state, setState] = useState({
    anchor: false,
    sidebarOpen: false
  });

  const drawerHandler = () => {
    setState({
      ...state,
      anchor: true,
      sidebarOpen: true
    });
  }

  const toggleDrawer = () => {
    setState({
      ...state,
      anchor: false,
    })
  }

  return (
    <div className="App" styles={{marginTop: "2rem !important"}}>
      <Button variant="contained" className="first-step">First Step</Button>
      <br />
      <br />
      <br />
      <Button variant="outlined" className="second-step" onClick={drawerHandler}>second Step</Button>

      <Drawer
            anchor='right'
            open={state.anchor}
            onClose={toggleDrawer}
            PaperProps={{
              sx: { width: "30%" },
            }}
          >
            <span className="third-step">Test</span>
            <div className="fourth-step">
              <h4>Fourth Step</h4>
            </div>
          </Drawer>
          <AppTour steps={steps} sidebarOpen={state.sidebarOpen} drawerHandler={drawerHandler} />
    </div>
  );
}

export default App;
