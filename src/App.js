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
	HCMC: {
		url: "https://lesrivesexperience.com/wp-content/uploads/2018/11/sunset-on-saigon-river.jpg",
	},
	Venice: {
		url: "https://cdn.yeudulich.com/media/cms/9f/7b/7bc9-aa4e-45d3-8f17-31f4d8f283c2.jpg",
	},
	Munich: {
		url: "https://cdn.yeudulich.com/media/cms/9f/7b/7bc9-aa4e-45d3-8f17-31f4d8f283c2.jpg",
	},
	Budapest: {
		url: "https://cdn.yeudulich.com/media/cms/9f/7b/7bc9-aa4e-45d3-8f17-31f4d8f283c2.jpg",
	},
};

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			weatherResult: null,
		};
	}
	getCurrentWeather = async (lon, lat) => {
		let apiKey = process.env.REACT_APP_APIKEY;
		const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
		console.log(url);
		let data = await fetch(url);
		let result = await data.json();
		this.setState({ weatherResult: result });
	};

	getLocation = () => {
		navigator.geolocation.getCurrentPosition((post) => {
			this.getCurrentWeather(post.coords.longitude, post.coords.latitude);
		});
	};

	componentDidMount() {
		this.getLocation();
	}
	render() {
		if (this.state.weatherResult == null) {
			return (
				<div className="sweet-loading">
					<ClipLoader css={override} size={150} color={"#123abc"} loading={this.state.loading} />
				</div>
			);
		}
		return (
			<div className="fullscreen">
				<div className="container">
					<h2 className="title">
						<FontAwesomeIcon icon={faCloudSunRain} />
						WEATHER FORECAST
					</h2>
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
								<h3 className="col-12 card-text">Temperature: {this.state.weatherResult.main.temp}°C</h3>
								<h3 className="col-12 desc-text">
									<img src={`https://openweathermap.org/img/wn/${this.state.weatherResult.weather[0].icon}@2x.png`} />
									{this.state.weatherResult.weather[0].description.toUpperCase()}
								</h3>
							</div>
						</div>
					</div>
					<Button variant="outline-info" active>
						HCMC
					</Button>
					<Button variant="outline-info">Venice</Button>
					<Button variant="outline-info">Munich</Button>
					<Button variant="outline-info">Budapest</Button>
				</div>
			</div>
		);
	}
}
