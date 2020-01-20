import React, { Component } from 'react';
import { Layout, Input, Button, message } from 'antd';
import Table from '../components/Table'
import {http} from '../helper/http';
import FormAdd from '../components/FormAdd'

const { Sider, Content } = Layout;

export default class home extends Component {

  state = {
    dataSource: [],
    keyword: '',
    formSupplier: {
      supplierName: '',
      address: '',
      phone: ''
    },
    showForm: false
  }

  componentDidMount = async () => {
    await this.handleGetAll()
  }

  handleGetAll = async () => {
    let params = {
      method: 'GET',
      path: 'supplier?keyword='+this.state.keyword,
      data: {},
    }

    let {data} = await http(params);
    if (data) this.setState({dataSource: data})
  }

  handleOnChange = ({target: {value}}) => {
    this.setState({keyword: value})
  }

  handleCloseForm = () => {
    this.setState({showForm: false})
  }

  handleShowForm = () => {
    this.setState({showForm: true})
  }

  validateForm = (data) => {
    for (const key of Object.keys(data)) {
      if (data[key] === '') return false
    }
    return true
  }

  handleSubmitNewData = async (data) => {
    if (this.validateForm(data)) {
      let params = {
        method: 'POST',
        path: 'supplier',
        data: data,
      }
      let resp = await http(params);
      if (resp.status === true && resp.code === 200) {
        message.info(resp.message);
        this.handleGetAll()
        this.handleCloseForm()
      } else message.error(resp.message);
    } else message.error('Silahkan lengkapi data');
  }

  handleDelete = async key => {
    let params = {
      method: 'DELETE',
      path: 'supplier/'+key,
      data: {},
    }
    let resp = await http(params);
    if (resp.status === true && resp.code === 200) {
      message.info(resp.message);
      let dataSource = ([...this.state.dataSource]).filter(item => item._id !== key);
      this.setState({ dataSource: dataSource });
    } else message.error(resp.message);
  }

  handleUpdateData = async (data) => {
    if (this.validateForm(data)) {
      let params = {
        method: 'PUT',
        path: 'supplier/'+data._id,
        data: data,
      }
      let resp = await http(params);
      if (resp.status === true && resp.code === 200) {
        message.info(resp.message);
        this.handleGetAll();
      } else message.error(resp.message);
    } else message.error('Silahkan lengkapi data');
  }

  render() {
    return (
      <div >
        <FormAdd showForm={this.state.showForm} handleClose={this.handleCloseForm} handleSubmit={this.handleSubmitNewData}/>  
        <Layout style={{height: '100vh', padding: 10}}>
          <Sider style={{backgroundColor: '#F0F2F5', paddingRight: 10, paddingTop: 5}}>
            <label>Search Supplier Name</label>
            <Input placeholder="supplier name, ex : PT. Maju " block style={{marginTop:5, marginBottom: 10}} onChange={this.handleOnChange}/>
            <Button type="primary" icon='search' block onClick={this.handleGetAll}>Search</Button>
          </Sider>
          <Layout>
            <Content>
              <Button onClick={this.handleShowForm} type="primary" style={{ marginBottom: 16 }} icon='form'>
                Add Data
              </Button>
              <Button onClick={this.handleGetAll} type="primary" style={{ marginBottom: 16, marginLeft: 10 }} icon='reload'/>
              <Table dataSource={this.state.dataSource} handleDelete={this.handleDelete} handleUpdateData={this.handleUpdateData}/>
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}
