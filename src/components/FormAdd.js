import React,{useState} from 'react';
import { Modal, Button, Input, Icon } from 'antd';

const {TextArea} = Input

export default ({handleSubmit, showForm, handleClose}) => {
  let [formSupplier, setFormSupplier] = useState({
    supplierName: '',
    phone: '',
    address: ''
  });

  const handleOnChange = async ({target: {name, value}}) => {
    let newFormSupplier = formSupplier;
    newFormSupplier[name] = value;
    setFormSupplier = newFormSupplier;
  }

  return (
    <Modal
      visible={showForm}
      title="Supplier Administration"
      onOk={handleClose}
      onCancel={handleClose}
      maskClosable={false}
      footer={[
        <Button key="back" onClick={handleClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => handleSubmit(formSupplier)}>
          Save
        </Button>,
      ]}
    >
      <Input placeholder="Supplier Name" onChange={handleOnChange} name='supplierName'/>
      <TextArea rows={4} placeholder="Address" onChange={handleOnChange} name='address'/>
      <Input placeholder="Phone" onChange={handleOnChange} name='phone'/>
    </Modal>
  )
}