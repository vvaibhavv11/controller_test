import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export function ABXYButton({
	name,
	x,
	y,
}: {
	name: string;
	x: number;
	y: number;
}) {
    // it works
	const p = Gesture.Pan()
		.onBegin(() => console.log(`${name} in`))
		.onFinalize(() => console.log(`${name} out`));
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
