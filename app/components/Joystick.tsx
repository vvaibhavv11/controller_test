import React from "react";
import { View, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withSpring,
	runOnJS,
} from "react-native-reanimated";

type JoystickProps = {
	x: number;
	y: number;
	name: string;
	ws: React.RefObject<WebSocket | null>;
};

export function Joystick({ x, y, name, ws }: JoystickProps) {
	const sendJoystick = (xp: number, yp: number) => {
		const sock = ws.current;
		if (sock?.readyState === WebSocket.OPEN) {
			sock.send(JSON.stringify({ name, x: xp, y: yp }));
		}
	};
	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);

	const outerCircule = Gesture.Tap().onBegin((e) => {
		console.log(`value of x ${e.x} and y ${e.y} `);
		translateX.value = -e.x;
		translateY.value = -e.y;
	});

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
				("worklet");
				runOnJS(sendJoystick)(Math.floor(capX), -Math.floor(capY));
			} else {
				translateX.value = dx;
				translateY.value = dy;
				("worklet");
				runOnJS(sendJoystick)(Math.floor(dx), -Math.floor(dy));
			}
		})
		.onEnd(() => {
			translateX.value = withSpring(0);
			translateY.value = withSpring(0);
			runOnJS(sendJoystick)(0, 0);
		});

	const style = useAnimatedStyle(() => ({
		transform: [
			{ translateX: translateX.value },
			{ translateY: translateY.value },
		],
	}));

	return (
		<GestureDetector gesture={outerCircule}>
			<View style={[styles.buttonOuter, { left: x, top: y }]}>
				<GestureDetector gesture={pan}>
					<Animated.View style={style}>
						<View style={styles.buttonInner} />
					</Animated.View>
				</GestureDetector>
			</View>
		</GestureDetector>
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
