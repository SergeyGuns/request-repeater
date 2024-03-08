import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class RequestRepeater extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired,
  };

  state = {
    requesrCounter: 0,
    run: false, 
    requests: [
        {url: 'https://ya.ru', lastRespons: '', pause: false, id: 10},
        {url: 'https://google.com', lastRespons: '', pause: false, id: 20}
    ],
    newUrl: ''
  };

  handleAddRequest = () => {
    this.setState({requests: [...this.state.requests, {url: this.state.newUrl, lastRespons: '', pause:false, id: Date.now()}], newUrl:''})
  };

  handleChange = (e) => {
    this.setState({
        ...this.state,
        newUrl: e.target.value,
    });
  };

  handleTime = ()=> {
    if (!this.state.run) {
        console.log('run is '+ this.state.run)
        setTimeout(this.handleTime, 3000)
        return;
    }
    if (this.state.requests[this.state.requesrCounter].pause) {
        setTimeout(this.handleTime, 3000)
        console.log('pause url'+this.state.requests[this.state.requesrCounter].url)
        const requesrCounter = this.state.requesrCounter === this.state.requests.length -1 ? 0 : this.state.requesrCounter+1  
        this.setState({...this.state, requesrCounter})
        return;
    }
    fetch(this.state.requests[this.state.requesrCounter].url).then((res)=>{
        console.log(res)
        const requesrCounter = this.state.requesrCounter === this.state.requests.length -1 ? 0 : this.state.requesrCounter+1  
        this.setState({...this.state, requesrCounter})
        setTimeout(this.handleTime, 3000)
    })
  } 

  componentDidMount() {
    this.handleTime()
  }

  handlePause = (id)=> (e) => {
    const requests = this.state.requests.map((req)=> ({...req, pause: req.id === id ? !req.pause : req.pause }))
    this.setState({...this.state, requests})
  }

  handleRun = () => {
    this.setState({...this.state, run: !this.state.run})
  }
  handleDelete =(id)=> ()=> {
    const requests = this.state.requests.filter((el)=> el.id !== id)
    this.setState({...this.state, requests})
  }
  render() {
    return (
      <div>
        <button onClick={this.handleRun}>{this.state.run? '[stop]' : '[run ]'}</button>
        <h2>add request</h2>
        <input onChange={this.handleChange} type="text" value={this.state.newUrl} />
        <button onClick={this.handleAddRequest}>add</button>
        <div>
            {this.state.requests.map(({id, url, lastRespons, pause})=>
                <div key={id}>{url} <button onClick={this.handlePause(id)}>{`[ ${pause? 'I I': ' I> '} ]`}</button><button onClick={this.handleDelete(id)}>delete</button></div>
            )}
        </div>
      </div>
    );
  }
}
