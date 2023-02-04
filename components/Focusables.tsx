import { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react'
import { StyleProp, StyleSheet, Text, TouchableHighlight, TouchableHighlightProps, ViewStyle } from 'react-native'

type FocusableButtonProps = PropsWithChildren<TouchableHighlightProps & { initialFocus?: boolean }>
export const FocusableButton = ({ onPress, style: extraStyle, children, initialFocus }: FocusableButtonProps) => {
	const [focus, setFocus] = useState(false)

	const ref = useRef<TouchableHighlight>(null)

	useEffect(() => {
		console.log({ ref })
		if (ref != null && initialFocus) {
			console.log('match')
			ref.current?.focus()
			setFocus(true)
		}
	}, [ref])

	const onFocus = useCallback(() => {
		console.log('focusing')
		setFocus(true)
	}, [])
	const onBlur = useCallback(() => {
		setFocus(false)
	}, [])
	return (
		<TouchableHighlight
			style={[styles.focusableWrapper, focus ? styles.focused : null, extraStyle]}
			onPress={onPress}
			onFocus={onFocus}
			onBlur={onBlur}
			ref={ref}
		>
			<>{children}</>
		</TouchableHighlight>
	)
}

const styles = StyleSheet.create({
	focusableWrapper: {
		borderColor: '#9DBF9E',
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	focused: {
		borderWidth: 2,
		borderColor: 'red',
	},
	text: {
		fontSize: 22,
		textAlign: 'center',
	},
})
