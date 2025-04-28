import { useState } from "react";
import SelectDropdown from "./components/Fields/SelectDropdown";
import { months } from "./constants/years";
import TransactionInput from "./TransactionInput";

const MonthDashboard = () => {
  const [showTransactionInput, setShowTransactionInput] = useState(false);

  const getCurrentMonthValue = () => {
    const now = new Date();
    const monthIndex = now.getMonth();
    return months[monthIndex].value;
  };

  const addTransaction = (
    category: string,
    amount: number,
    comment?: string,
  ) => {
    console.log("Adding transaction", category, amount, comment);
    setShowTransactionInput(false);
  };

  return (
    <>
      {showTransactionInput && <div className="fixed inset-0 bg-gray-500 opacity-50 z-50 pointer-events-none"></div>      }
      <div className={`mx-auto md:max-w-4xl`}>
        <div className="flex justify-end py-4">
          <SelectDropdown
            selected={getCurrentMonthValue()}
            options={months}
            onChange={(value) => console.log("Selected month:", value)}
            placeholder="Select a month"
          />
        </div>

        

        <button className="float-right" onClick={() => setShowTransactionInput(true)}>
          Add Transaction
        </button>
      </div>
      <TransactionInput
        isOpen={showTransactionInput}
        onSubmit={(category: string, amount: number, comment?: string) =>
          addTransaction(category, amount, comment)
        }
        onClose={() => setShowTransactionInput(false)}
      />
    </>
  );
};

export default MonthDashboard;
