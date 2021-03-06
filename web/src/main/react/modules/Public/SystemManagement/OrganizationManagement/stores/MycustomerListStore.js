var Reflux = require('reflux');
import antd from 'antd';

var TreeTable = antd.TreeTable;
var CustomerActions = require('../actions/CustomerActions');
var reqwest = require('reqwest');
export default Reflux.createStore({
    listenables: [CustomerActions],
    dataSource: [],
    onInitStore() {
        this.queryMessages();
    },
    onPostMessage(data) {
        this.queryMessages(data);
    },
    queryMessages() {
        var me = this;
        reqwest({
            url: '/modules/system/fetchAllOffice.htm',
            method: 'get',
            data: {
                username: window.roleId,
                parentOfficeId: localStorage.officeId

            },
            type: 'json',
            success: (result) => {
                var data = result;
                var dataSource = [];
                if (data.length) {
                    dataSource = data.map((item, index) => {
                        item.key = index;
                        return item;
                    });
                }
                this.dataSource = dataSource;
                me.trigger(this.dataSource);
            }
        });


    }
});


