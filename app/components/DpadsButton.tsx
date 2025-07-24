import { PropsWithChildren } from "react";
import { View, StyleSheet } from "react-native";

type Props = PropsWithChildren<{ x: number; y: number }>;

export function DpadsButton({ children, x, y }: Props) {
	return (
		<View style={[styles.draggable_dpad_button, { left: x, top: y }]}>
			{children}
		</View>
	);
}

const styles = StyleSheet.create({
	draggable_dpad_button: {
		position: "absolute",
		height: 50,
		width: 50,
		backgroundColor: "#014442",
		borderRadius: 100,
		borderWidth: 2,
		borderColor: "#2C3A1C",
		justifyContent: "center",
		alignItems: "center",
	},
});
