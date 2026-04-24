import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen() {
	const [ipAddress, setIpAddress] = useState("");
	const [port, setPort] = useState("");

	useEffect(() => {
		// Load saved IP and port on mount
		(async () => {
			const savedIp = await AsyncStorage.getItem("ipAddress");
			const savedPort = await AsyncStorage.getItem("port");
			if (savedIp) setIpAddress(savedIp);
			if (savedPort) setPort(savedPort);
		})();
	}, []);

	const saveSettings = async () => {
		const ipRegex =
			/^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
		const portRegex = /^\d{1,5}$/;

		if (!ipRegex.test(ipAddress)) {
			Alert.alert("Invalid IP", "Please enter a valid IP address");
			return;
		}

		if (!portRegex.test(port) || Number(port) > 65535) {
			Alert.alert("Invalid Port", "Please enter a valid port number (0-65535)");
			return;
		}

		await AsyncStorage.setItem("ipAddress", ipAddress);
		await AsyncStorage.setItem("port", port);
		Alert.alert("Saved", "IP Address and Port saved successfully!");
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>IP Address</Text>
			<TextInput
				style={styles.input}
				value={ipAddress}
				onChangeText={setIpAddress}
				keyboardType="numeric"
				placeholder="e.g. 192.168.0.1"
			/>

			<Text style={styles.label}>Port</Text>
			<TextInput
				style={styles.input}
				value={port}
				onChangeText={setPort}
				keyboardType="numeric"
				placeholder="e.g. 8080"
			/>

			<Button title="Save Settings" onPress={saveSettings} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		justifyContent: "center",
	},
	label: {
		fontSize: 18,
		marginTop: 12,
	},
	input: {
		borderWidth: 1,
		borderColor: "#aaa",
		borderRadius: 6,
		padding: 10,
		marginBottom: 16,
		fontSize: 16,
	},
});
