import React, { Component } from 'react';
import {addClass, deleteClass, editClass, getClasses} from "../../api/gym";
import Table from "react-bootstrap/es/Table";
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
          <br/>
        <div className="add-class">
          <input className="classNameField" type='text' id='classNameField' placeholder='Class name...'/>

            <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                    <div className="login100-form-bgbtn"></div>
                    <button className="addBtn" id='addBtn' onClick={this.addClass}> ADD </button>
                </div>
            </div>
        </div>
          <br/>
          <div className="responsive-table center">
            <Table responsive className="schedule-table">
                <thead>
                <tr className="table-header" style={{backgroundColor: '#404040'}}>
                <th>ID</th>
                <th>Class Name</th>
                <th >Available Actions</th>
            </tr>
                </thead>
                <tbody id='tableClasses'>
          { classes && classes.map((elem) =>
              {
                return(<tr key={'tr' + elem.Id}>
                          <td className="fuck-this" id={'id' + elem.Id} key={'id' + elem.Id}>
                              {elem.Id}
                          </td>
                          <td className="fuck-this" id={'name' + elem.Id} key={'name' + elem.Id}>
                              {elem.Name}
                          </td>

                          <td className="fuck-this" key={'editBtn' + 'deleteBtn' + elem.Id}>
                              <input id={'editBtn' + elem.Id} className='editBtn' type='button' value='Edit' onClick={this.editClass}/>
                              <input id={'deleteBtn' + elem.Id} className='deleteBtn' type='button' value='Delete' onClick={this.deleteClass}/>
                          </td>
                        </tr>)
              })
          }
            </tbody>
            </Table>
          </div>
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
        window.scrollTo(0, 0);
        this.getFromDB();
        document.getElementById('addBtn').addEventListener('click', this.addClass, false);
    }
}


export default Class;