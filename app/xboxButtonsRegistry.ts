export const xboxButtons = {
    LS: "LS",
    RS: "RS",
    D_LEFT: "D_LEFT",
    D_RIGHT: "D_RIGHT",
    D_UP: "D_UP",
    D_DOWN: "D_DOWN",
	A: "A",
	B: "B",
	X: "X",
	Y: "Y",
	LB: "LB",
	LT: "LT",
	RB: "RB",
	RT: "RT",
	START: "START",
	BACK: "BACK",
} as const;

export const xboxButtonsNames = Object.keys(xboxButtons);
