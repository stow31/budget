import { useState } from "react";
import SelectDropdown from "./components/Fields/SelectDropdown";
import { months } from "./constants/years";
import TransactionInput from "./TransactionInput";
import { Tab, Tabs } from "./components/Tabs";
import CategoryInput from "./CategoryInput";

const MonthlyDashboard = () => {
  const [showTransactionInput, setShowTransactionInput] = useState(false);
  const [showCategoryInput, setShowCategoryInput] = useState(false);

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

  const addCategory = (
    category: string,
  ) => {
    console.log("Adding category", category);
    setShowCategoryInput(false);
  };

  return (
    <>
      {showTransactionInput && (
        <div className="fixed inset-0 bg-gray-500 opacity-50 z-50 pointer-events-none"></div>
      )}
      <div className={`mx-auto md:max-w-4xl`}>
        <div className="flex justify-end py-4">
          <button onClick={() => setShowCategoryInput(true)}>
            Add Category
          </button>
          <SelectDropdown
            selected={getCurrentMonthValue()}
            options={months}
            onChange={(value) => console.log("Selected month:", value)}
            placeholder="Select a month"
          />
        </div>

        <Tabs initialIndex={0}>
          <Tab label="Expenses">
            <div>
              <button
                className="float-right"
                onClick={() => setShowTransactionInput(true)}
              >
                Add Transaction
              </button>

              <TransactionInput
                isOpen={showTransactionInput}
                onSubmit={(
                  category: string,
                  amount: number,
                  comment?: string,
                ) => addTransaction(category, amount, comment)}
                onClose={() => setShowTransactionInput(false)}
              />
            </div>
          </Tab>
          <Tab label="Budget">
            <div>Welcome to the budget</div>
          </Tab>
        </Tabs>

        <CategoryInput
          isOpen={showCategoryInput}
          onSubmit={(category: string) =>
            addCategory(category)
          }
          onClose={() => setShowTransactionInput(false)}
        />
      </div>
    </>
  );
};

export default MonthlyDashboard;
