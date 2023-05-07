/**
* 系统管理 用户管理
*/
<template>
  <div>
    <!-- $搜索筛选 -->
    <el-form inline="true" :model="formInline" class="user-search">
      <el-form-item label="用户名称">
        <el-input
          placeholder="请输入用户名"
          style="width:240px"
        />
      </el-form-item>
      <el-form-item label="所属部门">
        <el-select placeholder="请选择活动区域">
          <el-option label="管理员" value="admin"></el-option>
          <el-option label="用户" value="user"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button>添加</el-button>
      </el-form-item>
    </el-form>
    <!--$列表-->
    <el-table size="small" @selection-change="selectChange" :data="userData" highlight-current-row v-loading="loading"
              border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column align="center" type="selection" width="50">
      </el-table-column>
      <el-table-column align="center" sortable prop="deptName" label="公司" width="120">
      </el-table-column>
      <el-table-column align="center" sortable prop="userName" label="用户名" width="120">
      </el-table-column>
      <el-table-column align="center" sortable prop="userRealName" label="姓名" width="120">
      </el-table-column>
      <el-table-column align="center" sortable prop="userMobile" label="手机号" width="120">
      </el-table-column>
      <el-table-column align="center" sortable prop="userSex" label="性别" min-width="50">
      </el-table-column>
      <el-table-column align="center" sortable prop="userEmail" label="邮件" min-width="120">
      </el-table-column>
      <el-table-column align="center" sortable prop="isLock" label="状态" min-width="100">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isLock=='N'?nshow:fshow" active-color="#13ce66" inactive-color="#ff4949"
                     @change="editType(scope.$index, scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <!-- $编辑界面 已会 -->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click='closeDialog("edit")'>
      <el-form label-width="80px" ref="editForm" :module="editForm" :rules="rules">
        <el-form-item label="用户名" prop="userName">
          <el-input size="small" v-model="editForm.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="userRealName">
          <el-input size="small" v-model="editForm.userRealName"
                    placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select size="small" v-model="editForm.roleId" placeholder="请选择" class="userRole">
            <el-option label="企业管理员" value="1"></el-option>
            <el-option label="普通用户" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="userMobile">
          <el-input size="small" v-model="editForm.userMobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="邮件" prop="userEmail">
          <el-input size="small" v-model="editForm.userEmail" placeholder="请输入邮箱地址"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="userSex">
          <el-radio v-model="editForm.userSex" label="男">男</el-radio>
          <el-radio v-model="editForm.userSex" label="女">女</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeDialog("edit")'>取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm('editForm')">保存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入请求方法
import {
  userSave,
  userDelete,
  userLock,
  UserDeptdeptTree,
  UserChangeDept
} from '../../api/userMG'
import Pagination from '../../components/Pagination'

