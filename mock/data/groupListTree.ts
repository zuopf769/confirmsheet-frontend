const data = [
  {
    id: 1,
    groupName: '数据类',
    groupDesc: '数据类',
    apiList: [
      {
        id: 5,
        apiName: '表数据操作',
        apiDesc: '表数据操作',
        apiType: 'JDBC',
        methodType: 'SELECT',
        serviceData: {
          base: {
            connectName: '测试库',
            host: '1.13.0.252',
            port: '3306',
            userName: 'root',
            pass: 'Sun2022@#@!123',
            transferType: null,
            transferEncode: null,
            offlineImadiate: null,
            delSourceFile: null,
            operatorType: null,
            targetFolder: null,
            fileName: null,
            dbName: 'test',
            url: null
          },
          queryParams: 'select * from test',
          relations: null,
          protocolParams: {
            header: null,
            body: null,
            query: null
          }
        }
      }
    ]
  },
  {
    id: 2,
    groupName: 'restapi',
    groupDesc: 'api类',
    apiList: [
      {
        id: 1001,
        apiName: 'restapi-HTTP-GET',
        apiGroup: '',
        apiType: 'HTTP',
        methodType: 'GET',
        groupId: 1,
        serviceData: {
          base: {
            url: 'http://www'
          },
          protocolParams: {
            header: [
              {
                id: '',
                paraName: 'aa',
                value: '',
                isNeed: true,
                paraType: '',
                note: ''
              }
            ],
            query: [
              {
                id: '',
                paraName: '',
                value: '',
                isNeed: true,
                paraType: '',
                note: ''
              }
            ],
            body: {
              bodyType: '',
              value: []
            }
          }
        }
      },
      {
        id: 1002,
        apiName: 'restapi-HTTP-POST',
        apiGroup: '',
        apiType: 'HTTP',
        methodType: 'POST',
        groupId: 1
      }
    ]
  },
  {
    id: 3,
    groupName: '数据1',
    groupDesc: null,
    apiList: []
  }
]
export default data
