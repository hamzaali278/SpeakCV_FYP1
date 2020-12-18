import React, { useState, useEffect , useRef} from "react";
import s1 from "./audios/1.ogg";
import s2 from "./audios/2.ogg";
import s3 from "./audios/3.ogg";
import s4 from "./audios/4.ogg";
import s5 from "./audios/5.ogg";
import s6 from "./audios/6.ogg";
import s7 from "./audios/7.ogg";
import s8 from "./audios/8.ogg";
import { ReactMic } from "react-mic";
import _ from "lodash";
const useMultiAudio = (urls) => {
	const [sources] = useState(
		urls.map((url) => {
			return {
				url,
				audio: new Audio(url),
			};
		})
	);

	const [players, setPlayers] = useState(
		urls.map((url) => {
			return {
				url,
				playing: false,
			};
		})
	);

	const toggle = (targetIndex) => () => {
		const newPlayers = [...players];
		const currentIndex = players.findIndex((p) => p.playing === true);
		if (currentIndex !== -1 && currentIndex !== targetIndex) {
			newPlayers[currentIndex].playing = false;
			newPlayers[targetIndex].playing = true;
		} else if (currentIndex !== -1) {
			newPlayers[targetIndex].playing = false;
		} else {
			newPlayers[targetIndex].playing = true;
		}
		setPlayers(newPlayers);
	};

	useEffect(() => {
		sources.forEach((source, i) => {
			players[i].playing ? source.audio.play() : source.audio.pause();
		});
	}, [sources, players]);

	useEffect(() => {
		sources.forEach((source, i) => {
			source.audio.addEventListener("ended", () => {
				const newPlayers = [...players];
				newPlayers[i].playing = false;
				setPlayers(newPlayers);
			});
		});
		return () => {
			sources.forEach((source, i) => {
				source.audio.removeEventListener("ended", () => {
					const newPlayers = [...players];
					newPlayers[i].playing = false;
					setPlayers(newPlayers);
				});
			});
		};
	}, []);

	return [players, toggle];
};

const MultiPlayer = (props) => {
	const [players, toggle] = useMultiAudio(props.urls);
	const activeUrl = props.activeUrl;
	const [activePlayer, setActivePlayer] = useState();
	const [activeIndex, setActiveIndex] = useState();
	useEffect(() => {
		const x = _.find(players, { url: activeUrl });
		const index = _.findIndex(players, { url: activeUrl });
		setActivePlayer(x);
		setActiveIndex(index);
		console.log("x", x);
	}, [activeUrl]);

	useEffect(() => {
		_.find(players, { url: activeUrl });
		console.log("players", players);
	}, []);

	return (
		<div>
			{activePlayer && (
				<Player
					key={activeIndex}
					player={activePlayer}
					toggle={toggle(activeIndex)}
				/>
			)}
		</div>
	);
};

const Player = ({ player, toggle }) => (
	<div>
		<span
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<button
				style={{ height: 70, width: 200, fontSize: 20 }}
				onClick={toggle}
			>
				{player.playing ? "Pause" : " Play  سوال سنے"}
			</button>
		</span>
	</div>
);

const App = () => {
	const downloadButtonRef = useRef()
	const [record, setRecord] = useState(false);
	const [activeQuestion, setActiveQuestion] = useState();
	const [activeAudio, setActiveAudio] = useState(s1);
	const [questions, setQuestions] = useState([
		{ id: 1, text: "آپ کا نام کیا ہے ؟", audio: s8 },
		{ id: 2, text: "آپ کی عمر کتنی ہے ؟" , audio: s7 },
		{ id: 3, text: "آپ کا مستقل پتہ کیا ہے ؟", audio: s6 },
		{ id: 4, text: "آپ کا فون نمبر کیا ہے ؟", audio: s5 },
		{ id: 5, text: "آپ کی تعلیم کہاں تک ہے ؟", audio: s4 },
		{ id: 6, text: "آپ نے اپنی تعلیم کب مکمل کی ؟", audio: s3 },
		{ id: 7, text: "آپ کا پیشہ کیا ہے ؟", audio: s2 },
		{ id: 8, text: "آپ کا تجربہ کتنا ہے ؟", audio: s1 },
	]);
	const [recordedAudioUrl, setRecordedAudioUrl] = useState();
	useEffect(() => {
		try {
			const x = _.find(questions, { id: activeQuestion });
			setActiveAudio(x.audio);
		} catch (error) {}
	}, [activeQuestion]);

	useEffect(() => {
		console.log("active audio is", activeAudio);
	}, [activeAudio]);

	const startRecording = () => {
		setRecord(true);
	};

	const stopRecording = () => {
		setRecord(false);
	};

	const onData = (recordedBlob) => {
		console.log("chunk of real-time data is: ", recordedBlob);
	};
	useEffect(()=>{
		
		if (downloadButtonRef){
			if (recordedAudioUrl)
			downloadButtonRef.current?.click()
		}

	},[recordedAudioUrl])
	const onStop = (recordedBlob) => {
		console.log("recordedBlob is: ", recordedBlob);
		setRecordedAudioUrl(recordedBlob.blobURL);
		// setActiveAudio(recordedBlob)
	};
	return (
		<div>
			<div
				style={{
					display: "flex",
					backgroundColor: "#4C749C",
					height: 100,
					justifyContent: "space-between",
				}}
			>
				<p style={{ color: "white", fontSize: 40, margin: 20 }}>
					SpeakCV
				</p>
			</div>

			<div
				style={{
					padding: 20,
					display: "flex",
					height: 200,
					width: 400,
					flexDirection: "column",
				}}
			>
				<h2>سوالات</h2>
				<ul>
					{questions.map((item) => (
						<li
							style={{
								color:
									activeQuestion == item.id
										? "white"
										: "black",
								backgroundColor:
									activeQuestion == item.id
										? "grey"
										: "white",
							}}
							onClick={() => {
								setActiveQuestion(item.id);
							}}
						>
							{item.text}
						</li>
					))}
				</ul>
			</div>

			<span
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<MultiPlayer
					activeUrl={activeAudio}
					urls={[s1, s2, s3, s4, s5, s6, s7, s8]}
				/>
				{!record && (
					<button
						style={{
							height: 70,
							width: 200,
							marginLeft: 20,
							fontSize: 20,
						}}
						onClick={startRecording}
					>
						Answer جواب دیں
					</button>
				)}

				{record && (
					<button
						style={{
							height: 70,
							width: 200,
							marginLeft: 20,
							fontSize: 20,
						}}
						onClick={stopRecording}
						type="button"
					>
						Stop روکے
					</button>
				)}
{
						<a
							ref = {downloadButtonRef}
							href={`${recordedAudioUrl}`}
							title="recordedAudio"
							download="recordedAudio"
						>
						</a> }
						
				{ /*recordedAudioUrl && (
				
				
				<div>
						<button
							style={{
								height: 70,
								width: 200,
								marginLeft: 20,
								fontSize: 20,
							}}
							onClick={()=>{

								downloadButtonRef.current.click()
							}}
							type="button"
						>
						Download
						</button>
						<a
							ref = {downloadButtonRef}
							href={`${recordedAudioUrl}`}
							title="recordedAudio"
							download="recordedAudio"
						>
						</a>
						</div>
						
						)*/}
				
			</span>

			<div
				style={{
					display: "flex",
					margin: 20,
				}}
			>
				<ReactMic
					record={record}
					className="sound-wave"
					onStop={onStop}
					mimeType="audio/wav"
					onData={onData}
					strokeColor="white"
					backgroundColor="#4C749C"
				/>
			</div>
		</div>
	);
};
export default App;
