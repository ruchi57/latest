import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TableSortLabel from '@material-ui/core/TableSortLabel';

class FormComponent extends Component {
        constructor(props) {
                super(props);
        }
        //     EmpTagNumber= {this.state.tag }
        //     FirstName=  {this.state.firstName}
        //     LastName=  {this.state.lastName}
        //     EmailAdress=  {this.state.email}
        //     Department= {this.state.dept}
        //     Birthdate=  {this.state.age}
        //     Designation

        // handleClickOpen() {
        //         setOpen(true);
        // }

        //onClose={handleClose} 



        handleClose() {
                this.props.showForm = false;
        }

        render() {
                debugger;
                return (
                        <Dialog open={this.props.showForm} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">Add Employee</DialogTitle>
                                <DialogContent>
                                        <DialogContentText>
                                                To subscribe to this website, please enter your email address here. We will send updates
                                                occasionally.
          </DialogContentText>
                                        <TextField autoFocus margin="dense"
                                                id="name"
                                                label="Emp Tag Number:"
                                                type="text"
                                                fullWidth
                                                onChange
                                                onChange={(event) => this.props.tagChangeHandler(event)}
                                                value={this.props.EmpTagNumber}
                                                >

                                        </TextField><br /><br />

                                        <TextField autoFocus margin="dense"
                                                id="name"
                                                label="First Name:"
                                                type="text"
                                                fullWidth
                                                onChange={(event) => this.props.fNameChangeHandler(event)}
                                                value={this.props.FirstName} >
                                        </TextField><br /><br />

                                        <TextField autoFocus margin="dense"
                                                id="name"
                                                label="Last Name:"
                                                type="text"
                                                fullWidth
                                                onChange={(event) => this.props.lNameChangeHandler(event)}
                                                value={this.props.LastName} >

                                        </TextField><br /><br />

                                        <TextField autoFocus margin="dense"
                                                id="name"
                                                label="Email Adress:"
                                                type="email"
                                                fullWidth
                                                onChange={(event) => this.props.emailChangeHandler(event)}
                                                value={this.props.EmailAdress}>

                                        </TextField><br /><br />

                                        <TextField autoFocus margin="dense"
                                                id="name"
                                                label="Department:"
                                                type="text"
                                                fullWidth
                                                onChange={(event) => this.props.deptChangeHandler(event)}
                                                value={this.props.Birthdate} >

                                        </TextField><br /><br />

                                        <TextField autoFocus margin="dense"
                                        floatingLabelFixed={true}
                                        id="input-with-icon-textfield"
                                                id="name"
                                                label="Birthdate:"
                                                type="date"
                                                fullWidth
                                                onChange={(event) => this.props.ageChangeHandler(event)}
                                                value={this.props.Birthdate} >
                                        </TextField><br /><br />

                                        <TextField autoFocus margin="dense"
                                                
                                                id="name"
                                                label="Designation:"
                                                type="text"
                                                fullWidth>
                                                onChange={(event) => this.props.desChangeHandler(event)}
                                                value={this.props.Designation}
                                        </TextField><br /><br />

                                </DialogContent>
                                <DialogActions>
                                        <Button
                                                variant="contained"
                                                color="primary" onClick={this.props.handleAddEmplyeeClick}>
                                                Submit
                </Button>

                                        <Button
                                                variant="contained"
                                                color="primary" onClick={this.props.handleEditEmployee}>
                                                Edit
                </Button>

                                </DialogActions>

                        </Dialog >);
        }
}

export default FormComponent;