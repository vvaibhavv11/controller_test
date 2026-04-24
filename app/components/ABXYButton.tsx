import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";

export function ABXYButton({
	name,
	x,
	y,
	ws,
}: {
	name: string;
	x: number;
	y: number;
	ws: React.RefObject<WebSocket | null>;
}) {
	// it works
	const sendPress = (pressed: boolean) => {
		const sock = ws.current;
		if (sock?.readyState === WebSocket.OPEN) {
			sock.send(JSON.stringify({ name, is_pressed: pressed }));
		}
	};
	const p = Gesture.Pan()
		.onBegin(() => {
			"worklet";
			runOnJS(sendPress)(true);
		})
		.onFinalize(() => {
			"worklet";
			runOnJS(sendPress)(false);
		});

	return (
		<GestureDetector gesture={p}>
			<View style={[styles.button, { left: x, top: y }]}>
				<Text style={styles.text}>{name}</Text>
			</View>
		</GestureDetector>
	);
}

const styles = StyleSheet.create({
	button: {
		position: "absolute",
		height: 70,
		width: 75,
		backgroundColor: "#014442",
		borderRadius: 100,
		borderWidth: 2,
		borderColor: "#2C3A1C",
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		color: "#ffffff",
	},
});
