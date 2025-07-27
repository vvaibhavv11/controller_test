import React from "react";
import { View, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withSpring,
} from "react-native-reanimated";

type JoystickProps = { x: number; y: number };

export function Joystick({ x, y }: JoystickProps) {
	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);

	const pan = Gesture.Pan()
		.onUpdate((e) => {
			const dx = e.translationX;
			const dy = e.translationY;
			const dist = Math.hypot(dx, dy);
			if (dist > 50) {
				const slope = dy / dx;
				const denom = Math.sqrt(1 + slope * slope);
				const capX = dx < 0 ? -50 / denom : 50 / denom;
				const capY = capX * slope;
				translateX.value = capX;
				translateY.value = capY;
			} else {
				translateX.value = dx;
				translateY.value = dy;
			}
		})
		.onEnd(() => {
			translateX.value = withSpring(0);
			translateY.value = withSpring(0);
		});

	const style = useAnimatedStyle(() => ({
		transform: [
			{ translateX: translateX.value },
			{ translateY: translateY.value },
		],
	}));

	return (
		<View style={[styles.buttonOuter, { left: x, top: y }]}>
			<GestureDetector gesture={pan}>
				<Animated.View style={style}>
					<View style={styles.buttonInner} />
				</Animated.View>
			</GestureDetector>
		</View>
	);
}
const styles = StyleSheet.create({
	buttonOuter: {
		position: "absolute",
		height: 100,
		width: 100,
		opacity: 100,
		borderRadius: 100,
		borderWidth: 4,
		borderColor: "#2C3A1C",
		justifyContent: "center",
		alignItems: "center",
	},
	buttonInner: {
		height: 50,
		width: 50,
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
