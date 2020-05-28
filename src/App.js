import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudSunRain } from "@fortawesome/free-solid-svg-icons";

const override = css`
	display: block;
	margin: 0 auto;
	border-color: red;
`;

const imgURL = {
	"Ho Chi Minh City": {
		url: "https://lesrivesexperience.com/wp-content/uploads/2018/11/sunset-on-saigon-river.jpg",
	},
	Venice: {
		url: "https://www.fodors.com/wp-content/uploads/2019/11/HERO_Venice__FloatingCityBuilt_iStock-986940360.jpg",
	},
	Munich: {
		url: "https://www.citybaseapartments.com/blog/wp-content/uploads/2019/11/Munich-centre.jpg",
	},
	London: {
		url: "https://cdn.contexttravel.com/image/upload/c_fill,q_60,w_2600/v1555943130/production/city/hero_image_11_1555943130.jpg",
	},
};

let cityName = "Ho Chi Minh City";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			weatherResult: null,
		};
	}
	getCurrentWeather = async (cityName) => {
		try {
			let apiKey = process.env.REACT_APP_APIKEY;
			const url2 = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
			// const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
			let data = await fetch(url2);
			if (data.status !== 200) {
				throw new Error("data is wrong");
			}

			let result = await data.json();
			console.log(result);
			this.setState({ weatherResult: result, image: imgURL[cityName].url });
		} catch (err) {
			alert(err.message);
		}
	};

	// getLocation = () => {
	// 	navigator.geolocation.getCurrentPosition((post) => {
	// 		this.getCurrentWeather(post.coords.longitude, post.coords.latitude);
	// 	});
	// };

	changeCity = (cityName) => {
		this.getCurrentWeather(cityName);
		console.log(this.image);
	};

	componentDidMount() {
		// this.getLocation();
		this.getCurrentWeather(cityName);
	}
	render() {
		if (this.state.weatherResult == null) {
			return (
				<div class="preload d-flex justify-content-center align-items-center">
					<div className="sweet-loading">
						<ClipLoader css={override} size={150} color={"#123abc"} loading={this.state.loading} />
					</div>
				</div>
			);
		}
		return (
			<div className="fullscreen" style={{ backgroundImage: `url(${this.state.image})` }}>
				<div className="container">
					<div class="title-wrapper">
						<h2 className="title">
							<FontAwesomeIcon icon={faCloudSunRain} />
							WEATHER FORECAST
						</h2>
					</div>
					{/* <Card style={{ width: "18rem" }}>
						<Card.Img variant="top" src="holder.js/100px180" />
						<Card.Body>
							<Card.Title>{this.state.weatherResult.name}</Card.Title>
							<Card.Text>{this.state.weatherResult.weather[0].description}</Card.Text>
							<h5>Temperature: {this.state.weatherResult.main.temp}°C</h5>
							<Button variant="primary">Go somewhere</Button>
						</Card.Body>
					</Card> */}
					<div className="container-fluid text-white my-auto weathercard hcm">
						<div className="container mx-auto my-4 py-4">
							<div className="row justify-content-center text-center">
								{/* <h1 className="col-12 display-4 my-2 py-3 text-success">HIDE IN YOUR HOUSE!</h1> */}
								<h2 className="col-12 card-text">{this.state.weatherResult.name}</h2>
								<h3 className="col-12 card-text green">
									Temperature: {this.state.weatherResult.main.temp}°C | {Math.round(((this.state.weatherResult.main.temp * 9) / 5 + 32) * 100) / 100}°F
								</h3>
								<h3 className="col-12 desc-text">
									<img src={`https://openweathermap.org/img/wn/${this.state.weatherResult.weather[0].icon}@2x.png`} />
									{this.state.weatherResult.weather[0].description.toUpperCase()}
								</h3>
							</div>
						</div>
					</div>
					<Button variant="outline-info" onClick={() => this.changeCity("Ho Chi Minh City")}>
						HCMC
					</Button>
					<Button variant="outline-info" onClick={() => this.changeCity("Venice")}>
						Venice
					</Button>
					<Button variant="outline-info" onClick={() => this.changeCity("Munich")}>
						Munich
					</Button>
					<Button variant="outline-info" onClick={() => this.changeCity("London")}>
						London
					</Button>
				</div>
			</div>
		);
	}
}
