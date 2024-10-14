import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; //up and down arrow
import "./sidebar.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
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
import Logout from "../../Pages/Auth/Logout/Logout";
import ModalLogOut from "../../Pages/Auth/Logout/ModalLogOut";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
function SidebarBox() {
  const [openItemId, setOpenItemId] = useState(null);
  const [activeItemId, setActiveItemId] = useState(null);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
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
        { title: "جميع المجموعات", navigateTo: "ScheduleContainer" },
        { title: "أعضاء المجموعات", navigateTo: "GroupsContainer" },
        { title: "اضافة مجموعة جديدة", navigateTo: "AddGroupForm" },
        { title: "اضافة عضو لمجموعة", navigateTo: "AddGroupMember" },
      ],
    },
    {
      title: "المواعيد",
      itemId: "times",
      icon: <DateRangeOutlinedIcon />,
      subItems: [
        { title: "جميع المواعيد", navigateTo: "AllSchedules" },
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
        { title: "جميع المستخدمين", navigateTo: "UsersContainer" },
        { title: "اضافة مستخدم جديد", navigateTo: "AddUser" },
      ],
    },
    {
      title: "طرق الدفع",
      icon: <PaymentsOutlinedIcon />,
      itemId: "payments",
      subItems: [
        { title: "جميع طرق الدفع", navigateTo: "PaymentMethodsContainer" },
        { title: "اضافة طريقة دفع", navigateTo: "AddPaymentMethodForm" },
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
      title: "الدعم",
      icon: <BuildOutlinedIcon />,
      itemId: "notifications",
      navigateTo: "Support",
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
      isLogout: true,
    },
  ];
  const openLogoutModal = () => {
    setLogoutModalOpen(true);
  };
  const closeLogoutModal = () => {
    setLogoutModalOpen(false);
  };
  return (
    <div className="sidebarContainer">
      <ul className="menu">
        {menuItems.map((item) =>
          item.isLogout ? (
            <li
              key={item.itemId || item.title}
              className="menu-item logout-item"
            >
              <div className="menu-item-header" onClick={openLogoutModal}>
                <span>
                  <span className="menu-item-icon">{item.icon}</span>
                  {item.title}
                </span>
              </div>
              {isLogoutModalOpen && (
                <ModalLogOut
                  isOpen={isLogoutModalOpen}
                  onClose={closeLogoutModal}
                >
                  <Logout onClose={closeLogoutModal} />
                </ModalLogOut>
              )}
            </li>
          ) : (
            <li key={item.itemId || item.title} className="menu-item">
              <div
                className={`menu-item-header ${
                  activeItemId === item.itemId ? "active-item" : ""
                }`}
                onClick={() => {
                  setActiveItemId(item.itemId);
                  if (item.navigateTo) {
                    handleNavigate(item.itemId, item.navigateTo);
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
          )
        )}
      </ul>
    </div>
  );
}
export default SidebarBox;
