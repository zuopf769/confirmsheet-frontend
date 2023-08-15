/**
import { MarkerType } from '@vue-flow/core'

节点类型：
type: 'default' 默认节点 有入线和有出线
type: 'input'   开始节点
type: 'output'  结束节点

自定义节点：
type: 'customHttp'        http组件 节点
type: 'customFile'        file组件 节点

节点 出入线方向
targetHandle: 'left'    入线 默认'top'
sourceHandle: 'right',  出线 默认'bottom'

Edge 线：
animated: false 实线
animated: true  虚线

线箭头：
markerEnd: MarkerType.Arrow / MarkerType.ArrowClosed

<BaseEdge :marker-start="'url(#arrowclosed)'" />

线样式：
style: { stroke: 'orange' },
labelBgStyle: { fill: 'orange' },

 **/

// export default [
//   // 开始 type: 'input', 结束 type: 'output'
//   { id: '1', type: 'input', label: 'Node 1', position: { x: 250, y: 5 } },
//   { id: '2', label: 'Node 2', position: { x: 100, y: 100 } },
//   { id: '3', label: 'Node 3', position: { x: 400, y: 100 } },
//   { id: '4', type: 'output', label: 'Node 4', position: { x: 400, y: 200 } },
//   { id: 'e1-3', source: '1', target: '3' },
//   { id: 'e1-2', source: '1', target: '2', animated: true }
// ]

export default {
  flowId: '10',
  flowName: '某某流程图A',
  nodes: [
    {
      id: 1,
      type: 'customNode',
      apiType: 'START',
      methodType: 'START',
      label: '开始',
      position: {
        x: 255,
        y: 0
      },
      data: {},
      events: {},
      serviceData: {}
    },
    {
      id: 2,
      type: 'customNode',
      apiType: 'HTTP',
      methodType: 'POST',
      label: 'Node http post',
      class: 'vue-flow__node-custom',
      position: {
        x: 105,
        y: 105
      },
      data: {},
      events: {},
      style: {
        backgroundColor: '#eeeeee'
      },
      hidden: false,
      serviceData: {}
    },
    {
      id: 3,
      type: 'customNode',
      apiType: 'HTTP',
      methodType: 'GET',
      label: 'Node http get',
      class: 'vue-flow__node-custom',
      position: {
        x: 405,
        y: 105
      },
      data: {},
      events: {},
      serviceData: {}
    },
    {
      id: 4,
      type: 'customNode',
      apiType: 'JDBC',
      methodType: 'SELECT',
      label: 'Node jdbc SELECT',
      class: 'vue-flow__node-custom',
      position: {
        x: 205,
        y: 215
      },
      data: {},
      events: {},
      serviceData: {}
    }
  ],
  edges: [
    {
      id: 'e1-3',
      source: '1',
      target: '3',
      // animated: true,
      type: 'customSmoothStep',
      // label: '连线',
      data: {},
      // data: { toolbarPosition: 'right' },
      events: {},
      sourceX: 329.9999694824219,
      sourceY: 42.80000305175781,
      targetX: 480,
      targetY: 101.80000305175781,
      markerEnd: 'arrowclosed'
    },
    {
      id: 'e1-2',
      source: '1',
      target: '2',
      // animated: true,
      type: 'customSmoothStep',
      // label: '连线',
      data: {},
      events: {},
      sourceX: 329.9999694824219,
      sourceY: 42.80000305175781,
      targetX: 180,
      targetY: 101.80000305175781,
      markerEnd: 'arrowclosed'
    }
  ],
  position: [-122.66666666666663, 45.29292929292933],
  zoom: 1
}
