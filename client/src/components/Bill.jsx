import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Bill";
import { Form } from "react-router-dom";
import day from "dayjs";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { MdPrint } from "react-icons/md";
import { useRef } from "react";

import advancedFormat from "dayjs/plugin/advancedFormat";
import BillInfo from "./BillInfo";
import ReactToPrint from "react-to-print";
day.extend(advancedFormat);

const Bill = ({
  _id,
  drugId,
  unitPrice,
  drugName,
  customerName,
  quantity,
  supplier,
  expiryDate,
  totalPrice,
  weight,
  createdAt,
  patientAddress,
  patientPhone,
}) => {
  expiryDate = day(expiryDate).format("MMM Do, YYYY");
  createdAt = day(createdAt).format("MMM Do, YYYY");

  const printRef = useRef();

  const billData = {
    _id,
    unitPrice,
    drugId,
    drugName,
    quantity,
    supplier,
    expiryDate,
    totalPrice,
    weight,
    createdAt,

    patientAddress,
    patientPhone,
    customerName,
  };
  return (
    <Wrapper ref={printRef}>
      <div className="info">
        <BillInfo key={billData._id} {...billData} />

        <div className="action-btn no-print">
          <Link to={`../edit-bill/${billData._id}`} className="btn edit-btn">
            <CiEdit size={20} />
          </Link>
          <Form method="post" action={`../delete-bill/${_id}`}>
            <button type="submit" className="btn delete-btn">
              <MdDelete size={20} />
            </button>
          </Form>
          <ReactToPrint
            trigger={() => (
              <button type="button" className="btn print-btn">
                <MdPrint size={20} />
              </button>
            )}
            content={() => printRef.current}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default Bill;
