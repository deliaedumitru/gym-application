import React, { Component } from 'react';
import logo from '../images/logo.svg';
import 'whatwg-fetch';

class Class extends Component {

  constructor(props) {
    super(props);
    this.state = {user: ""}
  }

  render() {
    return (
      <div className="classretrieve">
	  <p><input type="text" id="classNameField" placeholder="Class name..."/>
        <input type="submit" id="addBtn" value="Add"/></p>
        <table>
          <tbody id="tableClasses">
          <tr>
            <th>ID</th>
            <th>Class Name</th>
            <th >Available Actions</th>
          </tr>
          </tbody>
        </table>
        </div>
    );
  }
  
  refresh() {
	  console.log("finally here");
	  document.getElementById("tableClasses").innerHTML = '';
	  let tr = document.createElement('tr');
	  let th1 = document.createElement('th');
	  th1.innerHTML = 'ID';
	  let th2 = document.createElement('th');
	  th2.innerHTML = 'Class Name';
	  let th3 = document.createElement('th');
	  th3.innerHTML = 'Available Actions';
	  document.getElementById('tableClasses').appendChild(tr);
	  this.getFromDB();
  }
  
  addClass() {
	  let id = 0;
	  var name = document.getElementById('classNameField').value;
	  let dis = this;
    fetch('http://localhost:63288/api/Class', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
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

  editClass() {
    console.log("sa-mi bag pula, Iulia");
	  let id = document.getElementById('idclasa').value;
	  let name = document.getElementById('classNameField').value;
    fetch('http://localhost:63288/api/Class', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
		name: name,
      })
    }).then((response) => response.json()).then((responseJson) => { 
      console.log(responseJson);
    }).catch((error) => { 
      console.error(error); 
    });
  }

  deleteClass() {
	  console.log("jhsbfkdjsldfjslnd48655")
    //let id = document.getElementById('idclasa').innerHTML;
    let id = document.getElementById('idclasa').value;
    fetch('http://localhost:63288/api/Class/{'+encodeURIComponent(id)+'}', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
      }
    }).then((response) => response.json()).then((responseJson) => { 
      console.log(responseJson);
    }).catch((error) => { 
      console.error(error); 
    });
  }

  getFromDB() {
	  let dis = this;
	  console.log("hdvsajhda12132115")
    let username = document.getElementById('classretrieve');
    let tbody = document.getElementById('tableClasses');
    fetch('http://localhost:63288/api/Class', {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        "Content-Type": "application/json",
      }
    }).then((response) => response.json()).then((responseJson) => { 
      console.log(responseJson);
      Array.prototype.forEach.call(responseJson, function(datas){
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("input");
        let td4 = document.createElement("input");
        td.innerHTML = datas.Id;
        td2.innerHTML = datas.Name;
        td3.setAttribute('id', 'editBtn' + datas.Id);
        td3.setAttribute('type', 'submit');
        td3.value = 'Edit';
        td3.className = "editBtn";
        //td3.addEventListener('click', dis.editClass, false);
        td3.onClick = dis.editClass;
        td4.className = 'deleteBtn';
        td4.setAttribute('type', 'submit');
        td4.setAttribute('id', 'deleteBtn' + datas.Id);
        //td4.addEventListener('click', dis.deleteRow, false);
        td4.onClick = dis.deleteClass;
        td4.value = 'Delete';
        tr.appendChild(td);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tbody.appendChild(tr);
      })
    }).catch((error) => { 
      console.error(error ); 
      });
  }

  deleteRow(event){
		console.log("bjdbwakfe");
		let clicked = event.target;
		let id = clicked.parent.parent.parentElement[0];
      var d = id.rowIndex;
      document.getElementById('dsTable').deleteRow(d);
   }
  
  componentDidMount() {
	  let dis = this;
    window.addEventListener("load", this.getFromDB);
	  document.getElementById("addBtn").addEventListener("click", this.addClass, false); 
    /*let editBtns = document.getElementsByClassName("editBtn");
    var editLink = document.querySelectorAll('.editBtn');
    for (var i = 0; i < editLink.length; i++) {
    Array.from(editLink).forEach(link => {
      link.addEventListener('click', 
        console.log('fuckofffff')
      );
    });
  }*/
	}
}


export default Class;
