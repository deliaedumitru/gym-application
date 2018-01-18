import React, {Component} from 'react';
import {addClass, deleteClass, editClass, getClasses} from "../../api/gym";
import 'whatwg-fetch';


class Class extends Component {

    constructor(props) {
        super(props);
        this.state = {user: '', classes: null};
        this.getFromDB = this.getFromDB.bind(this);
    }

    render() {
        const {classes} = this.state;
        return (
            <div className='classretrieve'>
                <input type='text' id='classNameField' placeholder='Class name...'/>
                <input type='submit' id='addBtn' value='Add'/>
                <table>
                    <tbody id='tableClasses'>
                    <tr>
                        <th>ID</th>
                        <th>Class Name</th>
                        <th>Available Actions</th>
                    </tr>

                    {classes && classes.map((elem) => {
                        return (<tr key={'tr' + elem.Id}>
                            <td id={'id' + elem.Id} key={'id' + elem.Id}>{elem.Id}</td>
                            <td id={'name' + elem.Id} key={'name' + elem.Id}>{elem.Name}</td>
                            <td key={'editBtn' + elem.Id}><input id={'editBtn' + elem.Id} className='editBtn'
                                                                 type='button' value='Edit' onClick={this.editClass}/>
                            </td>
                            <td key={'deleteBtn' + elem.Id}><input id={'deleteBtn' + elem.Id} className='deleteBtn'
                                                                   type='button' value='Delete'
                                                                   onClick={this.deleteClass}/></td>
                        </tr>)
                    })
                    }
                    </tbody>
                </table>
            </div>
        );
    }

    addClass() {
        let id = 0;
        let name = document.getElementById('classNameField').value;

        // api call
        addClass(id, name, () => window.location.reload());
    }

    editClass(event) {
        console.log('sa-mi bag pula, Iulia');
        alert(event.target.id);
        let id = parseInt(event.target.parentElement.parentElement.childNodes[0].innerHTML);
        let name = document.getElementById('classNameField').value;
        console.log(id);
        console.log(name);
        editClass(id, name, () => window.location.reload());
    }

    deleteClass(event) {
        console.log('jhsbfkdjsldfjslnd48655');
        let id = event.target.parentElement.parentElement.childNodes[0].innerHTML;
        deleteClass(id, () => window.location.reload());
    }

    getFromDB() {
        let username = document.getElementById('classretrieve');
        let tbody = document.getElementById('tableClasses');

        getClasses((resp) =>  this.setState({classes: resp}));
    }

    componentDidMount() {
        //window.addEventListener('DOMContentLoaded', this.getFromDB);
        this.getFromDB();
        document.getElementById('addBtn').addEventListener('click', this.addClass, false);
    }
}


export default Class;