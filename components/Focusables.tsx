import { useCallback, useState } from 'react'
import { StyleSheet, Text, TouchableHighlight } from 'react-native'

export const FocusableButton = ({ title, onPress }: { title: string; onPress: () => void }) => {
	const [focus, setFocus] = useState(false)

	const onFocus = useCallback(() => {
		setFocus(true)
	}, [title])
	const onBlur = useCallback(() => {
		setFocus(false)
	}, [])
	return (
		<TouchableHighlight
			style={[styles.focusableWrapper, focus ? styles.focused : null]}
			onPress={onPress}
			onFocus={onFocus}
			onBlur={onBlur}
		>
			<Text style={styles.text}>{title}</Text>
		</TouchableHighlight>
	)
}

const styles = StyleSheet.create({
	focusableWrapper: {
		borderColor: '#9DBF9E',
		borderWidth: 0.1,
		backgroundColor: '#D0D6B5',
		justifyContent: 'center',
		alignItems: 'center',
	},
	focused: {
		borderColor: '#EE7674',
	},
	text: {
		fontSize: 22,
		textAlign: 'center',
	},
})
