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
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";
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
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="3em" viewBox="0 0 24 24"><path fill="currentColor" d="M1 1v4h1v14H1v4h4v-1h14v1h4v-4h-1V5h1V1h-4v1H5V1m0 3h14v1h1v14h-1v1H5v-1H4V5h1m1 1v8h3v4h9V9h-4V6M8 8h4v4H8m6-1h2v5h-5v-2h3"/></svg>,
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
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="3em" viewBox="0 0 15 15"><path fill="none" stroke="currentColor" d="M3.5 0v5m8-5v5M3 7.5h3m6 0H9m-6 3h3m3 0h3m-10.5-8h12a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-12a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1Z"/></svg>,
      subItems: [
        { title: "جميع المواعيد", navigateTo: "AllSchedules" },
        { title: "اضافة موعد جديد", navigateTo: "AddScheduleForm" },
      ],
    },
    {
      title: "الأشتراكات",
      itemId: "subscriptions",
      icon:<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="3em" viewBox="0 0 24 24"><path fill="currentColor" d="M18 2H6v2h12zM4 6h16v2H4zm-2 4h20v12H2zm18 10v-8H4v8z"/></svg>,
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
      icon:<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="3em" viewBox="0 0 24 24"><path fill="currentColor" d="M20 22H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1m-1-2V4H5v16zM8 9h8v2H8zm0 4h8v2H8z"/></svg>,
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
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="3em" viewBox="0 0 256 256"><path fill="currentColor" d="M128 88a40 40 0 1 0 40 40a40 40 0 0 0-40-40m0 64a24 24 0 1 1 24-24a24 24 0 0 1-24 24m112-96H16a8 8 0 0 0-8 8v128a8 8 0 0 0 8 8h224a8 8 0 0 0 8-8V64a8 8 0 0 0-8-8m-46.35 128H62.35A56.78 56.78 0 0 0 24 145.65v-35.3A56.78 56.78 0 0 0 62.35 72h131.3A56.78 56.78 0 0 0 232 110.35v35.3A56.78 56.78 0 0 0 193.65 184M232 93.37A40.8 40.8 0 0 1 210.63 72H232ZM45.37 72A40.8 40.8 0 0 1 24 93.37V72ZM24 162.63A40.8 40.8 0 0 1 45.37 184H24ZM210.63 184A40.8 40.8 0 0 1 232 162.63V184Z"/></svg>,
      itemId: "payments",
      subItems: [
        { title: "جميع طرق الدفع", navigateTo: "PaymentMethodsContainer" },
        { title: "اضافة طريقة دفع", navigateTo: "AddPaymentMethodForm" },
      ],
    },
    {
      title: "بوابات الدخول",
      itemId: "entry gates",
      icon:<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="3em" viewBox="0 0 512 512"><path fill="currentColor" d="M256.12 245.96c-13.25 0-24 10.74-24 24c1.14 72.25-8.14 141.9-27.7 211.55c-2.73 9.72 2.15 30.49 23.12 30.49c10.48 0 20.11-6.92 23.09-17.52c13.53-47.91 31.04-125.41 29.48-224.52c.01-13.25-10.73-24-23.99-24m-.86-81.73C194 164.16 151.25 211.3 152.1 265.32c.75 47.94-3.75 95.91-13.37 142.55c-2.69 12.98 5.67 25.69 18.64 28.36c13.05 2.67 25.67-5.66 28.36-18.64c10.34-50.09 15.17-101.58 14.37-153.02c-.41-25.95 19.92-52.49 54.45-52.34c31.31.47 57.15 25.34 57.62 55.47c.77 48.05-2.81 96.33-10.61 143.55c-2.17 13.06 6.69 25.42 19.76 27.58c19.97 3.33 26.81-15.1 27.58-19.77c8.28-50.03 12.06-101.21 11.27-152.11c-.88-55.8-47.94-101.88-104.91-102.72m-110.69-19.78c-10.3-8.34-25.37-6.8-33.76 3.48c-25.62 31.5-39.39 71.28-38.75 112c.59 37.58-2.47 75.27-9.11 112.05c-2.34 13.05 6.31 25.53 19.36 27.89c20.11 3.5 27.07-14.81 27.89-19.36c7.19-39.84 10.5-80.66 9.86-121.33c-.47-29.88 9.2-57.88 28-80.97c8.35-10.28 6.79-25.39-3.49-33.76m109.47-62.33c-15.41-.41-30.87 1.44-45.78 4.97c-12.89 3.06-20.87 15.98-17.83 28.89c3.06 12.89 16 20.83 28.89 17.83c11.05-2.61 22.47-3.77 34-3.69c75.43 1.13 137.73 61.5 138.88 134.58c.59 37.88-1.28 76.11-5.58 113.63c-1.5 13.17 7.95 25.08 21.11 26.58c16.72 1.95 25.51-11.88 26.58-21.11a929 929 0 0 0 5.89-119.85c-1.56-98.75-85.07-180.33-186.16-181.83m252.07 121.45c-2.86-12.92-15.51-21.2-28.61-18.27c-12.94 2.86-21.12 15.66-18.26 28.61c4.71 21.41 4.91 37.41 4.7 61.6c-.11 13.27 10.55 24.09 23.8 24.2h.2c13.17 0 23.89-10.61 24-23.8c.18-22.18.4-44.11-5.83-72.34m-40.12-90.72C417.29 43.46 337.6 1.29 252.81.02C183.02-.82 118.47 24.91 70.46 72.94C24.09 119.37-.9 181.04.14 246.65l-.12 21.47c-.39 13.25 10.03 24.31 23.28 24.69c.23.02.48.02.72.02c12.92 0 23.59-10.3 23.97-23.3l.16-23.64c-.83-52.5 19.16-101.86 56.28-139c38.76-38.8 91.34-59.67 147.68-58.86c69.45 1.03 134.73 35.56 174.62 92.39c7.61 10.86 22.56 13.45 33.42 5.86c10.84-7.62 13.46-22.59 5.84-33.43"/></svg>,
      subItems: [
        { title: "جميع بوابات الدخول", navigateTo: "" },
        { title: "اضافة بوابة دفع", navigateTo: "" },
        { title: "تحميل برنامج البوابة", navigateTo: "" },
      ],
    },
    {
      title: "التقارير",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="3em" viewBox="0 0 32 32"><g fill="currentColor"><path d="M29 17.518a.5.5 0 0 0-.5-.5H15V3.5a.5.5 0 0 0-.5-.5C6.505 3 0 9.495 0 17.479C0 25.757 6.243 32 14.521 32C22.234 32 29 25.232 29 17.518m-28-.039c0-7.266 5.787-13.206 13-13.47v13.509c0 .276.224.5.5.482h13.49c-.283 6.99-6.455 13-13.469 13C6.813 31 1 25.188 1 17.479"/><path d="M17.5 15h13.999c.276.018.501-.224.501-.5C32 6.505 25.495 0 17.5 0a.5.5 0 0 0-.5.5v14.018c0 .276.224.5.5.482M18 1.009c7.063.259 12.759 5.97 12.994 13.009H18z"/></g></svg>,
      itemId: "reports",
      navigateTo: "",
    },
    {
      title: "السجل",
      icon:<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="3em" viewBox="0 0 24 24"><path fill="currentColor" d="M21 11.11V5a2 2 0 0 0-2-2h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14a2 2 0 0 0 2 2h6.11c1.26 1.24 2.98 2 4.89 2c3.87 0 7-3.13 7-7c0-1.91-.76-3.63-2-4.89M12 3c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1M5 19V5h2v2h10V5h2v4.68c-.91-.43-1.92-.68-3-.68H7v2h4.1c-.6.57-1.06 1.25-1.42 2H7v2h2.08c-.05.33-.08.66-.08 1c0 1.08.25 2.09.68 3zm11 2c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5m.5-4.75l2.86 1.69l-.75 1.22L15 17v-5h1.5z"/></svg>,
      itemId: "logs",
      navigateTo: "Logs",
    },
    {
      title: "الدعم",
      icon:<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="3em" viewBox="0 0 32 32"><path fill="currentColor" d="M21 3c-4.43 0-8 3.57-8 8c0 .235.037.553.063.844L4.5 20.406a5 5 0 0 0 0 7.094a5 5 0 0 0 7.094 0l8.562-8.563c.29.026.61.063.844.063c4.43 0 8-3.57 8-8a7.6 7.6 0 0 0-.938-3.688l-.625-1.156l-.937.938l-4.313 4.28l-1.562-1.562l4.28-4.312l.94-.938l-1.157-.625A7.6 7.6 0 0 0 21 3m0 2c.486 0 .848.21 1.28.313l-3.78 3.78l-.72.72l.72.687l3 3l.688.72l.718-.72l3.782-3.78c.103.432.312.794.312 1.28c0 3.37-2.63 6-6 6c-.4 0-.72 0-.97-.063l-.53-.156l-.406.407l-8.907 8.907c-1.23 1.23-3.05 1.23-4.28 0l-.032-.032c-1.2-1.23-1.19-3.03.03-4.25l8.907-8.906l.407-.406l-.158-.53c-.06-.25-.062-.57-.062-.97c0-3.37 2.63-6 6-6z"/></svg>,
      itemId: "notifications",
      navigateTo: "Support",
    },
    {
      title: "الربط المحسابي",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="4em" viewBox="0 0 21 21"><g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 11.5c.97 1.367 3.011 1.127 4.011 0l1.989-2c1.124-1.228 1.164-2.814 0-4c-1.136-1.157-2.864-1.157-4 0l-2 2"/><path d="M11.5 10.57c-.97-1.367-3-1.197-4-.07l-2 1.975c-1.124 1.228-1.164 2.839 0 4.025c1.136 1.157 2.864 1.157 4 0l2-2"/></g></svg>,
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
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="3em" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16m.5 9a1 1 0 0 1 .117 1.993L12.5 15H9.106l-.833 1.489a1 1 0 0 1-1.797-.872l.052-.106l.286-.51H6.3a1 1 0 0 1-.117-1.994L6.3 13zm1.893-2.988L16.066 13H17.7a1 1 0 1 1 0 2h-.514l.287.512a1 1 0 0 1-1.745.977l-3.08-5.5a1 1 0 0 1 1.745-.977m-2.52-4.5l.127.227l.127-.227a1 1 0 0 1 1.746.977l-3.08 5.5a1 1 0 0 1-1.745-.977l1.806-3.226l-.726-1.297a1 1 0 1 1 1.745-.977"/></g></svg>,
      itemId: "user app",
      subItems: [
        { title: "رابط التطبيق", navigateTo: "" },
        { title: "كود الأستجابة السريع", navigateTo: "" },
      ],
    },
    {
      title: "الخصومات",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="3em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M10.594 2.319a3.26 3.26 0 0 1 2.812 0c.387.185.74.487 1.231.905l.078.066c.238.203.313.265.389.316c.193.13.41.219.637.264c.09.018.187.027.499.051l.101.008c.642.051 1.106.088 1.51.23a3.27 3.27 0 0 1 1.99 1.99c.142.404.178.868.23 1.51l.008.101c.024.312.033.41.051.499c.045.228.135.445.264.638c.051.075.113.15.316.388l.066.078c.419.49.72.844.905 1.23c.425.89.425 1.924 0 2.813c-.184.387-.486.74-.905 1.231l-.066.078a5 5 0 0 0-.316.389c-.13.193-.219.41-.264.637c-.018.09-.026.187-.051.499l-.009.101c-.05.642-.087 1.106-.23 1.51a3.26 3.26 0 0 1-1.989 1.99c-.404.142-.868.178-1.51.23l-.101.008a5 5 0 0 0-.499.051a1.8 1.8 0 0 0-.637.264a5 5 0 0 0-.39.316l-.077.066c-.49.419-.844.72-1.23.905a3.26 3.26 0 0 1-2.813 0c-.387-.184-.74-.486-1.231-.905l-.078-.066a5 5 0 0 0-.388-.316a1.8 1.8 0 0 0-.638-.264a5 5 0 0 0-.499-.051l-.101-.009c-.642-.05-1.106-.087-1.51-.23a3.26 3.26 0 0 1-1.99-1.989c-.142-.404-.179-.868-.23-1.51l-.008-.101a5 5 0 0 0-.051-.499a1.8 1.8 0 0 0-.264-.637a5 5 0 0 0-.316-.39l-.066-.077c-.418-.49-.72-.844-.905-1.23a3.26 3.26 0 0 1 0-2.813c.185-.387.487-.74.905-1.231l.066-.078a5 5 0 0 0 .316-.388c.13-.193.219-.41.264-.638c.018-.09.027-.187.051-.499l.008-.101c.051-.642.088-1.106.23-1.51a3.26 3.26 0 0 1 1.99-1.99c.404-.142.868-.179 1.51-.23l.101-.008a5 5 0 0 0 .499-.051c.228-.045.445-.135.638-.264c.075-.051.15-.113.388-.316l.078-.066c.49-.418.844-.72 1.23-.905m2.163 1.358a1.76 1.76 0 0 0-1.514 0c-.185.088-.38.247-.981.758l-.03.025c-.197.168-.34.291-.497.396c-.359.24-.761.407-1.185.49c-.185.037-.373.052-.632.073l-.038.003c-.787.063-1.036.089-1.23.157c-.5.177-.894.57-1.07 1.071c-.07.194-.095.443-.158 1.23l-.003.038c-.02.259-.036.447-.072.632c-.084.424-.25.826-.49 1.185c-.106.157-.229.3-.397.498l-.025.029c-.511.6-.67.796-.758.98a1.76 1.76 0 0 0 0 1.515c.088.185.247.38.758.981l.025.03c.168.197.291.34.396.497c.24.359.407.761.49 1.185c.037.185.052.373.073.632l.003.038c.063.787.089 1.036.157 1.23c.177.5.57.894 1.071 1.07c.194.07.443.095 1.23.158l.038.003c.259.02.447.036.632.072c.424.084.826.25 1.185.49c.157.106.3.229.498.397l.029.025c.6.511.796.67.98.758a1.76 1.76 0 0 0 1.515 0c.185-.088.38-.247.981-.758l.03-.025c.197-.168.34-.291.497-.396c.359-.24.761-.407 1.185-.49a6 6 0 0 1 .632-.073l.038-.003c.787-.063 1.036-.089 1.23-.157c.5-.177.894-.57 1.07-1.071c.07-.194.095-.444.158-1.23l.003-.038a6 6 0 0 1 .072-.633c.084-.423.25-.825.49-1.184c.106-.157.229-.3.397-.498l.025-.029c.511-.6.67-.796.758-.98a1.76 1.76 0 0 0 0-1.515c-.088-.185-.247-.38-.758-.981l-.025-.03c-.168-.197-.291-.34-.396-.497a3.3 3.3 0 0 1-.49-1.185a6 6 0 0 1-.073-.632l-.003-.038c-.063-.787-.089-1.036-.157-1.23c-.177-.5-.57-.894-1.071-1.07c-.194-.07-.444-.095-1.23-.158l-.038-.003a6 6 0 0 1-.633-.072a3.3 3.3 0 0 1-1.184-.49c-.157-.106-.3-.229-.498-.397l-.029-.025c-.6-.511-.796-.67-.98-.758" clip-rule="evenodd"/><path fill="currentColor" fill-rule="evenodd" d="M15.543 8.457a.753.753 0 0 1 0 1.065l-6.021 6.02a.753.753 0 0 1-1.065-1.064l6.021-6.02a.753.753 0 0 1 1.065 0" clip-rule="evenodd"/><path fill="currentColor" d="M15.512 14.509a1.004 1.004 0 1 1-2.007 0a1.004 1.004 0 0 1 2.007 0m-5.017-5.018a1.004 1.004 0 1 1-2.007 0a1.004 1.004 0 0 1 2.007 0"/></svg>,
      itemId: "discount code",
      subItems: [
        { title: "جميع أكواد الخصم ", navigateTo: "" },
        { title: "اضافة كود خصم  ", navigateTo: "" },
      ],
    }
  ];
  return (
    <div className="sidebarContainer">
      <ul className="menu">
        {menuItems.map((item) =>
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
        }
      </ul>
    </div>
  );
}
export default SidebarBox;
