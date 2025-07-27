import { PropsWithChildren } from "react";
import { View, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

type Props = PropsWithChildren<{ x: number; y: number; name: string }>;

export function DpadsButton({ children, x, y, name }: Props) {
	const p = Gesture.Pan()
		.onBegin(() => console.log(`${name} in`))
		.onFinalize(() => console.log(`${name} out`));
	return (
		<GestureDetector gesture={p}>
			<View style={[styles.draggable_dpad_button, { left: x, top: y }]}>
				{children}
			</View>
		</GestureDetector>
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