export default {
  data() {
    return {
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      title: '添加用户',
      editFormVisible: false, //控制编辑页面显示与隐藏
      dataAccessshow: false, //控制数据权限显示与隐藏
      unitAccessshow: false, //控制所属单位隐藏与显示
      // 编辑与添加
      editForm: {
        userId: '',
        userName: '',
        userRealName: '',
        roleId: '',
        userMobile: '',
        userEmail: '',
        userSex: '',
        token: localStorage.getItem('logintoken')
      },
      // 部门参数
      unitparm: {
        userIds: '',
        deptId: '',
        deptName: ''
      },
      // 选择数据
      selectdata: [],
      // rules表单验证
      rules: {
        userName: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        userRealName: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ],
        roleId: [{required: true, message: '请选择角色', trigger: 'blur'}],
        userMobile: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {
            pattern: /^1(3\d|47|5((?!4)\d)|7(0|1|[6-8])|8\d)\d{8,8}$/,
            required: true,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ],
        userEmail: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            required: true,
            message: '请输入正确的邮箱',
            trigger: 'blur'
          }
        ],
        userSex: [{required: true, message: '请选择性别', trigger: 'blur'}]
      },
      // 删除用户
      seletedata: {
        ids: '',
        token: localStorage.getItem('logintoken')
      },
      // 请求数据参数
      formInline: {
        page: 1,
        limit: 10,
        deptId: '',
        userName: '',
        isLock: ''
      },
      //用户数据
      userData: [],
      // 选中
      checkmenu: [],
      //参数role
      saveroleId: '',
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      }
    }
  },
  // 注册组件
  components: {
    Pagination
  },

  /**
   * 数据发生改变
   */
  watch: {},

  /**
   * 创建完毕
   */
  created() {
    this.getdata(this.formInline)
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    // 获取数据方法
    getdata(parameter) {
      this.loading = true
      // 模拟数据开始
      let res = {
        code: 0,
        msg: null,
        count: 12,
        data: [
          {
            addUser: '1',
            editUser: '1',
            addTime: null,
            editTime: 1527411068000,
            userId: 1,
            systemNo: 'pmd',
            userName: 'root',
            userPassword: 'e10adc3949ba59abbe56e057f20f883e',
            userRealName: '超级管理员',
            userSex: '女',
            userMobile: '138123456789',
            userEmail: '111@qq.com',
            isLock: 'N',
            deptId: 1,
            deptName: 'xxxx',
            roleId: 1
          },
        ]
      }
      this.loading = false
      this.userData = res.data
      // 分页赋值
      this.pageparm.currentPage = this.formInline.page
      this.pageparm.pageSize = this.formInline.limit
      this.pageparm.total = res.count
      // 模拟数据结束

      /***
       * 调用接口，注释上面模拟数据 取消下面注释
       */
      // 获取用户列表
      // userList(parameter).then(res => {
      //   this.loading = false
      //   if (res.success == false) {
      //     this.$message({
      //       type: 'info',
      //       message: res.msg
      //     })
      //   } else {
      //     this.userData = res.data
      //     // 分页赋值
      //     this.pageparm.currentPage = this.formInline.page
      //     this.pageparm.pageSize = this.formInline.limit
      //     this.pageparm.total = res.count
      //   }
      // })
    },
    // 分页插件事件
    callFather(parm) {
      this.formInline.page = parm.currentPage
      this.formInline.limit = parm.pageSize
      this.getdata(this.formInline)
    },
    //&搜索事件
    search() {
      this.getdata(this.formInline)
    },
    // 修改type
    editType: function (index, row) {
      this.loading = true
      let parm = {
        lock: '',
        userId: '',
        token: localStorage.getItem('logintoken')
      }
      parm.userId = row.userId
      let lock = row.isLock
      if (lock == 'N') {
        parm.lock = 'Y'
      } else {
        parm.lock = 'N'
      }
      // 修改状态
      userLock(parm).then(res => {
        this.loading = false
        if (res.success == false) {
          this.$message({
            type: 'info',
            message: res.msg
          })
        } else {
          this.$message({
            type: 'success',
            message: '状态修改成功'
          })
          this.getdata(this.formInline)
        }
      })
    },
    //$显示编辑界面
    handleEdit: function (index, row) {
      this.editFormVisible = true
      if (row != undefined && row != 'undefined') {
        this.title = '修改用户'
        this.editForm.userId = row.userId
        this.editForm.userName = row.userName
        this.editForm.userRealName = row.userRealName
        this.editForm.roleId = row.roleId
        this.editForm.userMobile = row.userMobile
        this.editForm.userEmail = row.userEmail
        this.editForm.userSex = row.userSex
      } else {
        this.title = '添加用户'
        this.editForm.userId = ''
        this.editForm.userName = ''
        this.editForm.userRealName = ''
        this.editForm.roleId = ''
        this.editForm.userMobile = ''
        this.editForm.userEmail = ''
        this.editForm.userSex = ''
      }
    },
    // $编辑、添加提交方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          // 请求方法
          userSave(this.editForm)
            .then(res => {
              this.editFormVisible = false
              this.loading = false
              if (res.success) {
                this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: '数据保存成功！'
                })
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              this.editFormVisible = false
              this.loading = false
              this.$message.error('保存失败，请稍后再试！')
            })
        } else {
          return false
        }
      })
    },
    // 选择复选框事件
    selectChange(val) {
      this.selectdata = val
    },
    // $关闭编辑、增加弹出框
    closeDialog(dialog) {
      if (dialog == 'edit') {
        this.editFormVisible = false
      } else if (dialog == 'perm') {
        this.dataAccessshow = false
      } else if (dialog == 'unit') {
        this.unitAccessshow = false
      }
    },
    // $删除用户
    deleteUser(index, row) {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除
          userDelete(row.id)
            .then(res => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '数据已删除!'
                })
                this.getdata(this.formInline)
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              this.loading = false
              this.$message.error('数据删除失败，请稍后再试！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除！'
          })
        })
    },
  }
}
</script>

<style scoped>
.user-search {
  margin-top: 20px;
}

.userRole {
  width: 100%;
}
</style>

