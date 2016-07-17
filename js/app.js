import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

const Title = () =>{
	return (
		<div className="title">
			<img className="fcclogo" src="./imgs/fcc-logo.png"/>
			<h1>LEADERBOARD</h1>
		</div>
	);
};
const Footer = () =>{
	return (
		<div className="footer">
			<span>by Bruno Leite (NegativeEdge)</span>
		</div>
	);
};
class Header extends React.Component{
	constructor(props){
		super(props);
		this.state = {selected1: 'classOn', selected2: 'classOff'}
		this.changeSort = this.changeSort.bind(this)
	}
	changeSort(e){
		let selected = e.target.id;
		if (selected == 'recent'){
			this.props.onClickRecent();
			this.state.selected1 = 'classOn';
			this.state.selected2 = 'classOff';
		}
		else{
			this.props.onClickAllTime();
			this.state.selected1 = 'classOff';
			this.state.selected2 = 'classOn';
		}
	}
	render(){
		return (
				<thead>
					<tr className="headerRow">
						<th>#</th>
						<th className="camperName">Camper Name</th>
						<th id='recent' className={this.state.selected1} onClick={this.changeSort}>Points in past 30 days</th>
						<th id='alltime' className={this.state.selected2} onClick={this.changeSort}>All time points</th>
					</tr>
				</thead>
		);
	};
};

class Camper extends React.Component {

	Anchor(){
		window.location.href = "https://www.freecodecamp.com/"+this.props.username;
	}
	render(){
		return (
				<tbody>
					<tr className="camperRow" onClick={this.Anchor.bind(this)}>
						<td className="num">{this.props.index}</td>
						<td className="camper">
							<img src={this.props.img} className="avatar"/>
							<span>{this.props.username}</span>
						</td>
						<td className="num">{this.props.recent}</td>
						<td className="num">{this.props.alltime}</td>
					</tr>
				</tbody>
		);
	}
};
class Data extends React.Component{
	constructor(){
		super();
		this.state = {
			users: [],
			sortAllTime: false,
			URL: 'https://fcctop100.herokuapp.com/api/fccusers/top/recent'
		};
	};
	sortingAllTime(){
		this.setState({sortAllTime: true, URL: 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime'}, this.ajaxRequest);
	};
	sortingRecent(){
		this.setState({sortAllTime: false, URL: 'https://fcctop100.herokuapp.com/api/fccusers/top/recent'}, this.ajaxRequest);
	};
	componentDidMount(){
		this.ajaxRequest();
	};
	ajaxRequest(){
		$.ajax({
			url:this.state.URL,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({users: data});
			}.bind(this),
			error: function(xhr, textStatus, errorThrown){
				console.log("Request Failed")
			}
		});
	}
	render(){
		return <Leaderboard onClickRecent={this.sortingRecent.bind(this)} onClickAllTime={this.sortingAllTime.bind(this)} users={this.state.users}></Leaderboard>;
	}
};
class Leaderboard extends React.Component {
	eachCamper(camper, i){
		return(<Camper key={i} index={i + 1} username={camper.username} 
			recent={camper.recent} alltime={camper.alltime} img={camper.img}/>);
	}
	render(){
		return (
			<div>
				<Title/>
					<table className="table">
						<Header onClickRecent={this.props.onClickRecent} onClickAllTime={this.props.onClickAllTime}/>
						{this.props.users.map(this.eachCamper)}
					</table>
				<Footer/>
			</div>
		);
	}
};

ReactDOM.render(<Data/>, document.getElementById('container'));