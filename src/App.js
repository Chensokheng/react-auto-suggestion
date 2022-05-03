import React, { useRef, useState } from "react";

export default function App() {
	const suggestions = ["React", "HTML", "CSS"];
	const [isFocus, setIsFocus] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const inputRef = useRef();
	const [inputValue, setInputValue] = useState("");

	return (
		<div className="flex justify-center items-center h-screen">
			<div>
				<h1 className="text-4xl font-bold">React Input Auto Suggestion</h1>
				<div className="mt-10 relative">
					<input
						className="w-full focus:outline-none border-2 p-5"
						placeholder="focus to get suggestion"
						onFocus={() => setIsFocus(true)}
						onBlur={() => {
							if (!isHovered) {
								setIsFocus(false);
							}
						}}
						value={inputValue}
						onChange={(e) => {
							setInputValue(e.target.value);
						}}
						ref={inputRef}
					/>
					{isFocus && (
						<div
							className="shadow-lg absolute w-full"
							onMouseEnter={() => {
								setIsHovered(true);
							}}
							onMouseLeave={() => {
								setIsHovered(false);
							}}
						>
							{suggestions.map((suggestion, index) => {
								const isMatch =
									suggestion.toLowerCase().indexOf(inputValue.toLowerCase()) >
									-1;
								return (
									<div key={index}>
										{isMatch && (
											<div
												className="p-5 hover:bg-gray-200 cursor-pointer"
												onClick={() => {
													setInputValue(suggestion);
													inputRef.current.focus();
												}}
											>
												{suggestion}
											</div>
										)}
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
