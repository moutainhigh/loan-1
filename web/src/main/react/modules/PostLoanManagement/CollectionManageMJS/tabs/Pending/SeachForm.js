import React from 'react';
import {
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Row
} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;

let SeachForm = React.createClass({
  getInitialState() {
    return {
      repaymentTimeStart: null,
      repaymentTimeEnd: null
    }
  },
  handleQuery() {
    var params = this.props.form.getFieldsValue();
    this.props.passParams({
      searchParams: JSON.stringify(params),
      pageSize: 10,
      currentPage: 1,
    });
  },
  handleReset() {
    this.props.form.resetFields();
    this.setState({
      repaymentTimeStart: null,
      repaymentTimeEnd: null
    })
  },
  disabledStartDate(repaymentTimeStart) {
    if (!repaymentTimeStart || !this.state.repaymentTimeEnd) {
      return false;
    }
    return repaymentTimeStart.getTime() >= this.state.repaymentTimeEnd.getTime();
  },
  disabledEndDate(repaymentTimeEnd) {
    if (!repaymentTimeEnd || !this.state.repaymentTimeStart) {
      return false;
    }
    return repaymentTimeEnd.getTime() <= this.state.repaymentTimeStart.getTime();
  },
  onStartChange(value) {
    this.onChange('repaymentTimeStart', value);
  },
  onEndChange(value) {
    this.onChange('repaymentTimeEnd', value);
  },
  onChange(field, value) {
    this.setState({
      [field]: value,
    });
  },
  render() {
    const {
      getFieldProps
    } = this.props.form;
    return (
      <Form inline >
        <FormItem label="项目名称">
          <Input  {...getFieldProps('projectName') } />
        </FormItem>
        <FormItem label="客户姓名：">
          <Input  {...getFieldProps('customerName') } />
        </FormItem>
        <FormItem label="项目编号：">
          <Input  {...getFieldProps('projectCode') } />
        </FormItem>
        <FormItem label="还款日期：">
          <DatePicker disabledDate={this.disabledStartDate}  {...getFieldProps('repaymentTimeStart', { onChange: this.onStartChange }) } />
        </FormItem>
        <FormItem label="至：">
          <DatePicker disabledDate={this.disabledEndDate}  {...getFieldProps('repaymentTimeEnd', { onChange: this.onEndChange }) } />
        </FormItem>
        <FormItem><Button type="primary" onClick={this.handleQuery}>查询</Button></FormItem>
        <FormItem><Button type="reset" onClick={this.handleReset}>重置</Button></FormItem>
      </Form>
    );
  }
});

SeachForm = createForm()(SeachForm);
export default SeachForm;
