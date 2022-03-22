import  React,{Component} from 'react';
import {variables} from './Variables.js';

export class Member extends Component{

    constructor(props){
        super(props);

        this.state={
            groups:[],
            members:[],
            modalTitle:"",
            id:0,
            username:"",
            group:"",
            date_joined:""
        }
    }

    refreshList(){

        fetch(variables.API_URL+'member')
        .then(response=>response.json())
        .then(data=>{
            this.setState({members:data});
        });

        fetch(variables.API_URL+'group')
        .then(response=>response.json())
        .then(data=>{
            this.setState({groups:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    changeUserName =(e)=>{
        this.setState({username:e.target.value});
    }
    changeGroup =(e)=>{
        this.setState({group:e.target.value});
    }
    changeDateOfJoining =(e)=>{
        this.setState({date_joined:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Add Member",
            id:0,
            username:"",
            group:"",
            date_joined:""
        });
    }
    editClick(emp){
        this.setState({
            modalTitle:"Edit Member",
            id:emp.id,
            username:emp.username,
            group:emp.group,
            date_joined:emp.date_joined
        });
    }

    createClick(){
        fetch(variables.API_URL+'member',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                username:this.state.username,
                group:this.state.group,
                date_joined:this.state.date_joined
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }


    updateClick(){
        fetch(variables.API_URL+'member',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:this.state.id,
                username:this.state.username,
                group:this.state.group,
                date_joined:this.state.date_joined
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'member/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }

    render(){
        const {
            groups,
            members,
            modalTitle,
            id,
            username,
            group,
            date_joined
        }=this.state;

        return(
<div>

    <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Add Member
    </button>
    <table className="table table-striped" border="2px">
    <thead>
    <tr>
        <th>
            Id
        </th>
        <th>
            Name
        </th>
        <th>
            Group
        </th>
        <th>
            Created
        </th>
        <th>
            Options
        </th>
    </tr>
    </thead>
    <tbody>
        {members.map(emp=>
            <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.username}</td>
                <td>{emp.group}</td>
                <td>{emp.date_joined}</td>
                <td>
                <button type="button"
                className="btn btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.editClick(emp)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>

                <button type="button"
                className="btn btn-light mr-1"
                onClick={()=>this.deleteClick(emp.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>

                </td>
            </tr>
            )}
    </tbody>
    </table>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
<div className="modal-dialog modal-lg modal-dialog-centered">
<div className="modal-content">
   <div className="modal-header">
       <h5 className="modal-title">{modalTitle}</h5>
       <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
       </button>
   </div>

   <div className="modal-body">
    <div className="d-flex flex-row bd-highlight mb-3">

     <div className="p-2 w-50 bd-highlight">

        <div className="input-group mb-3">
            <span className="input-group-text">Name</span>
            <input type="text" className="form-control"
            value={username}
            onChange={this.changeUserName}/>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Group</span>
            <select className="form-select"
            onChange={this.changeGroup}
            value={group}>
                {groups.map(dep=><option key={dep.group_id}>
                    {dep.group_name}
                </option>)}
            </select>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Created</span>
            <input type="date" className="form-control"
            value={date_joined}
            onChange={this.changeDateOfJoining}/>
        </div>

     </div>
    </div>

    {id === 0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Create</button>
        :null}

        {id !== 0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.updateClick()}
        >Update</button>
        :null}
   </div>

</div>
</div>
</div>


</div>
        )
    }
}

export default Member;