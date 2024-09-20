import React, {useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; //up and down arrow
import "./sidebar.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import FingerprintOutlinedIcon from "@mui/icons-material/FingerprintOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import SpeedIcon from "@mui/icons-material/Speed";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import Diversity2OutlinedIcon from "@mui/icons-material/Diversity2Outlined";
import { useNavigate } from "react-router-dom";

function SidebarBox() {
  const [openItemId, setOpenItemId] = useState(null);
  const [activeItemId, setActiveItemId] = useState(null);
  const navigate = useNavigate();

  const handleToggle = (itemId) => {
    setOpenItemId((prevItemId) => (prevItemId === itemId ? null : itemId));
  };

  const handleNavigate = (itemId, navigateTo) => {
    setActiveItemId(itemId);
    navigate(navigateTo);
  };

  const menuItems = [
    {
      title: "الصفحة الريئسية",
      itemId: "home",
      icon: <HomeOutlinedIcon />,
      navigateTo: "/Home",
    },
    {
      title: "الأعضاء",
      itemId: "members",
      icon: <GroupsOutlinedIcon />,
      subItems: [
        { title: "جميع الأعضاء", navigateTo: "AllMembers" },
        { title: "اضافة عضو جديد", navigateTo: "AddNewMember" },
      ],
    },
    {
      title: "القياسات",
      icon: <SpeedIcon />,
      itemId: "mesurments",
      subItems: [
        { title: "جميع القياسات", navigateTo: "MeasurmentsContainer" },
        { title: "اضافة قياس جديد", navigateTo: "AddMeasurementForm" },
      ],
    },
    {
      title: "المجموعات",
      icon: <Diversity2OutlinedIcon />,
      itemId: "groups",
      subItems: [
        { title: "جميع المجموعات", navigateTo: "GroupsContainer" },
        { title: "اضافة مجموعة جديدة", navigateTo: "AddGroupForm" },
      ],
    },
    {
      title: "المواعيد",
      itemId: "times",
      icon: <DateRangeOutlinedIcon />,
      subItems: [
        { title: "جميع المواعيد", navigateTo: "ScheduleContainer" },
        { title: "اضافة موعد جديد", navigateTo: "AddScheduleForm" },
      ],
    },
    {
      title: "الأشتراكات",
      itemId: "subscriptions",
      icon: <SubscriptionsOutlinedIcon />,
      subItems: [
        { title: "جميع الأشتراكات", navigateTo: "AllSubScriptions" },
        { title: "الأعضاء المشتركين ", navigateTo: "SubscripedMembers" },
        { title: "إضافة عضو للاشتراك", navigateTo: "AddNewMemberToSub" },
        { title: "اضافة اشتراك جديد", navigateTo: "AddNewSubscription" },
      ],
    },
    {
      title: "السندات",
      itemId: "bonds",
      icon: <ArticleOutlinedIcon />,
      subItems: [
        { title: "جميع السندات", navigateTo: "" },
        { title: "اضافة سندات", navigateTo: "" },
      ],
    },
    {
      title: "المستخدمين",
      itemId: "users",
      icon: <ManageAccountsOutlinedIcon />,
      subItems: [
        { title: "جميع المستخدمين", navigateTo: "" },
        { title: "اضافة مستخدم جديد", navigateTo: "" },
      ],
    },
    {
      title: "طرق الدفع",
      icon: <PaymentsOutlinedIcon />,
      itemId: "payments",
      subItems: [
        { title: "جميع طرق الدفع", navigateTo: "" },
        { title: "اضافة طريقة دفع", navigateTo: "" },
      ],
    },
    {
      title: "بوابات الدخول",
      itemId: "entry gates",
      icon: <FingerprintOutlinedIcon />,
      subItems: [
        { title: "جميع بوابات الدخول", navigateTo: "" },
        { title: "اضافة بوابة دفع", navigateTo: "" },
        { title: "تحميل برنامج البوابة", navigateTo: "" },
      ],
    },
    {
      title: "التقارير",
      icon: <ReceiptLongOutlinedIcon />,
      itemId: "reports",
      navigateTo: "",
    },
    {
      title: "الأعدادات",
      icon: <SettingsOutlinedIcon />,
      itemId: "settings",
      navigateTo: "",
    },
    {
      title: "التنبيهات",
      icon: <NotificationsNoneOutlinedIcon />,
      itemId: "notifications",
      navigateTo: "",
    },
    {
      title: "الربط المحسابي",
      icon: <AttachFileOutlinedIcon />,
      itemId: "link",
      navigateTo: "",
    },
    {
      title: "تحديثات النظام",
      icon: <RestoreOutlinedIcon />,
      itemId: "update",
      navigateTo: "UpdateSystem",
    },
    {
      title: "تطبيق العميل",
      icon: <AppsOutlinedIcon />,
      itemId: "user app",
      subItems: [
        { title: "رابط التطبيق", navigateTo: "" },
        { title: "كود الأستجابة السريع", navigateTo: "" },
      ],
    },
    {
      title: "تسجيل الخروج",
      icon: <PowerSettingsNewOutlinedIcon />,
      itemId: "logout",
      navigateTo: "",
    },
  ];

  return (
    <div className="sidebarContainer">
      <ul className="menu">
        {menuItems.map((item) => (
          <li key={item.itemId || item.title} className="menu-item">
            <div
              className={`menu-item-header ${
                activeItemId === item.itemId ? "active-item" : ""
              }`}
              onClick={() => {
                setActiveItemId(item.itemId);
                if (item.navigateTo) {
                  navigate(item.navigateTo);
                } else {
                  handleToggle(item.itemId);
                }
              }}
            >
              <span>
                <span className="menu-item-icon">{item.icon}</span>
                {item.title}
              </span>
              {item.subItems ? (
                openItemId === item.itemId ? (
                  <FaChevronUp className="up-icon" />
                ) : (
                  <FaChevronDown className="down-icon" />
                )
              ) : null}
            </div>
            {item.subItems && openItemId === item.itemId && (
              <ul className="submenu">
                {item.subItems.map((subItem, index) => (
                  <li
                    key={index}
                    className="submenu-item"
                    onClick={() => navigate(subItem.navigateTo)}
                  >
                    {subItem.title}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default SidebarBox;