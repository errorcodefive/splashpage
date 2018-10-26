import React from 'react';
import ReactDOM from 'react-dom';

var contentNode = document.getElementById('bookmarksMain');

function BookmarksTable(props){
	console.log("Creating bookmarks table");
	console.log(JSON.stringify(props.bookmarks));
	var bookmarkRows = props.bookmarks.map(bookmark=><BookmarkRow
		key={bookmark._id} bookmark={bookmark} deleteBookmark={props.deleteBookmark} loadData={props.loadData}/>);
	return(
		<table>
		<thead>
		<tr>
		<th>ID</th>
		<th>Name</th>
		<th>Link</th>
		<th></th>
		<th></th>
		</tr>
		</thead>
		<tbody>{bookmarkRows}</tbody>
		</table>
		);
}

class BookmarkAdd extends React.Component{
	constructor(){
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(e){
		e.preventDefault();
		var form = document.forms.bookmarkAdd;
		this.props.createBookmark({
			name: form.name.value,
			link: form.link.value,
		});
		form.name.value = "";
		form.link.value = "";
	}
	render(){
		return(
			<div>
			<form name="bookmarkAdd" onSubmit={this.handleSubmit}>
			<input type="text" name="name" placeholder="Name" />
			<input type="text" name="link" placeholder="Link" />
			<button>Add</button>
			</form>
			</div>
			);
	}
}

const BookmarkRow = (props)=>{
	return(
		<tr>
		<td>{props.bookmark._id}</td>
		<td>{props.bookmark.name}</td>
		<td><BookmarksLink bookmark={props.bookmark} /></td>
		<td><button onClick={()=>props.deleteBookmark(props.bookmark)}>X</button></td>
		<td><BookmarkUpdateModal bookmark={props.bookmark} loadData={props.loadData}/></td>
		</tr>
		);
};
class BookmarksList extends React.Component {
	constructor(){
		super();
		this.state={ bookmarks: [] };
		this.createBookmark=this.createBookmark.bind(this);
		//TODO: update bookmark
		this.loadData = this.loadData.bind(this);
		this.deleteBookmark = this.deleteBookmark.bind(this);
	}
	deleteBookmark(bookmark){
		console.log("Delete ID: " + bookmark._id);
		if(confirm("Do you want to delete")){
			fetch('/api/bookmarks/'+bookmark._id, {
				method: 'DELETE',
				headers: {'Content-Type': 'application/json' }
			}).then(response=> response.json()
			).then(response=>{
				console.log("HERE:" + JSON.stringify(response));
				this.loadData();
			}).catch(err=>{
				alert("Error sending data to server: " + err.message);
			});
		}
	}
	componentDidMount(){
		this.loadData();
		console.log("componentDidMount");
	}
	loadData(){
		fetch('/api/bookmarks').then(response=>
			response.json()
			).then(data=>{
				console.log("Fetching Bookmarks");
			//console.log("Total number of records: ", data._metadata.total_count);
			console.log(JSON.stringify(data));
			this.setState({ bookmarks: data.data });
		}).catch(err=>{
			console.log(err);
		});
	}
	forceChange(){
		console.log("bookmarks have been force updated");
		this.loadData();
	}
	createBookmark(newBookmark){
		fetch('/api/bookmarks', {
			method: 'POST',
			headers: {'Content-Type': 'application/json' },
			body: JSON.stringify(newBookmark),
		}).then(response=> response.json()
		).then(response=>{
			console.log("HERE:" + JSON.stringify(response));
			this.loadData(response);
		}).catch(err=>{
			alert("Error sending data to server: " + err.message);
		});
	}
	render(){
		return(
			<div>
			<h1>Bookmarks</h1>
			<hr />
			<BookmarksTable bookmarks={this.state.bookmarks} deleteBookmark={this.deleteBookmark} loadData = {this.loadData}/>
			<hr />
			<BookmarkAdd createBookmark={this.createBookmark} />
			</div>
			);
	}
}

class BookmarksLink extends React.Component{
	render(){
		var bookmark =this.props.bookmark;
		return(
			<a href={bookmark.link} target="_blank">{bookmark.name}</a>
			)
	}
}

class BookmarkUpdateForm extends React.Component{
	constructor(props){
		super(props);
		this.state={
			_id: this.props.bookmark._id,
			name: this.props.bookmark.name,
			link: this.props.bookmark.link,
			command: this.props.bookmark.command,
			query_url: this.props.bookmark.query_url
		};

		this.handleSubmit=this.handleSubmit.bind(this);
		this.handleChangeName=this.handleChangeName.bind(this);
		this.handleChangeLink=this.handleChangeLink.bind(this);
		this.handleChangeCommand=this.handleChangeCommand.bind(this);
		this.handleChangeQuery=this.handleChangeQuery.bind(this);
		this.updateBookmark = this.updateBookmark.bind(this);
		this.closingModal = this.closingModal.bind(this);
		this.myOnSubmit = this.myOnSubmit.bind(this);
		this.loadData = this.props.loadData.bind(this);
	}
	closingModal(){
		this.props.closeModal();
	}
	handleChangeName(e){
		this.setState({
			name: e.target.value,
		});
	}
	handleChangeLink(e){
		this.setState({
			link: e.target.value,
		});
	}
	handleChangeCommand(e){
		this.setState({
			command: e.target.value,
		});
	}
	handleChangeQuery(e){
		this.setState({
			query_url: e.target.value,
		});
	}

