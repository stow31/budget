import React, { useEffect, useState } from "react";
import { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/api";

export interface CategoryCardProps {
  category: Schema["Category"]["type"];
}

const client = generateClient<Schema>();

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const [categorySpend, setCategorySpend] = useState(0);

  useEffect(() => {
    getCategorySpend(category.id);
  });

  const getCategorySpend = async (id: string) => {
    // Get all transactions where the categoryId = id
    try {
      const { data, errors } = await client.models.Transaction.list({
        filter: {
          categoryId: {
            eq: id,
          },
        },
      });

      if (errors) {
        console.error("Errors fetching transactions:", errors);
        return "";
      }

      console.log(category.name, " ", data);

      if (data.length > 0) {
        const spend = data.reduce((acc, transaction) => {
          return acc + transaction.amount;
        }, 0);

        setCategorySpend(spend);
      } else {
        setCategorySpend(0);
      }
    } catch (error) {
      console.error("Unexpected error fetching transactions:", error);
      return "";
    }
  };

  return (
    <div className="my-2 mx-auto px-4 py-6 flex justify-between border border-black rounded-4xl">
      <span className="font-bold">{category.name}</span>
      <span className="text-gray-600">${categorySpend}</span>
    </div>
  );
};
