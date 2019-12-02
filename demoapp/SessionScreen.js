'use strict';
import React, {Component} from 'react';
import {View, ScrollView, StatusBar, SafeAreaView, Text} from 'react-native';

class SessionScreen extends Component {

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<View style={{flex: 1}}>
				<StatusBar barStyle="dark-content" />
				<SafeAreaView>
					<ScrollView
						contentInsetAdjustmentBehavior="automatic">
						<Text style={{fontSize: 30, textAlign: 'center', margin: 10, marginTop: 100}}>
							Session Screen
						</Text>
					</ScrollView>
				</SafeAreaView>
			</View>
		);
	}
}

export default SessionScreen;
