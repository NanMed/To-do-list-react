import React, { Component } from 'react';
import axios from 'axios'; 
import Todo from './Todo';


class TodoList extends Component {
    state = {
        id: '',
        description: '',
        tasks: []
    }

    getTodo = () => {
        axios.get('/tasks/all')
            .then(res => {
                this.setState({ tasks: res.data.data });
            })
            .catch(err => console.log(err));
    }

    addTodo = (description) => {
        return axios.post('/tasks/add', {
            description: description
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err));
    }

    markAsDone = (id) => {
        axios.put(`/tasks/${id}/done`, {
            status: 'done'
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err));
    }

    deleteTask = (id) => {
        axios.delete(`/tasks/${id}/delete`)
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
    }

    componentDidMount(){
        this.getTodo();
    }

    onUpdate = (value, e) => {
        e.preventDefault()
        this.markAsDone(value)

        let data = [...this.state.tasks]
        data.filter(function(task) {
            if(task.id === value){
                task.status = 'done'
            }
            return true
        })
        this.setState({ tasks: [...data]})
    }

    onDelete = (value, e) => {
        e.preventDefault()
        this.deleteTask(value)

        let data = [...this.state.tasks]
        data.filter(function(task, index) {
            if(task.id === value){
                data.splice(index, 1)
            }
            return true
        })
        this.setState({ tasks: [...data]})
    }

    onSubmit = e => {
        e.preventDefault()
        this.addTodo(this.state.description).then(() => {
            this.getTodo()
        })
        this.setState({
            description: ''
        })
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){    
        return (
            <>
            <div>
                <h1>TO DO LIST</h1>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <input
                            placeholder="Agregar tarea..."
                            type="text"
                            name="description"
                            value={this.state.description || ''}
                            onChange={this.onChange.bind(this)}
                            />
                    </div>
                    <button type="submit" onClick={this.onSubmit.bind(this)}>
                        Agregar
                    </button>
                </form>
            </div>
            <br></br>
            <div>
                <table border="1">
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Task</th>
                        <th></th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tasks.map((todo, i) => {
                            return (
                                <tr key={i} style={{backgroundColor: todo.status === 'pending' ? 'white' : 'grey'}}>
                                    <Todo id={i} todo={todo} />
                                    <td>
                                        <button onClick={this.onUpdate.bind(this, todo.id)}>
                                            Done
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={this.onDelete.bind(this, todo.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            </>
        );
    }
}

export default TodoList;