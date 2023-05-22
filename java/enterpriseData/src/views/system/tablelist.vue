<template>
  <div @contextmenu.prevent="" @click="mainClick">
    <!--右键弹出菜单-->
    <div ref="rightMenu" class="menu" style="display: none;">

      <el-button type="text" @click="editLeaf">编辑</el-button><br />
      <el-button type="text" @click="addLeaf">新增子节点</el-button><br />
      <el-button type="text" @click="saveModle">保存该模型</el-button><br />
      <el-button type="text" @click="deleteLeaf">删除</el-button>

    </div>

    <div ref="rightMenu2" class="menu2" style="display: none;">
      <el-button type="text" @click="editLeaf">编辑</el-button><br />
      <el-button type="text" @click="addModle">新增子节点</el-button><br />
      <el-button type="text" @click="saveModle">保存该模型</el-button><br />
      <el-button type="text" @click="deleteLeaf">删除</el-button>
    </div>

    <div ref="rightMenu3" class="menu3" style="display: none;">
      <el-button type="text" @click="addLeaf">新增子节点</el-button><br />
    </div>

    <el-container class="zuiwaiceng">
      <el-main style="width: 100%; overflow-x: hidden;">
        <el-tabs v-model="activeName" :tab-position="tabPosition" @tab-click="handleClick">
          <el-tab-pane label="元数据模型" name="first" style="margin-left:10px; margin-right:15px;">
            <!-- 核心元数据树状图 -->
            <el-tooltip class="item" effect="dark" content="点击右键进行节点操作" placement="bottom-start"
                        style="margin-left:6%">
              <el-button><i class="el-icon-question"></i>说明</el-button>
            </el-tooltip>
            <el-select v-model="qiyename" placeholder="请选择企业" filterable style="width:350px"
                       @change="qiyeTree">
              <el-option v-for="item in options" :key="item.value" :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-plus" @click="addqiye = true">新 建</el-button>
            <div id="tree" style="width: 600px; height: 600px;">
            </div>
          </el-tab-pane>
        </el-tabs>

        <!-- 新建表格对话框 -->
        <el-dialog title="新建数据表" :visible.sync="addtableVisible" width="60%">
          <el-table :data="ziduanList" height="250px" border>
            <el-table-column prop="name" label="字段名称" width="180">
            </el-table-column>
            <el-table-column prop="description" label="描述" width="180">
            </el-table-column>
            <el-table-column prop="type" label="属性">
            </el-table-column>
            <el-table-column prop="isnull" label="非空">
            </el-table-column>
            <el-table-column prop="key" label="主键">
            </el-table-column>
            <el-table-column prop="" label="操作" width="180">
              <template slot-scope="scope">
                <el-button size="mini" @click="editCol(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="deleteCol(scope.$index, scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button type="primary" @click="addCol" style="margin-top:15px"><i class="el-icon-plus"></i>
            新建字段
          </el-button>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addtableVisible = false">取 消</el-button>
            <el-button type="primary" @click="addTableSubmit"><i class="el-icon-check"></i> 提
              交</el-button>
          </div>
        </el-dialog>

        <!-- 新建字段 -->
        <el-dialog title="新建字段" :visible.sync="addcolVisible">
          <el-form :model="colform">
            <el-form-item label="字段名称" :label-width="formLabelWidth" required>
              <el-input v-model="colform.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="属性" :label-width="formLabelWidth" required>
              <el-select v-model="colform.type" placeholder="请选择属性">
                <el-option label="int" value="int"></el-option>
                <el-option label="float" value="float"></el-option>
                <el-option label="double" value="double"></el-option>
                <el-option label="char" value="char"></el-option>
                <el-option label="varchar" value="varchar"></el-option>
                <el-option label="date" value="date"></el-option>
                <el-option label="time" value="time"></el-option>
                <el-option label="datetime" value="datetime"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="长度" :label-width="formLabelWidth" required>
              <el-input v-model="colform.col_length" autocomplete="off"
                        placeholder="若类型为char或varchar则必填"></el-input>
            </el-form-item>
            <el-form-item label="描述" :label-width="formLabelWidth" required>
              <el-input v-model="colform.description" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="选项" :label-width="formLabelWidth">
              <el-checkbox v-model="pri_checked">主键</el-checkbox>
              <el-checkbox v-model="isnull_checked">非空</el-checkbox>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addcolVisible = false">取 消</el-button>
            <el-button type="primary" @click="addColSubmit">确 定</el-button>
          </div>
        </el-dialog>

        <!-- 确认添加表格对话框 -->
        <el-dialog title="新建数据表" :visible.sync="submittableVisible">
          <el-form :model="newtable">
            <el-form-item label="数据表名称" :label-width="formLabelWidth" required>
              <el-input v-model="newtable.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="中文名称" :label-width="formLabelWidth" required>
              <el-input v-model="newtable.cnname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="分类" :label-width="formLabelWidth" required>
              <el-select v-model="newtable.type" placeholder="请选择类型">
                <el-option label="产品" value="产品"></el-option>
                <el-option label="网关" value="网关"></el-option>
                <el-option label="人员" value="人员"></el-option>
                <el-option label="企业" value="企业"></el-option>
                <el-option label="其他" value="其他"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="负责人" :label-width="formLabelWidth" required>
              <el-input v-model="newtable.owner" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="描述" :label-width="formLabelWidth" required>
              <el-input v-model="newtable.description" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="注意事项" :label-width="formLabelWidth" required>
              <el-input v-model="newtable.tip" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="submittableVisible = false">取 消</el-button>
            <el-button type="primary" @click="addTableSubmit2">确 定</el-button>
          </div>
        </el-dialog>

        <!-- 编辑树形图 -->
        <el-dialog title="编辑节点" :visible.sync="leafinput">

          <el-button type="primary" @click="addleaf = true">新建子节点</el-button>
          <el-button type="primary" @click="editLeaf">编辑</el-button>
          <el-button type="primary" @click="deleteLeaf">删除</el-button>
          <el-button type="primary" @click="leafinput = false">取消</el-button>

        </el-dialog>

        <!-- 添加子节点 -->
        <el-dialog title="新建子节点" :visible.sync="addleaf">
          <el-form :model="newpname">
            <el-form-item label="节点名称" :label-width="formLabelWidth" required>
              <el-input v-model="newpname" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addleaf = false">取 消</el-button>
            <el-button type="primary" @click="addLeafSubmit">确 定</el-button>
          </div>
        </el-dialog>

        <!-- 编辑节点 -->
        <el-dialog title="编辑节点" :visible.sync="editleaf">
          <el-form :model="nowpname">
            <el-form-item label="节点名称" :label-width="formLabelWidth" required>
              <el-input v-model="nowpname" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editleaf = false">取 消</el-button>
            <el-button type="primary" @click="editLeafSubmit">确 定</el-button>
          </div>
        </el-dialog>

        <!-- 新建企业 -->
        <el-dialog title="新建企业" :visible.sync="addqiye">
          <el-form :model="newqiye">
            <el-form-item label="企业名称" :label-width="formLabelWidth" required>
              <el-input v-model="newqiye" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addqiye = false">取 消</el-button>
            <el-button type="primary" @click="addQiye">确 定</el-button>
          </div>
        </el-dialog>

        <!-- 新增元模型 -->
        <el-dialog title="新增元模型" :visible.sync="addmodle" width="270px">
          <el-select v-model="addmodlename" filterable allow-create placeholder="请选择">
            <el-option v-for="item in modle" :key="item.name" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addmodle = false">取 消</el-button>
            <el-button type="primary" @click="addModleSubmit">确 定</el-button>
          </div>
        </el-dialog>

      </el-main>
    </el-container>
  </div>
</template>

<script>
  /* eslint-disable */
  import axios from 'axios'
  import TreeChart from "vue-tree-chart"
  import * as echarts from 'echarts'
  //import TreeChart from "@/components/treechar.vue"
  export default {
    components: {
      TreeChart
    },
    data() {
      return {
        nowp: [],
        nowpname: '',//修改节点名称
        newpname: '',//新建子叶子节点名称
        addmodle: false,//新建元模型
        addmodlename: '',//自动生成的子节点名称
        addleaf: false,
        editleaf: false,
        leafinput: false,
        activeName: 'first',
        tabPosition: 'left',
        searchTableName: '',
        tableNames: [],
        state: '',
        requestData: {},
        tableimgsrc: '',
        addtableVisible: false,
        addcolVisible: false,
        submittableVisible: false,
        nowtable: '',
        ziduanList: [],
        newtable: {},
        colform: {},
        pri_checked: false,
        isnull_checked: false,
        operate: '',
        editIndex: 0,
        value1: false,
        contextmenu: false,
        options: [
          {
            label: "武汉开目信息技术股份有限公司",
            value: "武汉开目信息技术股份有限公司"
          },
          {
            label: "武汉虹信科技发展有限责任公司",
            value: "武汉虹信科技发展有限责任公司"
          }
        ],
        qiyename: '武汉开目信息技术股份有限公司',
        addqiye: false,//新建企业弹窗
        newqiye: "",//新企业名称
        startTree: {
          name: "核心元数据",
          collapsed: false,
          children: [
            {
              name: "企业A",
              collapsed: false,
              children: [
                {
                  name: "企业数据",
                  collapsed: true,
                  children: [

                    { name: '企业编码' },
                    { name: '企业名称' },
                    { name: '企业简介' },
                    { name: '企业通讯地址' }
                  ]

                },
                {
                  name: "产品数据",
                  collapsed: false,
                  children: [
                    {
                      name: "线缆",
                      collapsed: true,
                      children:
                        [
                          {
                            name: "主体数据",
                            collapsed: true,
                            children: [
                              {
                                name: "生产企业",
                                collapsed: true,
                                children: [
                                  { name: '生产企业编码' },
                                  { name: '生产企业名称' },
                                  { name: '生产企业简介' }
                                ]
                              },
                              {
                                name: "流通企业",
                                collapsed: true,
                                children: [
                                  { name: '流通企业编码' },
                                  { name: '流通企业名称' },
                                  { name: '流通企业简介' }
                                ]
                              },
                              {
                                name: "使用单位",
                                collapsed: true,
                                children: [
                                  { name: '使用单位编码' },
                                  { name: '使用单位名称' },
                                  { name: '使用单位简介' }
                                ]
                              },
                              {
                                name: "消费者",
                                collapsed: true,
                                children: [
                                  { name: '所属企业名称' },
                                  { name: '环节类型' },
                                  { name: '姓名' },
                                  { name: '联系电话' },
                                  { name: '通讯地址' },
                                  { name: '传真' },
                                ]
                              }
                            ]
                          },
                          {
                            name: "对象数据",
                            collapsed: true,
                            children: [
                              {
                                name: "基本数据",
                                collapsed: true,
                                children: [
                                  { name: '产品名称' },
                                  { name: '标识符' },
                                  { name: '产品品牌' },
                                  { name: '产品型号' },
                                  { name: '产品规格' },
                                  { name: '产品图片' },
                                  { name: '执行标准号' },
                                  { name: '尺寸' },
                                  { name: '材料' },
                                  { name: '质量' },
                                  { name: '售后服务说明' },
                                ]
                              },
                              {
                                name: "生产数据",
                                collapsed: true,
                                children: [
                                  { name: '生产日期' },
                                  { name: '生产批次' },
                                  { name: '生产地址' },
                                  { name: '生产价格' },
                                  { name: '产品认证信息' },
                                  {
                                    name: '产品检验信息',
                                    collapsed: true,
                                    children: [
                                      { name: '检验企业名称' },
                                      { name: '检验企业代码' },
                                      { name: '检验时间' },
                                      { name: '检验编号' },
                                      { name: '检验结果' },
                                      { name: '被检产品名称' },
                                      { name: '被检产品批次' },
                                      { name: '被检产品编号' },
                                      { name: '生产企业名称' },
                                      { name: '生产企业代码' }
                                    ]

                                  }
                                ]
                              },
                              {
                                name: "技术参数数据",
                                collapsed: true,
                                children: [
                                  { name: '产品静态性能指标' },
                                  { name: '产品环境参数指标' },
                                  { name: '产品动态性能指标' },
                                  { name: '产品可靠性指标' },
                                  {
                                    name: '类型分类',
                                    collapsed: true,
                                    children: [
                                      { name: '分类名称' },
                                      { name: '规格型号' },
                                      { name: '分类参数' },
                                      { name: '用途类别' }
                                    ]
                                  },
                                  {
                                    name: '生产设备信息',
                                    collapsed: true,
                                    children: [
                                      { name: '设备名称' },
                                      { name: '设备编号' },
                                      { name: '设备简介' },
                                      { name: '设备出厂日期' },
                                      { name: '设备厂家名称' },
                                      { name: '设备厂家代码' },
                                      { name: '设备保修信息' },
                                      { name: '设备通讯地址' },
                                      { name: "设备通讯协议" }
                                    ]
                                  },
                                  {
                                    name: '技术特征信息',
                                    collapsed: true,
                                    children: [
                                      { name: '电气属性' },
                                      { name: '通信属性' },
                                      { name: '半导体属性' },
                                      { name: '电阻属性' },
                                      { name: '结构形式' },
                                      { name: '直径' },
                                      { name: '长度' },
                                      { name: '有害物质说明' }
                                    ]
                                  },
                                  {
                                    name: '证书信息',
                                    collapsed: true,
                                    children: [
                                      { name: '申请方' },
                                      { name: '使用方' },
                                      { name: '证书编号' },
                                      { name: '用途' },
                                      { name: '签发执行标准' },
                                      { name: '签发日期' },
                                      { name: '有效日期' },
                                      { name: '签发组织' },
                                      { name: '签发人' },
                                    ]
                                  },
                                ]
                              },
                              {
                                name: "仓储数据",
                                collapsed: true,
                                children: [
                                  { name: "产品名称" },
                                  { name: "产品型号" },
                                  { name: "标识符" },
                                  { name: "库位编号" },
                                  { name: "入库时间" },
                                  { name: "仓库环境信息" }
                                ]

                              },
                              {
                                name: "原料数据",
                                collapsed: true,
                                children: [
                                  { name: "原料名称" },
                                  { name: "规格型号" },
                                  { name: "生产时间" },
                                  { name: "生产企业" },
                                  { name: "生产企业代码" },
                                  { name: "标识符" }
                                ]

                              }
                            ]
                          },
                          {
                            name: "位置数据",
                            collapsed: true,
                            children: [
                              {
                                name: "地理位置",
                                collapsed: true,
                                children: [
                                  { name: '省份' },
                                  { name: '经纬度' }
                                ]
                              },
                              {
                                name: "功能位置",
                                collapsed: true,
                                children: [
                                  { name: '省份' },
                                  { name: '经纬度' }
                                ]
                              },
                            ]
                          }

                        ]

                    },
                    {
                      name: "网关",
                      collapsed: true,
                      children: [
                        {
                          name: "主体数据",
                          collapsed: true,
                          children: [
                            {
                              name: "生产企业",
                              collapsed: true,
                              children: [
                                { name: '生产企业编码' },
                                { name: '生产企业名称' },
                                { name: '生产企业简介' }
                              ]
                            },
                            {
                              name: "流通企业",
                              collapsed: true,
                              children: [
                                { name: '流通企业编码' },
                                { name: '流通企业名称' },
                                { name: '流通企业简介' }
                              ]
                            },
                            {
                              name: "使用单位",
                              collapsed: true,
                              children: [
                                { name: '使用单位编码' },
                                { name: '使用单位名称' },
                                { name: '使用单位简介' }
                              ]
                            },
                          ]
                        },
                        {
                          name: "对象数据",
                          collapsed: true,
                          children: [
                            {
                              name: "网关属性",
                              children: [
                                { name: '标识' },
                                { name: '名称' },
                                { name: '状态值' },
                                { name: '内存使用情况' },
                                { name: 'cpu核心数' },
                                { name: '操作系统版本' },
                                { name: 'IP地址' },
                                { name: '硬盘使用情况' },
                                { name: '当前优先级' }
                              ]
                            }
                          ]
                        },
                        {
                          name: "位置数据",
                          collapsed: true,
                          children: [
                            {
                              name: "地理位置",
                              collapsed: true,
                              children: [
                                { name: '省份' },
                                { name: '经纬度' }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      name: "......"
                    }
                  ]
                },
                {
                  name: "人员数据",
                  collapsed: true,
                  children: [
                    {
                      name: "所属企业名称"
                    },
                    {
                      name: "权限"
                    },
                    {
                      name: "通讯地址"
                    },
                    {
                      name: "所属环节"
                    }
                  ]
                },
                {
                  name: "物料数据",
                  collapsed: true,
                  children: [
                    {
                      name: "焊机",
                      collapsed: true,
                      children: [
                        {
                          name: "主体数据",
                          collapsed: true,
                          children: [
                            {
                              name: "生产企业",
                              collapsed: true,
                              children: [
                                { name: '生产企业编码' },
                                { name: '生产企业名称' },
                                { name: '生产企业简介' }
                              ]
                            },
                            {
                              name: "流通企业",
                              collapsed: true,
                              children: [
                                { name: '流通企业编码' },
                                { name: '流通企业名称' },
                                { name: '流通企业简介' }
                              ]
                            },
                            {
                              name: "使用单位",
                              collapsed: true,
                              children: [
                                { name: '使用单位编码' },
                                { name: '使用单位名称' },
                                { name: '使用单位简介' }
                              ]
                            },
                          ]
                        },
                        {
                          name: "对象数据",
                          collapsed: true,
                          children: [
                            {
                              name: "焊机属性",
                              children: [
                                { name: '标识' },
                                { name: '名称' },
                                { name: '型号' },
                                { name: '使用情况' },
                                { name: '操作人' }
                              ]
                            }
                          ]
                        },
                        {
                          name: "位置数据",
                          collapsed: true,
                          children: [
                            {
                              name: "地理位置",
                              collapsed: true,
                              children: [
                                { name: '省份' },
                                { name: '经纬度' }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      name: "车辆",
                      collapsed: true,
                      children: [
                        {
                          name: "主体数据",
                          collapsed: true,
                          children: [
                            {
                              name: "生产企业",
                              collapsed: true,
                              children: [
                                { name: '生产企业编码' },
                                { name: '生产企业名称' },
                                { name: '生产企业简介' }
                              ]
                            },
                            {
                              name: "流通企业",
                              collapsed: true,
                              children: [
                                { name: '流通企业编码' },
                                { name: '流通企业名称' },
                                { name: '流通企业简介' }
                              ]
                            },
                            {
                              name: "使用单位",
                              collapsed: true,
                              children: [
                                { name: '使用单位编码' },
                                { name: '使用单位名称' },
                                { name: '使用单位简介' }
                              ]
                            },
                          ]
                        },
                        {
                          name: "对象数据",
                          collapsed: true,
                          children: [
                            {
                              name: "车辆属性",
                              children: [
                                { name: '标识' },
                                { name: '车辆牌照' },
                                { name: '车辆类型' },
                                { name: '使用途径' },
                                { name: '最大载重' },
                                { name: '最大载客量' },
                                { name: '负责人' },
                                { name: '使用年限' }
                              ]
                            }
                          ]
                        },
                        {
                          name: "位置数据",
                          collapsed: true,
                          children: [
                            {
                              name: "地理位置",
                              collapsed: true,
                              children: [
                                { name: '省份' },
                                { name: '经纬度' }
                              ]
                            }
                          ]
                        }
                      ]
                    },

                    {
                      name: "......"
                    }

                  ]
                }
              ]



            },
            {
              name: "公司B",
              collapsed: false,
              children: [
                {
                  name: "企业数据",
                  collapsed: true,
                  children: [

                    { name: '企业编码' },
                    { name: '企业名称' },
                    { name: '企业简介' },
                    { name: '企业通讯地址' }
                  ]

                },
                {
                  name: "产品数据",
                  collapsed: false,
                  children: [

                    {
                      name: "网关",
                      collapsed: true,
                      children: [
                        {
                          name: "主体数据",
                          collapsed: true,
                          children: [
                            {
                              name: "生产企业",
                              collapsed: true,
                              children: [
                                { name: '生产企业编码' },
                                { name: '生产企业名称' },
                                { name: '生产企业简介' }
                              ]
                            },
                            {
                              name: "流通企业",
                              collapsed: true,
                              children: [
                                { name: '流通企业编码' },
                                { name: '流通企业名称' },
                                { name: '流通企业简介' }
                              ]
                            },
                            {
                              name: "使用单位",
                              collapsed: true,
                              children: [
                                { name: '使用单位编码' },
                                { name: '使用单位名称' },
                                { name: '使用单位简介' }
                              ]
                            },
                          ]
                        },
                        {
                          name: "对象数据",
                          collapsed: true,
                          children: [
                            {
                              name: "网关属性",
                              children: [
                                { name: '标识' },
                                { name: '名称' },
                                { name: '状态值' },
                                { name: '内存使用情况' },
                                { name: 'cpu核心数' },
                                { name: '操作系统版本' },
                                { name: 'IP地址' },
                                { name: '硬盘使用情况' },
                                { name: '当前优先级' }
                              ]
                            }
                          ]
                        },
                        {
                          name: "位置数据",
                          collapsed: true,
                          children: [
                            {
                              name: "地理位置",
                              collapsed: true,
                              children: [
                                { name: '省份' },
                                { name: '经纬度' }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      name: "......"
                    }
                  ]
                },
                {
                  name: "人员数据",
                  collapsed: true,
                  children: [
                    {
                      name: "所属企业名称"
                    },
                    {
                      name: "权限"
                    },
                    {
                      name: "通讯地址"
                    },
                    {
                      name: "所属环节"
                    }
                  ]
                },
                {
                  name: "物料数据",
                  collapsed: true,
                  children: [
                    {
                      name: "车辆",
                      collapsed: true,
                      children: [
                        {
                          name: "主体数据",
                          collapsed: true,
                          children: [
                            {
                              name: "生产企业",
                              collapsed: true,
                              children: [
                                { name: '生产企业编码' },
                                { name: '生产企业名称' },
                                { name: '生产企业简介' }
                              ]
                            },
                            {
                              name: "流通企业",
                              collapsed: true,
                              children: [
                                { name: '流通企业编码' },
                                { name: '流通企业名称' },
                                { name: '流通企业简介' }
                              ]
                            },
                            {
                              name: "使用单位",
                              collapsed: true,
                              children: [
                                { name: '使用单位编码' },
                                { name: '使用单位名称' },
                                { name: '使用单位简介' }
                              ]
                            },
                          ]
                        },
                        {
                          name: "对象数据",
                          collapsed: true,
                          children: [
                            {
                              name: "车辆属性",
                              children: [
                                { name: '标识' },
                                { name: '车辆牌照' },
                                { name: '车辆类型' },
                                { name: '使用途径' },
                                { name: '最大载重' },
                                { name: '最大载客量' },
                                { name: '负责人' },
                                { name: '使用年限' }
                              ]
                            }
                          ]
                        },
                        {
                          name: "位置数据",
                          collapsed: true,
                          children: [
                            {
                              name: "地理位置",
                              collapsed: true,
                              children: [
                                { name: '省份' },
                                { name: '经纬度' }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      name: "......"
                    }

                  ]
                }
              ]
            },
            {
              name: "......"
            }

          ]
        },
        modle: [
          {
            name: "线缆",
            collapsed: false,
            children:
              [
                {
                  name: "主体数据",
                  collapsed: true,
                  children: [
                    {
                      name: "生产企业",
                      collapsed: true,
                      children: [
                        { name: '生产企业编码' },
                        { name: '生产企业名称' },
                        { name: '生产企业简介' }
                      ]
                    },
                    {
                      name: "流通企业",
                      collapsed: true,
                      children: [
                        { name: '流通企业编码' },
                        { name: '流通企业名称' },
                        { name: '流通企业简介' }
                      ]
                    },
                    {
                      name: "使用单位",
                      collapsed: true,
                      children: [
                        { name: '使用单位编码' },
                        { name: '使用单位名称' },
                        { name: '使用单位简介' }
                      ]
                    },
                    {
                      name: "消费者",
                      collapsed: true,
                      children: [
                        { name: '所属企业名称' },
                        { name: '环节类型' },
                        { name: '姓名' },
                        { name: '联系电话' },
                        { name: '通讯地址' },
                        { name: '传真' },
                      ]
                    }
                  ]
                },
                {
                  name: "对象数据",
                  collapsed: true,
                  children: [
                    {
                      name: "基本数据",
                      collapsed: true,
                      children: [
                        { name: '产品名称' },
                        { name: '标识符' },
                        { name: '产品品牌' },
                        { name: '产品型号' },
                        { name: '产品规格' },
                        { name: '产品图片' },
                        { name: '执行标准号' },
                        { name: '尺寸' },
                        { name: '材料' },
                        { name: '质量' },
                        { name: '售后服务说明' },
                      ]
                    },
                    {
                      name: "生产数据",
                      collapsed: true,
                      children: [
                        { name: '生产日期' },
                        { name: '生产批次' },
                        { name: '生产地址' },
                        { name: '生产价格' },
                        { name: '产品认证信息' },
                        {
                          name: '产品检验信息',
                          collapsed: true,
                          children: [
                            { name: '检验企业名称' },
                            { name: '检验企业代码' },
                            { name: '检验时间' },
                            { name: '检验编号' },
                            { name: '检验结果' },
                            { name: '被检产品名称' },
                            { name: '被检产品批次' },
                            { name: '被检产品编号' },
                            { name: '生产企业名称' },
                            { name: '生产企业代码' }
                          ]

                        }
                      ]
                    },
                    {
                      name: "技术参数数据",
                      collapsed: true,
                      children: [
                        { name: '产品静态性能指标' },
                        { name: '产品环境参数指标' },
                        { name: '产品动态性能指标' },
                        { name: '产品可靠性指标' },
                        {
                          name: '类型分类',
                          collapsed: true,
                          children: [
                            { name: '分类名称' },
                            { name: '规格型号' },
                            { name: '分类参数' },
                            { name: '用途类别' }
                          ]
                        },
                        {
                          name: '生产设备信息',
                          collapsed: true,
                          children: [
                            { name: '设备名称' },
                            { name: '设备编号' },
                            { name: '设备简介' },
                            { name: '设备出厂日期' },
                            { name: '设备厂家名称' },
                            { name: '设备厂家代码' },
                            { name: '设备保修信息' },
                            { name: '设备通讯地址' },
                            { name: "设备通讯协议" }
                          ]
                        },
                        {
                          name: '技术特征信息',
                          collapsed: true,
                          children: [
                            { name: '电气属性' },
                            { name: '通信属性' },
                            { name: '半导体属性' },
                            { name: '电阻属性' },
                            { name: '结构形式' },
                            { name: '直径' },
                            { name: '长度' },
                            { name: '有害物质说明' }
                          ]
                        },
                        {
                          name: '证书信息',
                          collapsed: true,
                          children: [
                            { name: '申请方' },
                            { name: '使用方' },
                            { name: '证书编号' },
                            { name: '用途' },
                            { name: '签发执行标准' },
                            { name: '签发日期' },
                            { name: '有效日期' },
                            { name: '签发组织' },
                            { name: '签发人' },
                          ]
                        },
                      ]
                    },
                    {
                      name: "仓储数据",
                      collapsed: true,
                      children: [
                        { name: "产品名称" },
                        { name: "产品型号" },
                        { name: "标识符" },
                        { name: "库位编号" },
                        { name: "入库时间" },
                        { name: "仓库环境信息" }
                      ]

                    },
                    {
                      name: "原料数据",
                      collapsed: true,
                      children: [
                        { name: "原料名称" },
                        { name: "规格型号" },
                        { name: "生产时间" },
                        { name: "生产企业" },
                        { name: "生产企业代码" },
                        { name: "标识符" }
                      ]

                    }
                  ]
                },
                {
                  name: "位置数据",
                  collapsed: true,
                  children: [
                    {
                      name: "地理位置",
                      collapsed: true,
                      children: [
                        { name: '省份' },
                        { name: '经纬度' }
                      ]
                    },
                    {
                      name: "功能位置",
                      collapsed: true,
                      children: [
                        { name: '省份' },
                        { name: '经纬度' }
                      ]
                    },
                  ]
                }

              ]

          },
          {
            name: "网关",
            collapsed: false,
            children: [
              {
                name: "主体数据",
                collapsed: true,
                children: [
                  {
                    name: "生产企业",
                    collapsed: true,
                    children: [
                      { name: '生产企业编码' },
                      { name: '生产企业名称' },
                      { name: '生产企业简介' }
                    ]
                  },
                  {
                    name: "流通企业",
                    collapsed: true,
                    children: [
                      { name: '流通企业编码' },
                      { name: '流通企业名称' },
                      { name: '流通企业简介' }
                    ]
                  },
                  {
                    name: "使用单位",
                    collapsed: true,
                    children: [
                      { name: '使用单位编码' },
                      { name: '使用单位名称' },
                      { name: '使用单位简介' }
                    ]
                  },
                ]
              },
              {
                name: "对象数据",
                collapsed: true,
                children: [
                  {
                    name: "网关属性",
                    children: [
                      { name: '标识' },
                      { name: '名称' },
                      { name: '状态值' },
                      { name: '内存使用情况' },
                      { name: 'cpu核心数' },
                      { name: '操作系统版本' },
                      { name: 'IP地址' },
                      { name: '硬盘使用情况' },
                      { name: '当前优先级' }
                    ]
                  }
                ]
              },
              {
                name: "位置数据",
                collapsed: true,
                children: [
                  {
                    name: "地理位置",
                    collapsed: true,
                    children: [
                      { name: '省份' },
                      { name: '经纬度' }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "车辆",
            collapsed: false,
            children: [
              {
                name: "主体数据",
                collapsed: true,
                children: [
                  {
                    name: "生产企业",
                    collapsed: true,
                    children: [
                      { name: '生产企业编码' },
                      { name: '生产企业名称' },
                      { name: '生产企业简介' }
                    ]
                  },
                  {
                    name: "流通企业",
                    collapsed: true,
                    children: [
                      { name: '流通企业编码' },
                      { name: '流通企业名称' },
                      { name: '流通企业简介' }
                    ]
                  },
                  {
                    name: "使用单位",
                    collapsed: true,
                    children: [
                      { name: '使用单位编码' },
                      { name: '使用单位名称' },
                      { name: '使用单位简介' }
                    ]
                  },
                ]
              },
              {
                name: "对象数据",
                collapsed: true,
                children: [
                  {
                    name: "车辆属性",
                    children: [
                      { name: '标识' },
                      { name: '车辆牌照' },
                      { name: '车辆类型' },
                      { name: '使用途径' },
                      { name: '最大载重' },
                      { name: '最大载客量' },
                      { name: '负责人' },
                      { name: '使用年限' }
                    ]
                  }
                ]
              },
              {
                name: "位置数据",
                collapsed: true,
                children: [
                  {
                    name: "地理位置",
                    collapsed: true,
                    children: [
                      { name: '省份' },
                      { name: '经纬度' }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        qiye1: {
          name: "武汉开目信息技术股份有限公司",
          collapsed: false,
          children: [
            {
              name: "企业数据",
              collapsed: true,
              children: [

                { name: '企业编码' },
                { name: '企业名称' },
                { name: '企业简介' },
                { name: '企业通讯地址' }
              ]

            },
            {
              name: "产品数据",
              collapsed: false,
              children: [
                {
                  name: "线缆",
                  collapsed: true,
                  children:
                    [
                      {
                        name: "主体数据",
                        collapsed: true,
                        children: [
                          {
                            name: "生产企业",
                            collapsed: true,
                            children: [
                              { name: '生产企业编码' },
                              { name: '生产企业名称' },
                              { name: '生产企业简介' }
                            ]
                          },
                          {
                            name: "流通企业",
                            collapsed: true,
                            children: [
                              { name: '流通企业编码' },
                              { name: '流通企业名称' },
                              { name: '流通企业简介' }
                            ]
                          },
                          {
                            name: "使用单位",
                            collapsed: true,
                            children: [
                              { name: '使用单位编码' },
                              { name: '使用单位名称' },
                              { name: '使用单位简介' }
                            ]
                          },
                          {
                            name: "消费者",
                            collapsed: true,
                            children: [
                              { name: '所属企业名称' },
                              { name: '环节类型' },
                              { name: '姓名' },
                              { name: '联系电话' },
                              { name: '通讯地址' },
                              { name: '传真' },
                            ]
                          }
                        ]
                      },
                      {
                        name: "对象数据",
                        collapsed: true,
                        children: [
                          {
                            name: "基本数据",
                            collapsed: true,
                            children: [
                              { name: '产品名称' },
                              { name: '标识符' },
                              { name: '产品品牌' },
                              { name: '产品型号' },
                              { name: '产品规格' },
                              { name: '产品图片' },
                              { name: '执行标准号' },
                              { name: '尺寸' },
                              { name: '材料' },
                              { name: '质量' },
                              { name: '售后服务说明' },
                            ]
                          },
                          {
                            name: "生产数据",
                            collapsed: true,
                            children: [
                              { name: '生产日期' },
                              { name: '生产批次' },
                              { name: '生产地址' },
                              { name: '生产价格' },
                              { name: '产品认证信息' },
                              {
                                name: '产品检验信息',
                                collapsed: true,
                                children: [
                                  { name: '检验企业名称' },
                                  { name: '检验企业代码' },
                                  { name: '检验时间' },
                                  { name: '检验编号' },
                                  { name: '检验结果' },
                                  { name: '被检产品名称' },
                                  { name: '被检产品批次' },
                                  { name: '被检产品编号' },
                                  { name: '生产企业名称' },
                                  { name: '生产企业代码' }
                                ]

                              }
                            ]
                          },
                          {
                            name: "技术参数数据",
                            collapsed: true,
                            children: [
                              { name: '产品静态性能指标' },
                              { name: '产品环境参数指标' },
                              { name: '产品动态性能指标' },
                              { name: '产品可靠性指标' },
                              {
                                name: '类型分类',
                                collapsed: true,
                                children: [
                                  { name: '分类名称' },
                                  { name: '规格型号' },
                                  { name: '分类参数' },
                                  { name: '用途类别' }
                                ]
                              },
                              {
                                name: '生产设备信息',
                                collapsed: true,
                                children: [
                                  { name: '设备名称' },
                                  { name: '设备编号' },
                                  { name: '设备简介' },
                                  { name: '设备出厂日期' },
                                  { name: '设备厂家名称' },
                                  { name: '设备厂家代码' },
                                  { name: '设备保修信息' },
                                  { name: '设备通讯地址' },
                                  { name: "设备通讯协议" }
                                ]
                              },
                              {
                                name: '技术特征信息',
                                collapsed: true,
                                children: [
                                  { name: '电气属性' },
                                  { name: '通信属性' },
                                  { name: '半导体属性' },
                                  { name: '电阻属性' },
                                  { name: '结构形式' },
                                  { name: '直径' },
                                  { name: '长度' },
                                  { name: '有害物质说明' }
                                ]
                              },
                              {
                                name: '证书信息',
                                collapsed: true,
                                children: [
                                  { name: '申请方' },
                                  { name: '使用方' },
                                  { name: '证书编号' },
                                  { name: '用途' },
                                  { name: '签发执行标准' },
                                  { name: '签发日期' },
                                  { name: '有效日期' },
                                  { name: '签发组织' },
                                  { name: '签发人' },
                                ]
                              },
                            ]
                          },
                          {
                            name: "仓储数据",
                            collapsed: true,
                            children: [
                              { name: "产品名称" },
                              { name: "产品型号" },
                              { name: "标识符" },
                              { name: "库位编号" },
                              { name: "入库时间" },
                              { name: "仓库环境信息" }
                            ]

                          },
                          {
                            name: "原料数据",
                            collapsed: true,
                            children: [
                              { name: "原料名称" },
                              { name: "规格型号" },
                              { name: "生产时间" },
                              { name: "生产企业" },
                              { name: "生产企业代码" },
                              { name: "标识符" }
                            ]

                          }
                        ]
                      },
                      {
                        name: "位置数据",
                        collapsed: true,
                        children: [
                          {
                            name: "地理位置",
                            collapsed: true,
                            children: [
                              { name: '省份' },
                              { name: '经纬度' }
                            ]
                          },
                          {
                            name: "功能位置",
                            collapsed: true,
                            children: [
                              { name: '省份' },
                              { name: '经纬度' }
                            ]
                          },
                        ]
                      }

                    ]

                },
                {
                  name: "网关",
                  collapsed: true,
                  children: [
                    {
                      name: "主体数据",
                      collapsed: true,
                      children: [
                        {
                          name: "生产企业",
                          collapsed: true,
                          children: [
                            { name: '生产企业编码' },
                            { name: '生产企业名称' },
                            { name: '生产企业简介' }
                          ]
                        },
                        {
                          name: "流通企业",
                          collapsed: true,
                          children: [
                            { name: '流通企业编码' },
                            { name: '流通企业名称' },
                            { name: '流通企业简介' }
                          ]
                        },
                        {
                          name: "使用单位",
                          collapsed: true,
                          children: [
                            { name: '使用单位编码' },
                            { name: '使用单位名称' },
                            { name: '使用单位简介' }
                          ]
                        },
                      ]
                    },
                    {
                      name: "对象数据",
                      collapsed: true,
                      children: [
                        {
                          name: "网关属性",
                          children: [
                            { name: '标识' },
                            { name: '名称' },
                            { name: '状态值' },
                            { name: '内存使用情况' },
                            { name: 'cpu核心数' },
                            { name: '操作系统版本' },
                            { name: 'IP地址' },
                            { name: '硬盘使用情况' },
                            { name: '当前优先级' }
                          ]
                        }
                      ]
                    },
                    {
                      name: "位置数据",
                      collapsed: true,
                      children: [
                        {
                          name: "地理位置",
                          collapsed: true,
                          children: [
                            { name: '省份' },
                            { name: '经纬度' }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              name: "人员数据",
              collapsed: true,
              children: [
                {
                  name: "所属企业名称"
                },
                {
                  name: "权限"
                },
                {
                  name: "通讯地址"
                },
                {
                  name: "所属环节"
                }
              ]
            },
            {
              name: "物料数据",
              collapsed: true,
              children: [
                {
                  name: "焊机",
                  collapsed: true,
                  children: [
                    {
                      name: "主体数据",
                      collapsed: true,
                      children: [
                        {
                          name: "生产企业",
                          collapsed: true,
                          children: [
                            { name: '生产企业编码' },
                            { name: '生产企业名称' },
                            { name: '生产企业简介' }
                          ]
                        },
                        {
                          name: "流通企业",
                          collapsed: true,
                          children: [
                            { name: '流通企业编码' },
                            { name: '流通企业名称' },
                            { name: '流通企业简介' }
                          ]
                        },
                        {
                          name: "使用单位",
                          collapsed: true,
                          children: [
                            { name: '使用单位编码' },
                            { name: '使用单位名称' },
                            { name: '使用单位简介' }
                          ]
                        },
                      ]
                    },
                    {
                      name: "对象数据",
                      collapsed: true,
                      children: [
                        {
                          name: "焊机属性",
                          children: [
                            { name: '标识' },
                            { name: '名称' },
                            { name: '型号' },
                            { name: '使用情况' },
                            { name: '操作人' }
                          ]
                        }
                      ]
                    },
                    {
                      name: "位置数据",
                      collapsed: true,
                      children: [
                        {
                          name: "地理位置",
                          collapsed: true,
                          children: [
                            { name: '省份' },
                            { name: '经纬度' }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  name: "车辆",
                  collapsed: true,
                  children: [
                    {
                      name: "主体数据",
                      collapsed: true,
                      children: [
                        {
                          name: "生产企业",
                          collapsed: true,
                          children: [
                            { name: '生产企业编码' },
                            { name: '生产企业名称' },
                            { name: '生产企业简介' }
                          ]
                        },
                        {
                          name: "流通企业",
                          collapsed: true,
                          children: [
                            { name: '流通企业编码' },
                            { name: '流通企业名称' },
                            { name: '流通企业简介' }
                          ]
                        },
                        {
                          name: "使用单位",
                          collapsed: true,
                          children: [
                            { name: '使用单位编码' },
                            { name: '使用单位名称' },
                            { name: '使用单位简介' }
                          ]
                        },
                      ]
                    },
                    {
                      name: "对象数据",
                      collapsed: true,
                      children: [
                        {
                          name: "车辆属性",
                          children: [
                            { name: '标识' },
                            { name: '车辆牌照' },
                            { name: '车辆类型' },
                            { name: '使用途径' },
                            { name: '最大载重' },
                            { name: '最大载客量' },
                            { name: '负责人' },
                            { name: '使用年限' }
                          ]
                        }
                      ]
                    },
                    {
                      name: "位置数据",
                      collapsed: true,
                      children: [
                        {
                          name: "地理位置",
                          collapsed: true,
                          children: [
                            { name: '省份' },
                            { name: '经纬度' }
                          ]
                        }
                      ]
                    }
                  ]
                }

              ]
            }
          ]



        },
        qiye2: {
          name: "武汉虹信科技发展有限责任公司",
          collapsed: false,
          children: [
            {
              name: "企业数据",
              collapsed: true,
              children: [

                { name: '企业编码' },
                { name: '企业名称' },
                { name: '企业简介' },
                { name: '企业通讯地址' }
              ]

            },
            {
              name: "产品数据",
              collapsed: false,
              children: [

                {
                  name: "网关",
                  collapsed: true,
                  children: [
                    {
                      name: "主体数据",
                      collapsed: true,
                      children: [
                        {
                          name: "生产企业",
                          collapsed: true,
                          children: [
                            { name: '生产企业编码' },
                            { name: '生产企业名称' },
                            { name: '生产企业简介' }
                          ]
                        },
                        {
                          name: "流通企业",
                          collapsed: true,
                          children: [
                            { name: '流通企业编码' },
                            { name: '流通企业名称' },
                            { name: '流通企业简介' }
                          ]
                        },
                        {
                          name: "使用单位",
                          collapsed: true,
                          children: [
                            { name: '使用单位编码' },
                            { name: '使用单位名称' },
                            { name: '使用单位简介' }
                          ]
                        },
                      ]
                    },
                    {
                      name: "对象数据",
                      collapsed: true,
                      children: [
                        {
                          name: "网关属性",
                          children: [
                            { name: '标识' },
                            { name: '名称' },
                            { name: '状态值' },
                            { name: '内存使用情况' },
                            { name: 'cpu核心数' },
                            { name: '操作系统版本' },
                            { name: 'IP地址' },
                            { name: '硬盘使用情况' },
                            { name: '当前优先级' }
                          ]
                        }
                      ]
                    },
                    {
                      name: "位置数据",
                      collapsed: true,
                      children: [
                        {
                          name: "地理位置",
                          collapsed: true,
                          children: [
                            { name: '省份' },
                            { name: '经纬度' }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              name: "人员数据",
              collapsed: true,
              children: [
                {
                  name: "所属企业名称"
                },
                {
                  name: "权限"
                },
                {
                  name: "通讯地址"
                },
                {
                  name: "所属环节"
                }
              ]
            },
            {
              name: "物料数据",
              collapsed: true,
              children: [
                {
                  name: "车辆",
                  collapsed: true,
                  children: [
                    {
                      name: "主体数据",
                      collapsed: true,
                      children: [
                        {
                          name: "生产企业",
                          collapsed: true,
                          children: [
                            { name: '生产企业编码' },
                            { name: '生产企业名称' },
                            { name: '生产企业简介' }
                          ]
                        },
                        {
                          name: "流通企业",
                          collapsed: true,
                          children: [
                            { name: '流通企业编码' },
                            { name: '流通企业名称' },
                            { name: '流通企业简介' }
                          ]
                        },
                        {
                          name: "使用单位",
                          collapsed: true,
                          children: [
                            { name: '使用单位编码' },
                            { name: '使用单位名称' },
                            { name: '使用单位简介' }
                          ]
                        },
                      ]
                    },
                    {
                      name: "对象数据",
                      collapsed: true,
                      children: [
                        {
                          name: "车辆属性",
                          children: [
                            { name: '标识' },
                            { name: '车辆牌照' },
                            { name: '车辆类型' },
                            { name: '使用途径' },
                            { name: '最大载重' },
                            { name: '最大载客量' },
                            { name: '负责人' },
                            { name: '使用年限' }
                          ]
                        }
                      ]
                    },
                    {
                      name: "位置数据",
                      collapsed: true,
                      children: [
                        {
                          name: "地理位置",
                          collapsed: true,
                          children: [
                            { name: '省份' },
                            { name: '经纬度' }
                          ]
                        }
                      ]
                    }
                  ]
                }

              ]
            }
          ]
        },
        treeData: {},
        chart: '',
        lastqiye: "",
        tempqiye: {
          name: "",
          collapsed: false,
          flag: 0,
          children: [
            {
              name: "企业数据",
              collapsed: false,
              children: []
            },
            {
              name: "产品数据",
              collapsed: false,
              children: []
            },
            {
              name: "人员数据",
              collapsed: false,
              children: []
            },
            {
              name: "物料数据",
              collapsed: false,
              children: []
            }
          ]
        }

      }
    },
    methods: {
      handleClick(tab, event) {
        this.activeName = tab.name;
      },
      addQiye() {
        this.options.push(
          {
            "label": this.newqiye,
            "value": this.newqiye
          }
        )
        this.tempqiye.name = this.newqiye
        // this.qiyename = this.newqiye
        // this.getTreeData()
        this.addqiye = false
        this.newqiye = ""
        this.$message({
          message: '创建成功！',
          type: 'success'
        });
      },
      addModle() {
        this.addmodle = true
      },
      addModleSubmit() {
        var flag = 0
        var i
        for (var k = 0; k < this.nowp.data.children.length; k++) {
          if (this.nowp.data.children[k].name == this.addmodlename) {
            flag = 1
            this.$message.error('已存在该模型！')
            return
          }
        }
        for (i = 0; i < this.modle.length; i++) {
          if (this.modle[i].name == this.addmodlename) {
            flag = 1
            break
          }
        }
        if (flag == 0) {
          //新增普通节点
          if (this.nowp.data.children != null) {
            this.nowp.data.children.push(
              {
                name: this.addmodlename,
                children: []
              }
            )
          } else {
            this.nowp.data.children =
              [{
                name: this.addmodlename,
                children: []
              }]

          }
          this.treeData = this.chart.getOption().series[0].data[0]
          this.initChart()
          this.addleaf = false
          this.leafinput = false
        } else {
          //新增固定节点
          if (this.nowp.data.children != null) {
            this.nowp.data.children.push(this.modle[i])
          } else {
            this.nowp.data.children = this.modle[i]

          }
          this.treeData = this.chart.getOption().series[0].data[0]
          //this.chart.clear()
          this.initChart()
          this.addleaf = false
          this.leafinput = false
        }
        this.addmodle = false
        this.addmodlename = ""
      },
      //保存新建的元模型
      saveModle() {
        var flag = 0
        for (var i = 0; i < this.modle.length; i++) {
          if (this.nowp.data.name == this.modle[i].name) {
            flag = 1
            this.$message.error('核心元数据模型中已存在该模型！')
            return
            //break
          }
        }
        if (flag != 1) {
          this.modle.push(this.nowp.data)
        }
        this.$message({
          message: '保存成功！',
          type: 'success'
        });
      },
      //对树状图节点进行增删改
      editLeaf() {
        this.nowpname = this.nowp.data.name
        this.editleaf = true
      },

      addLeaf() {
        this.newpname = ""
        this.addleaf = true
      },
      editLeafSubmit() {
        // var p
        // for (var i = 1; i < this.nowp.treeAncestors.length; i++) {
        // 	console.log(this.nowp.treeAncestors[i].name)
        // 	//第一次，引用
        // 	if (i == 1) {
        // 		p = this.treeData.children
        // 		continue
        // 	}
        // 	//最后一次，修改值
        // 	if (i == this.nowp.treeAncestors.length - 1) {
        // 		for (var j = 0; j < p.length; j++) {
        // 			if (p[j].name == this.nowp.treeAncestors[i].name) {
        // 				p[j].name = this.nowpname
        // 				console.log(this.treeData)
        // 				this.initChart()
        // 				break
        // 			}
        // 		}
        // 	}
        // 	for (var j = 0; j < p.length; j++) {
        // 		if (p[j].name == this.nowp.treeAncestors[i].name) {
        // 			p = p[j].children
        // 		}
        // 	}
        // }
        this.nowp.data.name = this.nowpname
        this.treeData = this.chart.getOption().series[0].data[0]
        //this.chart.clear()
        this.initChart()
        this.editleaf = false
        this.leafinput = false

      },
      addLeafSubmit() {
        // var p
        // for (var i = 1; i < this.nowp.treeAncestors.length; i++) {
        // 	console.log(this.nowp.treeAncestors[i].name)
        // 	//第一次，引用
        // 	if (i == 1) {
        // 		p = this.treeData.children
        // 		continue
        // 	}
        // 	//最后一次，添加子节点
        // 	if (i == this.nowp.treeAncestors.length - 1) {
        // 		for (var j = 0; j < p.length; j++) {
        // 			if (p[j].name == this.nowp.treeAncestors[i].name) {
        // 				if (p[j].children != null) {
        // 					p[j].children.push(
        // 						{
        // 							name: this.newpname,
        // 							children: []
        // 						}
        // 					)
        // 				} else {
        // 					p[j].children =
        // 						[{
        // 							name: this.newpname,
        // 							children: []
        // 						}]

        // 				}
        // 				this.initChart()
        // 				break
        // 			}
        // 		}
        // 	}
        // 	for (var j = 0; j < p.length; j++) {
        // 		if (p[j].name == this.nowp.treeAncestors[i].name) {
        // 			p = p[j].children
        // 		}
        // 	}
        // }
        if (this.nowp.data.children != null) {
          this.nowp.data.children.push(
            {
              name: this.newpname,
              children: []
            }
          )
        } else {
          this.nowp.data.children =
            [{
              name: this.newpname,
              children: []
            }]

        }
        this.treeData = this.chart.getOption().series[0].data[0]
        //this.chart.clear()
        this.initChart()
        this.addleaf = false
        this.leafinput = false
      },
      deleteLeaf() {
        this.$confirm('此操作将永久删除该节点及其子节点, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.treeData = this.chart.getOption().series[0].data[0]
          var p
          for (var i = 1; i < this.nowp.treeAncestors.length; i++) {
            console.log(this.nowp.treeAncestors[i].name)
            //第一次，引用
            if (i == 1) {
              p = this.treeData.children
              continue
            }
            //最后一次，删除自身
            if (i == this.nowp.treeAncestors.length - 1) {
              for (var j = 0; j < p.length; j++) {
                if (p[j].name == this.nowp.treeAncestors[i].name) {
                  p = p.splice(j, 1)
                  this.initChart()
                  this.leafinput = false
                  this.$message({
                    message: '删除成功！',
                    type: 'success'
                  });
                  break
                }
              }
            }
            for (var j = 0; j < p.length; j++) {
              if (p[j].name == this.nowp.treeAncestors[i].name) {
                p = p[j].children
              }
            }
          }
        });
      },
      //根据不同企业绘制不同的树形图
      qiyeTree() {
        if (this.lastqiye == "武汉开目信息技术股份有限公司") {
          this.qiye1 = this.chart.getOption().series[0].data[0]
        } else if (this.lastqiye == "武汉虹信科技发展有限责任公司") {
          this.qiye2 = this.chart.getOption().series[0].data[0]
        } else if (this.tempqiye.flag == 0) {
          this.tempqiye.flag = 1
        } else {
          this.tempqiye = this.chart.getOption().series[0].data[0]
        }
        this.chart.clear()
        this.lastqiye = this.qiyename
        this.getTreeData()
      },


      querySearch(queryString, cb) {
        var tableNames = [];
        for (var i = 0; i < this.tableNames.length; i++) {
          var obj = {};
          obj["value"] = this.tableNames[i].TABLE_NAME.toString();
          tableNames.push(obj);
        }
        console.log(1, tableNames);
        var results = queryString ? tableNames.filter(this.createFilter(queryString)) : tableNames;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (tableName) => {
          return (tableName.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      //跳转到表格详情页
      selectTable(obj) {
        this.$router.push({ path: "/table", query: { tableName: obj.TABLE_NAME } });
      },
      //获取表格列表
      getTableList() {
        this.requestData = {
          "databaseType": global.dbtype,
          "operate": "find",
          "sql": "select TABLE_NAME,TABLE_COMMENT from information_schema.TABLES where TABLE_SCHEMA='gateway'"
        }
        axios({
          url: "http://111.4.83.67:59000/request",
          method: 'POST',
          dataType: 'json',
          data: this.requestData
        }).then(res => {
          this.tableNames = JSON.parse(JSON.stringify(res.data.data));
          this.tableNames = this.tableNames.filter((x) => x.TABLE_NAME !== "metadata_table");
          this.getTableTree()
        })
      },
      //新建表格
      addTable() {
        this.addtableVisible = true
      },
      addCol() {
        this.isnull_checked = false
        this.pri_checked = false
        this.colform = []
        this.addcolVisible = true
        this.operate = 'add'
      },
      addColSubmit() {
        if (this.operate == 'add') {
          this.ziduanList.push({
            name: this.colform.name,
            type: this.colform.type,
            col_length: this.colform.col_length,
            isnull: (this.isnull_checked ? "√" : ""),
            key: (this.pri_checked ? "PRI" : ""),
            description: this.colform.description
          })
        } else if (this.operate == 'edit') {
          this.ziduanList[this.editIndex] = this.colform
        }
        this.addcolVisible = false
        this.colform = {}
        this.isnull_checked = false
        this.pri_checked = false
      },
      addTableSubmit() {
        this.submittableVisible = true
      },
      addTableSubmit2() { //读取表单数据生成sql语句
        var sql = "CREATE TABLE `gateway`.`" + this.newtable.name + "`  ("
        var key = "("
        for (var i = 0; i < this.ziduanList.length; i++) {
          sql = sql + " `" + this.ziduanList[i].name + "` " + this.ziduanList[i].type
          if (this.ziduanList[i].type == "char" || this.ziduanList[i].type == "varchar") {
            sql = sql + "(" + this.ziduanList[i].col_length + ")"
          }
          if (this.ziduanList[i].isnull == "") {
            sql = sql + " NULL "
          } else {
            sql = sql + " NOT NULL "
          }
          if (this.ziduanList[i].description != "") {
            sql = sql + "COMMENT '" + this.ziduanList[i].description + "',"
          } else {
            sql = sql + ","
          }
          if (this.ziduanList[i].key == "PRI") {
            key = key + "`" + this.ziduanList[i].name + "`,"
          }
        }
        if (key == "(") {
          sql = sql.slice(0, -1) //去掉最后一个逗号，sql语句到此结束
          sql = sql + ")"
        } else {
          key = key.slice(0, -1)
          key = key + ")"
          sql = sql + "PRIMARY KEY " + key + ")"
        }
        if (this.newtable.description == "") {
          sql = sql + ";"
        } else {
          sql = sql + " COMMENT = '" + this.newtable.description + "';"
        }
        console.log(sql)
        this.requestData = {
          "databaseType": global.dbtype,
          "operate": "",
          "sql": sql
        }
        axios({
          url: "http://111.4.83.67:59000/request",
          method: 'POST',
          dataType: 'json',
          data: this.requestData
        }).then(res => {
          var sql1 = ''
          sql1 = "insert into metadata_table (metadata_name,metadata_cnname,metadata_subarea,metadata_owner,metadata_tip) values ('" +
            this.newtable.name + "','" + this.newtable.cnname + "','" + this.newtable.type + "','" + this.newtable.owner + "','" + this.newtable.tip + "'); "
          this.requestData = {
            "databaseType": global.dbtype,
            "operate": "",
            "sql": sql1
          }
          axios({
            url: "http://111.4.83.67:59000/request",
            method: 'POST',
            dataType: 'json',
            data: this.requestData
          }).then(res => {
            this.ziduanList = []
            this.colform = {}
            this.isnull_checked = false
            this.pri_checked = false
            this.submittableVisible = false
            this.addtableVisible = false
            this.getTableList()
            this.$message({
              message: '已成功创建数据表！',
              type: 'success'
            })
          }).catch((error) => {
            this.$message.error('请检查您的输入是否有误！');
          })
        }).catch((error) => {
          this.$message.error('请检查您的输入是否有误！');
        })
      },
      //搜索表格
      searchTable() {
        if (this.searchTableName != '') {
          this.requestData = {
            "databaseType": global.dbtype,
            "operate": "find",
            "sql": "select TABLE_NAME,TABLE_COMMENT from information_schema.TABLES where TABLE_SCHEMA='gateway' and TABLE_NAME='" + this.searchTableName + "'"
          }
          axios({
            url: "http://111.4.83.67:59000/request",
            method: 'POST',
            dataType: 'json',
            data: this.requestData
          }).then(res => {
            this.tableNames = JSON.parse(JSON.stringify(res.data.data));
          })
        } else {
          this.getTableList()
        }
      },
      //新建表时删除字段
      deleteCol(index, row) {
        this.$confirm('此操作将永久删除该字段, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.ziduanList.splice(index, 1)
          this.$message({
            message: '删除成功！',
            type: 'success'
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //新建表时编辑已有的字段
      editCol(index, row) {
        this.colform = this.ziduanList[index]
        console.log(this.colform)
        if (this.colform.isnull == "√") {
          this.isnull_checked = true
        }
        if (this.colform.key == "PRI") {
          this.pri_checked = true
        }
        this.addcolVisible = true
        this.operate = 'edit'
        this.editIndex = index
      },

      //展开开关
      openAll(value) {
        if (this.value1 == true) {
          this.initChart(4)
        } else {
          this.initChart(3)
        }
      },
      //初始化树状图
      initChart() {
        this.chart.setOption({
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
          },
          series: [
            {
              type: 'tree',
              //orient: 'vertical',
              data: [this.treeData],
              expandAndCollapse: true,

              top: '0%',
              left: '10%',
              bottom: '5%',
              right: '15%',
              //initialTreeDepth: 2,

              symbolSize: 12,

              label: {
                normal: {
                  position: 'top',
                  verticalAlign: 'middle',
                  align: 'left',
                  fontSize: 12,
                  formatter: '{b}'
                }
              },

              leaves: {
                label: {
                  normal: {
                    position: 'right',
                    verticalAlign: 'middle',
                    align: 'left'
                  }
                }
              },
              animationDuration: 550,
              animationDurationUpdate: 750,
            }
          ]
        })
      },
      mainClick() {
        this.contextmenu = false
        this.$refs.rightMenu.style.display = 'none';
        this.$refs.rightMenu2.style.display = 'none';
        this.$refs.rightMenu3.style.display = 'none';
      },
      clickNode(params) {
        console.log('params', params)
        this.nowp = params

        if (this.nowp.data.name == "产品数据" || this.nowp.data.name == "物料数据") {
          //这两种数据可以直接加模型
          this.contextmenu = true
          this.$refs.rightMenu2.style.display = 'block';
          // // //让自定义菜单随鼠标的箭头位置移动
          this.$refs.rightMenu2.style.left = params.event.offsetX + 130 + 'px'
          this.$refs.rightMenu2.style.top = params.event.offsetY + 90 + 'px'
        } else if (this.nowp.dataIndex == 1) {
          //根节点，只能新建
          this.contextmenu = true
          this.$refs.rightMenu3.style.display = 'block';
          // // //让自定义菜单随鼠标的箭头位置移动
          this.$refs.rightMenu3.style.left = params.event.offsetX + 130 + 'px'
          this.$refs.rightMenu3.style.top = params.event.offsetY + 90 + 'px'
        } else {
          this.contextmenu = true
          this.$refs.rightMenu.style.display = 'block';
          // // //让自定义菜单随鼠标的箭头位置移动
          this.$refs.rightMenu.style.left = params.event.offsetX + 130 + 'px'
          this.$refs.rightMenu.style.top = params.event.offsetY + 90 + 'px'
        }
      },
      clickNode2(param) {
        if (!param.data.hasChild) {
          //param.data.collapsed=true;
          console.log(param.data.collapsed);
          if (param.data.collapsed == undefined || param.data.collapsed == true) {
            console.log("未定义或者是未展开，下次即将展开");
            param.data.collapsed = false;
          } else {
            console.log("下次不展开");
            param.data.collapsed = true;
          }
        }
      },
      getTreeData() {
        // axios.get('../../static/treedata.json').then(res => {
        // 	this.treeData = res.data
        // 	this.chart = echarts.init(document.getElementById('tree'))
        // 	this.chart.on('contextmenu', this.clickNode)
        // 	this.initChart()
        // })
        if (this.qiyename == "武汉开目信息技术股份有限公司") {
          this.treeData = this.qiye1
        } else if (this.qiyename == "武汉虹信科技发展有限责任公司") {
          this.treeData = this.qiye2
        } else if (this.qiyename == "") {
          // this.treeData = {
          // 	name: "核心元数据",
          // 	collapsed: false,
          // 	children: []
          // }
          // this.treeData.children.push(
          // 	{
          // 		name: "公司A",
          // 		collapsed: false,
          // 		children: this.qiye1.children
          // 	}
          // )
          // this.treeData.children.push(
          // 	{
          // 		name: "公司B",
          // 		collapsed: false,
          // 		children: this.qiye2.children
          // 	}
          // )
          // this.treeData.children.push(
          // 	{
          // 		name: "......"
          // 	}
          // )
          this.treeData = this.startTree
        } else {
          this.treeData = this.tempqiye
        }
        this.chart = echarts.init(document.getElementById('tree'))
        this.chart.on('contextmenu', this.clickNode)
        this.chart.on('click', this.clickNode2)
        this.initChart()
      },


    },
    created() {
      if (this.$route.query.activeName != null) {
        this.activeName = this.$route.query.activeName;
      }

      this.getTableList()
    },
    mounted() {
      this.getTreeData()
    }
  }

</script>

<style>
  .zuiwaiceng {
    width: 100%;
    margin: 0;
  }

  .zuiwaiceng .tou {
    width: 100%;
    padding: 0;
  }

  .zuiwaiceng .tou .page-header {
    background-color: #364155;
    height: 7vh;
    align-items: center;
    width: 100%;
    margin-left: 0;
    margin-right: 0;
  }

  .tableCards {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    margin: 10px;
    padding: 12px;
    display: grid;
    grid-template-columns: repeat(4, 22%);
    /* 声明行间距和列间距 */
    grid-gap: 5% 3%;
  }

  .tableCard {
    position: relative;
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    margin: 10px;
  }

  .tableName {
    width: 90%;
    overflow: hidden;
    /*超出部分隐藏*/
    text-overflow: ellipsis;
    /*超出部分省略号表示*/
    white-space: nowrap;
    /*强制单行显示*/
    display: inline-block;
  }

  .menu {
    /*这个样式不写，右键弹框会一直显示在画布的左下角*/
    position: absolute;
    background: rgb(255, 255, 255);
    border-radius: 5px;
    left: -99999px;
    top: -999999px;
    z-index: 1;
    width: 90px;
    height: 160px;
    padding-left: 15px;
    box-shadow: 3px 3px 5px rgb(220, 220, 220);
  }

  .menu2 {
    /*这个样式不写，右键弹框会一直显示在画布的左下角*/
    position: absolute;
    background: rgb(255, 255, 255);
    border-radius: 5px;
    left: -99999px;
    top: -999999px;
    z-index: 1;
    width: 90px;
    height: 160px;
    padding-left: 15px;
    box-shadow: 3px 3px 5px rgb(220, 220, 220);
  }

  .menu3 {
    /*这个样式不写，右键弹框会一直显示在画布的左下角*/
    position: absolute;
    background: rgb(255, 255, 255);
    border-radius: 5px;
    left: -99999px;
    top: -999999px;
    z-index: 1;
    width: 130px;
    height: 40px;
    padding-left: 15px;
    box-shadow: 3px 3px 5px rgb(220, 220, 220);
  }

  .menu ul {
    list-style: none
  }

  .menu ul li {
    padding: 5px 10px;
    color: #228EFB;
    border-bottom: 1px dashed #228EFB;
    font-size: 17px;
  }

  .menu ul li:last-child {
    border-bottom: none;
  }
</style>

