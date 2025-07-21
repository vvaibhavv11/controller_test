import React, { ReactNode, useRef } from "react";
import { Animated, PanResponder } from "react-native";

type DraggableProps = {
    children: ReactNode,
    onChange?: () => void
}

const Draggable = ({ children, onChange }: DraggableProps) => {
	const pan = useRef(new Animated.ValueXY()).current;

	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
				useNativeDriver: false,
			}),
			onPanResponderRelease: () => {
                onChange?.()
				pan.extractOffset();
			},
		}),
	).current;

	return (
		<Animated.View
			style={{
				transform: [{ translateX: pan.x }, { translateY: pan.y }],
			}}
			{...panResponder.panHandlers}
		>
			{children}
		</Animated.View>
	);
};

export default Draggable;
