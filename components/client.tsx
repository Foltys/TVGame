import React, { useState } from 'react'
import { Button, TextInput, View } from 'react-native'
import { SocketModuleClient } from '../modules/SocketModule'

const Client = ({ sendMessage, disconnect }: { sendMessage: (message: string) => void; disconnect: () => void }) => {
	const [message, setMessage] = useState<string>('')
	return (
		<View>
			<TextInput onChangeText={setMessage}></TextInput>
			<Button
				title="Send Message"
				onPress={() => {
					sendMessage(message)
					setMessage('')
				}}
			></Button>
			<Button
				title="Disconnect"
				onPress={() => {
					disconnect()
				}}
			></Button>
		</View>
	)
}

export default Client
