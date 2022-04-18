import React, { Component } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

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
    
    return <h1> Repository: </h1>
  }
}

export default (props) => (
  <Repository
      {...props}
      params={useParams()}
  />
);



