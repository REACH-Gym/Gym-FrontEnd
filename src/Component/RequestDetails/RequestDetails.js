import InputField from "../../Common Components/InputField/InputField";
import styles from "./RequestDetails.module.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ComponentTitle from "../../Common Components/ComponentTitle/ComponentTitle";
import {
  useEditMemberMutation,
  useGetAllMembersQuery,
} from "../../features/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../../Common Components/Error/Error";
import Success from "../../Common Components/Success/Success";
import "react-phone-input-2/lib/style.css";
import { Commet } from "react-loading-indicators";
// import {
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
//   pdf,
//   Image,
//   Font,
// } from "@react-pdf/renderer";

// Font.register({
//   family: "Almarai",
//   src: "/assets/fonts/Almarai-Regular.ttf",
// });
// const style = StyleSheet.create({
//   page: {
//     minWidth: "210mm", // Set width for receipt printer paper
//     minHeight: "297mm", // Set width for receipt printer paper
//     padding: "1",
//     fontFamily: "Almarai",
//     fontSize: 16,
//     textAlign: "right", // Align text to the right for RTL
//     direction: "rtl", // Set text direction to RTL
//   },
//   section: {
//     margin: 1,
//     padding: 1,
//   },
//   logo: {
//     width: 30, // Set the width of the image
//     height: 30, // Set the height of the image
//     marginBottom: 4, // Add spacing below the image
//     marginRight: "auto", // Add spacing to the right of the image
//     marginLeft: "auto", // Add spacing to the right of the image
//   },
//   title: {
//     textAlign: "center",
//     marginBottom: 2,
//     padding: "2px 0",
//     borderBottom: "0.5px dashed #000",
//   },
//   text: {
//     marginBottom: 1.5,
//   },
//   table: {
//     display: "table",
//     width: "auto",
//     marginTop: 2,
//     marginBottom: 3,
//     borderStyle: "solid",
//     borderWidth: 0.2,
//     borderColor: "#000",
//   },
//   tableRow: {
//     margin: "auto",
//     flexDirection: "row",
//   },
//   tableCol: {
//     width: "25%", // Adjust the width as needed
//     borderStyle: "solid",
//     borderWidth: 0.2,
//     borderColor: "#000",
//     padding: 1,
//     textAlign: "center",
//   },
//   tableHeader: {
//     backgroundColor: "#f0f0f0",
//   },
//   footer: {
//     padding: 2,
//     borderTop: "0.5px solid #000",
//     width: "100%",
//     marginTop: 1,
//     textAlign: "center",
//   },
// });
// const arabicRegex = /[\u0600-\u06FF]/;
// const englishRegex = /[A-Za-z]/;
// const ReceiptDocument = () => {
// const [hasArabicC, setHasArabicC] = useState(arabicRegex.test(customerName));
// const [hasEnglishC, setHasEnglishC] = useState(
//   englishRegex.test(customerName)
// );
// function addMonthToDate(startDate) {
//   const date = new Date(startDate); // Create a new Date object from the starting date
//   date.setMonth(date.getMonth() + 1); // Add one month to the current month
//   return date; // Return the new date
// }

// useEffect(() => {
//   setHasArabicC(arabicRegex.test(customerName));
//   setHasEnglishC(englishRegex.test(customerName));
// }, [customerName, group]);
// const now = new Date();

// const options = {
//   year: "numeric",
//   month: "2-digit",
//   day: "2-digit",
//   hour: "2-digit",
//   minute: "2-digit",
//   hour12: false,
// };
// const readableDate = now.toLocaleString("en-US", options);

