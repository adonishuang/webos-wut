<template>
  <el-container class="main-con">
    <el-header class="index-header">
      <navcon></navcon>
    </el-header>
    <el-main class="index-main">
      <div>
        <el-form :inline="true" class="dept-search">
          <el-form-item>
            <el-input
              v-model="query.name"
              placeholder="请输入企业名"
              style="width:150px"
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="query.code"
              placeholder="请输入企业编码"
              style="width:150px"
            />
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" icon="el-icon-search" @click="getList()">搜索</el-button>
            <el-button size="small" type="primary" icon="el-icon-plus" @click="handleCreate()">添加</el-button>
          </el-form-item>
        </el-form>
        <!--    企业卡片-->
        <div class="dept-show">
          <el-row :gutter="20">
            <el-col :span="6" v-for="item in deptData" :key="item.enterprisename" style="margin-top: 20px">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>{{ item.enterprisename }}</span>
                  <el-button style="float: right; padding: 3px 0" type="text" @click="openDialog()">详情</el-button>
                </div>
                <div class="card-context">
                  <el-descriptions column="1">
                    <el-descriptions-item label="企业编码">
                      <el-tag type="info">
                        {{ item.enterprisecode }}
                      </el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label="备注">
                      <el-tag>{{ item.enterprisedetail }}</el-tag>
                    </el-descriptions-item>
                  </el-descriptions>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>

        <!--    详情-弹窗-->
        <el-dialog title="企业详情" :visible.sync="editFormVisible" width="70%" @click="closeDialog">
          <el-card class="box-card1">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
              <el-tab-pane label="车间列表" name="first">
                <el-table :data="farmData" size="small" highlight-current-row border style="width: 100%;">
                  <el-table-column align="center" sortable prop="farmName" label="车间名称" width="200px">
                  </el-table-column>
                  <el-table-column align="center" sortable prop="farmCode" label="车间编码" width="200px">
                  </el-table-column>
                  <el-table-column align="center" sortable prop="farmDetail" label="车间描述" width="200px">
                  </el-table-column>
                  <el-table-column align="center" label="操作" min-width="200px">
                    <template slot-scope="scope">
                      <el-button size="mini" @click="farmEdit(scope.$index, scope.row)">编辑</el-button>
                      <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="属性列表" name="second">
                <el-table size="small" highlight-current-row border style="width: 100%;">
                  <el-table-column align="center" sortable prop="deptName" label="属性名称" width="200px">
                  </el-table-column>
                  <el-table-column align="center" sortable prop="userName" label="属性编码" width="200px">
                  </el-table-column>
                  <el-table-column align="center" sortable prop="userRealName" label="属性值" width="200px">
                  </el-table-column>
                  <el-table-column align="center" label="操作" min-width="200px">
                    <template slot-scope="scope">
                      <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                      <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="企业元模型" name="third" >
                <Tablelist></Tablelist>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-dialog>

        <!--        新增-弹窗-->
        <el-dialog :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="企业名称">
              <el-input v-model="form.enterprisename" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="企业编码">
              <el-input v-model="form.enterprisecode" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="企业描述">
              <el-input v-model="form.enterprisedetail" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Navcon from "@/components/navcon";
import Tablelist from "@/views/system/tablelist";
export default {
  name: "model",
  components: {Navcon,Tablelist},
  data() {
    return {
      activeName: 'first',
      editFormVisible: false,
      dialogFormVisible: false,
      //企业数据
      deptData: [
      //   {
      //   id: 1,
      //   enterprisename: '武汉洪山区通信企业',
      //   enterprisecode: 'WHHS000001',
      //   enterprisedetail: '通信'
      // },{
      //   id: 3,
      //   enterprisename: '武汉洪山区通信企业',
      //   enterprisecode: 'WHHS000002',
      //   enterprisedetail: '光纤制造'
      // },{
      //   id: 4,
      //   enterprisename: '武汉洪山区芯片设计工厂',
      //   enterprisecode: 'WHHS000003',
      //   enterprisedetail: '芯片设计'
      // },{
      //   id: 5,
      //   enterprisename: '武汉洪山区智能制造企业',
      //   enterprisecode: 'WHHS000004',
      //   enterprisedetail: '智能制造'
      // },{
      //   id: 1231232313,
      //   enterprisename: '武汉虹信通信技术有限责任公司',
      //   enterprisecode: 'WHHS000007',
      //   enterprisedetail: '通信'
      // },{
      //   id: 12312311233,
      //   enterprisename: '烽火通信科技股份有限公司',
      //   enterprisecode: 'WHJX000001',
      //   enterprisedetail: '通信'
      // },{
      //   id: 123123897733,
      //   enterprisename: '虹信无线通信产业园',
      //   enterprisecode: 'WHJX000002',
      //   enterprisedetail: '通信'
      // },{
      //   id: 69612237697978368,
      //   enterprisename: '武汉洪山区新能源汽车制造企业',
      //   enterprisecode: 'WHHS000005',
      //   enterprisedetail: '新能源汽车'
      // },{
      //   id: 69612655568097280,
      //   enterprisename: '武汉洪山区医药品制造企业',
      //   enterprisecode: 'WHHS000006',
      //   enterprisedetail: '口罩'
      // },{
      //   id: 74298751908450304,
      //   enterprisename: '华为武汉研究所',
      //   enterprisecode: 'WHJX000008',
      //   enterprisedetail: '通信'
      // }
      ],
      total: 0,
      query: {
        page: 1,
        size: 15,
        name: '',
        code: ''
      },
      form: {
        id: '',
        enterprisename: '',
        enterprisecode: '',
        enterprisedetail: ''
      },
      farmData: [
        {
          farmName: '通用厂房A',
          farmCode: '00001',
          farmDetail: '通信信息网络系统集成厂房',
        },
        {
          farmName: '通用厂房B',
          farmCode: '00002',
          farmDetail: '货物进出口厂房',
        },
        {
          farmName: '通用厂房C',
          farmCode: '00003',
          farmDetail: '电子元器件厂房',
        },
        {
          farmName: '动力中心',
          farmCode: '00004',
          farmDetail: '',
        },
        {
          farmName: '员工宿舍A',
          farmCode: '00005',
          farmDetail: '厂房倒班宿舍',
        },
      ],
    }
  },
  mounted() {
    // this.getTreeData();
    this.getList();
  },
  methods: {
    getList() {
      this.axios.get('http://111.4.83.67:53313/modelData/getList', {
        params: {
          page: this.query.page,
          size: this.query.size,
          enterprisename: this.query.name,
          enterprisecode: this.query.code,
        }
      }).then((resp) => {
        console.log(resp);
        this.deptData = resp.data.content.list;
        this.total = resp.data.content.total;
      })
    },
    handleCreate() {
      this.dialogFormVisible = true
    },
    openDialog() {
      this.editFormVisible = true
    },
    closeDialog() {
      this.editFormVisible = false
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    submitForm() {
      console.log(this.form),
      this.axios.post('http://111.4.83.67:53313/modelData/getList', this.form).then((resp) => {
        let data = resp.data;
        if (data.success) {
          this.dialogFormVisible = false;
          this.form = {};
          this.getList();
          this.$message({
            message: '操作成功',
            type: 'success'
          });
        }
      })
    },
  }

}
</script>

<style scoped>
.dept-search {
  margin-top: 20px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  height: 200px;
}

.index-header,
.index-main {
  padding: 0px;
  border-left: 2px solid #333;
}

.main-con {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}

.detail-dialog {
  display: flex;
}
</style>
