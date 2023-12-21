import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _31789336 = () => interopDefault(import('..\\pages\\access_control_report\\index.vue' /* webpackChunkName: "pages/access_control_report/index" */))
const _430aff0b = () => interopDefault(import('..\\pages\\announcement.vue' /* webpackChunkName: "pages/announcement" */))
const _71c66cc4 = () => interopDefault(import('..\\pages\\announcement_type.vue' /* webpackChunkName: "pages/announcement_type" */))
const _e27b6b44 = () => interopDefault(import('..\\pages\\announcement-new.vue' /* webpackChunkName: "pages/announcement-new" */))
const _22008378 = () => interopDefault(import('..\\pages\\announcements.vue' /* webpackChunkName: "pages/announcements" */))
const _5b260717 = () => interopDefault(import('..\\pages\\assign_permission\\index.vue' /* webpackChunkName: "pages/assign_permission/index" */))
const _36999816 = () => interopDefault(import('..\\pages\\attendance_modules.vue' /* webpackChunkName: "pages/attendance_modules" */))
const _2df0c60c = () => interopDefault(import('..\\pages\\attendance_report\\index.vue' /* webpackChunkName: "pages/attendance_report/index" */))
const _29f07e47 = () => interopDefault(import('..\\pages\\automation\\index.vue' /* webpackChunkName: "pages/automation/index" */))
const _756cac05 = () => interopDefault(import('..\\pages\\automation_mail_content.vue' /* webpackChunkName: "pages/automation_mail_content" */))
const _a87d2e24 = () => interopDefault(import('..\\pages\\branches\\index.vue' /* webpackChunkName: "pages/branches/index" */))
const _bca2722e = () => interopDefault(import('..\\pages\\camera.vue' /* webpackChunkName: "pages/camera" */))
const _98174b42 = () => interopDefault(import('..\\pages\\change_requests.vue' /* webpackChunkName: "pages/change_requests" */))
const _18d6c2db = () => interopDefault(import('..\\pages\\companies\\index.vue' /* webpackChunkName: "pages/companies/index" */))
const _a5fd86fc = () => interopDefault(import('..\\pages\\dashboard\\index.vue' /* webpackChunkName: "pages/dashboard/index" */))
const _7176f77c = () => interopDefault(import('..\\pages\\dashboard1111\\index.vue' /* webpackChunkName: "pages/dashboard1111/index" */))
const _205bd0e0 = () => interopDefault(import('..\\pages\\dashboard2\\index.vue' /* webpackChunkName: "pages/dashboard2/index" */))
const _6ef96994 = () => interopDefault(import('..\\pages\\date_range_picker_test.vue' /* webpackChunkName: "pages/date_range_picker_test" */))
const _7047b296 = () => interopDefault(import('..\\pages\\department.vue' /* webpackChunkName: "pages/department" */))
const _cb202fd2 = () => interopDefault(import('..\\pages\\department-mapping.vue' /* webpackChunkName: "pages/department-mapping" */))
const _d0da823a = () => interopDefault(import('..\\pages\\designation.vue' /* webpackChunkName: "pages/designation" */))
const _21c311a8 = () => interopDefault(import('..\\pages\\device\\index.vue' /* webpackChunkName: "pages/device/index" */))
const _0e46eb6c = () => interopDefault(import('..\\pages\\device_management\\index.vue' /* webpackChunkName: "pages/device_management/index" */))
const _546afefa = () => interopDefault(import('..\\pages\\device_notifications.vue' /* webpackChunkName: "pages/device_notifications" */))
const _3b37b26e = () => interopDefault(import('..\\pages\\devicelogs.vue' /* webpackChunkName: "pages/devicelogs" */))
const _00bb29c3 = () => interopDefault(import('..\\pages\\document_expiry.vue' /* webpackChunkName: "pages/document_expiry" */))
const _129ab08b = () => interopDefault(import('..\\pages\\employee_photo_upload.vue' /* webpackChunkName: "pages/employee_photo_upload" */))
const _4791698e = () => interopDefault(import('..\\pages\\employee_schedule\\index.vue' /* webpackChunkName: "pages/employee_schedule/index" */))
const _4f4803eb = () => interopDefault(import('..\\pages\\employee_to_report.vue' /* webpackChunkName: "pages/employee_to_report" */))
const _02c466f1 = () => interopDefault(import('..\\pages\\employees\\index.vue' /* webpackChunkName: "pages/employees/index" */))
const _c898dd38 = () => interopDefault(import('..\\pages\\generate_attendance_log.vue' /* webpackChunkName: "pages/generate_attendance_log" */))
const _6a3bc0df = () => interopDefault(import('..\\pages\\holidays.vue' /* webpackChunkName: "pages/holidays" */))
const _2d71faec = () => interopDefault(import('..\\pages\\host.vue' /* webpackChunkName: "pages/host" */))
const _fe521716 = () => interopDefault(import('..\\pages\\host1.vue' /* webpackChunkName: "pages/host1" */))
const _0d1aa096 = () => interopDefault(import('..\\pages\\hr_modules.vue' /* webpackChunkName: "pages/hr_modules" */))
const _09129fa2 = () => interopDefault(import('..\\pages\\leaves\\index.vue' /* webpackChunkName: "pages/leaves/index" */))
const _47b43455 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _d6291a62 = () => interopDefault(import('..\\pages\\login-bkp.vue' /* webpackChunkName: "pages/login-bkp" */))
const _b0a48160 = () => interopDefault(import('..\\pages\\login-template-middle.vue' /* webpackChunkName: "pages/login-template-middle" */))
const _a2482fa8 = () => interopDefault(import('..\\pages\\login1.vue' /* webpackChunkName: "pages/login1" */))
const _777874d2 = () => interopDefault(import('..\\pages\\loginTemplate1.vue' /* webpackChunkName: "pages/loginTemplate1" */))
const _19d5b8ee = () => interopDefault(import('..\\pages\\loginwithtoken.vue' /* webpackChunkName: "pages/loginwithtoken" */))
const _08394264 = () => interopDefault(import('..\\pages\\logout.vue' /* webpackChunkName: "pages/logout" */))
const _332572ee = () => interopDefault(import('..\\pages\\manager_dashboard.vue' /* webpackChunkName: "pages/manager_dashboard" */))
const _5975461c = () => interopDefault(import('..\\pages\\master\\index.vue' /* webpackChunkName: "pages/master/index" */))
const _543c6f1a = () => interopDefault(import('..\\pages\\modules.vue' /* webpackChunkName: "pages/modules" */))
const _28277a90 = () => interopDefault(import('..\\pages\\payroll_formula.vue' /* webpackChunkName: "pages/payroll_formula" */))
const _42798dec = () => interopDefault(import('..\\pages\\payroll_generate_date.vue' /* webpackChunkName: "pages/payroll_generate_date" */))
const _3a6c2059 = () => interopDefault(import('..\\pages\\payroll_modules.vue' /* webpackChunkName: "pages/payroll_modules" */))
const _cde0e358 = () => interopDefault(import('..\\pages\\payslip.vue' /* webpackChunkName: "pages/payslip" */))
const _1871fa8a = () => interopDefault(import('..\\pages\\purpose.vue' /* webpackChunkName: "pages/purpose" */))
const _3e11ecb2 = () => interopDefault(import('..\\pages\\qr-page.vue' /* webpackChunkName: "pages/qr-page" */))
const _05a12cfe = () => interopDefault(import('..\\pages\\report_notifications\\index.vue' /* webpackChunkName: "pages/report_notifications/index" */))
const _ba7f610a = () => interopDefault(import('..\\pages\\reportsemployeelog.vue' /* webpackChunkName: "pages/reportsemployeelog" */))
const _4f64071d = () => interopDefault(import('..\\pages\\reset-password.vue' /* webpackChunkName: "pages/reset-password" */))
const _2f786eba = () => interopDefault(import('..\\pages\\role.vue' /* webpackChunkName: "pages/role" */))
const _2c497722 = () => interopDefault(import('..\\pages\\role_old.vue' /* webpackChunkName: "pages/role_old" */))
const _577d75b4 = () => interopDefault(import('..\\pages\\salary\\index.vue' /* webpackChunkName: "pages/salary/index" */))
const _c63e410a = () => interopDefault(import('..\\pages\\salary_type.vue' /* webpackChunkName: "pages/salary_type" */))
const _0206b5c7 = () => interopDefault(import('..\\pages\\schedule\\index.vue' /* webpackChunkName: "pages/schedule/index" */))
const _7f590fd4 = () => interopDefault(import('..\\pages\\shift\\index.vue' /* webpackChunkName: "pages/shift/index" */))
const _04f0a3c3 = () => interopDefault(import('..\\pages\\sub-department.vue' /* webpackChunkName: "pages/sub-department" */))
const _4a89b381 = () => interopDefault(import('..\\pages\\tab.vue' /* webpackChunkName: "pages/tab" */))
const _81c8a1f6 = () => interopDefault(import('..\\pages\\timeline.vue' /* webpackChunkName: "pages/timeline" */))
const _aa5cf286 = () => interopDefault(import('..\\pages\\timezone.vue' /* webpackChunkName: "pages/timezone" */))
const _2449c496 = () => interopDefault(import('..\\pages\\timezone-copy.vue' /* webpackChunkName: "pages/timezone-copy" */))
const _ab9343da = () => interopDefault(import('..\\pages\\user\\index.vue' /* webpackChunkName: "pages/user/index" */))
const _0997ab8a = () => interopDefault(import('..\\pages\\visitor-dashboard-old.vue' /* webpackChunkName: "pages/visitor-dashboard-old" */))
const _047abe58 = () => interopDefault(import('..\\pages\\web_login_logs.vue' /* webpackChunkName: "pages/web_login_logs" */))
const _66e093a2 = () => interopDefault(import('..\\pages\\wizard.vue' /* webpackChunkName: "pages/wizard" */))
const _3ac3c0dc = () => interopDefault(import('..\\pages\\zone\\index.vue' /* webpackChunkName: "pages/zone/index" */))
const _314f2687 = () => interopDefault(import('..\\pages\\assign_permission\\create.vue' /* webpackChunkName: "pages/assign_permission/create" */))
const _cfcb6abc = () => interopDefault(import('..\\pages\\attendance_report\\general.vue' /* webpackChunkName: "pages/attendance_report/general" */))
const _e899ce86 = () => interopDefault(import('..\\pages\\attendance_report\\multi_inout.vue' /* webpackChunkName: "pages/attendance_report/multi_inout" */))
const _74654a66 = () => interopDefault(import('..\\pages\\branches\\1.vue' /* webpackChunkName: "pages/branches/1" */))
const _cba0bd6c = () => interopDefault(import('..\\pages\\community\\setup\\index.vue' /* webpackChunkName: "pages/community/setup/index" */))
const _edbc2cba = () => interopDefault(import('..\\pages\\community\\tanent\\index.vue' /* webpackChunkName: "pages/community/tanent/index" */))
const _4a6909b4 = () => interopDefault(import('..\\pages\\device_management\\create.vue' /* webpackChunkName: "pages/device_management/create" */))
const _5b5fda20 = () => interopDefault(import('..\\pages\\employee_schedule\\create.vue' /* webpackChunkName: "pages/employee_schedule/create" */))
const _4700e7f6 = () => interopDefault(import('..\\pages\\employee_schedule\\index_old.vue' /* webpackChunkName: "pages/employee_schedule/index_old" */))
const _38d727f7 = () => interopDefault(import('..\\pages\\employees\\announcements\\index.vue' /* webpackChunkName: "pages/employees/announcements/index" */))
const _eadb1e4c = () => interopDefault(import('..\\pages\\employees\\attendance.vue' /* webpackChunkName: "pages/employees/attendance" */))
const _648eec52 = () => interopDefault(import('..\\pages\\employees\\change_requests.vue' /* webpackChunkName: "pages/employees/change_requests" */))
const _7b65dc33 = () => interopDefault(import('..\\pages\\employees\\dashboard.vue' /* webpackChunkName: "pages/employees/dashboard" */))
const _1d2558e2 = () => interopDefault(import('..\\pages\\employees\\dashboard2.vue' /* webpackChunkName: "pages/employees/dashboard2" */))
const _11883088 = () => interopDefault(import('..\\pages\\employees\\devices.vue' /* webpackChunkName: "pages/employees/devices" */))
const _116dab68 = () => interopDefault(import('..\\pages\\employees\\holidays.vue' /* webpackChunkName: "pages/employees/holidays" */))
const _55d20910 = () => interopDefault(import('..\\pages\\employees\\index1.vue' /* webpackChunkName: "pages/employees/index1" */))
const _55e02091 = () => interopDefault(import('..\\pages\\employees\\index2.vue' /* webpackChunkName: "pages/employees/index2" */))
const _5d9e669e = () => interopDefault(import('..\\pages\\employees\\leave_notification\\index.vue' /* webpackChunkName: "pages/employees/leave_notification/index" */))
const _fa01db56 = () => interopDefault(import('..\\pages\\employees\\leaves\\index.vue' /* webpackChunkName: "pages/employees/leaves/index" */))
const _515b9760 = () => interopDefault(import('..\\pages\\employees\\logs.vue' /* webpackChunkName: "pages/employees/logs" */))
const _5cbe7e88 = () => interopDefault(import('..\\pages\\employees\\profile.vue' /* webpackChunkName: "pages/employees/profile" */))
const _1e4a9692 = () => interopDefault(import('..\\pages\\employees\\profile_old\\index.vue' /* webpackChunkName: "pages/employees/profile_old/index" */))
const _3a03bbc8 = () => interopDefault(import('..\\pages\\employees\\schedule.vue' /* webpackChunkName: "pages/employees/schedule" */))
const _0d1941d8 = () => interopDefault(import('..\\pages\\guard_old\\visitor_requests\\index.vue' /* webpackChunkName: "pages/guard_old/visitor_requests/index" */))
const _2fa0370c = () => interopDefault(import('..\\pages\\guard_old\\visitor-dashboard.vue' /* webpackChunkName: "pages/guard_old/visitor-dashboard" */))
const _6da880ab = () => interopDefault(import('..\\pages\\guard\\guard-dashboard.vue' /* webpackChunkName: "pages/guard/guard-dashboard" */))
const _504a180e = () => interopDefault(import('..\\pages\\guard\\host.vue' /* webpackChunkName: "pages/guard/host" */))
const _bb3328d6 = () => interopDefault(import('..\\pages\\guard\\requests.vue' /* webpackChunkName: "pages/guard/requests" */))
const _f208d8c0 = () => interopDefault(import('..\\pages\\guard\\visitor_list.vue' /* webpackChunkName: "pages/guard/visitor_list" */))
const _a04e8f9e = () => interopDefault(import('..\\pages\\guard\\visitor_logs.vue' /* webpackChunkName: "pages/guard/visitor_logs" */))
const _6352af2d = () => interopDefault(import('..\\pages\\guard\\visitors_report.vue' /* webpackChunkName: "pages/guard/visitors_report" */))
const _36572b7e = () => interopDefault(import('..\\pages\\leaves\\leave_types.vue' /* webpackChunkName: "pages/leaves/leave_types" */))
const _32ba5888 = () => interopDefault(import('..\\pages\\master\\assign_module\\index.vue' /* webpackChunkName: "pages/master/assign_module/index" */))
const _7e5ee7d1 = () => interopDefault(import('..\\pages\\master\\communities\\index.vue' /* webpackChunkName: "pages/master/communities/index" */))
const _20c2f73d = () => interopDefault(import('..\\pages\\master\\companies\\index.vue' /* webpackChunkName: "pages/master/companies/index" */))
const _72dfeef4 = () => interopDefault(import('..\\pages\\master\\device\\index.vue' /* webpackChunkName: "pages/master/device/index" */))
const _776d9592 = () => interopDefault(import('..\\pages\\master\\module.vue' /* webpackChunkName: "pages/master/module" */))
const _1ad6f494 = () => interopDefault(import('..\\pages\\master\\web_login_logs.vue' /* webpackChunkName: "pages/master/web_login_logs" */))
const _3d50248d = () => interopDefault(import('..\\pages\\payroll\\create.vue' /* webpackChunkName: "pages/payroll/create" */))
const _7b5aba02 = () => interopDefault(import('..\\pages\\payroll\\month.vue' /* webpackChunkName: "pages/payroll/month" */))
const _4e2051c7 = () => interopDefault(import('..\\pages\\payroll\\salary\\index.vue' /* webpackChunkName: "pages/payroll/salary/index" */))
const _5f1bdd46 = () => interopDefault(import('..\\pages\\report_notifications\\create.vue' /* webpackChunkName: "pages/report_notifications/create" */))
const _d905952c = () => interopDefault(import('..\\pages\\shift\\create.vue' /* webpackChunkName: "pages/shift/create" */))
const _5cab532a = () => interopDefault(import('..\\pages\\timezonemapping\\edit.vue' /* webpackChunkName: "pages/timezonemapping/edit" */))
const _69d0a5c0 = () => interopDefault(import('..\\pages\\timezonemapping\\employeedevicesmapping.vue' /* webpackChunkName: "pages/timezonemapping/employeedevicesmapping" */))
const _7b3ba202 = () => interopDefault(import('..\\pages\\timezonemapping\\list.vue' /* webpackChunkName: "pages/timezonemapping/list" */))
const _16c3444f = () => interopDefault(import('..\\pages\\timezonemapping\\new.vue' /* webpackChunkName: "pages/timezonemapping/new" */))
const _776ca1ea = () => interopDefault(import('..\\pages\\user\\create.vue' /* webpackChunkName: "pages/user/create" */))
const _7cae089e = () => interopDefault(import('..\\pages\\visitor\\requests.vue' /* webpackChunkName: "pages/visitor/requests" */))
const _eaa8f7ae = () => interopDefault(import('..\\pages\\visitor\\visitor_list.vue' /* webpackChunkName: "pages/visitor/visitor_list" */))
const _98eeae8c = () => interopDefault(import('..\\pages\\visitor\\visitor_logs.vue' /* webpackChunkName: "pages/visitor/visitor_logs" */))
const _28039bea = () => interopDefault(import('..\\pages\\visitor\\visitor-dashboard.vue' /* webpackChunkName: "pages/visitor/visitor-dashboard" */))
const _7a9b0604 = () => interopDefault(import('..\\pages\\visitor\\visitors_report.vue' /* webpackChunkName: "pages/visitor/visitors_report" */))
const _ce4bc528 = () => interopDefault(import('..\\pages\\zone\\create.vue' /* webpackChunkName: "pages/zone/create" */))
const _eebbaf04 = () => interopDefault(import('..\\pages\\community\\setup\\floor\\index.vue' /* webpackChunkName: "pages/community/setup/floor/index" */))
const _5434d60f = () => interopDefault(import('..\\pages\\community\\setup\\room\\index.vue' /* webpackChunkName: "pages/community/setup/room/index" */))
const _78c9f85a = () => interopDefault(import('..\\pages\\community\\setup\\room-category\\index.vue' /* webpackChunkName: "pages/community/setup/room-category/index" */))
const _4f8b12cf = () => interopDefault(import('..\\pages\\employees\\attendance_report\\general.vue' /* webpackChunkName: "pages/employees/attendance_report/general" */))
const _0ffa026a = () => interopDefault(import('..\\pages\\employees\\attendance_report\\multi_inout.vue' /* webpackChunkName: "pages/employees/attendance_report/multi_inout" */))
const _7535c6e2 = () => interopDefault(import('..\\pages\\employees\\leaves\\leaves_quota.vue' /* webpackChunkName: "pages/employees/leaves/leaves_quota" */))
const _242a9300 = () => interopDefault(import('..\\pages\\employees\\payroll\\create.vue' /* webpackChunkName: "pages/employees/payroll/create" */))
const _f416f2a8 = () => interopDefault(import('..\\pages\\employees\\payroll\\month.vue' /* webpackChunkName: "pages/employees/payroll/month" */))
const _265e628f = () => interopDefault(import('..\\pages\\employees\\payroll\\payslips.vue' /* webpackChunkName: "pages/employees/payroll/payslips" */))
const _7d238f18 = () => interopDefault(import('..\\pages\\employees\\payroll\\salary\\index.vue' /* webpackChunkName: "pages/employees/payroll/salary/index" */))
const _156bee82 = () => interopDefault(import('..\\pages\\master\\assign_module\\create.vue' /* webpackChunkName: "pages/master/assign_module/create" */))
const _75325d0d = () => interopDefault(import('..\\pages\\master\\communities\\create.vue' /* webpackChunkName: "pages/master/communities/create" */))
const _1f503b21 = () => interopDefault(import('..\\pages\\master\\companies\\create.vue' /* webpackChunkName: "pages/master/companies/create" */))
const _a3df8aec = () => interopDefault(import('..\\pages\\master\\device\\create\\index.vue' /* webpackChunkName: "pages/master/device/create/index" */))
const _4857c7dc = () => interopDefault(import('..\\pages\\employees\\payroll\\salary\\_id.vue' /* webpackChunkName: "pages/employees/payroll/salary/_id" */))
const _052edc89 = () => interopDefault(import('..\\pages\\master\\communities\\details\\_id.vue' /* webpackChunkName: "pages/master/communities/details/_id" */))
const _a22a48c6 = () => interopDefault(import('..\\pages\\master\\companies\\details\\_id.vue' /* webpackChunkName: "pages/master/companies/details/_id" */))
const _289f5772 = () => interopDefault(import('..\\pages\\master\\device\\create\\_id.vue' /* webpackChunkName: "pages/master/device/create/_id" */))
const _fd2d5676 = () => interopDefault(import('..\\pages\\register\\visitor\\walkin\\_id.vue' /* webpackChunkName: "pages/register/visitor/walkin/_id" */))
const _91f33b82 = () => interopDefault(import('..\\pages\\companies\\details\\_id.vue' /* webpackChunkName: "pages/companies/details/_id" */))
const _336b80c2 = () => interopDefault(import('..\\pages\\device\\time_settings\\_id.vue' /* webpackChunkName: "pages/device/time_settings/_id" */))
const _4f0a9524 = () => interopDefault(import('..\\pages\\master\\assign_module\\_id.vue' /* webpackChunkName: "pages/master/assign_module/_id" */))
const _5d12ab0e = () => interopDefault(import('..\\pages\\master\\communities\\_id.vue' /* webpackChunkName: "pages/master/communities/_id" */))
const _83a0b636 = () => interopDefault(import('..\\pages\\master\\companies\\_id.vue' /* webpackChunkName: "pages/master/companies/_id" */))
const _2972746e = () => interopDefault(import('..\\pages\\master\\device\\_id.vue' /* webpackChunkName: "pages/master/device/_id" */))
const _c953cc22 = () => interopDefault(import('..\\pages\\payroll\\salary\\_id.vue' /* webpackChunkName: "pages/payroll/salary/_id" */))
const _b6a9a39a = () => interopDefault(import('..\\pages\\register\\visitor\\_id.vue' /* webpackChunkName: "pages/register/visitor/_id" */))
const _70b27946 = () => interopDefault(import('..\\pages\\salary\\details\\_id.vue' /* webpackChunkName: "pages/salary/details/_id" */))
const _4cf2bd1c = () => interopDefault(import('..\\pages\\shift\\edit\\_id.vue' /* webpackChunkName: "pages/shift/edit/_id" */))
const _42d507b2 = () => interopDefault(import('..\\pages\\zone\\single\\_id.vue' /* webpackChunkName: "pages/zone/single/_id" */))
const _01e8e33f = () => interopDefault(import('..\\pages\\assign_permission\\_id.vue' /* webpackChunkName: "pages/assign_permission/_id" */))
const _6d447ffa = () => interopDefault(import('..\\pages\\companies\\_id.vue' /* webpackChunkName: "pages/companies/_id" */))
const _7158776a = () => interopDefault(import('..\\pages\\dashboard\\_id.vue' /* webpackChunkName: "pages/dashboard/_id" */))
const _11543824 = () => interopDefault(import('..\\pages\\leavecount\\_id.vue' /* webpackChunkName: "pages/leavecount/_id" */))
const _d6484fae = () => interopDefault(import('..\\pages\\report_notifications\\_id.vue' /* webpackChunkName: "pages/report_notifications/_id" */))
const _005e1188 = () => interopDefault(import('..\\pages\\shift\\_id.vue' /* webpackChunkName: "pages/shift/_id" */))
const _f6492456 = () => interopDefault(import('..\\pages\\theme\\_id.vue' /* webpackChunkName: "pages/theme/_id" */))
const _030d6f69 = () => interopDefault(import('..\\pages\\timezonemapping\\_id.vue' /* webpackChunkName: "pages/timezonemapping/_id" */))
const _f44a6d8a = () => interopDefault(import('..\\pages\\user\\_id.vue' /* webpackChunkName: "pages/user/_id" */))
const _381a430c = () => interopDefault(import('..\\pages\\zone\\_id.vue' /* webpackChunkName: "pages/zone/_id" */))
const _7e0c913e = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/access_control_report",
    component: _31789336,
    name: "access_control_report"
  }, {
    path: "/announcement",
    component: _430aff0b,
    name: "announcement"
  }, {
    path: "/announcement_type",
    component: _71c66cc4,
    name: "announcement_type"
  }, {
    path: "/announcement-new",
    component: _e27b6b44,
    name: "announcement-new"
  }, {
    path: "/announcements",
    component: _22008378,
    name: "announcements"
  }, {
    path: "/assign_permission",
    component: _5b260717,
    name: "assign_permission"
  }, {
    path: "/attendance_modules",
    component: _36999816,
    name: "attendance_modules"
  }, {
    path: "/attendance_report",
    component: _2df0c60c,
    name: "attendance_report"
  }, {
    path: "/automation",
    component: _29f07e47,
    name: "automation"
  }, {
    path: "/automation_mail_content",
    component: _756cac05,
    name: "automation_mail_content"
  }, {
    path: "/branches",
    component: _a87d2e24,
    name: "branches"
  }, {
    path: "/camera",
    component: _bca2722e,
    name: "camera"
  }, {
    path: "/change_requests",
    component: _98174b42,
    name: "change_requests"
  }, {
    path: "/companies",
    component: _18d6c2db,
    name: "companies"
  }, {
    path: "/dashboard",
    component: _a5fd86fc,
    name: "dashboard"
  }, {
    path: "/dashboard1111",
    component: _7176f77c,
    name: "dashboard1111"
  }, {
    path: "/dashboard2",
    component: _205bd0e0,
    name: "dashboard2"
  }, {
    path: "/date_range_picker_test",
    component: _6ef96994,
    name: "date_range_picker_test"
  }, {
    path: "/department",
    component: _7047b296,
    name: "department"
  }, {
    path: "/department-mapping",
    component: _cb202fd2,
    name: "department-mapping"
  }, {
    path: "/designation",
    component: _d0da823a,
    name: "designation"
  }, {
    path: "/device",
    component: _21c311a8,
    name: "device"
  }, {
    path: "/device_management",
    component: _0e46eb6c,
    name: "device_management"
  }, {
    path: "/device_notifications",
    component: _546afefa,
    name: "device_notifications"
  }, {
    path: "/devicelogs",
    component: _3b37b26e,
    name: "devicelogs"
  }, {
    path: "/document_expiry",
    component: _00bb29c3,
    name: "document_expiry"
  }, {
    path: "/employee_photo_upload",
    component: _129ab08b,
    name: "employee_photo_upload"
  }, {
    path: "/employee_schedule",
    component: _4791698e,
    name: "employee_schedule"
  }, {
    path: "/employee_to_report",
    component: _4f4803eb,
    name: "employee_to_report"
  }, {
    path: "/employees",
    component: _02c466f1,
    name: "employees"
  }, {
    path: "/generate_attendance_log",
    component: _c898dd38,
    name: "generate_attendance_log"
  }, {
    path: "/holidays",
    component: _6a3bc0df,
    name: "holidays"
  }, {
    path: "/host",
    component: _2d71faec,
    name: "host"
  }, {
    path: "/host1",
    component: _fe521716,
    name: "host1"
  }, {
    path: "/hr_modules",
    component: _0d1aa096,
    name: "hr_modules"
  }, {
    path: "/leaves",
    component: _09129fa2,
    name: "leaves"
  }, {
    path: "/login",
    component: _47b43455,
    name: "login"
  }, {
    path: "/login-bkp",
    component: _d6291a62,
    name: "login-bkp"
  }, {
    path: "/login-template-middle",
    component: _b0a48160,
    name: "login-template-middle"
  }, {
    path: "/login1",
    component: _a2482fa8,
    name: "login1"
  }, {
    path: "/loginTemplate1",
    component: _777874d2,
    name: "loginTemplate1"
  }, {
    path: "/loginwithtoken",
    component: _19d5b8ee,
    name: "loginwithtoken"
  }, {
    path: "/logout",
    component: _08394264,
    name: "logout"
  }, {
    path: "/manager_dashboard",
    component: _332572ee,
    name: "manager_dashboard"
  }, {
    path: "/master",
    component: _5975461c,
    name: "master"
  }, {
    path: "/modules",
    component: _543c6f1a,
    name: "modules"
  }, {
    path: "/payroll_formula",
    component: _28277a90,
    name: "payroll_formula"
  }, {
    path: "/payroll_generate_date",
    component: _42798dec,
    name: "payroll_generate_date"
  }, {
    path: "/payroll_modules",
    component: _3a6c2059,
    name: "payroll_modules"
  }, {
    path: "/payslip",
    component: _cde0e358,
    name: "payslip"
  }, {
    path: "/purpose",
    component: _1871fa8a,
    name: "purpose"
  }, {
    path: "/qr-page",
    component: _3e11ecb2,
    name: "qr-page"
  }, {
    path: "/report_notifications",
    component: _05a12cfe,
    name: "report_notifications"
  }, {
    path: "/reportsemployeelog",
    component: _ba7f610a,
    name: "reportsemployeelog"
  }, {
    path: "/reset-password",
    component: _4f64071d,
    name: "reset-password"
  }, {
    path: "/role",
    component: _2f786eba,
    name: "role"
  }, {
    path: "/role_old",
    component: _2c497722,
    name: "role_old"
  }, {
    path: "/salary",
    component: _577d75b4,
    name: "salary"
  }, {
    path: "/salary_type",
    component: _c63e410a,
    name: "salary_type"
  }, {
    path: "/schedule",
    component: _0206b5c7,
    name: "schedule"
  }, {
    path: "/shift",
    component: _7f590fd4,
    name: "shift"
  }, {
    path: "/sub-department",
    component: _04f0a3c3,
    name: "sub-department"
  }, {
    path: "/tab",
    component: _4a89b381,
    name: "tab"
  }, {
    path: "/timeline",
    component: _81c8a1f6,
    name: "timeline"
  }, {
    path: "/timezone",
    component: _aa5cf286,
    name: "timezone"
  }, {
    path: "/timezone-copy",
    component: _2449c496,
    name: "timezone-copy"
  }, {
    path: "/user",
    component: _ab9343da,
    name: "user"
  }, {
    path: "/visitor-dashboard-old",
    component: _0997ab8a,
    name: "visitor-dashboard-old"
  }, {
    path: "/web_login_logs",
    component: _047abe58,
    name: "web_login_logs"
  }, {
    path: "/wizard",
    component: _66e093a2,
    name: "wizard"
  }, {
    path: "/zone",
    component: _3ac3c0dc,
    name: "zone"
  }, {
    path: "/assign_permission/create",
    component: _314f2687,
    name: "assign_permission-create"
  }, {
    path: "/attendance_report/general",
    component: _cfcb6abc,
    name: "attendance_report-general"
  }, {
    path: "/attendance_report/multi_inout",
    component: _e899ce86,
    name: "attendance_report-multi_inout"
  }, {
    path: "/branches/1",
    component: _74654a66,
    name: "branches-1"
  }, {
    path: "/community/setup",
    component: _cba0bd6c,
    name: "community-setup"
  }, {
    path: "/community/tanent",
    component: _edbc2cba,
    name: "community-tanent"
  }, {
    path: "/device_management/create",
    component: _4a6909b4,
    name: "device_management-create"
  }, {
    path: "/employee_schedule/create",
    component: _5b5fda20,
    name: "employee_schedule-create"
  }, {
    path: "/employee_schedule/index_old",
    component: _4700e7f6,
    name: "employee_schedule-index_old"
  }, {
    path: "/employees/announcements",
    component: _38d727f7,
    name: "employees-announcements"
  }, {
    path: "/employees/attendance",
    component: _eadb1e4c,
    name: "employees-attendance"
  }, {
    path: "/employees/change_requests",
    component: _648eec52,
    name: "employees-change_requests"
  }, {
    path: "/employees/dashboard",
    component: _7b65dc33,
    name: "employees-dashboard"
  }, {
    path: "/employees/dashboard2",
    component: _1d2558e2,
    name: "employees-dashboard2"
  }, {
    path: "/employees/devices",
    component: _11883088,
    name: "employees-devices"
  }, {
    path: "/employees/holidays",
    component: _116dab68,
    name: "employees-holidays"
  }, {
    path: "/employees/index1",
    component: _55d20910,
    name: "employees-index1"
  }, {
    path: "/employees/index2",
    component: _55e02091,
    name: "employees-index2"
  }, {
    path: "/employees/leave_notification",
    component: _5d9e669e,
    name: "employees-leave_notification"
  }, {
    path: "/employees/leaves",
    component: _fa01db56,
    name: "employees-leaves"
  }, {
    path: "/employees/logs",
    component: _515b9760,
    name: "employees-logs"
  }, {
    path: "/employees/profile",
    component: _5cbe7e88,
    name: "employees-profile"
  }, {
    path: "/employees/profile_old",
    component: _1e4a9692,
    name: "employees-profile_old"
  }, {
    path: "/employees/schedule",
    component: _3a03bbc8,
    name: "employees-schedule"
  }, {
    path: "/guard_old/visitor_requests",
    component: _0d1941d8,
    name: "guard_old-visitor_requests"
  }, {
    path: "/guard_old/visitor-dashboard",
    component: _2fa0370c,
    name: "guard_old-visitor-dashboard"
  }, {
    path: "/guard/guard-dashboard",
    component: _6da880ab,
    name: "guard-guard-dashboard"
  }, {
    path: "/guard/host",
    component: _504a180e,
    name: "guard-host"
  }, {
    path: "/guard/requests",
    component: _bb3328d6,
    name: "guard-requests"
  }, {
    path: "/guard/visitor_list",
    component: _f208d8c0,
    name: "guard-visitor_list"
  }, {
    path: "/guard/visitor_logs",
    component: _a04e8f9e,
    name: "guard-visitor_logs"
  }, {
    path: "/guard/visitors_report",
    component: _6352af2d,
    name: "guard-visitors_report"
  }, {
    path: "/leaves/leave_types",
    component: _36572b7e,
    name: "leaves-leave_types"
  }, {
    path: "/master/assign_module",
    component: _32ba5888,
    name: "master-assign_module"
  }, {
    path: "/master/communities",
    component: _7e5ee7d1,
    name: "master-communities"
  }, {
    path: "/master/companies",
    component: _20c2f73d,
    name: "master-companies"
  }, {
    path: "/master/device",
    component: _72dfeef4,
    name: "master-device"
  }, {
    path: "/master/module",
    component: _776d9592,
    name: "master-module"
  }, {
    path: "/master/web_login_logs",
    component: _1ad6f494,
    name: "master-web_login_logs"
  }, {
    path: "/payroll/create",
    component: _3d50248d,
    name: "payroll-create"
  }, {
    path: "/payroll/month",
    component: _7b5aba02,
    name: "payroll-month"
  }, {
    path: "/payroll/salary",
    component: _4e2051c7,
    name: "payroll-salary"
  }, {
    path: "/report_notifications/create",
    component: _5f1bdd46,
    name: "report_notifications-create"
  }, {
    path: "/shift/create",
    component: _d905952c,
    name: "shift-create"
  }, {
    path: "/timezonemapping/edit",
    component: _5cab532a,
    name: "timezonemapping-edit"
  }, {
    path: "/timezonemapping/employeedevicesmapping",
    component: _69d0a5c0,
    name: "timezonemapping-employeedevicesmapping"
  }, {
    path: "/timezonemapping/list",
    component: _7b3ba202,
    name: "timezonemapping-list"
  }, {
    path: "/timezonemapping/new",
    component: _16c3444f,
    name: "timezonemapping-new"
  }, {
    path: "/user/create",
    component: _776ca1ea,
    name: "user-create"
  }, {
    path: "/visitor/requests",
    component: _7cae089e,
    name: "visitor-requests"
  }, {
    path: "/visitor/visitor_list",
    component: _eaa8f7ae,
    name: "visitor-visitor_list"
  }, {
    path: "/visitor/visitor_logs",
    component: _98eeae8c,
    name: "visitor-visitor_logs"
  }, {
    path: "/visitor/visitor-dashboard",
    component: _28039bea,
    name: "visitor-visitor-dashboard"
  }, {
    path: "/visitor/visitors_report",
    component: _7a9b0604,
    name: "visitor-visitors_report"
  }, {
    path: "/zone/create",
    component: _ce4bc528,
    name: "zone-create"
  }, {
    path: "/community/setup/floor",
    component: _eebbaf04,
    name: "community-setup-floor"
  }, {
    path: "/community/setup/room",
    component: _5434d60f,
    name: "community-setup-room"
  }, {
    path: "/community/setup/room-category",
    component: _78c9f85a,
    name: "community-setup-room-category"
  }, {
    path: "/employees/attendance_report/general",
    component: _4f8b12cf,
    name: "employees-attendance_report-general"
  }, {
    path: "/employees/attendance_report/multi_inout",
    component: _0ffa026a,
    name: "employees-attendance_report-multi_inout"
  }, {
    path: "/employees/leaves/leaves_quota",
    component: _7535c6e2,
    name: "employees-leaves-leaves_quota"
  }, {
    path: "/employees/payroll/create",
    component: _242a9300,
    name: "employees-payroll-create"
  }, {
    path: "/employees/payroll/month",
    component: _f416f2a8,
    name: "employees-payroll-month"
  }, {
    path: "/employees/payroll/payslips",
    component: _265e628f,
    name: "employees-payroll-payslips"
  }, {
    path: "/employees/payroll/salary",
    component: _7d238f18,
    name: "employees-payroll-salary"
  }, {
    path: "/master/assign_module/create",
    component: _156bee82,
    name: "master-assign_module-create"
  }, {
    path: "/master/communities/create",
    component: _75325d0d,
    name: "master-communities-create"
  }, {
    path: "/master/companies/create",
    component: _1f503b21,
    name: "master-companies-create"
  }, {
    path: "/master/device/create",
    component: _a3df8aec,
    name: "master-device-create"
  }, {
    path: "/employees/payroll/salary/:id",
    component: _4857c7dc,
    name: "employees-payroll-salary-id"
  }, {
    path: "/master/communities/details/:id?",
    component: _052edc89,
    name: "master-communities-details-id"
  }, {
    path: "/master/companies/details/:id?",
    component: _a22a48c6,
    name: "master-companies-details-id"
  }, {
    path: "/master/device/create/:id",
    component: _289f5772,
    name: "master-device-create-id"
  }, {
    path: "/register/visitor/walkin/:id?",
    component: _fd2d5676,
    name: "register-visitor-walkin-id"
  }, {
    path: "/companies/details/:id?",
    component: _91f33b82,
    name: "companies-details-id"
  }, {
    path: "/device/time_settings/:id?",
    component: _336b80c2,
    name: "device-time_settings-id"
  }, {
    path: "/master/assign_module/:id",
    component: _4f0a9524,
    name: "master-assign_module-id"
  }, {
    path: "/master/communities/:id",
    component: _5d12ab0e,
    name: "master-communities-id"
  }, {
    path: "/master/companies/:id",
    component: _83a0b636,
    name: "master-companies-id"
  }, {
    path: "/master/device/:id",
    component: _2972746e,
    name: "master-device-id"
  }, {
    path: "/payroll/salary/:id",
    component: _c953cc22,
    name: "payroll-salary-id"
  }, {
    path: "/register/visitor/:id?",
    component: _b6a9a39a,
    name: "register-visitor-id"
  }, {
    path: "/salary/details/:id?",
    component: _70b27946,
    name: "salary-details-id"
  }, {
    path: "/shift/edit/:id?",
    component: _4cf2bd1c,
    name: "shift-edit-id"
  }, {
    path: "/zone/single/:id?",
    component: _42d507b2,
    name: "zone-single-id"
  }, {
    path: "/assign_permission/:id",
    component: _01e8e33f,
    name: "assign_permission-id"
  }, {
    path: "/companies/:id",
    component: _6d447ffa,
    name: "companies-id"
  }, {
    path: "/dashboard/:id",
    component: _7158776a,
    name: "dashboard-id"
  }, {
    path: "/leavecount/:id?",
    component: _11543824,
    name: "leavecount-id"
  }, {
    path: "/report_notifications/:id",
    component: _d6484fae,
    name: "report_notifications-id"
  }, {
    path: "/shift/:id",
    component: _005e1188,
    name: "shift-id"
  }, {
    path: "/theme/:id?",
    component: _f6492456,
    name: "theme-id"
  }, {
    path: "/timezonemapping/:id?",
    component: _030d6f69,
    name: "timezonemapping-id"
  }, {
    path: "/user/:id",
    component: _f44a6d8a,
    name: "user-id"
  }, {
    path: "/zone/:id",
    component: _381a430c,
    name: "zone-id"
  }, {
    path: "/",
    component: _7e0c913e,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
