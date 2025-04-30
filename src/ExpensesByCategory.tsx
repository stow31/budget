import { generateClient } from "aws-amplify/api";
import React, { useEffect, useState } from "react";
import { Schema } from "../amplify/data/resource";
import { CategoryCard } from "./CategoryCard";

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

  return (
    <div className="mt-4 max-w-5xl">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
};

export default ExpensesByCategory;
