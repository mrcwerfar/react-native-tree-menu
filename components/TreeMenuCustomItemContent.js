import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableHighlight, View, Text, Image} from 'react-native';
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

	renderDemoItem(menuItemObject, color, r) {
		let style = {alignItems: 'center', justifyContent: 'center'};
		return (
			<View style={[style, {backgroundColor: color}]}>
				<Text
					allowFontScaling={true}>
					Custom renderer: {menuItemObject.name}
				</Text>
				<Image
					style={{
						marginLeft: 0,
						marginRight: 0,
						marginTop: 20,
						marginBottom: 20,
						borderRadius: 0,
						padding: 0,
						height: 70,
						width: 70
					}}
					resizeMode='cover'
					source={r}/>
			</View>
		);
	}

	render() {
		let menuItemObject = this.props.menuItemObject;

		if (menuItemObject) {
			switch (menuItemObject.id) {
			case 'id_analytics':
				return this.renderDemoItem(menuItemObject, '#09A509', require('../images/icons8-detective.png'));
			case 'id_color_scheme':
				return this.renderDemoItem(menuItemObject, '#DA07FE', require('../images/icons8-play.png'));
			case 'id_finger_print':
				return this.renderDemoItem(menuItemObject, '#09FEFE', require('../images/icons8-deadlift.png'));
			case 'id_print':
				return this.renderDemoItem(menuItemObject, '#dee204', require('../images/icons8-weight_2.png'));
			default:
				return this.renderDemoItem(menuItemObject, '#E0E0E0', require('../images/icons8-sleeping_in_bed.png'));
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
