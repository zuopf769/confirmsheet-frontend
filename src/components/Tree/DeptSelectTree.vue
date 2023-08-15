<!--下拉选择框 部门树-->
<!--   :check-on-click-node="multiple" 只有在点击复选框时才会选中节点，这个先不加，有问题，当点击lable时不触发选中事件，v-model不更新 -->
<template>
  <el-tree-select
    ref="deptTreeRef"
    v-model="selectDeptValue"
    node-key="id"
    :props="defaultProps"
    :data="selectOptions"
    :multiple="multiple"
    :render-after-expand="false"
    filterable
    :show-checkbox="multiple"
    :check-strictly="checkStrictly"
    default-expand-all
    style="width: 100%"
    @change="onSelectChangeDept"
    @node-click="onNodeClick"
  />
</template>
<script setup lang="ts">
  import type Node from 'element-plus/es/components/tree/src/model/node'

  const props = defineProps({
    modelValue: {
      type: [String, Array],
      default: ''
    },
    options: {
      type: Array<Record<string, string | []>>,
      default() {
        return []
      }
    },
    defaultProps: {
      type: Object,
      default() {
        return {
          id: 'id',
          label: 'name',
          children: 'children'
        }
      }
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 是否父子不互相关联
    checkStrictly: {
      type: Boolean,
      default: false
    }
  })
  const emit = defineEmits(['update:modelValue', 'refresh'])
  const selectDeptValue = useVModel(props, 'modelValue', emit)
  const selectOptions = ref(props.options) // 下拉选项

  // 递归获取部门名称
  const getDeptNameByDeptyId = (deptArr: Array<Record<string, string | []>>, deptId: string): string => {
    let labelName = ''
    for (const dItem of deptArr) {
      // console.log('循环：' + dItem[treeDefaultProps.id])
      if (dItem[props.defaultProps.id] === deptId) {
        labelName = dItem[props.defaultProps.label] as string
        break
      } else {
        if (dItem[props.defaultProps.children]?.length > 0) {
          labelName = getDeptNameByDeptyId(dItem[props.defaultProps.children] as [], deptId)
          if (labelName) break
        }
      }
    }
    return labelName
  }

  // 点击节点时，触发复选框选中事件
  const onNodeClick = (val: Node) => {
    // console.log(`onNodeClick:`, val)
    // console.log(`onNodeClick->selectDeptValue.value`, selectDeptValue.value)
    if (selectDeptValue.value instanceof Array) {
      const deptIndex = selectDeptValue.value.findIndex((id) => {
        return id === val[props.defaultProps.id]
      })

      // 已存在 则取消选中，不存在 则选中
      if (deptIndex > -1) {
        selectDeptValue.value.splice(deptIndex, 1)
      } else {
        selectDeptValue.value.push(val[props.defaultProps.id])
      }
      onSelectChangeDept()
    }
  }

  // 下拉框选中事件 点击复选框事件
  const onSelectChangeDept = () => {
    // 根据部门 id，获取部门 name
    // console.log(`output->selectDeptValue.value`, selectDeptValue.value)
    if (selectDeptValue.value instanceof Array) {
      const valueArr: Array<Record<string, string | number>> = []
      selectDeptValue.value.forEach((val: any) => {
        // 部门树递归获取 name
        const item = {
          deptId: val,
          detpName: getDeptNameByDeptyId(selectOptions.value, val) as string
        }
        // 返回部门对象数组 [{"deptId":"","detpName":""}]
        valueArr.push(item)
      })
      emit('refresh', valueArr)
    } else {
      emit('refresh')
    }
  }

  // 监听数据更新
  watch(
    () => props.options,
    (newVal) => {
      selectOptions.value = newVal
    }
  )
</script>
