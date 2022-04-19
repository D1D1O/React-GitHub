import React, { Component } from "react";
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import { Form, SubmitButton, List } from './styles';
import { Container } from '../../components/Container';


export class Main extends Component{
  state ={
    newRepo: '',
    repositories: [],
    loading: false,
  };

  componentDidMount(){
    const repositories = localStorage.getItem('repositories');
    if (repositories){
      this.setState({ repositories: JSON.parse(repositories)});
    }
  }
  componentDidUpdate(_, prevState){
    const { repositories } = this.state;

    if(prevState.repositories !== repositories){
      localStorage.setItem('repositories',JSON.stringify(repositories));
    }

  }
  

  handleInputChange = e =>{
    this.setState({ newRepo: e.target.value });
  }

  handleSubmit = async e =>{ 
    e.preventDefault();
    this.setState({loading: true});

    const { newRepo } = this.state;
    const response = await api.get(`/repos/${newRepo}`);
    const data = {
      name: response.data.full_name,
    };
    this.setState({
      //repositories: [...repositories, data],
      repositories: [...this.state.repositories,data],
      newRepo: '',
      loading:false,
    });

    console.log(newRepo);

  }

  render(){
    //const { newRepo,loading } = this.setState;
    /*console.log('T1');
    console.log(newRepo);
    console.log('T2');
    console.log(loading);*/

    return (
      <Container>
        <h1>
          <FaGithubAlt/>
          Repositórios
        </h1>
  
        <Form onSubmit={this.handleSubmit}>
          <input 
            type="text" 
            placeholder="Adicionar repositório"
            //value={ newRepo }
            value={this.state.newRepo}
            onChange={this.handleInputChange}
          />
  
          <SubmitButton loading={this.state.loading}>
            {
              this.state.loading ? (
                <FaSpinner color="#fff" size={14}/>
              ):(
                <FaPlus color="#fff" size={14}/>)
            }

            
          </SubmitButton>
        </Form>

        <List>
            {
              this.state.repositories.map(repository =>(
                  <li key={repository.name}>
                    <span>{repository.name} </span>
                    <Link to={`/repository/${encodeURIComponent(repository.name)}`}>Detalhes</Link>
                  </li>
                )
              )
            }
        </List>
      </Container>
  
    );
  }
}

export default Main;