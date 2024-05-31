import { useState } from "react";
import Wrapper from "../assets/wrappers/BillInfo";
import { FaCopy } from "react-icons/fa";

const BillInfo = ({
  _id,
  unitPrice,
  drugId,
  drugName,
  customerName,
  quantity,
  expiryDate,
  totalPrice,
  weight,
  createdAt,
  patientAddress,
  patientPhone,
}) => {
  return (
    <Wrapper>
      <div className="drug-data">
        <div className="top">
          <div className="ph-info">
            <div className="compName font-Poppins">Rediet Pharmacy</div>
            <div className="address">
              <div>
                Address: <span>Bensa Daye,Sidama,Ethiopia</span>
              </div>
              <div>
                Phone No. <span>0123456789</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bot">
          <div className="col-1">
            <div>
              bill created: <span>{createdAt}</span>
            </div>
            <div>
              Product Id:
              <span>{drugId}</span>
            </div>
            <div>
              Product Name: <span>{drugName}</span>
            </div>
            <div>
              Patient Name: <span>{customerName}</span>
            </div>
            <div>
              Address of patient: <span>{patientAddress}</span>
            </div>
            <div>
              Phone No. <span>{patientPhone}</span>
            </div>
            <div>
              Quantity: <span>{quantity}</span>
            </div>
          </div>
          <div className="col-2">
            <div>
              Weight: <span>{weight}mg</span>
            </div>
            <div>
              Unit Price: <span>{unitPrice} birr</span>
            </div>
            <div>
              Total Price: <span>{totalPrice} birr</span>
            </div>

            <div>
              Expiry Date: <span>{expiryDate}</span>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default BillInfo;
