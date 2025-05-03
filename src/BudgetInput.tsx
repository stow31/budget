import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { generateClient } from "aws-amplify/api";
import type { Schema } from "../amplify/data/resource";

interface BudgetInputProps {
  isOpen: boolean;
  onClose?: () => void;
  month: string;
}

const client = generateClient<Schema>();

const BudgetInput = ({ isOpen, onClose }: BudgetInputProps) => {
  const [categories, setCategories] = useState<
    Array<Schema["Category"]["type"]>
  >([]);
  const [internalVisible, setInternalVisible] = useState(isOpen);

  // Get Categories from DB
  useEffect(() => {
    client.models.Category.observeQuery().subscribe({
      next: (data) => setCategories(data.items),
    });
  }, []);

  // Set visbility based on props
  useEffect(() => {
    setInternalVisible(isOpen);
  }, [isOpen]);

  // const handleSave = () => {
  //   // TODO: implement save
  // };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    setInternalVisible(false);
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl py-10 px-10 max-w-lg mx-auto transform transition-transform duration-500 ${internalVisible ? "translate-y-0" : "translate-y-full"} z-90`}
    >
      <XMarkIcon
        onClick={handleClose}
        className="absolute top-2 right-3 size-7 cursor-pointer"
      />
      <div>
        {categories.map((category) => {
          return (
            <div className="py-2 flex justify-between border-b border-gray-300">
              <div>{category.name}</div>
              <div>
                <input type="number" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetInput;
