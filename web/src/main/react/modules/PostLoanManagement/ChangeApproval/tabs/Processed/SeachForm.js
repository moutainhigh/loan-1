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
      endOpen: false,
      roleList: [],
      declarationStartDate: null,
      declarationEndDate: null
    }
  },
  handleStartToggle({ open }) {
    if (!open) {
      this.setState({ endOpen: true });
    }
  },
  handleEndToggle({ open }) {
    this.setState({ endOpen: open });
  },
  handleQuery() {
    var params = this.props.form.getFieldsValue();
    this.props.passParams({
      searchParams: JSON.stringify(params),
      pageSize: 10,
      pageNum: 1,
    });
  },
  handleReset() {
    this.props.form.resetFields();
    this.setState({
      declarationStartDate: null,
      declarationEndDate: null
    })
  },
  disabledStartDate(declarationStartDate) {
    if (!declarationStartDate || !this.state.declarationEndDate) {
      return false;
    }
    return declarationStartDate.getTime() >= this.state.declarationEndDate.getTime();
  },
  disabledEndDate(declarationEndDate) {
    if (!declarationEndDate || !this.state.declarationStartDate) {
      return false;
    }
    return declarationEndDate.getTime() <= this.state.declarationStartDate.getTime();
  },
  onStartChange(value) {
    this.onChange('declarationStartDate', value);
  },
  onEndChange(value) {
    this.onChange('declarationEndDate', value);
  },
  onChange(field, value) {
    this.setState({
      [field]: value,
    });
  },
  componentDidMount() {
    var me = this;
    Utils.ajaxData({
      url: '/getDicts.htm?type=WORKFLOW_STATE',
      method: 'get',
      type: 'json',
      callback: (result) => {
        var items = result.data.map((item) => {
          return (<Option key={item.value} value={String(item.value) }>{item.text}</Option>);
        });
        me.setState({ payChannelList: items });
      }
    });
    Utils.ajaxData({
      url: '/modules/common/action/ComboAction/queryDic.htm?typeCode=OPERATION_TYPE',
      method: 'get',
      type: 'json',
      callback: (result) => {
        var items = result.data.map((item) => {
          return (<Option key={item.value} value={String(item.value) }>{item.text}</Option>);
        });
        me.setState({ changetype: items });
      }
    });
  },
  render() {
    const {
      getFieldProps
    } = this.props.form;
    return (
      <Form inline >
        <FormItem label="项目编号：">
          <Input  {...getFieldProps('projectCode') } />
        </FormItem>
        <FormItem label="客户名称：">
          <Input  {...getFieldProps('customerName') } />
        </FormItem>
        <FormItem label="来源：">
          <Select style={{ width: 150 }} {...getFieldProps('businessOriginText') }>

            <Option  value="报单机构">报单机构</Option>
            <Option  value="报单个人">报单个人</Option>
          </Select>
        </FormItem>
        <FormItem label="机构名称：">
          <Input  {...getFieldProps('institutionName') } />
        </FormItem>
        <FormItem label="报单人：">
          <Input  {...getFieldProps('customerManager') } />
        </FormItem>
        <FormItem label="报单开始时间：">
          <DatePicker disabledDate={this.disabledStartDate}  {...getFieldProps('declarationStartDate', { onChange: this.onStartChange }) } />
        </FormItem>
        <FormItem label="报单结束时间：">
          <DatePicker disabledDate={this.disabledEndDate}  {...getFieldProps('declarationEndDate', { onChange: this.onEndChange }) } />
        </FormItem>
        <FormItem label="变更类型：">
          <Select style={{ width: "160px" }} {...getFieldProps('branchingProcessType', { initialValue: '' }) }>
            {this.state.changetype}
          </Select>
        </FormItem>
        <FormItem><Button type="primary" onClick={this.handleQuery}>查询</Button></FormItem>
        <FormItem><Button type="reset" onClick={this.handleReset}>重置</Button></FormItem>
      </Form>
    );
  }
});

SeachForm = createForm()(SeachForm);
export default SeachForm;
