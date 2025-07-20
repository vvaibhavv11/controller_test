
import { useRef } from "react";
import { Animated, PanResponder, View, StyleSheet } from "react-native";

export function R_Joystick() {
	// const panOuter = useRef(new Animated.ValueXY()).current;
	// const panResOuter = useRef(
	// 	PanResponder.create({
	// 		onMoveShouldSetPanResponder: () => true,
	// 		onPanResponderMove: Animated.event(
	// 			[null, { dx: panOuter.x, dy: panOuter.y }],
	// 			{
	// 				useNativeDriver: false,
	// 			},
	// 		),
	// 		onPanResponderRelease: () => {
	// 			panOuter.extractOffset();
	// 		},
	// 	}),
	// ).current;
	const panInner = useRef(new Animated.ValueXY()).current;
	const panResInner = useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: () => true,
			onPanResponderMove: (evt, gestureState) => {
				console.log(gestureState);
				const squre_x = gestureState.dx * gestureState.dx;
				const squre_Y = gestureState.dy * gestureState.dy;
				const distance = Math.sqrt(squre_x + squre_Y);

				if (distance > 50) {
					const slope = gestureState.dy / gestureState.dx;
					const deno = Math.sqrt(1 + slope * slope);
					let dx;
					let dy;
					if (gestureState.dx < 0) {
						dx = -50 / deno;
						dy = (-50 * slope) / deno;
					} else {
						dx = 50 / deno;
						dy = (50 * slope) / deno;
					}
					console.log("slope: ", slope);
					console.log("x: ", dx);
					console.log("y: ", dy);
					panInner.setValue({ x: dx, y: dy });
					return;
				}
				return Animated.event([null, { dx: panInner.x, dy: panInner.y }], {
					useNativeDriver: false,
				})(evt, gestureState);
			},
			// console.log(gestureState);
			onPanResponderRelease: () => {
				// panInner.resetAnimation();
				Animated.spring(panInner, {
					toValue: { x: 0, y: 0 },
					useNativeDriver: true,
				}).start();
			},
		}),
	).current;

	return (
		<View style={styles.buttonOuter}>
			<Animated.View
				style={{
					transform: [{ translateX: panInner.x }, { translateY: panInner.y }],
				}}
				{...panResInner.panHandlers}
			>
				<View style={styles.buttonInner}></View>
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	buttonOuter: {
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
