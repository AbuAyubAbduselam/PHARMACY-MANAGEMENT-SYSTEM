import Wrapper from "../assets/wrappers/DrugInfo";
import day from "dayjs";
import { useDashboardContext } from "../pages/DashboardLayout";
import { MdOutlineContentCopy } from "react-icons/md";
import { IoCheckmarkOutline } from "react-icons/io5";

import { useState } from "react";
const DrugInfo = ({
  _id,
  drugName,
  quantity,
  drugStatus,
  supplier,
  expiryDate,
  price,
  weight,
  description,
}) => {
  expiryDate = day(expiryDate).format("MMM Do, YYYY");

  const { user } = useDashboardContext();

  let isVisitor = user._id === "665444905b50510f3255a969";
  const [text, setText] = useState("");
  const [icon, setIcon] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(_id);
    setIcon(true);
    setText("copied!");
    setTimeout(() => {
      setText("");
      setIcon(false);
    }, 2000);
  };

  return (
    <Wrapper>
      <div className="drug-data">
        <div className="clmn-1">
          {!isVisitor && (
            <div className="idd flex flex-row gap-2">
              <div>
                Product Id: <span className="drug-id  font-Poppins">{_id}</span>
              </div>
              <div>
                {icon ? (
                  <IoCheckmarkOutline />
                ) : (
                  <MdOutlineContentCopy
                    className="copy-icon"
                    onClick={handleCopyClick}
                  />
                )}
                {text && <div className="copy-message">{text}</div>}
              </div>
            </div>
          )}
          <div>
            Product Name: <span>{drugName}</span>
          </div>

          {!isVisitor && (
            <div>
              Quantity: <span>{quantity}</span>
            </div>
          )}

          {!isVisitor && (
            <div>
              Price: <span>{price} birr</span>
            </div>
          )}

          {!isVisitor && (
            <div>
              Supplier: <span>{supplier}</span>
            </div>
          )}
        </div>
        <div className="clmn-2">
          <div>
            Weight: <span>{weight}mg</span>
          </div>
          <div>
            Expiry Date: <span>{expiryDate}</span>
          </div>
          <div>
            Drug Status:
            <span className={`status ${drugStatus}`}>{drugStatus}</span>
          </div>
          <div>
            Description:{" "}
            <span className="leading-9 font-Roboto ">{description}</span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default DrugInfo;
