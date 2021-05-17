import React from 'react';
import { Text, View } from 'react-native';

const Header = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Pomodoro timer
            </Text>
        </View>
    );
}

const styles = {
    container: {
        backgroundColor: "#FCFAF5",
        width: "100%",
        textAlign: "center",
        padding: 15,
    },
    text: {
        fontSize: 25,
    }
};

export default Header