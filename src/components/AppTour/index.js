import React, { useState } from 'react';
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';

const AppTour = ({ steps, sidebarOpen, drawerHandler }) => {
    const [state, setState] = useState({
        run: true,
        stepIndex: 0,
        steps: steps,
        controlled: true,
        continuous: true,
        sidebarOpen: sidebarOpen
    });

    console.log('This is the state', state);

    const handleJoyrideCallback = data => {
        const { action, index, status, type } = data;
    
        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            setState({ ...state, run: false });
          } else if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
        //   setState({ ...state, stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) });
        const nextStepIndex = index + (action === ACTIONS.PREV ? -1 : 1);

          if (!state.sidebarOpen && index === 1) {
            console.log('Now this must run')
            drawerHandler();
            setTimeout(() => {
              setState({ ...state, run: true, stepIndex: state.stepIndex + 1 });
            }, 400);
          } else {
            setState({
                ...state,
                sidebarOpen: false,
                stepIndex: nextStepIndex,
              });
          }
        }
        

        console.groupCollapsed(type);
    console.log(data); //eslint-disable-line no-console
    console.groupEnd();
    }

    return (
        <div>
            <Joyride 
                callback={handleJoyrideCallback}
                stepIndex={state.stepIndex}
                steps={state.steps}
                spotlightClicks={true}
                run={state.run}
                continuous={state.continuous}
                controlled={state.controlled}
                showProgress
                sidebarOpen={state.sidebarOpen}
            />
        </div>
    )
}

export default AppTour;