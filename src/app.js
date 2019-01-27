import React from 'react'
import ReactDOM from 'react-dom'
import { PomodoroApp } from './componets/PomodoroApp'
import { Footer } from './componets/Footer'
import './styles/styles.sass'


const App = () => (
   <React.Fragment>
      <header>
         <h1>Pomodore Clock</h1>         
      </header>
      <PomodoroApp />
      <Footer />
   </React.Fragment>
)


ReactDOM.render(<App />, document.getElementById('react-app'))

