import React, { Component } from 'react';

class Todo extends Component {

    state = {
        id: this.props.id,
        description: this.props.todo.description
    }

    render(){
        return(
            <>
                <td>{this.state.id}</td>
                <td>{this.state.description}</td>
            </>
        )
    }
}

export default Todo;