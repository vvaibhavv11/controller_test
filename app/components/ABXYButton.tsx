import { StyleSheet, View, Text } from "react-native";

export function ABXYButton({
	name,
	x,
	y,
}: {
	name: string;
	x: number;
	y: number;
}) {
	return (
		<View style={[styles.button, { left: x, top: y }]}>
			<Text style={styles.text}>{name}</Text>
		</View>
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