// return (
//   <Document>
//     <Page size={[210, 297]} style={style.page}>
//       <View style={style.section}>
//         <Image style={style.logo} src={"/assets/image/Logo1.png"} />
//         <Text
//           style={{ textAlign: "center", fontWeight: "bold", marginBottom: 2 }}
//         >
//           اتفاقية والئحة عضوية نادي
//         </Text>
//         <Text style={{ textAlign: "center", fontWeight: "bold" }}>
//           BALANCE FITNESS COMPLEX
//         </Text>
//         <Text>
//           هذه الإتفاقية بين نادي Balance Fitness Complex التابع لشركة توازن
//           المتحدة الرياضية سجل تجاري رقم )4030308272( وبين (العضو / المشرتك)
//           ......................، ما سنشير إليه بعد هذا يتضمن اتفاقية العضو مع
//           النادي، وكذا أية أساسيات، ومبادئ توجيهية وتعديلات يمكن أن تتضمنها
//           اتفاقية العضو. تصف هذه الإتفاقية الشروط والأحكام التي بموجبها تخول
//           لعضو النادي الإستفادة من خدماته ومرافقه وفقاً لما تتضمنه هذه
//           الإتفاقية من بندود ولوائح.
//         </Text>
//         <Text>
//           يرجى قراءة هذه الإتفاقية بعناية، تحدد هذه الإتفاقية الأحكام والشروط
//           الملزمة قانوناً لمشارك العضو في عضوية النادي من خلال المشاركة في
//           برنامج عضوية نادي Balance Fitness Complex، عليه يوافق العضو على
//           الإلتزام بالبنود والشروط الواردة في هذه الإتفاقية بعد أن فهم العضو
//           جميع ما ورد بهذه الإتفاقية من بنود وضوابط.
//         </Text>
//         <Text>
//           تعد الشروط المبينة أدناه اضافة الى أي الأدلة الإرشادية التي تصدر عن
//           إدارة النادي من وقت لآخر، هي الشروط التي تحكم العلاقة بين العضو
//           والنادي، كما يجب على العضو الإلتزام بكافة تعليمات النادي المكتوبة
//           بهذه اللائحة وكذلك على العضو الإلتزام بكافة التعليمات الموجودة على
//           اللوحات الداخلية بالنادي والتعاميم الإدارية التي قد تصدرها إدارة
//           النادي مستقبلاً كما يقر العضو بأن أي أدلة إرشادية كالدليل الرياضي
//           ودليل الإشتراكات ودليل الإستخدام وغيرها ... وأي نشرات دورية تصدر من
//           النادي تعد جزئا جزءا لا يتجزأ من هذه الشروط، وأن العضو يقبل بها
//           ويلتزم بها دون أي اعتراض كما يقر العضو بأنه قد اطلع على كافة الأدلة
//           الإرشادية المرفقة مع هذه اللائحة، وأنه قبل بها كجزء من هذه الشروط
//           وهذا الإشتراك:
//         </Text>
//         <Text style={{ fontWeight: "bold", textDecoration: "underline" }}>
//           أولاً: الإحكام والشروط
//         </Text>
//         <Text>
//           الأعمار المسموح بانضمامها للالتحاق بالنادي بمواقعها بالمنطقة هي من
//           (١٤) فما فوق.{" "}
//         </Text>
//         <Text>
//           لا يحصل المشترك على عضوية النادي إلا بعد توقيعه لعقد العضوية وحصوله
//           على نسخة من العقد وسداد كامل رسوم العضوية المستحقة للنادي، وفي حال
//           كان المشترك أقل من (١٨) عام فيجب أن ينوب عنه في توقيع العقد ولي
//           أمره/ ويجوز أن يكون العقد الكتروني.
//         </Text>
//         <Text>
//           مشتركين الفئات الأقل غير مسموح لهم دخول مراكز الفئات الأعلى.
//         </Text>
//         <Text>
//           يجب احترام ومراعاة الأنظمة والعادات والتقاليد السائدة بالمملكة
//           العربية السعودية.
//         </Text>
//         <Text>
//           يجب على المشتركين استخدام أجهزة الدخول وال QR للمركز ويستثنى منها
//           الموظفين وذوي الاعاقة وفي حالة عدم الالتزام، فإنه يحق للنادي ايقاف
//           الدخول للمشترك. للنادي كامل الحق في تحديد أو تغيير أوقات العمل حسب
//           ما يراه مناسبا.
//         </Text>
//         <Text>
//           يلتزم النادي بمنع بيع أو ترويج أو تعاطي أي من المواد المنشطة غير
//           المرخصة من قبل الهيئة العامة للغذاء والدواء.
//         </Text>
//         <Text>
//           يلتزم النادي بالامتناع عن تدريب أو تأهيل المصابين داخل النادي من دون
//           الحصول على تصريح من الجهة المختصة.
//         </Text>
//         <Text>
//           تعيين مدرب شخصي للإشراف على جميع تمارين المشترك ونظامه الغذائي يلزمه
//           دفع رسوم اضافية تقدر على حسب عدد الحصص او المدة التي يرغب بها.
//         </Text>
//         <Text>
//           تعتبر خزائن الملابس متاحة للمشترك خلال ساعات تواجده في النادي فقط
//           ويحق للادارة إفراغ محتويات الخزائن عن طريق كسر القفل عند انتهاء
//           ساعات العمل الرسمية دون تحمل أي مسؤولية نتيجة هذا، ويتحمل المشترك
//           قيمة تغيير القفل.
//         </Text>
//         <Text>
//           تعتبر المناشف والشباشب التي يقدمها النادي عند الدخول للنادي في عهدة
//           على المشترك ويجب إعادتها قبل مغادرة النادي.
//         </Text>
//         <Text>
//           يتوجب على المشترك عدم إيقاف سيارته أمام منازل جيران النادي أو
//           المحلات التجارية المجاورة، وفي جميع الأحوال فإن النادي غير مسؤولة عن
//           أي ضرر قد يصيب السيارة أو فقدان أي أغراض من داخل السيارة.
//         </Text>
//         <Text>
//           يجب على المشترك إبلاغ المدرب في حالة وجود أي مشاكل صحية قبل ممارسة
//           النشاط البدني، وفي جميع الأحوال يتحمل المشترك منفردا كامل المسؤولية
//           عن سلامته الشخصية.
//         </Text>
//         <Text>
//           يبذل المشترك العناية الكافية لسلامته وسلامة الآخرين واتباع تعليمات
//           المدرب أثناء وقبل وبعد أداء التمارين، ولا يتحمل النادي أي مسؤولية
//           تتعلق بحدوث أي إصابات للمشترك (لا سمح الله) أو فقدان المشترك لأي من
//           متعلقاته الشخصية داخل النادي أو خارجه.
//         </Text>
//         <Text>
//           قد يصل للمشترك حملات تسويقية من خلال البريد الالكتروني إضافة إلى أخر
//           العروض والأخبار للمشترك عن طريق الرسائل القصيرة SMS.
//         </Text>
//         <Text>
//           لا يسمح بمزاولة النشاط الرياضي على أجهزة الجري الرياضية لمن هم
//           أوزانهم فوق ١٥٠ كيلو جرام، ويستبدل ذلك بالجري حول المضمار أو حسب
//           توجيه المدرب المسؤول.
//         </Text>
//         <Text>
//           في حال اغلاق النادي لأي سبب فإنه سيتم توجيه العميل إلى أقرب فرع
//           للنادي، لضمان حق العميل في لاستفادة من الاشتراك، وفي حالة عدم إيجاد
//           البديل فإنه يتم إضافة مدة مساوية للمدة التي تم فيها إغلاق النادي إلى
//           اشتراك العميل.
//         </Text>
//         <Text>
//           لا يحق للمشترك المطالبة بالأيام الغير مستخدمة في حال توفر الخدمة.
//         </Text>
//         <Text>لا يحق لأي مشترك الاعتراض على عدد المشتركين في النادي. </Text>
//         <Text>
//           إيقاف الاشتراك عن طريق موقع النادي الالكتروني او حضور المشترك أصالة
//           للفرع.{" "}
//         </Text>
//         <Text>
//           يمكن التنازل عن العضوية لشخص آخر ولمرة واحدة فقط بشرط دفع رسوم نقل
//           الاشتراك بقيمة (500) ريإل.
//         </Text>
//         <Text>
//           يحق للشركة تصوير النادي بأي وسيلة كانت (فديو / فوتوغراف) بما فيه
//           المشتركين أو المتواجدين داخلـه لأي سبب في أي وقت واستخدام هذه الصور
//           بحرية تامة في أية أعمال ترويجية أو تشغيلية دون دفع أي مقابل مادي،
//           وهذا الامر يسري على (فرع الرجال فقط).
//         </Text>
//         <Text>يمنع تجديد اشتراك كل من خالف أحكام وشروط هذه الاتفاقية.</Text>
//         <Text>
//           الحد الأقصى لبداية الاشتراك هو (٥) أيام من تاريخ التسجيل ولا يحق
//           للعميل التأجيل، وفي حال دخول المشترك قبل التاريخ المحدد يتم تفعيل
//           الاشتراك من تاريخ أول دخول.
//         </Text>
//         <Text>
//           لا تتحمل أندية شركة توازن المسؤولية عن أي تأخير أو فشل في تنفيذ هذه
//           الشروط جزئيا أو كليا نتيجة لأي سبب خارج عن سيطرتها وبدون ارتكاب خطا
//           أو إهمال من جانبها، منها على سبيل المثال لا الحصر القضاء والقدر،
//           والإجراءات التي تتخذها سلطة مدنية أو عسكرية، والقوانين واللوائح
//           الحالية في الدولة والتعديلات عليها والأوبئة وانتشار الأمراض المعدية،
//           والحروب، والحرائق، والانفجارات، والزلازل، والحوادث النووية،
//           والفيضانات، وحوادث انقطاع التيار الكهربائي، والثورات البركانية
//           والاضطرابات البيئية الأخرى الكبيرة، وسوء الأحوال الجوية على نحو غير
//           عادي، وأعمال القرصنة الإلكترونية، والأنشطة غير القانونية الأخرى التي
//           يمارسها الغير، أو عدم قدرتها علي تأمين المنتجات أو الخدمات التي
//           يقدمها أشخاص أخرون أو مرافق النقل، أو التصرفات أو الإهمال من جانب
//           وسائل النقل أو الاتصالات التي تستخدمها شركات النقل العامة.
//         </Text>
//         <Text>
//           من المتفق عليه أن هذا العقد غير قابل للتنازل أو قابلا للتحويل من قبل
//           أي عضو، ولا يجوز نقل أو منح الحقوق أو الامتيازات الممنوحة من هذه
//           العضوية من قبل العضو لشخص آخر.
//         </Text>
//         <Text style={{ fontWeight: "bold", textDecoration: "underline" }}>
//           ثانياً حقوق الإعضاء:
//         </Text>
//         <Text>لكل مشترك يوم تجربة مجاني بعد توقيع هذا العقد.</Text>
//         <Text>
//           يلتزم النادي بتحديد فترة تجربة لا تقل عن (٤٨) ساعة من تاريخ بدء
//           العضوية حيث يحق للمشترك خلالها الغاء عضويته واسترداد كامل الرسوم
//           لمرة واحدة فقط، وذلك في حال عدم توفير النادي ليوم تجربة مجاني.
//         </Text>
//         <Text>
//           لجميع أعضاء النادي حق ارتياد النادي بالشروط والأوضاع المقررة في
//           النظام الأساسي ولوائح وتعليمات الإدارة.
//         </Text>
//         <Text>
//           لجميع الأعضاء الحق في استعمال جميع مرافق النادي وملاعبه ومزاولة
//           الأنشطة المتنوعة طبقا للأوضاع المقررة والنظم المعمول بها.
//         </Text>
//         <Text>التمتع بالعضوية في حدود مدة حق الانتفاع المقررة للنادي.</Text>
//         <Text>
//           للعضو الاصل حق دعوة ضيوفه لزيارة النادي بعد قيد أسمائهم في السجل
//           الخاصة وسداد الرسم الذي تقرره إدارة النادي على ألا يزيد عدد المدعوين
//           عن فردين وإلا يتطلب ذلك الحصول على موافقة مدير النادي ويكون العضو
//           مسئولا مسئولية كاملة عن تصرفات ضيوفه خلال تواجدهم بالنادي.
//         </Text>
//         <Text>
//           أعضاء النادي الحق في أن يتقدموا بكل ما لديهم من شكاوى أو اقتراحات أو
//           ملاحظات إلى إدارة النادي لاتخاذ ما يلزم بشأنها وعلى مدير النادي
//           إخطار العضو بنتيجة ما تم في شكواه.
//         </Text>
//         <Text style={{ fontWeight: "bold", textDecoration: "underline" }}>
//           ثانياً: واجبات الإعضاء:
//         </Text>
//         <Text>الالتزام بقرارات وتعليمات الإدارة والمدير المسئول. </Text>
//         <Text>
//           احترام نظم النادي ولوائحه وقرارات وتعليمات الإدارة مكتوبة كانت أو
//           شفاهية.
//         </Text>
//         <Text>الوفاء بالالتزامات المالية المقررة.</Text>
//         <Text>
//           المحافظة على منشآت وأثاث ومنقولات النادي ويلتزم العضو بأداء التعويض
//           النقدي الذي تقدره إدارة النادي عن كل تلف يقع منه أو من الأعضاء
//           التابعين له.
//         </Text>
//         <Text>
//           الامتناع عن نقل أي من متعلقات النادي إلى خارج المكان المخصص له أو
//           استعمالها في غير الغرض الذي أعد من أجله.
//         </Text>
//         <Text>
//           على العضو أن يمتنع عن نشر أي شيء عن النادي في الصحف أو المجلات أو
//           وسائل الإعلام الأخرى يسى إلي سمعة النادي أو سمعة أعضائه.
//         </Text>
{
  /* <Text style={style.title}>{url}</Text>
          <Text style={style.text}>التاريخ والوقت: {readableDate}</Text>
          <Text style={style.text}>اسم المستخدم:{admin}</Text>
          <Text style={style.text}>
            {hasArabicC && !hasEnglishC
              ? `اسم العضو: ${customerName}`
              : `${customerName} :اسم العضو`}
          </Text>
          <Text style={style.text}>رقم الهاتف: {phone_number}</Text>
          <Text style={style.text}>الرقم الضريبي: 311051035700003</Text>
          <Text style={style.text}>رقم العضوية: {national_id}</Text>
          <View style={style.table}>
            <View style={[style.tableRow, style.tableHeader]}>
              <Text style={style.tableCol}>الإجمالي</Text>
              <Text style={style.tableCol}>الى</Text>
              <Text style={style.tableCol}>من</Text>
              <Text style={style.tableCol}>البيان</Text>
            </View>
            <View style={style.tableRow}>
              <Text style={style.tableCol}>{total}</Text>
              <Text style={style.tableCol}>
                {addMonthToDate(startDate).toISOString().split("T")[0]
                  ? addMonthToDate(startDate).toISOString().split("T")[0]
                  : "-"}
              </Text>
              <Text style={style.tableCol}>{startDate}</Text>
              <Text style={style.tableCol}>{group}</Text>
            </View>
          </View>
          <Text style={style.text}>
            الخصم (%{discount}): {(total * (discount / 100)).toFixed(2)}ريال
          </Text>
          <Text style={style.text}>
            قيمته: {promoValue} ريال - {promo} :البرومو كود
          </Text>
          <Text style={style.text}>الإجمالي قبل الضريبة: {totalBT}ريال</Text>
          <Text style={style.text}>الضريبة (%15): {taxes}ريال</Text>
          <Text style={style.text}>الإجمالي: {fTotal}ريال</Text>
          <Text
            style={{
              fontSize: 4,
              textDecoration: "underline",
              textAlign: "center",
              marginTop: 1.5,
              marginBottom: 2,
            }}
          >
            الإجمالي النهائي يشمل ضريبة القيمة المضافة
          </Text>
          <Text style={{ fontSize: 3.5, textAlign: "center" }}>
            سجل تجاري / 4030431805
          </Text> */
}
//           <Text style={style.footer}>Balance Fitness Complix ©</Text>
//         </View>
//       </Page>
//     </Document>
//   );
// };

