import React from 'react'
import moment from 'moment'
import  'moment-timer'
import ProgressRing from './ProgressRing'
import PomodoreSessions from './PomodoroSessions'

export class PomodoroApp extends React.Component {
	timeID = ''
	state = {
		seconds: 0,
		secondsCount: 0,
		minutes: 25,
		breakLength: 5,
		sessionLength: 25,
		sessionType: 'Session', // Break or Session
		controllsStatus: false, 
		percent: 0 // for animation     
	}
	beep = () => document.getElementById('beep')	
	extraSounds = () => {
		 const woosh = new Audio(
          'https://res.cloudinary.com/dixehwylu/video/upload/v1537718104/PomodoroClock/sounds/Woosh-Mark_DiAngelo-4778593.mp3'
          )
		 const beep2 = new Audio(
          'https://res.cloudinary.com/dixehwylu/video/upload/v1537719693/PomodoroClock/sounds/Checkout_Scanner_Beep-SoundBible.com-593325210.mp3'
          ) 
		 return { woosh, beep2 }
	}
	//
	calculatePercent = () => {
		const { 
			percent, 
			secondsCount, 
			breakLength, 
			sessionLength, 
			sessionType
		} = this.state

		const progressUpdate = sessionType === 'Session'
			? 100 / (sessionLength * 60) : 100 / (breakLength  * 60)
		if(secondsCount > 0 && percent < 99) {
			this.setState(prevState => ({ 
				percent: parseFloat((prevState.percent + progressUpdate).toFixed(2))
			}))
		}
		console.log(percent)
   }
   
	setSessionTypes = () => {      
		if(this.state.seconds === 1 && this.state.minutes === 0) { 
			new moment.duration(999).timer({ start: true }, () => {
				this.beep().play()
				this.setState(prevState => ({ 
               sessionType: prevState.sessionType === 'Session' 
                  ? 'Break' : 'Session',
					percent: 100
				}))  
			})         
			new moment.duration(1995).timer({ start: true }, () => {
				this.setState(prevState => ({            
					minutes: prevState.sessionType === 'Session'
					   ? prevState.sessionLength : prevState.breakLength,
					secondsCount: 0,
					percent: 0
				}))
			})
		} 
	}   
	timeIDSettings = () => {	
		this.calculatePercent()
		this.setState(prevState => ({
         seconds: prevState.seconds <= 0 ? 59 : prevState.seconds - 1,
			secondsCount: prevState.secondsCount + 1
		}))	
		if(this.state.seconds === 59 && this.state.minutes > 0) {
			this.setState((prevState) => ({ 
				minutes: prevState.minutes - 1 
			}))
		}      
		this.setSessionTypes()		
	}
	aTimer = () => {
		this.setState(() => ({ controllsStatus: true })) 
      this.timeID = moment.duration(1000).timer({ loop: true }, this.timeIDSettings)
      //this.timeID = setInterval(this.timeIDSettings, 1000)
	}
	stopTimer = () => {
		this.setState(() => ({ controllsStatus: false }))
      this.timeID.stop()
      //clearInterval(this.timeID)
		this.beep().load()
	}
	playStop = () => {
		!this.state.controllsStatus ? this.aTimer() : this.stopTimer()
		this.extraSounds().beep2.play()
	}
	handleReset = () => {
		if (this.timeID) { this.timeID.stop() } /*{clearInterval(this.timeID)}*/
		this.setState(prevState => ({
			...prevState, 
			seconds: 0,
			secondsCount: 0,
			minutes: 25,
			breakLength: 5,
			sessionLength: 25,
			sessionType: 'Session',
			controllsStatus: false,
			percent: 0
		})) 
		this.beep().pause()
      this.beep().currentTime = 0
		this.extraSounds().woosh.play()
	}  
	// cheks ssession to update minutes   
	in_de_crementRules = (property, session) => {
		this.setState(() => ({ seconds: 0, secondsCount: 0 }))
		if(this.state.sessionType === session) {
			this.setState((prevState) => ({ minutes: prevState[property] }))
		}
	}      
	increment = (property, session) => {		
		if(this.state[property] < 60) {
			this.setState(prevState => ({ 
				[property]: prevState[property] + 1,
			}))
			this.in_de_crementRules(property, session) 
			this.extraSounds().woosh.play()        
		}			
	}
	decrement = (property, session) => {
		if(this.state[property] > 1) {
			this.setState(prevState => ({
				[property]: prevState[property] - 1,            
			}))
			this.in_de_crementRules(property, session) 
			this.extraSounds().woosh.play() 
		}			
	}
	formatedTimeLeft = () => {	      		
		const minutes = this.state.minutes < 10 
		? `0${this.state.minutes}` : `${this.state.minutes}`
		const seconds = this.state.seconds < 10 
      ? `0${this.state.seconds}` : `${this.state.seconds}`
      //document.getElementById('time-left').textContent = `${minutes}:${seconds}`
		return `${minutes}:${seconds}`
	}	
	render(){  
		const { seconds, minutes } = this.state    
		return (
			<section 
				id="pomodoro-app" 
				className={minutes === 0 && seconds === 0 ? 'sound-animation' : '' }>
				<audio 
					id="beep"
					src="https://res.cloudinary.com/dixehwylu/video/upload/v1536880047/PomodoroClock/sounds/alarm_alarm.mp3"	
					preload="auto"
					/>
				<div id="display-timer-container">
					<h3 id="timer-label">{this.state.sessionType}</h3>
					<a type="button"
						onClick={this.playStop} 
						id="start_stop"
						>
						<ProgressRing 
							state={this.state} 
							timeLeft={this.formatedTimeLeft()}/> 
					</a>
				</div>    				
				<PomodoreSessions 
					state={this.state}
					increment={this.increment}
					decrement={this.decrement}
					woosh={this.extraSounds.woosh}					
				/>		
				<button onClick={this.handleReset} id="reset">
					<i className="fas fa-sync-alt"></i> RESET
				</button>	           
			</section>
		)	
	}
}