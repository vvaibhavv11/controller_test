import { StyleSheet, Text, View } from "react-native";

export function RestButton({
	name,
	x,
	y,
}: {
	name: string;
	x: number;
	y: number;
}) {
	return (
		<View style={[styles.rest_button, { left: x, top: y }]}>
			<Text style={styles.text}>{name}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	rest_button: {
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
