import { StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export function RestButton({
	name,
	x,
	y,
}: {
	name: string;
	x: number;
	y: number;
}) {
	const p = Gesture.Pan()
		.onBegin(() => console.log(`${name} in`))
		.onFinalize(() => console.log(`${name} out`));
	return (
		<GestureDetector gesture={p}>
			<View style={[styles.rest_button, { left: x, top: y }]}>
				<Text style={styles.text}>{name}</Text>
			</View>
		</GestureDetector>
	);
}

const styles = StyleSheet.create({
	rest_button: {
		position: "absolute",
		height: 40,
		width: 80,
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
