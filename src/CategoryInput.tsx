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
  const [newCategory, setNewCategory] = useState<string>("");
  const [categories, setCategories] = useState<
    Array<Schema["Category"]["type"]>
  >([]);

  useEffect(() => {
    client.models.Category.observeQuery().subscribe({
      next: (data) => setCategories([...data.items]),
    });
  }, []);

  const createCategory = () => {
    if (newCategory.trim().length > 0) {
      client.models.Category.create({ name: newCategory });
      setNewCategory("");
    }
  };

  const deleteCategory = (id: string) => {
    client.models.Category.delete({ id: id });
  };

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

      <div className="flex flex-col">
        {categories.length > 0 ? (
          <ul>
            {categories.map((category) => (
              <li className="flex justify-between items-ce" key={category.id}>
                {category.name}{" "}
                <XMarkIcon
                  onClick={() => deleteCategory(category.id)}
                  className="size-4"
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500 text-center">
            You don't have any categories yet
          </div>
        )}

        <input
          placeholder="Enter an expense category"
          value={newCategory}
          className="my-4 p-2 border text-center rounded-4xl"
          onChange={(e) => setNewCategory(e.target.value)}
          type="text"
        />
        <button onClick={createCategory}>Add Category</button>
      </div>
    </div>
  );
};

export default CategoryInput;
