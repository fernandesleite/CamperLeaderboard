import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

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
					<tr>
						<th>#</th>
						<th>Camper Name</th>
						<th id='recent' className={this.state.selected1} onClick={this.changeSort}>Points in past 30 days</th>
						<th id='alltime' className={this.state.selected2} onClick={this.changeSort}>All time points</th>
					</tr>
				</thead>
			);
	};
};

const Camper = (props) => {
	return (
			<tbody>
				<tr>
					<td className="num">{props.index}</td>
					<td className="camper">
						<a href={"https://www.freecodecamp.com/"+props.username}>
							<img src={props.img} className="avatar"/>
							<span>{props.username}</span>
						</a>
						</td>
					<td className="num">{props.recent}</td>
					<td className="num">{props.alltime}</td>
				</tr>
			</tbody>
	);
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
		console.log('ALLTIME FUNCTION')
	};
	sortingRecent(){
		this.setState({sortAllTime: false, URL: 'https://fcctop100.herokuapp.com/api/fccusers/top/recent'}, this.ajaxRequest);
		console.log('RECENT FUNCTION')
		this.componentDidMount();
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
			<table>
				<Header onClickRecent={this.props.onClickRecent} onClickAllTime={this.props.onClickAllTime}/>
				{this.props.users.map(this.eachCamper)}
			</table>
			);
	}
};


ReactDOM.render(<Data/>, document.getElementById('container'));