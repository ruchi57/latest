import React, { Component } from 'react';
import './App.css';
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  
} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import * as _ from "lodash";
import FormComponent from './Form';
const axios = require('axios');


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      selectedIndex: 0,
      selectedConnections: "0",
      showForm: false,
      tag: '',
      firstName: '',
      lastName: '',
      email: '',
      dept: '',
      age: '',
      designation: ''
    };
  
  }

  componentDidMount() {
    this.FetchEmployess()
  }

  FetchEmployess = () => {
    let url = "http://localhost:4000/employee";
    fetch(url)
      .then(respone => respone.json())
      .then(data => {
        this.setState({ posts: data });
      })
    this.forceUpdate();
  }


  GetAge = (birthYear) => {
    let age = (2019 - birthYear)
    return age;
  }

  getConnectionIdFromName = (connectionName) => {
    debugger;
    const employee = _.find(this.state.posts, {
      name: connectionName
    });
    return employee.EmpId;
  };

  handleClick = (id) => {
    const employee = _.find(this.state.posts, {
      EmpId: id
    });
    this.setState({ selectedIndex: id })

  };

  handleSelectedConnection = (selectedRow) => {
    let rowsSelected = selectedRow;
    this.setState({ selectedIndex: rowsSelected })
  }

  handleAddClick = (isEditConnection) => {
    debugger;
    this.setState({ showForm: true })
    if (isEditConnection == true) {
      const employee = _.find(this.state.posts, { id: this.state.selectedIndex });
      if (employee != undefined) {
        this.setState({
          tag: employee.EmpTagNumber,
          firstName: employee.FirstName,
          lastName: employee.LastName,
          email: employee.EmailAdress,
          dept: employee.Department,
          age: employee.Birthdate,
          designation: employee.Designation
        })
      }
    }
  }

  handleDeleteClick = () => {
    debugger;
    const url = `http://localhost:4000/employee/${this.state.selectedIndex}`;
    const employee = _.find(this.state.posts, { id: this.state.selectedIndex });
    axios.delete(url, { data: employee }).then(resp => {
      console.log(resp.data)
    }).catch(error => {
      console.log(error);
    });

    this.FetchEmployess();
    debugger;

  }

  handleEditClick = () => {
    const employee = _.find(this.state.posts, {
      EmpId: this.state.selectedIndex
    });
    if (employee != undefined) {
      var index = employee.EmpId;
      const newEmployee = {
        EmpId: index,
        EmpTagNumber: this.state.tag,
        FirstName: this.state.firstName,
        LastName: this.state.lastName,
        EmailAdress: this.state.email,
        Department: this.state.dept,
        Birthdate: this.state.age,
        Designation: this.state.designation
      }
     
    }
  }

  /////

  handleAddEmplyeeClick = () => {
    axios.post('http://localhost:4000/Employee', {
      "id": (this.state.posts.length + 1),
      "EmpId": (this.state.posts.length + 1),
      "EmpTagNumber": this.state.tag,
      "FirstName": this.state.firstName,
      "LastName": this.state.lastName,
      "EmailAdress": this.state.email,
      "Department": this.state.designation,
      "Birthdate": 28,
      "Designation": this.state.designation
    }).then(resp => {

      this.state.posts.push(resp.data);
      this.setState({ showForm: false });
      console.log(resp.data);
    }).catch(error => {
      console.log(error);
    });
  }

  handleEditEmployee = () => {
    const url = `http://localhost:4000/employee/${this.state.selectedIndex}`;
    axios.put(url, {
      "EmpId": (this.state.posts.length + 1),
      "EmpTagNumber": this.state.tag,
      "FirstName": this.state.firstName,
      "LastName": this.state.lastName,
      "EmailAdress": this.state.email,
      "Department": this.state.designation,
      "Birthdate": 28,
      "Designation": this.state.designation
    }).then(resp => {
      console.log(resp.data);
    }).catch(error => {
      console.log(error);
    });
    this.setState({showForm:false})
    this.FetchEmployess();
  }

  sortData = () => {
    debugger;
    axios.get('http://localhost:4000/employee?_sort=FirstName&_order=asc')
      .then(resp => {
        console.log(resp.data);
      }).catch(error => {
        console.log(error);
      });
    this.FetchEmployess();

  }
  emailChangeHandler = (event) => {
    this.setState({ email: event.target.value })
  }

  tagChangeHandler = (event) => {
    this.setState({ tag: event.target.value })
  }

  fNameChangeHandler = (event) => {
    this.setState({ firstName: event.target.value })
  }

  lNameChangeHandler = (event) => {
    this.setState({ lastName: event.target.value })
  }

  deptChangeHandler = (event) => {
    this.setState({ dept: event.target.value })
  }

  ageChangeHandler = (event) => {
    debugger;
    this.setState({ age: event.target.value })
  }

  desChangeHandler = (event) => {
    this.setState({ designation: event.target.value })
  }


  /////

  render() {
    return (
      <div>
        <div style={{ fontSize: "30px", margin: "10px", textAlign: "center" }}>
          Contrado Employee Management System
        </div>
        <div style={{ height: "40px", span: "5px", width: "80%", margin: 'auto', marginBottom: "20px" }}>
          <Button
            variant="contained"
            color="primary"
            style={{ display: "inline-block", marginTop: "10px", marginLeft: "28px" }}
            onClick={() => this.handleAddClick(false)}
          >
            Add Employee
          </Button>

          <Button
            variant="contained"
            color="primary"
            style={{ width: "155px", display: "inline-block", marginTop: "10px", marginLeft: "28px" }}
            onClick={() => this.handleAddClick(true)}
          >
            Edit Employee
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ display: "inline-block", marginTop: "10px", marginLeft: "28px" }}
            onClick={() => this.handleDeleteClick()}
          >
            <span style={{ cursor: "pointer" }}>
              Delete Employee
          </span>
          </Button>

          <Button
            variant="outlined"
            style={{ width: "155px", display: "inline-block", marginTop: "10px", marginLeft: "28px" }}
            onClick={() => this.sortData()}
          >
            Sort
          </Button>
        </div>


        <table
          id="tblConnectionList"
          onRowSelection={this.handleSelectedConnection}
          style={{ width: "80%", margin: 'auto' }}
        >
          <TableHead displaySelectAll={false}>
            <TableRow>
              <TableCell
                id={`thcName`}
                className="tableHeaderManageConnection">
                Emp tag Number
                </TableCell>
              <TableCell
                id={`thcName`}
                className="tableHeaderManageConnection">
                First Name
                </TableCell>
              <TableCell
                id={`thcName`}
                className="tableHeaderManageConnection">
                Last Name
                </TableCell>
              <TableCell
                id={`thcName`}
                className="tableHeaderManageConnection">
                Email
                </TableCell>
              <TableCell
                id={`thcName`}
                className="tableHeaderManageConnection">
                Department
                </TableCell>
              <TableCell
                id={`thcName`}
                className="tableHeaderManageConnection">
                Age
                </TableCell>
              <TableCell
                id={`thcName`}
                className="tableHeaderManageConnection">
                Designation
                </TableCell>
            </TableRow>
          </TableHead>

          <TableBody deselectOnClickaway={false} showRowHover={true}>
            {this.state.posts.map((row, index) => (
              <TableRow
                key={index}
                id={`trc${row.id}`}
                hover
                onClick={event => this.handleClick(row.EmpId)}
                selected={index === this.state.selectedIndex}
              >
                <TableCell
                  id={`trc${row.name}`}>
                  {row.EmpTagNumber}
                </TableCell>
                <TableCell
                  id={`trc${row.name}`}>
                  {row.FirstName}
                </TableCell>
                <TableCell
                  id={`trc${row.name}`}>
                  {row.LastName}
                </TableCell>
                <TableCell
                  id={`trc${row.name}`}>
                  {row.EmailAdress}
                </TableCell>
                <TableCell
                  id={`trc${row.name}`}>
                  {row.Department}
                </TableCell>
                <TableCell
                  id={`trc${row.name}`}>
                  {this.GetAge(1995)}
                </TableCell>
                <TableCell
                  id={`trc${row.name}`}>
                  {row.Designation}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </table>
        {/* {this.state.selectedIndex !== undefined &&  
        this.state.posts !== undefined &&
        //this.state.posts[this.state.selectedIndex].FirstName !== undefined &&
        <FormLabel  style ={{margin:"5px"}} > Selected Employee = { this.state.posts[this.state.selectedIndex].FirstName}</FormLabel >} */}
        {/* {this.state.showForm && */}
          <FormComponent
            Employees={this.state.posts}
            emailChangeHandler={this.emailChangeHandler}
            fNameChangeHandler={this.fNameChangeHandler}
            lNameChangeHandler={this.lNameChangeHandler}
            deptChangeHandler={this.deptChangeHandler}
            ageChangeHandler={this.ageChangeHandler}
            tagChangeHandler={this.tagChangeHandler}
            handleAddEmplyeeClick={this.handleAddEmplyeeClick}
            desChangeHandler={this.desChangeHandler}
            handleEditClick={this.handleEditClick}
            handleEditEmployee={this.handleEditEmployee}

            EmpTagNumber={this.state.tag}
            FirstName={this.state.firstName}
            LastName={this.state.lastName}
            EmailAdress={this.state.email}
            Department={this.state.dept}
            Birthdate={this.state.age}
            Designation={this.state.designation}
            showForm={this.state.showForm}
          />
          {/* } */}
         
      </div>
    );
  };
}

export default App;
