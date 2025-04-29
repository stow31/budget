import { useState } from "react";
import SelectDropdown from "./components/Fields/SelectDropdown";
import { months } from "./constants/years";
import TransactionInput from "./TransactionInput";
import { Tab, Tabs } from "./components/Tabs";
import CategoryInput from "./CategoryInput";
import ExpensesByCategory from "./ExpensesByCategory";

const MonthlyDashboard = () => {
  const [showTransactionInput, setShowTransactionInput] = useState(false);
  const [showCategoryInput, setShowCategoryInput] = useState(false);

  const getCurrentMonthValue = () => {
    const now = new Date();
    const monthIndex = now.getMonth();
    return months[monthIndex].value;
  };

  return (
    <>
      {(showTransactionInput || showCategoryInput) && (
        <div className="fixed inset-0 bg-gray-500 opacity-50 z-50 pointer-events-none"></div>
      )}
      <div className={`mx-auto md:max-w-4xl`}>
        <div className="py-4 flex justify-end gap-3">
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
            <div className="mb-4">
              <div className="flex justify-end">
                <button
                  className="float-right"
                  onClick={() => setShowTransactionInput(true)}
                >
                  Add Transaction
                </button>

                <TransactionInput
                  isOpen={showTransactionInput}
                  onSubmit={() => setShowTransactionInput(false)}
                  onClose={() => setShowTransactionInput(false)}
                />
              </div>

              <ExpensesByCategory />
            </div>
          </Tab>
          <Tab label="Budget">
            <div>Welcome to the budget</div>
          </Tab>
        </Tabs>

        <CategoryInput
          isOpen={showCategoryInput}
          onSubmit={() => setShowCategoryInput(false)}
          onClose={() => setShowCategoryInput(false)}
        />
      </div>
    </>
  );
};

export default MonthlyDashboard;
