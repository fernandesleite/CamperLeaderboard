import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

const Header = () => {
	return (
			<thead>
				<tr>
					<th>#</th>
					<th>Camper Name</th>
					<th>Points in past 30 days</th>
					<th>All time points</th>
				</tr>
			</thead>
		)
}

const Camper = (props) => {
	return (
			<tbody>
				<tr>
					<td>{props.index}</td>
					<td className="camper">
						<a href={"https://www.freecodecamp.com/"+props.username}>
							<img src={props.img} className="avatar"/>
							<span>{props.username}</span>
						</a>
						</td>
					<td>{props.recent}</td>
					<td>{props.alltime}</td>
				</tr>
			</tbody>
	);
}
class Data extends React.Component{
	constructor(){
		super();
		this.state = {users: []}
	}
	componentDidMount(){
		$.ajax({
			url:'https://fcctop100.herokuapp.com/api/fccusers/top/recent',
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({users: data});
			}.bind(this)
		})
	}
	render(){
		return <Leaderboard users={this.state.users}></Leaderboard>
	}
}
class Leaderboard extends React.Component {
	eachCamper(camper, i){
		return(<Camper key={i} index={i + 1} username={camper.username} 
			recent={camper.recent} alltime={camper.alltime} img={camper.img}/>)
	}
	render(){
		return (
			<table>
				<Header/>
				{this.props.users.map(this.eachCamper)}
			</table>
			)
	}
}


ReactDOM.render(<Data/>, document.getElementById('container'));