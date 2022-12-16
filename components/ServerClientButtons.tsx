import React from 'react'
import { View, StyleSheet, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const ServerClientButtons = () => {
	const navigation = useNavigation()

	return (
		<View style={styles.container}>
			<View style={styles.buttonContainer}>
				<Button title="Start Server" onPress={() => navigation.navigate('ServerView')} />
			</View>
			<View style={styles.buttonContainer}>
				<Button title="Join as Client" onPress={() => navigation.navigate('ClientView')} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonContainer: {
		width: '50%',
		height: '50%',
		alignItems: 'center',
		justifyContent: 'center',
	},
})

export default ServerClientButtons
