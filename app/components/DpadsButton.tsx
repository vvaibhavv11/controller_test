import { PropsWithChildren } from "react";
import { View, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";

type Props = PropsWithChildren<{
	x: number;
	y: number;
	name: string;
	ws: React.RefObject<WebSocket | null>;
}>;

export function DpadsButton({ children, x, y, name, ws }: Props) {
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
