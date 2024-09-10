import React from "react";
import "./container.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Container() {

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container">
      {/*date and time */}
      <section className="d-flex align-items-center">
        <div className="ms-3 mb-3 bg-light p-2 rounded">
          <img src="/assets/image/homepage.png" alt="home logo" width={"23px"} height={"21.36"}/>
        </div>
        <div>
          <p className="mb-0">لوحة التحكم <span className="text-muted me-2 text-secondary fs-6 fw-lighter ">{formattedDate}</span></p>
          <p className="fw-lighter">أهلا بك في يوم إبداعي جديد</p>
        </div>
      </section>
      {/*end of date and time */}
      <div className="items mt-4">
        <div className="item">
          <CircularProgressbar
            value={70}
            text="70%"
            strokeWidth={10}
            styles={{
              path: { stroke: "#BF2EF0" },
              trail: { stroke: "#eee" }, 
              text: { fill: "#000", fontSize: "23px" , fontWeight:"bolder"}, 
            }}

            className="progressbar"
          />
          <div className="d-flex align-items-center justify-content-between mt-4">
            <div>
              <p className="mb-0 fw-bolder">حجوزات اليوم</p>
              <p className="fw-lighter">الحجوزات منذ بداية اليوم</p>
            </div>
            <div>
              <p className="fw-bolder mt-4" style={{color:"#BF2EF0"}}>500</p>
            </div>
          </div>
        </div>
        <div className="item ">
          <CircularProgressbar
            value={100}
            text="100%"
            strokeWidth={10}
            styles={{
              path: { stroke: "#8576FF" },
              trail: { stroke: "#eee" }, 
              text: { fill: "#000", fontSize: "23px" , fontWeight:"bolder"}, 
            }}
            className="progressbar"
          />
          <div className="d-flex align-items-center justify-content-between mt-4">
            <div>
              <p className="mb-0 fw-bolder">جميع الأعضاء</p>
              <p className="fw-lighter">جميع الأعضاء في النادي</p>
            </div>
            <div>
              <p className="fw-bolder mt-4" style={{color:"#8576FF"}}>973</p>
            </div>
          </div>
        </div>
        <div className="item">
          <CircularProgressbar
            value={20.5}
            text="20.5%"
            strokeWidth={10}
            styles={{
              path: { stroke: "#4CCD99" },
              trail: { stroke: "#eee" }, 
              text: { fill: "#000", fontSize: "23px" , fontWeight:"bolder"}, 
            }}
            className="progressbar"
          />
          <div className="d-flex align-items-center justify-content-between mt-4">
            <div>
              <p className="mb-0 fw-bolder">الاشتراكات الفعالة</p>
              <p className="fw-lighter">جميع الاشتراكات الفعالة</p>
            </div>
            <div>
              <p className="fw-bolder mt-4" style={{color:"#4CCD99"}}>288</p>
            </div>
          </div>
        </div>
        <div className="item">
          <CircularProgressbar
            value={3.45}
            text="3.45%"
            strokeWidth={10}
            styles={{
              path: { stroke: "#FF8080" },
              trail: { stroke: "#eee" }, 
              text: { fill: "#000", fontSize: "23px" , fontWeight:"bolder"}, 
            }}
            className="progressbar"
          />
          <div className="d-flex align-items-center justify-content-between mt-4">
            <div>
              <p className="mb-0 fw-bolder">جميع الأعضاء</p>
              <p className="fw-lighter">جميع الأعضاء في النادي</p>
            </div>
            <div>
              <p className="fw-bolder mt-4" style={{color:"#FF8080"}}>30</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Container;
