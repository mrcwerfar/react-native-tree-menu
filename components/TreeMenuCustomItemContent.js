import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableHighlight, View, Text} from 'react-native';
import IconIO from 'react-native-vector-icons/Ionicons';
import IconAD from 'react-native-vector-icons/AntDesign';
import IconEI from 'react-native-vector-icons/EvilIcons';
import IconFE from 'react-native-vector-icons/Feather';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconFI from 'react-native-vector-icons/Fontisto';
import IconFO from 'react-native-vector-icons/Foundation';
import IconMA from 'react-native-vector-icons/MaterialIcons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconOC from 'react-native-vector-icons/Octicons';
import IconZO from 'react-native-vector-icons/Zocial';
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';

/**
 * TreeMenuCustomItemContent
 */
class TreeMenuCustomItemContent extends Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		let menuItemObject = this.props.menuItemObject;
		if (menuItemObject) {
			switch (menuItemObject.id) {
			case 'id_analytics':
				return (
					<View style={{backgroundColor: '#0E9A90', height: 150, justifyContent: 'center'}}>
						<Text
							style={{
								textAlign: 'center'
							}}
							allowFontScaling={true}>
							Custom renderer: {menuItemObject.name}
						</Text>
						<Image >

						</Image>
					</View>
				);
			case 'id_color_scheme':
				return (
					<View style={{backgroundColor: '#DA07FE', height: 120, justifyContent: 'center'}}>
						<Text
							style={{
								textAlign: 'center'
							}}
							allowFontScaling={true}>
							Custom renderer: {menuItemObject.name}
						</Text>
					</View>
				);
			default:
				return (
					<View style={{backgroundColor: '#AAAAAA', height: 140, justifyContent: 'center'}}>
						<Text
							style={{
								textAlign: 'center'
							}}
							allowFontScaling={true}>
							Custom renderer: {menuItemObject.name}
						</Text>
					</View>
				);
			}

		} else
			return (<View><Text>Custom item content</Text></View>);
	}
}

TreeMenuCustomItemContent.defaultProps = {

};

TreeMenuCustomItemContent.propTypes = {
	menuItemObject: PropTypes.object
};

export default TreeMenuCustomItemContent;
