import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import api from "../../services/api";
//import PropTypes from 'prop-types';
import { Container } from '../../components/Container';

import { Loading, Owner , IssueList} from './styles';

class Repository extends Component{

  state = {
    repository:{},
    issues:[],
    loading:true,
  }


  async componentDidMount(){
    let { repository } = this.props.params; 
    const [repo, issues] = await Promise.all([
      api.get(`/repos/${repository}`),
      api.get(`/repos/${repository}/issues`,{
        params:{
          state: 'open',
          per_page: 5
        }
      }),
    ]);

    this.setState({
      repository: repo.data,
      issues: issues.data,
      loading: false,
    });

  }

  render(){

    if(this.state.loading){
      return (
        <>
          <Link to={"/"}>Voltar</Link>
          <Loading> Carregando </Loading>
          </>
        )
    }
    
    return (
      <Container>
        <Owner>
          <Link to={"/"}>Voltar</Link>
          <img src={this.state.repository.owner.avatar_url} alt={this.state.repository.owner.login} ></img>
          <h1> {this.state.repository.name} </h1>
          <p> {this.state.repository.description} </p>
        </Owner>

        <IssueList>
          { this.state.issues.map(issue => (
            <li key={String(issue.id)}>
             <img src={issue.user.avatar_url} alt={issue.user.login}></img>
             <div>
               <strong>
                 <a href={issue.html_url} >{issue.title}</a>
                 { issue.labels.map(label =>(
                   <span key={String(label.id)} >{label.name} </span>
                 )) }
               </strong>
               <p>{issue.user.login} </p>
             </div>
            </li>
          ))
          }
        </IssueList>
      </Container>

    )
  }
}

export default (props) => (
  <Repository
      {...props}
      params={useParams()}
  />
);



