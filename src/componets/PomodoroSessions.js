import React from 'react'

const PomodoreSessions = (props) => (
	<div id="sessions">
		<div className="sessions-container session-container">
			<p id="session-label" className="sessions-name">Session Length</p>  
			<span 
				id="session-length" 
				className="length-display"
				>{props.state.sessionLength}
			</span>  
			<div className="sessions-btn-container">
				<button 
					id="session-increment" 
					href="#"
					onClick={() => props.increment('sessionLength', 'Session')}
					disabled={props.state.controllsStatus}
					className="in-de-crementorsBtn"
					>
					<i className="fas fa-chevron-up"></i>
				</button> 			
				<button 
					id="session-decrement" 
					href="#"
					onClick={() => props.decrement('sessionLength', 'Session')}
					disabled={props.state.controllsStatus}
					className="in-de-crementorsBtn"
					>
					<i className="fas fa-chevron-down"></i>
				</button>
			</div>
			
		</div>
		<div className="sessions-container break-container">
			<p id="break-label" className="sessions-name">Break Length</p>  
			<span 
				id="break-length" 
				className="length-display"
				>{props.state.breakLength}
			</span>
			<div className="sessions-btn-container">
				<button 
					id="break-increment" 
					href="#"
					onClick={() => props.increment('breakLength', 'Break')}
					disabled={props.state.controllsStatus}
					className="in-de-crementorsBtn"
					>
					<i className="fas fa-chevron-up"></i>
				</button> 							
				<button 
					id="break-decrement" 
					href="#"
					onClick={() => props.decrement('breakLength', 'Break')}
					disabled={props.state.controllsStatus}
					className="in-de-crementorsBtn"
					>
					<i className="fas fa-chevron-down"></i>
				</button>
			</div>
			
		</div>				
	</div>   
)
export {PomodoreSessions as default}
