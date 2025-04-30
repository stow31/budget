// import { useEffect, useState } from "react";
// import type { Schema } from "../amplify/data/resource";
// import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Navbar from "./components/Navbar";
import MonthlyDashboard from "./MonthlyDashboard";

// const client = generateClient<Schema>();

function App() {
  const { signOut } = useAuthenticator();

  // const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  // useEffect(() => {
  //   client.models.Todo.observeQuery().subscribe({
  //     next: (data) => setTodos([...data.items]),
  //   });
  // }, []);

  // function createTodo() {
  //   client.models.Todo.create({ content: window.prompt("Todo content") });
  // }

  return (
    <>
      <Navbar signOut={signOut} />
      <main className="px-4">
        <MonthlyDashboard />
      </main>
    </>
  );
}

export default App;
