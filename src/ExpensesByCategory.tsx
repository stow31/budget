import { generateClient } from "aws-amplify/api";
import React, { useEffect, useState } from "react";
import { Schema } from "../amplify/data/resource";

interface ExpensesByCategoryProps {
  //   expenses: {
  //     category: string;
  //     amount: number;
  //   }[];
}

const client = generateClient<Schema>();

const ExpensesByCategory: React.FC<ExpensesByCategoryProps> = () => {
  const [categories, setCategories] = useState<
    Array<Schema["Category"]["type"]>
  >([]);

  useEffect(() => {
    client.models.Category.observeQuery().subscribe({
      next: (data) => setCategories([...data.items]),
    });
  }, []);

  const getCategorySpend = (id: string) => {
    return id;
  }

  return (
    <div className="mt-4 max-w-5xl">
      {categories.map((category) => (
        <div
          key={category.id}
          className="my-2 mx-auto px-4 py-6 flex justify-between border border-black rounded-4xl"
        >
          <span className="font-bold">{category.name}</span>
          <span className="text-gray-600">
            ${getCategorySpend(category.id)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ExpensesByCategory;
