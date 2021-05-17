import React from 'react';
import { Text, View, Vibration } from 'react-native';

export class Counter extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            running: this.props.running,
            time: this.props.workTime,
            workTime: this.props.workTime,
            breakTime: this.props.breakTime,
            intervalType: "Work",
            color: "black"
        }
    }

    componentDidMount(){
        if (this.state.running === "on") {
            this.handlePlay()
        }
        else if (this.state.running === "pause") {
            this.handlePause()
        }
        else {
            this.handleOff()
        }
    }

    // update specifics states when props change
    static getDerivedStateFromProps(props, state) {
        if (props.running !== state.running){
            return {
                running: props.running
            }
        }
        if (props.workTime !== state.workTime || props.breakTime !== state.breakTime){
            return {
                workTime: props.workTime,
                breakTime: props.breakTime
            }
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.running !== this.state.running){
            if (this.state.running === "on") {
                this.handlePlay()
            }
            else if (this.state.running === "pause") {
                this.handlePause()
            }
            else {
                this.handleOff()
            }
        }
        
        if (prevProps.workTime !== this.state.workTime || prevProps.breakTime !== this.state.breakTime){
            this.setState({
                workTime: this.state.workTime,
                breakTime: this.state.breakTime
            })
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <Text>
                    {this.state.intervalType}
                </Text>
                <Text style={[styles.text, this.counterColor()]}>
                    {Math.floor(this.state.time/60).toString().padStart(2,"0") + ":" + 
					(this.state.time % 60).toString().padStart(2,"0")}
                </Text>
            </View>
        );
    }

    // gets triggered when Play button is pressed
 	handlePlay = () => {
		this.setState({
			running: "on"
		})
		this.timerId = setInterval(() => {
            if (this.state.time === 0){
                this.changeIntervalType()
                Vibration.vibrate([500, 500, 500])
            }
            else if (this.state.time <= 10) {
                //set color counter in red
                this.setState({
                    color: "red"
                })
            }
            else {
                //set color to normal
                this.setState({
                    color: "black"
                })
            }
			this.setState({
				time: this.state.time - 1
			})
		}, 1000)
	}

    // gets triggered when Pause button is pressed
	handlePause = () => {
		clearInterval(this.timerId)
		this.setState({
			running: "pause"
		})
	}

    handleOff = () => {
		clearInterval(this.timerId)
		this.setState({
			running: "off",
            time: this.state.workTime
		})
	}

    // handles completion of timer
    changeIntervalType(){
        if(this.state.intervalType === "Work") {
			this.setState({
				intervalType: "Break",
                time: this.state.breakTime //set value time 
			})
		}
		else {
			this.setState({
				intervalType: "Work",
                time: this.state.workTime //set value time 
			})	
		}
    }

    counterColor = function() {
        return {
          color: this.state.color,
        }
      }
}

const styles = {
    container: {
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 40
    }
};