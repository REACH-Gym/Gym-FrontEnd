"use client";
import "./sidebar.css";
import { useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import BrightnessLowRoundedIcon from "@mui/icons-material/BrightnessLowRounded";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import MainButton from "../../Common Components/Main Button/MainButton";
function SidebarBox() {
  const navigate = useNavigate();

  return (
    <Sidebar className="sidebarContainer">
      <Menu>
        <MenuItem onClick={() => navigate("Home")}>
          <HomeOutlinedIcon className="icon-svg ms-2" /> الصفحة الرئيسية
        </MenuItem>
        <SubMenu label={`الأعضاء`}>
          <MenuItem
            className="menu-item"
            onClick={() => navigate("AllMembers")}
          >
            {" "}
            جميع الأعضاء{" "}
          </MenuItem>
          <MenuItem
            className="menu-item"
            onClick={() => navigate("AddNewMember")}
          >
            {" "}
            اضافة عضو جديد{" "}
          </MenuItem>
        </SubMenu>

        <SubMenu label="القياسات">
          <MenuItem
            className="menu-item"
            onClick={() => navigate("MeasurmentsContainer")}
          >
            {" "}
            جميع القياسات{" "}
          </MenuItem>
          <MenuItem
            className="menu-item"
            onClick={() => navigate("AddMeasurementForm")}
          >
            {" "}
            اضافة قياس جديد{" "}
          </MenuItem>
        </SubMenu>

        <SubMenu label="المجموعات">
          <MenuItem
            className="menu-item"
            onClick={() => navigate("GroupsContainer")}
          >
            {" "}
            جميع المجموعات{" "}
          </MenuItem>
          <MenuItem
            className="menu-item"
            onClick={() => navigate("AddGroupForm")}
          >
            {" "}
            اضافة مجموعة جديدة
          </MenuItem>
        </SubMenu>
        <SubMenu label="المواعيد">
          <MenuItem
            className="menu-item"
            onClick={() => navigate("ScheduleContainer")}
          >
            {" "}
            جميع المواعيد{" "}
          </MenuItem>
          <MenuItem
            className="menu-item"
            onClick={() => navigate("AddScheduleForm")}
          >
            {" "}
            اضافة موعد جديد{" "}
          </MenuItem>
        </SubMenu>
        <SubMenu label="الأشتراكات">
          <MenuItem className="menu-item"> جميع الأشتراكات </MenuItem>
          <MenuItem className="menu-item"> الأشتراكات الفعالة </MenuItem>
          <MenuItem className="menu-item"> الأشتراكات المنتهية </MenuItem>
          <MenuItem className="menu-item"> اوشكت علي الأنتهاء </MenuItem>
          <MenuItem className="menu-item"> اضافة اشتراك جديد</MenuItem>
        </SubMenu>

        <SubMenu label="الحجوزات">
          <MenuItem className="menu-item"> جميع الحجوزات </MenuItem>
          <MenuItem className="menu-item">حجوزات اليوم</MenuItem>
        </SubMenu>

        <SubMenu label="السندات">
          <MenuItem className="menu-item"> جميع السندات </MenuItem>
          <MenuItem className="menu-item"> اضافة سندات</MenuItem>
        </SubMenu>

        <SubMenu label="المستخدمين">
          <MenuItem className="menu-item"> جميع المستخدمين </MenuItem>
          <MenuItem className="menu-item">اضافة مستخدم جديد</MenuItem>
        </SubMenu>

        <SubMenu label="طرق الدفع">
          <MenuItem className="menu-item"> جميع طرق الدفع </MenuItem>
          <MenuItem className="menu-item"> اضافة طريقة دفع</MenuItem>
        </SubMenu>

        <SubMenu label="بوابات الدخول">
          <MenuItem className="menu-item"> جميع بوابات الدخول </MenuItem>
          <MenuItem className="menu-item"> اضافة مجموعة جديدة</MenuItem>
        </SubMenu>
        <SubMenu label="المجموعات">
          <MenuItem className="menu-item"> جميع المجموعات </MenuItem>
          <MenuItem className="menu-item"> اضافة بوابة دفع</MenuItem>
          <MenuItem className="menu-item">تحميل برنامج البوابة</MenuItem>
        </SubMenu>
        <MenuItem>التقارير</MenuItem>
        <MenuItem>
          {" "}
          <BrightnessLowRoundedIcon className="icon-svg ms-2" /> الأعدادات
        </MenuItem>
        <MenuItem>
          {" "}
          <NotificationsNoneRoundedIcon className="icon-svg ms-2" /> التنبيهات
        </MenuItem>
        <MenuItem>الربط الحسابي</MenuItem>
        <MenuItem>تحديث النظام</MenuItem>
        <SubMenu label="تطبيق العميل">
          <MenuItem className="menu-item"> رابط التطبيق </MenuItem>
          <MenuItem className="menu-item"> كود الأستجابة السريع</MenuItem>
        </SubMenu>
        <MenuItem>تحديث النظام</MenuItem>
        <SubMenu label="منتاجتنا ">
          {/* <MenuItem>  رابط التطبيق </MenuItem> */}
          {/* <MenuItem> كود الأستجابة السريع</MenuItem> */}
        </SubMenu>
        <MenuItem className="logOut">
          {" "}
          <PowerSettingsNewRoundedIcon className="icon-svg ms-2" />
          <MainButton text={" تسجيل الخروج"} />{" "}
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}
export default SidebarBox;
