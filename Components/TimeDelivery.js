//import liraries
import moment from 'moment';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from './Colors';

// create a component
const TimeDelivery = (props) => {
    const { sender, item } = props;
    return (
        <View
            style={[styles.mainView, {
                justifyContent: 'flex-end',
            }]}
        >
            <Text style={{
                fontFamily: 'Poppins-Regular', 
                fontSize: 7,
                color: sender ? COLORS.white : COLORS.gray
            }}>
                {moment(item.send_time).format('LLL')}
            </Text>

             

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2
    }
});

//make this component available to the app
export default TimeDelivery;