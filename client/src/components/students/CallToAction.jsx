import React from "react";
import { assets } from "../../assets/assets";

function CallToAction() {
  return (
    <div>
      <h1>Learn anything, anytime, anywhere</h1>
      <p>
        mera nam h shivam bhatnagar or mai ye project bna rha hu bhaisaahb esi
        tesi lgo huo thi subh s itti error a rhi h
      </p>
      <div>
        <button>Get started</button>
        <button>
          Learn More <img src={assets.arrow_icon} alt="arrow"></img>
        </button>
      </div>
    </div>
  );
}

export default CallToAction;
