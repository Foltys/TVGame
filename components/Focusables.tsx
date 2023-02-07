import React from 'react'
import { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react'
import {
	NativeSyntheticEvent,
	StyleProp,
	StyleSheet,
	TargetedEvent,
	Text,
	Touchable,
	TouchableHighlight,
	TouchableHighlightProps,
	TouchableOpacityProps,
	TouchableWithoutFeedback,
	View,
	ViewStyle,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

type FocusableButtonProps = PropsWithChildren<
	TouchableHighlightProps & { focusedStyle?: StyleProp<ViewStyle>; initialFocus?: boolean }
>
export const FocusableButton = ({
	onPress,
	style: extraStyle,
	focusedStyle,
	children,
	initialFocus,
}: FocusableButtonProps) => {
	const [focus, setFocus] = useState(false)

	const ref = useRef<TouchableHighlight>(null)

	// useEffect(() => {
	// 	if (ref != null && initialFocus) {
	// 		ref.current?.focus()
	// 		setFocus(true)
	// 	}
	// }, [ref])

	const onFocus = useCallback((e: NativeSyntheticEvent<TargetedEvent>) => {
		console.log({ e })
		setFocus(true)
	}, [])
	const onBlur = useCallback((e: NativeSyntheticEvent<TargetedEvent>) => {
		console.log({ e })
		setFocus(false)
	}, [])
	return (
		<TouchableHighlight
			style={[extraStyle ?? styles.focusableWrapper, focus ? focusedStyle ?? styles.focused : null]}
			onPress={onPress}
			onFocus={onFocus}
			onBlur={onBlur}
			ref={ref}
			underlayColor="white"
			hasTVPreferredFocus={initialFocus}
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
		borderColor: 'black',
		backgroundColor: 'white',
		opacity: 80,
	},
	text: {
		fontSize: 22,
		textAlign: 'center',
	},
})
