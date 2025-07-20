import { useRef } from "react";
import { Animated, PanResponder, View, StyleSheet, Text } from "react-native";

export function LT_button() {
	const pan = useRef(new Animated.ValueXY()).current;
	const panRes = useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: () => true,
			onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
				useNativeDriver: false,
			}),
			onPanResponderRelease: () => {
				pan.extractOffset();
			},
		}),
	).current;
	return (
		<Animated.View
			style={{
				transform: [{ translateX: pan.x }, { translateY: pan.y }],
			}}
			{...panRes.panHandlers}
		>
			<View style={styles.button}>
				<Text style={styles.text}>LT</Text>
			</View>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	button: {
		height: 70,
		width: 75,
		backgroundColor: "#014442",
		borderRadius: 100,
		borderWidth: 4,
		borderColor: "#2C3A1C", 
		justifyContent: "center", 
		alignItems: "center", 
	},
	text: {
		color: "#ffffff", 
	},
});
