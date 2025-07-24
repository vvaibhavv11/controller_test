import React, { ReactNode, useRef } from "react";
import { Animated, PanResponder } from "react-native";

type DraggableProps = {
	children: ReactNode;
	onChange?: () => void;
};

const Draggable = ({ children, onChange }: DraggableProps) => {
	const pan = useRef(new Animated.ValueXY({ x: 300, y: 150 })).current;

	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderGrant: () => {
				pan.setOffset({
					x: pan.x._value,
					y: pan.y._value,
				});
				pan.setValue({ x: 0, y: 0 });
			},
			onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
				useNativeDriver: false,
			}),
			onPanResponderRelease: () => {
				onChange?.();
				pan.flattenOffset();
			},
		}),
	).current;

	return (
		<Animated.View
			style={[{ position: "absolute" }, pan.getLayout()]}
			{...panResponder.panHandlers}
		>
			{children}
		</Animated.View>
	);
};

export default Draggable;
