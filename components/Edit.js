import React from 'react';
import { Text, View, TextInput } from 'react-native';

export class Edit extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            workTime: 20,
            breakTime: 5
        }
    }

    componentDidUpdate(prevProp, prevState){
        if(prevState.workTime !== this.state.workTime || prevState.breakTime !== this.state.breakTime){
            this.handleEditTime();
        }
    }

    render(){
        return (
            <View >
                <View style={styles.formBlock}>
                    <Text style={styles.text}>WorkTime</Text>
                    <TextInput style={[styles.text, styles.textInput]} keyboardType={"numeric"} defaultValue={''+this.state.workTime} placeholder = "workTime in mins" onChangeText={this.handleWorkTime} />
                </View>
                <View style={styles.formBlock}>
                    <Text style={styles.text}>BreakTime</Text>
                    <TextInput style={[styles.text, styles.textInput]} keyboardType={"numeric"} defaultValue={''+this.state.breakTime} placeholder = "breakTime in mins" onChangeText={this.handleBreakTime} />
                </View>
            </View>
    
        );
    }

    // gets triggered on change of worktimer input
    handleWorkTime = (input) => {
		if (input >= 0){
			this.setState({
				workTime: input
			})
		}
		else {
			alert("Time invalid. Setting value to default. Please enter valid time")
			this.setState({
				workTime: 20
			})
		}
	}

	// gets triggered on change of breaktimer input
	handleBreakTime = (input) =>{
		if (input >= 0) {
			this.setState({
				breakTime: input
			})
		}
		else {
			alert("Time invalid. Setting value to default. Please enter valid time")
			this.setState({
				breakTime: 5
			})
		}
	}

    handleEditTime(){
        var newTime = {
            workTimeEdit: this.state.workTime,
            breakTimeEdit: this.state.breakTime
        }

        this.props.onEdit(newTime)
    }
}

const styles = {
    container: {
        backgroundColor: '#fff',
      
    },
    textInput: {
        height: 20
    },
    text: {
        fontSize: 20,
        margin: 5
    },
    formBlock: {
        flex: 1, 
        flexDirection: 'row', 
    }
};