import React, { Component } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import NavBarComponent from '../components/layout/navBarPrivate';
import FooterBarComponent from '../components/layout/footer';
import SideBarComponent from '../components/layout/sidebarComponent';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import Axios from 'axios';
import '../styles/signUpPage.css';
import "react-datepicker/dist/react-datepicker.css";
class EditProfilePage extends Component {
    constructor(props){
        super(props);
        this.getData();
        this.state = {
            oldData: [],
            imageSelected: null,
            first_name: this.state.oldData.first_name,
            last_name:this.state.oldData.last_name,
            email:this.state.oldData.email,
            username:this.state.oldData.username,
            category:this.state.oldData.category,
            instituition:this.state.oldData.institution,
            date_birth :this.state.oldData.born_date,
            city:this.state.oldData.city,
            state:this.state.oldData.state,
            country:this.state.oldData.country,
            pwd:''
        };
        console.log(this.state.oldData.email)
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCalendar = this.handleChangeCalendar.bind(this)
    }
    async getData() {
        await Axios({
            method:"POST",
            url:"http://localhost:3333/user/view",
            data: {"email":localStorage.getItem("Email")}
        }).then((response)=>{
            this.setState({oldData:response.data})
        })
    }
    async postEdit() {
        await axios.post('http://localhost:3333/user/edit', 
        {   "OldEmail":localStorage.getItem("Email"),
            "email":this.state.email,
            "first_name": this.state.first_name,
            "last_name":this.state.last_name,
            "pwd":this.state.pwd,
            "category":this.state.category,
            "institution":this.state.instituition,
            "born_date":String( this.state.born_date.getDate()) +'/'+String(this.state.born_date.getMonth()+1)+'/'+String(this.state.born_date.getFullYear()),
            "city":this.state.city,
            "state":this.state.state,
            "country":this.state.country, }
        )
        .then (response => {
            console.log(response);
                localStorage.setItem('Token', response.data['token']);
                this.context.getUser(response.data.token);
                this.props.history.push(`/dashboard/`)
        })
        .catch(error => {
            console.log(error.response)
            alert('Email já cadastrado')
        })

    }
    componentDidMount(){
        this.getData()
    }
    handleChange(event) {
        let data = {};
        data[event.target.name] = event.target.value;
        this.setState(data);
    }
    handleChangeCalendar(event, name) {
        let data = {};
        data[name] = event
        this.setState(data)
    }

    render() {
        return (
            <div>
                <div>
                    <SideBarComponent/>
                </div>
                <div className={'body'}>
                    <NavBarComponent/>
                        <div className={'body_content'}>
                            <Form>
                                <Form.Row>
                                    <Col>
                                        <Form.Group  className={'space_between_FN'}>
                                            <Form.Label className={'text_color_dark'}>Primeiro nome</Form.Label>
                                            <Form.Control defaultValue={this.state.oldData.first_name} onChange={this.handleChange} placeholder='Primeiro nome' name='first_name' ></Form.Control>
                                        </Form.Group>
                                    </Col>
                                    
                                    <Col>
                                        <Form.Group className={'space_between_LN'}>
                                            <Form.Label className={'text_color_dark'}>Sobrenome</Form.Label>
                                            <Form.Control defaultValue={this.state.oldData.last_name} onChange={this.handleChange} placeholder='Sobrenome' name='last_name'></Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <Form.Group className={'space_between_FN'}>
                                            <Form.Label className={'text_color_dark'}>Cidade</Form.Label>
                                            <Form.Control defaultValue={this.state.oldData.city} onChange={this.handleChange} placeholder='Sua cidade' name='city'></Form.Control>
                                        </Form.Group>
                                    </Col>
                                    
                                    <Col>
                                        <Form.Group className={'space_between_LN'}>
                                            <Form.Label className={'text_color_dark'}>Estado (região)</Form.Label>
                                            <Form.Control defaultValue={this.state.oldData.state} onChange={this.handleChange} placeholder='Estado' name='state'></Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className={'space_between_LN'}>
                                            <Form.Label className={'text_color_dark'}>País</Form.Label>
                                            <Form.Control defaultValue={this.state.oldData.country} onChange={this.handleChange} placeholder='País' name='country'></Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                    <Form.Group>
                                        <Form.Label className={'text_color_dark'}>Email address</Form.Label>
                                        <Form.Control defaultValue={this.state.oldData.email} onChange={this.handleChange} type="email" placeholder="Enter email" name="email"/>
                                    </Form.Group>
                                <Form.Row>
                                    <Col>
                                        <Form.Group className={'space_between_LNE'}>
                                            <Form.Label className={'text_color_dark'}>Categoria</Form.Label>
                                            <Form.Control defaultValue={this.state.oldData.category} as='select' onChange={this.handleChange} name='category' >
                                                <option> Escolha... </option>
                                                <option> Estudante </option>
                                                <option> Estudante - Empregado </option>
                                                <option> Estudante em busca de emprego </option>
                                                <option> Programador Junior </option>
                                                <option> Programador Pleno </option>
                                                <option> Programador Sênior </option>
                                                <option> Professor - Mestre </option>
                                                <option> Professor - Doutor </option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label className={'text_color_dark'}>Instuição que pertence</Form.Label>
                                            <Form.Control defaultValue={this.state.oldData.institution} onChange={this.handleChange} placeholder="Nome da faculdade ou empresa que frequenta" name='instituition'></Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col className={'calendar_container'}>
                                        <div className={'calendar_style'}>
                                            <Form.Group>
                                                <Form.Label className={'text_color_dark'}>Data de Nascimento</Form.Label><br/>
                                                <DatePicker dateFormat='DD/MM/YYYY' selected={this.state.date_birth} onChange={(date) => {this.handleChangeCalendar(date, 'date_birth')}} className={'calendar_block'}/>
                                            </Form.Group>
                                        </div>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <Form.Group className={'space_between_FN'}>
                                            <Form.Label className={'text_color_dark'}>Senha</Form.Label>
                                            <Form.Control onChange={this.handleChange} type='password' placeholder='Senha' name='pwd'></Form.Control>
                                        </Form.Group>
                                    </Col>
                                    
                                    <Col>
                                        <Form.Group className={'space_between_LN'}>
                                            <Form.Label className={'text_color_dark'}>Confirme a senha</Form.Label>
                                            <Form.Control onChange={this.handleChange} type='password' placeholder='Confirmação de senha' name='pwd_confirm'></Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <div className={'btn_signUp'}>
                                    <LinkContainer to='/home'>
                                        <Button variant="light" type='submit' onClick={() => this.postEdit()}>
                                            Salvar
                                        </Button>
                                    </LinkContainer>
                                </div>
                            </Form>
                        </div>
                    <FooterBarComponent/>
                </div>
            </div>
        )
    }
}

export default EditProfilePage;