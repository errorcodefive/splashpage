var contentNode = document.getElementById('contents');

function BookmarksTable(props){
	console.log("Creating bookmarks table");
	console.log(JSON.stringify(props.bookmarks));
	var bookmarkRows = props.bookmarks.map(bookmark=><BookmarkRow
		key={bookmark._id} bookmark={bookmark} />);
	return(
		<table>
			<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Link</th>
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

const BookmarkRow = (props)=>(
	<tr>
		<td>{props.bookmark.id}</td>
		<td>{props.bookmark.name}</td>
		<td><BookmarksLink bookmark={props.bookmark} /></td>
	</tr>
);
class BookmarksList extends React.Component {
	constructor(){
		super();
		this.state={ bookmarks: [] };
		this.createBookmark=this.createBookmark.bind(this);
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
	createBookmark(newBookmark){
		fetch('/api/bookmarks', {
			method: 'POST',
			headers: {'Content-Type': 'application/json' },
			body: JSON.stringify(newBookmark),
		}).then(response=> response.json()
		).then(refresh=>{
			if (response.success){this.loadData()};
		}).catch(err=>{
			alert("Error sending data to server: " + err.message);
		});
	}
	render(){
		return(
			<div>
				<h1>Bookmarks</h1>
				<hr />
				<BookmarksTable bookmarks={this.state.bookmarks} />
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
			<a href={bookmark.link}>{bookmark.name}</a>
		)
	}
}

ReactDOM.render(<BookmarksList />, contentNode);