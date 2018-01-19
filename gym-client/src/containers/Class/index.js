import React, { Component } from 'react';
import logo from '../..//images/logo.svg';
import {CLASSES, SERVER} from "../../api/gym";
import 'whatwg-fetch';
import './style.css';
import Table from "react-bootstrap/es/Table";

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
                    <button className="addBtn" id='addBtn'> ADD </button>
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
    var name = document.getElementById('classNameField').value;
    fetch( SERVER + CLASSES , {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id:id,
        name:name,
      })
    }).then((response) => response.json()).then((responseJson) => { 
      console.log(responseJson);
      window.location.reload();
    }).catch((error) => { 
      console.error(error); 
    });
  }

  editClass(event) {
    console.log('sa-mi bag pula, Iulia');
    alert(event.target.id);
    let id = parseInt(event.target.parentElement.parentElement.childNodes[0].innerHTML);
    let name = document.getElementById('classNameField').value;
    console.log(id);
    console.log(name);
    fetch( SERVER + CLASSES + '/' + encodeURIComponent(id), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        name: name,
      })
    }).then((response) => response.json()).then((responseJson) => { 
      console.log(responseJson);
      window.location.reload();
    }).catch((error) => { 
      console.error(error); 
    });
  }

  deleteClass(event) {
    console.log('jhsbfkdjsldfjslnd48655');
    let id = event.target.parentElement.parentElement.childNodes[0].innerHTML;
    fetch( SERVER + CLASSES +'/' + encodeURIComponent(id), {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => response.json()).then((responseJson) => { 
      console.log(responseJson);
      window.location.reload();
    }).catch((error) => { 
      console.error(error); 
    });
  }

  getFromDB() {
    let username = document.getElementById('classretrieve');
    let tbody = document.getElementById('tableClasses');
    fetch( SERVER + CLASSES, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => response.json()).then((responseJson) => { 
      console.log(responseJson);
      this.setState(() => ({classes: responseJson}));
    }).catch((error) => { 
      console.error(error ); 
    });
  }

  componentDidMount() {
    //window.addEventListener('DOMContentLoaded', this.getFromDB);
	this.getFromDB();
    document.getElementById('addBtn').addEventListener('click', this.addClass, false);
  }
}


export default Class;