	handleSubmit(e){
		e.preventDefault();
		var form = document.forms.bookmarkUpdate;

		this.updateBookmark({
			_id: this.props.bookmark._id,
			name: form.name.value,
			link: form.link.value,
			command: form.command.value,
			query_url: form.query_url.value,
		});
	}
	myOnSubmit(e){
		this.handleSubmit(e);
	}
	render(){
		var bookmark = this.props.bookmark;
		return(
			<div>
				Update {bookmark.name}
				<form name="bookmarkUpdate" onSubmit={this.myOnSubmit}>
					<input type="text" name="name" value={this.state.name} onChange={this.handleChangeName}/>
					<input type="text" name="link" value={this.state.link} onChange={this.handleChangeLink}/>
					<input type="text" name="command" value={bookmark.command} placeholder="Command" onChange={this.handleChangeCommand}/>
					<input type="text" name="query_url" value = {bookmark.query_url} placeholder="Query URL" onChange={this.handleChangeQuery}/>
					<button>Update</button>
				</form>
			</div>
		);
	}
	updateBookmark(bmToUpdate){
		this.closingModal();
		fetch('/api/bookmarks/'+bmToUpdate._id, {
			method: 'PUT',
			headers: {'Content-Type': 'application/json' },
			body: JSON.stringify(bmToUpdate),
		}).then(response=>response.json()
		).then(response=>{
			console.log("Received response from bookmark PUT: " + JSON.stringify(response));
		}).then(response=>{
			this.loadData();
		});
	}
	
}

class BookmarkUpdateModal extends React.Component {
	constructor (){
		super();
		this.state={
			showModal: false
		};
		this.handleOpenModal = this.handleOpenModal.bind(this);
		//this.afterOpenModal = this.afterOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
	}
	handleOpenModal(){
		this.setState({showModal: true});
	}
	// afterOpenModal(){
	// 	this.
	// }

	handleCloseModal(){
		this.setState({showModal: false});
	}

	render(){
		var bookmark = this.props.bookmark;
		return(
			//render a bookmark row + an update button
			<div>
				<button onClick={this.handleOpenModal}>Update {bookmark.name}</button>
				<ReactModal	isOpen={this.state.showModal} contentLabel="Test123" onRequstClose={this.closeModal}>
					<button onClick = {this.handleCloseModal}>Close Modal</button>
					<BookmarkUpdateForm bookmark = {bookmark} closeModal={this.handleCloseModal} loadData={this.props.loadData}/>
				</ReactModal>
			</div>
		)
	}	
}
ReactDOM.render(<BookmarksList />, contentNode);

export default BookmarksList