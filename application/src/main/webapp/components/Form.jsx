// Examples of Form interaction using React Bootstrap Table and Local Storage

import React, { Component } from 'react';
import { Panel, Modal, Button, ButtonToolbar, Checkbox, ControlLabel, InputGroup, FormControl, FormGroup } from "react-bootstrap";
import '../components/Form.css';

class Form extends Component {
    constructor(props) {
        super(props); 
        
        this.state = {
            name: localStorage.getItem('name') || "",
            name_count: localStorage.getItem('name') ? localStorage.getItem('name').length : 0,
            name_validation: localStorage.getItem('name') ? this.getValidationState(localStorage.getItem('name')) : null,
            description: localStorage.getItem('description') || "",
            description_count: localStorage.getItem('description') ? localStorage.getItem('description').length : 0,
            description_validation: localStorage.getItem('description') ? this.getValidationState(localStorage.getItem('description')) : null,
            radio_1: localStorage.getItem('radio_1') || false,
            radio_2: localStorage.getItem('radio_2') || false,
            radio_3: localStorage.getItem('radio_3') || false,
            show: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.clearLocalStorage = this.clearLocalStorage.bind(this);
    }

    getValidationState(control) {
        if(control === null) return null;
        if (control.length > 0) return 'success';
        if (control.length < 1) return 'error';
        return null;
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if(name === "name") {
            this.setState({
                name_count: value.length,
                name_validation: this.getValidationState(target.value)
            });
        }

        if(name === "description") {
            this.setState({
                description_count: value.length,
                description_validation: this.getValidationState(target.value)
            });
        }

        localStorage.setItem( [name], value );

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({
            name_validation: this.getValidationState(this.state.name)
        });
    
        this.setState({
            description_validation: this.getValidationState(this.state.description)
        });
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    clearLocalStorage() {
        localStorage.removeItem("name");
        localStorage.removeItem("description");
        localStorage.removeItem("radio_1");
        localStorage.removeItem("radio_2");
        localStorage.removeItem("radio_3");

        this.setState({
            name: "",
            name_count: 0,
            name_validation: this.getValidationState(null),
            description: "",
            description_count: 0,
            description_validation: this.getValidationState(null),
            radio_1: false,
            radio_2: false,
            radio_3: false,
            show: false
        });
    }
    
    render() {
        return (
            <Panel>
                <Panel.Heading>
                    <Panel.Title>Controlled Componenet</Panel.Title>
                </Panel.Heading>
                <Panel.Body>                                 
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup validationState={this.state.name_validation}>
                            <ControlLabel>Name:</ControlLabel>
                            <InputGroup>
                                <FormControl name="name" type="text" value={this.state.name} placeholder="Enter your name." onChange={this.handleInputChange} />
                                <InputGroup.Addon><strong>Word Count:</strong> {this.state.name_count}</InputGroup.Addon>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup validationState={this.state.description_validation}>
                            <ControlLabel>Description:</ControlLabel>
                            <InputGroup>
                                <FormControl name="description" componentClass="textarea" value={this.state.description} placeholder="Enter your description." onChange={this.handleInputChange} />
                            <InputGroup.Addon><strong>Word Count:</strong> {this.state.description_count}</InputGroup.Addon>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel className={this.state.radio_1 ? "dot active" : "dot"}>
                                <Checkbox name="radio_1" value={this.state.radio_1} onChange={this.handleInputChange} />
                                <span>1</span>
                            </ControlLabel>
                            <ControlLabel className={this.state.radio_2 ? "dot active" : "dot"}>
                                <Checkbox name="radio_2" value={this.state.radio_2} onChange={this.handleInputChange} />
                                <span>2</span>
                            </ControlLabel>  
                            <ControlLabel className={this.state.radio_3 ? "dot active" : "dot"}>
                                <Checkbox name="radio_3" value={this.state.radio_3} onChange={this.handleInputChange} />
                                <span>3</span>
                            </ControlLabel>                 
                        </FormGroup>
                        <ButtonToolbar>
                            <Button type="submit" bsStyle="primary" onClick={this.handleSubmit}>Submit</Button>
                            <Button onClick={this.handleShow} bsStyle="danger">Clear Component Storage</Button>
                        </ButtonToolbar>
                        <Modal show={this.state.show}>
                            <Modal.Header>
                                <Modal.Title>Clear Component Storage?</Modal.Title>
                            </Modal.Header> 
                            <Modal.Body>Are you sure you want to clear saved form values?</Modal.Body>   
                            <Modal.Footer>
                                <Button onClick={this.clearLocalStorage} bsStyle="danger">Confirm</Button>
                                <Button onClick={this.handleClose} bsStyle="primary">Cancel</Button>
                            </Modal.Footer>
                        </Modal>
                    </form> 
                </Panel.Body>
            </Panel>
        );
    }
}

export default Form;