const RequestDetails = () => {
  const { RequestId } = useParams();

  const { data: userData, isLoading: isUserDataLoading } =
    useGetAllMembersQuery(`/${RequestId}`);
  console.log(userData);

  const [editMember] = useEditMemberMutation();

  const initialValues = {
    name: userData?.data?.user.name,
    phone_number: userData?.data?.user.phone_number,
    national_id: userData?.data?.user.national_id,
    date_of_birth: userData?.data?.user.date_of_birth,
    gender: userData?.data?.user.gender,
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("هذا الحقل الزامي"),
    phone_number: Yup.string().required("هذا الحقل الزامي"),
    national_id: Yup.string()
      .matches(/^[1-2]\d{9}$/, "يجب أن تبدأ برقم 1 أو 2، وتحتوي على 10 أرقام")
      .required("هذا الحقل الزامي"),
    date_of_birth: Yup.date().required("هذا الحقل الزامي"),
    gender: Yup.string().required("هذا الحقل الزامي"),
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const handleCancel = async () => {
    try {
      const response = await editMember({
        id: RequestId,
        data: { is_verified: false },
      });
      console.log(response);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/Home/RejectedRequests");
        window.location.reload();
      }, 1000);
    } catch (err) {
      if (err.originalStatus === 403) {
        setError("ليس لديك الصلاحية لإضافة مجموعة.");
        setTimeout(() => {
          setError("");
        }, 3000);
      } else if (err.originalStatus === 401) {
        setError("قم بتسجيل الدخول وحاول مرة أخرى.");
        setTimeout(() => {
          setError("");
        }, 3000);
      } else {
        setError("حدث خطأ، برجاء المحاولة مرة أخرى لاحقاً.");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    }
  };

  const [selectedImage, setSelectedImage] = useState(
    userData?.data?.user.personal_card_image
  );
  const [selectedProfileImage, setSelectedProfileImage] = useState(
    userData?.data?.user.profile_image
  );
  useEffect(() => {
    setSelectedProfileImage(userData?.data?.user.profile_image);
    setSelectedImage(userData?.data?.user.personal_card_image);
  }, [
    userData?.data?.user.personal_card_image,
    userData?.data?.user.profile_image,
  ]);

  // Handle file selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Save the selected file
    }
  };

  // Handle upload button click
  const handleUploadClick = () => {
    document.getElementById("imageInput").click(); // Trigger the file input
  };

  const handleUploadProfileClick = () => {
    document.getElementById("profileImageInput").click(); // Trigger the file input
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedProfileImage(URL.createObjectURL(file)); // Save the selected file
    }
  };

  const handleSubmit = async (values) => {
    // console.log("first");
    // const doc = <ReceiptDocument />;
    // // Generate PDF blo
    // const blob = await pdf(doc).toBlob();
    // // Open in new tab and trigger print dialog
    // const blobURL = URL.createObjectURL(blob);
    // window.open(blobURL);

    console.log(values);
    console.log(selectedImage);
    console.log(selectedProfileImage);
    const profileResponse = await fetch(selectedProfileImage);
    const response = await fetch(selectedImage);
    const blob = await response.blob(); // Convert the response to a Blob
    const profileBlob = await profileResponse.blob(); // Convert the response to a Blob
    const file = new File([blob], "image1.jpg", { type: blob.type });
    const profileFile = new File([profileBlob], "image2.jpg", {
      type: profileBlob.type,
    });
    console.log(file.size);
    console.log(profileFile.size);

    // Step 2: Convert the Blob to a File
    const formattedValues = new FormData();
    formattedValues.append("name", values.name);
    formattedValues.append("phone_number", values.phone_number);
    formattedValues.append("national_id", values.national_id);
    formattedValues.append("date_of_birth", values.date_of_birth);
    formattedValues.append("gender", values.gender === "انثي" ? "F" : "M");
    formattedValues.append("is_verified", true);
    selectedProfileImage?.length > 0 &&
      formattedValues.append("profile_image", profileFile);
    selectedImage?.length > 0 &&
      formattedValues.append("personal_card_image", file);

    try {
      const response = await editMember({
        id: RequestId,
        data: formattedValues,
      }).unwrap();
      console.log(response);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/Home/AcceptedRequests");
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);
      if (
        Object.keys(err.data.error).includes("national_id") &&
        Object.keys(err.data.error).includes("phone_number")
      ) {
        setError("رقم الهاتف ورقم العضوية مسجلين مسبقاً.");
        setTimeout(() => {
          setError("");
        }, 3000);
      } else if (Object.keys(err.data.error).includes("phone_number")) {
        setError("رقم الهاتف مسجل مسبقاً.");
        setTimeout(() => {
          setError("");
        }, 3000);
      } else if (Object.keys(err.data.error).includes("national_id")) {
        setError("رقم العضوية مسجل مسبقاً.");
        setTimeout(() => {
          setError("");
        }, 3000);
      } else if (err.originalStatus === 403) {
        setError("ليس لديك الصلاحية لإضافة مجموعة.");
        setTimeout(() => {
          setError("");
        }, 3000);
      } else if (err.originalStatus === 401) {
        setError("قم بتسجيل الدخول وحاول مرة أخرى.");
        setTimeout(() => {
          setError("");
        }, 3000);
      } else {
        setError("حدث خطأ، برجاء المحاولة مرة أخرى لاحقاً.");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    }
  };

  if (isUserDataLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center w-100"
        style={{ height: "100vh", backgroundColor: "#373636" }}
      >
        <Commet color="#316dcc" size="medium" text="" textColor="" />
      </div>
    );
  }

  return (
    <>
      {success && <Success text={"تم إضافة مستخدم بنجاح! "} />}
      {error.length > 0 ? <Error text={error} show={error.length > 0} /> : null}
      <div className={`${styles.addGroupMemberForm}`}>
        <ComponentTitle
          MainIcon={"/assets/image/Users.png"}
          title={"تفاصيل طلب الإشتراك"}
          subTitle={"يمكنك متابعة تفاصيل طلبات الإشتراكات من هنا  "}
        />
        <div
          className="rounded-2"
          style={{ backgroundColor: "#373636", padding: "50px" }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className={`row`}>
                <div className={`col-12 col-md-6`}>
                  <InputField name="name" label="اسم العضو" />
                </div>
                <div
                  className={`col-12 col-md-6 phone-number position-relative`}
                >
                  <InputField
                    name={"phone_number"}
                    label={"رقم الهاتف"}
                    disabled
                  />
                </div>
              </div>
              <div className={`row`}>
                <div className={`col-12 col-md-6`}>
                  <InputField name="national_id" label="رقم العضوية" />
                </div>
                <div className={`col-12 col-md-6`}>
                  <InputField
                    name="date_of_birth"
                    label="تاريخ الميلاد"
                    inputType={"input"}
                    type={"date"}
                  />
                </div>
              </div>
              <div className={`row`}>
                <div className={`col-12 col-md-6`}>
                  <InputField
                    name={"gender"}
                    label={"الجنس"}
                    inputType={"select"}
                  >
                    <option value={""}>اختر</option>
                    <option value={"M"}>ذكر</option>
                    <option value={"F"}>انثي</option>
                  </InputField>
                </div>
              </div>
              <div className="row g-4 mt-1 mb-5" style={{ minHeight: 120 }}>
                <div className="col-12 col-sm-6 position-relative d-flex flex-column justify-content-top align-items-center">
                  <label className="text-light mb-2 align-self-start">
                    تحميل الصورة الشخصية
                  </label>
                  <img
                    src={selectedProfileImage}
                    alt=""
                    style={{
                      maxWidth: "100%",
                      maxHeight: "300px",
                      width: "fit-content",
                    }}
                  />
                  <div className="btns d-flex justify-content-center align-items-center gap-3">
                    <div
                      className={`editBtn bg-primary p-2 pe-4 ps-4 rounded-2 text-white border-0`}
                      onClick={handleUploadProfileClick}
                    >
                      تعديل
                    </div>
                    <input
                      type="file"
                      id="profileImageInput"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleProfileImageChange}
                    />
                    <div
                      className={`deleteBtn bg-danger p-2 pe-4 ps-4 rounded-2 text-white border-0`}
                      onClick={() => setSelectedProfileImage("")}
                    >
                      حذف
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 position-relative d-flex flex-column justify-content-top align-items-center">
                  <label className="text-light mb-2 align-self-start">
                    تحميل صورة البطاقة الشخصية
                  </label>
                  <img
                    src={selectedImage}
                    alt=""
                    style={{
                      maxWidth: "100%",
                      maxHeight: "300px",
                      width: "fit-content",
                    }}
                  />
                  <div className="btns d-flex justify-content-center align-items-center gap-3">
                    <div
                      className={`editBtn bg-primary p-2 pe-4 ps-4 rounded-2 text-white border-0`}
                      onClick={handleUploadClick}
                    >
                      تعديل
                    </div>
                    <input
                      type="file"
                      id="imageInput"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                    <div
                      className={`deleteBtn bg-danger p-2 pe-4 ps-4 rounded-2 text-white border-0`}
                      onClick={() => setSelectedImage("")}
                    >
                      حذف
                    </div>
                  </div>
                </div>
              </div>
              <div className="row text-center mt-4 d-flex justify-content-center gap-5">
                <button type="submit" className={`${styles.acceptButton}`}>
                  <div className={`d-inline-block fw-bold`}>قبول الطلب</div>
                </button>
                <div
                  className={`${styles.cancelButton}`}
                  onClick={handleCancel}
                >
                  <div className={`d-inline-block fw-bold`}>رفض الطلب</div>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default RequestDetails;
