import React, {Component} from 'react';
import {addClass, deleteClass, editClass, getClasses} from "../../api/gym";
import Table from "react-bootstrap/es/Table";
import {CLASSES, SERVER} from "../../api/gym";
import 'whatwg-fetch';
import './style.css'

class Class extends Component {

    constructor(props) {
        super(props);
        this.state = {user: '', classes: null};
        this.getFromDB = this.getFromDB.bind(this);
        this.addClass = this.addClass.bind(this);
        this.editClass = this.editClass.bind(this);
        this.deleteClass = this.deleteClass.bind(this);
        this.editClass = this.editClass.bind(this);
    }

    render() {
        const {classes} = this.state;
        return (
            <div style={{display: 'flex', flexDirection: 'row', marginTop: '10%'}}>
                <div style={{
                    width: '30%',
                    marginLeft: 10,
                    marginRight: 10,
                    backgroundColor: 'rgba(250, 250, 250, 0.7)',
                    borderRadius: 10,
                    height: '100%',
                }}>
                    <div className="wrapInput" style={{color: '#535278', textAlign: 'center'}}>
                        Class Name:
                        <input className="input100" style={{color: '#535278'}} type='text' id='classNameField'/>
                    </div>
                    <br/>
                    <button className='add-btn' onClick={this.addClass}> ADD</button>
                </div>
                <div className="responsive-table center">
                    <Table responsive className="schedule-table">
                        <thead>
                        <tr className="table-header" style={{backgroundColor: '#404040'}}>
                            <th>Class Name</th>
                        </tr>
                        </thead>
                        <tbody id='tableClasses'>
                        {classes && classes.map((elem) => {
                            return (<tr key={'tr' + elem.Id}>
                                <td key={elem.Id} style={{display: 'flex', width: '100%',marginTop:10}}>
                                    <Row
                                        elem={elem}
                                        deleteClass={this.deleteClass}
                                        editClass={this.editClass}
                                    />
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
        addClass(id, name, () => this.getFromDB());
    }

    editClass(id, name) {
        editClass(id, name, () => this.getFromDB());
    }

    deleteClass(id) {
        console.log('jhsbfkdjsldfjslnd48655');
        deleteClass(id, () => this.getFromDB());
    }

    getFromDB() {
        let username = document.getElementById('classretrieve');
        let tbody = document.getElementById('tableClasses');

        getClasses((resp) => this.setState({classes: resp}));
    }

    componentDidMount() {
        //window.addEventListener('DOMContentLoaded', this.getFromDB);
        window.scrollTo(0, 0);
        this.getFromDB();
    }
}


export default Class;


class Row extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            nameInput: props.elem.Name,
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            nameInput: value
        });
    }

    render() {
        const {elem, editClass, deleteClass} = this.props;
        const {nameInput} = this.state;

        return (
            <div style={{display: 'flex', width: '100%'}}>
                <input key={elem.Id} value={nameInput} type="text"
                       style={{
                           width: '100%',
                           fontSize: 'x-large',
                           background: 'transparent',
                           border: 'none',
                           textAlign: 'center'
                       }}
                       onChange={this.handleInputChange}/>
                <div style={{
                    width: '40%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <input style={{
                        marginRight: 10,
                        width: '40%'
                    }}
                           className='delete-btn'
                           type='button' value='Edit'
                           onClick={() => editClass(elem.Id, nameInput)}/>
                    <input style={{
                        width: '40%',
                    }}
                           className='delete-btn'
                           type='button'
                           value='Delete'
                           onClick={() => deleteClass(elem.Id)}/>
                </div>
            </div>
        )
    }
}