import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';

import Header from './components/Header';
import { Counter } from './components/Counter';
import { Edit } from './components/Edit';

export default class App extends React.Component {

    constructor(props){
      super(props)
        this.state = {
            running: "off",
            workTime: 20 * 60,
            breakTime: 5 * 60
        }
    }

    render(){
        return (
          <ScrollView contentContainerStyle={styles.container}>
              {/* App header */}
              <Header style={styles.header}></Header>

              {/* Form edit counter */}  
              {/* running = on/pause/off */} 
              {this.state.running === "off" &&  
              <Edit style={styles.form} onEdit={this.handleEdit}></Edit>
              }
              {/* Pomodoro Counter */}  
              {this.state.running !== "off" &&         
              <Counter style={styles.counter} running={this.state.running} workTime={this.state.workTime} breakTime={this.state.breakTime}></Counter>
              }

              <View style={styles.buttonGroup}>
                {/* Button: can reset when counter is on pause */} 
                {this.state.running === "pause" && 
                <Button color="#A2687C" onPress={() => this.setState({ running: "off" })} title={"Reset"}></Button>
              }
                {/* Toggle button: play/pause */}   
                <Button color="#A2687C" onPress={() => this.setState({ running: this.state.running === "on" ? "pause" : "on" })} title={this.state.running === "pause" || this.state.running === "off" ? "Play" : "Pause"}></Button>
              </View>
          </ScrollView>
        );
    }

    handleEdit = (newTime) => {
        this.setState({
            workTime: newTime.workTimeEdit * 60,
            breakTime: newTime.breakTimeEdit * 60
        })
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',
    },
    header: {
        
    },
    form: {
        
    },
    counter: {
    },
    buttonGroup: {
        flexDirection: 'row', 
        marginBottom: 100,
        justifyContent: 'space-between'
    }
});
