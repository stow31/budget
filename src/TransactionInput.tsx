import { useState, useEffect } from "react";
import SelectDropdown from "./components/Fields/SelectDropdown";
import { categories } from "./constants/categories";
import {
  BackspaceIcon,
  CheckBadgeIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface TransactionInputProps {
  isOpen: boolean;
  onSubmit: (category: string, amount: number, comment?: string) => void;
  onClose?: () => void;
}

const TransactionInput = ({
  isOpen,
  onSubmit,
  onClose,
}: TransactionInputProps) => {
  const [category, setCategory] = useState("");
  const [comment, setComment] = useState("");
  const [amountText, setAmountText] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [internalVisible, setInternalVisible] = useState(isOpen);

  useEffect(() => {
    setInternalVisible(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const amountNumber = convertTextToNumber(amountText);
    if (amountNumber) setAmount(amountNumber);
  }, [amountText]);

  const convertTextToNumber = (text: string) => {
    let amountNumber = parseFloat(text.replace(/[^\d.-]/g, ""));
    if (isNaN(amountNumber)) {
      return;
    } else {
      return Math.round(amountNumber * 100) / 100;
    }
  };

  const handleSubmit = () => {
    if (category && amount > 0) {
      onSubmit(category, amount);
      setTimeout(() => {
        setCategory("");
        setComment("");
        setAmountText("");
        handleClose()
      }, 500);
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    setInternalVisible(false)
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl py-10 px-10 max-w-lg mx-auto transform transition-transform duration-500 ${internalVisible ? "translate-y-0" : "translate-y-full"} z-90`}
    >
      <XMarkIcon onClick={handleClose} className="absolute top-2 right-3 size-7 cursor-pointer"/>
      <div className="my-2 flex justify-between">
        <input
          type="date"
          defaultValue={new Date().toISOString().split("T")[0]}
        />
        <SelectDropdown
          onChange={(value) => {
            setCategory(value);
          }}
          selectedValue={category}
          options={categories}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="py-6 px-2 flex justify-center items-center bg-gray-50 rounded-4xl">
          <span className="text-gray-500">$</span>
          <span className="text-2xl">{amount > 0 ? amount : 0.0}</span>
        </div>

        <input
          type="text"
          placeholder="Comment (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border-none active:border p-1 text-sm"
        />

        <div className="grid grid-cols-3 gap-1">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
            <button
              key={digit}
              onClick={() => setAmountText(amountText + digit.toString())}
              className="!py-4 !px-2 !border-none bg-gray-100 hover:bg-gray-300 rounded-xl transition"
            >
              {digit}
            </button>
          ))}
          <button
            onClick={() => setAmountText(amountText + ".".toString())}
            className="!py-4 !px-2 !border-none bg-gray-100 hover:bg-gray-300 rounded-xl transition"
          >
            .
          </button>
        </div>

        <div className="flex gap-2 justify-between">
          <button
            onClick={() => setAmountText(amountText.slice(0, -1))}
            className="flex-grow flex justify-center bg-red-200 !border-none text-black p-3 rounded-xl font-bold transition"
          >
            <BackspaceIcon className="size-5" />
          </button>

          <button
            onClick={handleSubmit}
            className="flex-grow flex justify-center bg-black text-white p-3 rounded-xl font-bold transition"
          >
            <CheckIcon className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionInput;
