import { useState, useEffect } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { XMarkIcon } from "@heroicons/react/16/solid";

const client = generateClient<Schema>();


interface CategoryInputProps {
  isOpen: boolean;
  onSubmit: (category: string) => void;
  onClose?: () => void;
}

const CategoryInput = ({ isOpen, onClose }: CategoryInputProps) => {
  const [internalVisible, setInternalVisible] = useState(isOpen);
  const [categories, setCategories] = useState<Array<Schema["Category"]["type"]>>([]);

  useEffect(() => {
    client.models.Category.observeQuery().subscribe({
      next: (data) => setCategories([...data.items]),
    });
  }, []);

  function createCategory() {
    client.models.Category.create({ name: window.prompt("Category content") });
  }

  useEffect(() => {
    setInternalVisible(isOpen);
  }, [isOpen]);

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

      <div className="">
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>

      <input type="text" />
      <button onClick={createCategory}>Add Categorie</button>

      </div>
    </div>
  );
};

export default CategoryInput;
