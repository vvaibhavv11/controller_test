import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Joystick } from "./Joystick";
import { ABXYButton } from "./ABXYButton";
import { DpadsButton } from "./DpadsButton";
import {
	ChevronLeft,
	ChevronUp,
	ChevronRight,
	ChevronDown,
} from "lucide-react-native";
import { RestButton } from "./RestButton";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import React from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = NativeStackScreenProps<RootStackParamList, "MainController">;

export function MainController({ route }: Props) {
	const wsRef = React.useRef<WebSocket | null>(null);
	const wsRef1 = React.useRef<WebSocket | null>(null);
	React.useEffect(() => {
		const lock = async () => {
			await ScreenOrientation.lockAsync(
				ScreenOrientation.OrientationLock.LANDSCAPE,
			);
		};

		lock().catch(console.error);
		(async () => {
			const ip = await AsyncStorage.getItem("ipAddress");
			const port = await AsyncStorage.getItem("port");
			if (!ip || !port) {
				console.error("Missing WebSocket config.");
				return;
			}

			const ws = new WebSocket(`ws://${ip}:${port}`);
			const ws1 = new WebSocket(`ws://${ip}:${port}`);
			wsRef.current = ws;
			wsRef1.current = ws1;

			ws.onopen = () => console.log("WebSocket connected");
			ws.onmessage = (e) => {
				console.log("Incoming:", e.data);
				// dispatch or setState to share data
			};
			ws.onerror = (e) => console.error("Socket error:", e);
			ws.onclose = (e) => console.log("Socket closed:", e.code, e.reason);

			return () => {
				ws.close();
				wsRef.current = null;
			};
		})();
	}, []);
	const { layoutCor } = route.params;

	const buttonNames = Object.keys(layoutCor);
	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.container}>
				{buttonNames.map((name) => {
					if (name) {
						if (name === "LS" || name === "RS") {
							return (
								<Joystick
									key={name}
									x={layoutCor[name].px}
									y={layoutCor[name].py}
                                    name={name}
                                    ws={wsRef1}
								></Joystick>
							);
						}
						if (name === "A" || name === "B" || name === "Y" || name === "X") {
							return (
								<ABXYButton
									key={name}
									name={name}
									x={layoutCor[name].px}
									y={layoutCor[name].py}
									ws={wsRef}
								></ABXYButton>
							);
						}
						if (name === "D_LEFT") {
							return (
								<DpadsButton
									key={name}
									x={layoutCor[name].px}
									y={layoutCor[name].py}
									name={name}
									ws={wsRef}
								>
									<ChevronLeft />
								</DpadsButton>
							);
						}
						if (name === "D_RIGHT") {
							return (
								<DpadsButton
									key={name}
									x={layoutCor[name].px}
									y={layoutCor[name].py}
									name={name}
									ws={wsRef}
								>
									<ChevronRight />
								</DpadsButton>
							);
						}
						if (name === "D_UP") {
							return (
								<DpadsButton
									key={name}
									x={layoutCor[name].px}
									y={layoutCor[name].py}
									name={name}
									ws={wsRef}
								>
									<ChevronUp />
								</DpadsButton>
							);
						}
						if (name === "D_DOWN") {
							return (
								<DpadsButton
									key={name}
									x={layoutCor[name].px}
									y={layoutCor[name].py}
									name={name}
									ws={wsRef}
								>
									<ChevronDown />
								</DpadsButton>
							);
						}
						return (
							<RestButton
								key={name}
								name={name}
								x={layoutCor[name].px}
								y={layoutCor[name].py}
								ws={wsRef}
							></RestButton>
						);
					}
				})}
			</SafeAreaView>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#171C1F",
	},
});
